var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const SibApiV3Sdk = require('sib-api-v3-sdk');
const {generateImageURL,generateImageURL2,upload} = require('../commun/communfun');
// Load input validation
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

// Load User model
const User = require("../models/users.model");

// GET request 
// Getting all the users
async function sendEmails(toEmail, subject, content) {
    return new Promise((resolve, reject) => {
        var defaultClient = SibApiV3Sdk.ApiClient.instance;
        var apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.EMAIL_API_KEY;
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = content;
        sendSmtpEmail.sender = { name: 'Noreply', email: 'noreply@example.com' };
        sendSmtpEmail.to = [{ email: toEmail }];
        apiInstance.sendTransacEmail(sendSmtpEmail).then(
            function (data) {
                console.log('API appelée avec succès. Données retournées : ' + data);
                resolve(data); 
            },
            function (error) {
                console.error('Erreur lors de l\'envoi de l\'email : ', error);
                reject(error); 
            }
        );
    });
}

async function verifyEmail(req, res) {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: 'accès interdit' });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                console.error('erreur lors de la verification: ', err);
                return res.status(400).json({ message: `erreur lors de la verification:  ${err.message}` });
            }
            const { email } = decoded;
            const user = await User.findOne({ email });
            if (user) {
                user.verified = true;
                await user.save();
                return res.redirect("http://localhost:5173/validation");

            }
            res.status(404).json({ message: 'un utilisateur avec cet email nexsite pas ' });
        });
    } catch (error) {
        console.error('erreur lors de la verification: ', error);
        return res.status(500).json({ message: `erreur lors de la verification:  ${error.message}` });
    }
}
async function resetpassword(req, res) {
    try {
      const { email } = req.body.email;
      const client = await User.findOne({ email: req.body.email });
      if (!client) {
        return res.status(404).json({ message: 'utilisateur introuvable' });
      }
      const currentTime = Date.now();
      const expirationTime = Math.floor(currentTime / 1000) + (10 * 60);
  
      const resetToken = jwt.sign({ id: client.id, exp: expirationTime }, process.env.RESET_PASSWORD_SECRET);
      const resetLink = `http://localhost:5173/passrec/${resetToken}`;
  
      const emailSubject = 'réinitialisation du mot de passe';
      const emailContent = `
        <p>clickez sur le link afin de réinitialiser votre mot de passe</p>
        <a href="${resetLink}">${resetLink}</a>
      `;
      sendEmails(req.body.email, emailSubject, emailContent);
  
      res.json({ message: 'un email de confirmation à été envoyé ' });
    } catch (error) {
      console.error( error);
      res.status(500).json({ message: 'erreur lors de la réintialisation' });
    }
  }
  async function resetPassword2(req, res) {
    try {

      const { resetToken } = req.params;
      const { newPassword } = req.body;
      jwt.verify(resetToken, process.env.RESET_PASSWORD_SECRET, async (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ message: 'le token est invalid' });
        }
        const { id, exp } = decoded;
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > exp) {
          return res.status(400).json({ message: 'le token est expiré' });
        }
        try {
          const client = await User.findById(id);
          if (!client) {
            return res.status(404).json({ message: 'utilisateur introuvable' });
          }
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          client.Password = hashedPassword;
          await client.save();
          return res.status(200).json({ message: 'réinitialisation réussite' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'erreur lors de la réintialisation' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'erreur lors de la réintialisation' });
    }
  }
  async function registerr(req, res) {
  
    try {
        const { errors, isValid } = validateRegisterInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const profilpic = req.files["profilpic"] ? req.files["profilpic"][0].filename : undefined;
        const coverpic = req.files["coverpic"] ? req.files["coverpic"][0].filename : undefined;
        const cv = req.files["cv"] ? req.files["cv"][0].filename : undefined;
        const imageprofil = generateImageURL(req, profilpic, 'profilpic');
        const imagecover = generateImageURL(req, coverpic, 'coverpic');
        const cvs = generateImageURL2(req, cv, 'cvs');
        if (profilpic !== undefined) req.body.profilpic = imageprofil;
        if (coverpic !== undefined) req.body.coverpic = imagecover;
        if (cv !== undefined) req.body.cv = cvs;
        const verificationToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const verificationLink = `${req.protocol}://${req.get('host')}/user/verifyemail?token=${verificationToken}`;
        const emailSubject = 'confirmer le compte:';
        const emailContent = `
            <p>Afin de confirmer votre compte veuillez clicker sur le button suivant :</p>
            <a href="${verificationLink}">  Click here!!</a>
        `;
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            } else {
                sendEmails(req.body.email, emailSubject, emailContent)
                .then(() => {
                    const newUser = new User(req.body);
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.status(200).json(user);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        });
                    });
                })
                .catch((emailError) => {
                    res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email: ' + emailError.message });
                });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

router.post("/Resetpassword",  resetpassword);
router.post("/Resetpassword2/:resetToken", resetPassword2);
router.get("/verifyemail", verifyEmail);
router.post("/register", upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "profilpic", maxCount: 1 },
    { name: "coverpic", maxCount: 1 },
  ]), registerr);
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});
router.get("/recruiter/:id", function(req, res) {
    User.findById(req.params.id, function(err, recruiter) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Erreur lors de la récupération du recruteur' });
        } else {
            if (!recruiter) {
                res.status(404).json({ error: 'Recruteur non trouvé' });
            } else {
                res.json(recruiter);
            }
        }
    });
});

router.get("/recruiter", function(req, res) {
    User.find({ role: 'recruiter' }, function(err, recruiters) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des recruteurs' });
        } else {
            res.json(recruiters);
        }
    });
});

// router.get("/:id", function(req, res) {
//     User.findById(req.params.id).then(user => 
//         res.json(user)
//     )
//     .catch(err => console.log(err));
// });
// router.get("/applicants", function(req, res) {
//     User.find({ role: 'applicant' }, function(err, applicants) {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Erreur lors de la récupération des recruteurs' });
//         } else {
//             res.json(applicants);
//         }
//     });
// });






// PUT Request
async function updateProfilPic(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const profilpic = req.files["profilpic"] ? req.files["profilpic"][0].filename : undefined;
          console.log(profilpic)
        if (profilpic !== undefined) {
            const imageprofil = generateImageURL(req, profilpic, 'profilpic');
            user.profilpic = imageprofil;
            await user.save();
            const jobsToUpdate = await Job.find({ recruiter: user._id });
            jobsToUpdate.forEach(async (job) => {
                job.recruiterPic = user.profilpic;
                await job.save();
            });
            return res.status(200).json({ message: 'Image de profil mise à jour avec succès',profilpic:imageprofil });
        } else {
            return res.status(400).json({ message: 'Aucune image de profil trouvée' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'image de profil' });
    }
}
async function updateUserProfile(req, res) {
    try {
        // const { errors, isValid } = validateRegisterInput(req.body);
        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }

        const { id } = req.params; // Récupère l'ID de l'utilisateur à partir des paramètres de la requête
        const user = await User.findById(id); // Trouve l'utilisateur dans la base de données

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        // Mettre à jour l'e-mail
        console.log( req.body)
        const newEmail = req.body.email;
        const oldEmail = user.email;

        // Si le nouvel e-mail est différent de l'ancien
        console.log(newEmail)
        if (newEmail && newEmail !== oldEmail) {
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet e-mail est déjà associé à un compte' });
            }

            const verificationToken = jwt.sign({ email: newEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const verificationLink = `${req.protocol}://${req.get('host')}/user/verifyemail?token=${verificationToken}`;
            const emailSubject = 'Vérification de l\'adresse e-mail';
            const emailContent = `
                <p>Cliquez sur ce lien pour vérifier votre nouvelle adresse e-mail:</p>
                <a href="${verificationLink}">${verificationLink}</a>
            `;

            // Envoie l'e-mail de vérification
            await sendEmails(newEmail, emailSubject, emailContent);

            // Met à jour l'utilisateur avec le nouvel e-mail non vérifié
            user.email = newEmail;
            user.verified = false; // Marque le nouvel e-mail comme non vérifié
        }

        // Mettre à jour les autres champs du profil si nécessaire
        user.name = req.body.name;
        user.phone = req.body.phone;

        // Traitement des fichiers
        const profilpic = req.files["profilpic"] ? req.files["profilpic"][0].filename : undefined;
        const coverpic = req.files["coverpic"] ? req.files["coverpic"][0].filename : undefined;
        const cv = req.files["cv"] ? req.files["cv"][0].filename : undefined;
        // Si le fichier du profil est modifié ou ajouté
        if (profilpic !== undefined) {
            const imageprofil = generateImageURL(req, profilpic, 'profilpic');
            user.profilpic = imageprofil;
        }

        // Si le fichier de la photo de couverture est modifié ou ajouté
        if (coverpic !== undefined) {
            const imagecover = generateImageURL(req, coverpic, 'coverpic');
            user.coverpic = imagecover;
        }

        // Si le fichier du CV est modifié ou ajouté
        if (cv !== undefined) {
            const cvs = generateImageURL2(req, cv, 'cvs');
            user.cv = cvs;
        }

        // Enregistre les modifications dans la base de données
        await user.save();

        return res.status(200).json({ message: 'Profil mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
}
async function updateCoverPic(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const coverpic = req.files["coverpic"] ? req.files["coverpic"][0].filename : undefined;

        if (coverpic !== undefined) {
            const imagecover = generateImageURL(req, coverpic, 'coverpic');
            user.coverpic = imagecover;
            await user.save();
            return res.status(200).json({ message: 'Image de couverture mise à jour avec succès',coverpic:imagecover });
        } else {
            return res.status(400).json({ message: 'Aucune image de couverture trouvée' });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'image de couverture' });
    }
}
router.put("/update-profilpic/:id", 
upload.fields([
    { name: "profilpic", maxCount: 1 },
  ]), updateProfilPic);
router.put("/update/:id", upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "profilpic", maxCount: 1 },
    { name: "coverpic", maxCount: 1 },
  ]), updateUserProfile);


router.put("/update-coverpic/:id", upload.fields([
    { name: "coverpic", maxCount: 1 },
  ]), updateCoverPic);
  
// POST request 
// Login
router.post("/login", async (req, res) => {
    try {
        const { errors, isValid } = validateLoginInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        if (!user.verified) {
            const verificationToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4h' });
            const verificationLink = `${req.protocol}://${req.get('host')}/user/verifyemail?token=${verificationToken}`;
            const emailSubject = 'vérification de lemail';
            const emailContent = `
              <p>Clickez sur ce lien afin de valider votre email:</p>
              <a href="${verificationLink}">  Clickez ici!!</a>
              `;
            await sendEmails(email, emailSubject, emailContent);
            return res.status(500).json({ message: `Veuillez d'abord vérifier votre email` });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
           
            const payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                localisation: user.localisation,
                phone_number: user.phone_number,
                bio: user.bio,
                date: user.date,
                verified: user.verified,
                profilpic: user.profilpic,
                coverpic: user.coverpic,
                website: user.website,
                LinkedIn: user.LinkedIn,
                Facebook: user.Facebook,
                cv: user.cv,
                preferences: user.preferences,
                experiences: user.experiences,
                langues: user.langues
                
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/del_user/:id', (req,res) => {
    User.findById(req.params.id).then(user => 
        user.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});
// PUT Request
async function updateCV(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const cv = req.files["cv"] ? req.files["cv"][0].filename : undefined;

        if (cv !== undefined) {
            const cvs = generateImageURL2(req, cv, 'cvs');
            user.cv = cvs;
            await user.save();
            return res.status(200).json({ message: 'CV mis à jour avec succès', cv: cvs });
        } else {
            return res.status(400).json({ message: 'Aucun fichier CV trouvé' });
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du CV' });
    }
}
async function getApplicantById(req, res) {
    try {
        const { id } = req.params;
        const applicant = await User.findById(id);

        if (!applicant) {
            return res.status(404).json({ message: 'Demandeur non trouvé' });
        }
        if (applicant.role === 'applicant') {
            return res.status(200).json(applicant);
       
        } else {
            return res.status(404).json({ message: 'L\'utilisateur trouvé n\'est pas un demandeur' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du demandeur' });
    }
}
router.get("/applicant/:id", getApplicantById);

router.put("/update-cv/:id", upload.fields([{ name: "cv", maxCount: 1 }]), updateCV);
// PUT Request
async function updateBasicInfoAndProfilePic(req, res) {
    try {
        const { id } = req.params; 
        const user = await User.findById(id); 

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        const newEmail = req.body.email;
        const oldEmail = user.email;
        if (newEmail && newEmail !== oldEmail) {
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet e-mail est déjà associé à un compte' });
            }

            const verificationToken = jwt.sign({ email: newEmail }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const verificationLink = `${req.protocol}://${req.get('host')}/user/verifyemail?token=${verificationToken}`;
            const emailSubject = 'Vérification de l\'adresse e-mail';
            const emailContent = `
                <p>Cliquez sur ce lien pour vérifier votre nouvelle adresse e-mail:</p>
                <a href="${verificationLink}">${verificationLink}</a>
            `
            await sendEmails(newEmail, emailSubject, emailContent);
            user.email = newEmail;
            user.verified = false; 
        }
        user.name = req.body.name;
        user.phone_number = req.body.phone_number;
        const profilpic = req.files["profilpic"] ? req.files["profilpic"][0].filename : undefined
        if (profilpic !== undefined) {
            const imageprofil = generateImageURL(req, profilpic, 'profilpic');
            user.profilpic = imageprofil;
        }
        await user.save();
        return res.status(200).json({ message: 'Informations de base et photo de profil mises à jour avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour des informations de base et de la photo de profil' });
    }
}

router.put("/update1/:id", upload.fields([
    { name: "profilpic", maxCount: 1 }
]), updateBasicInfoAndProfilePic);

// PUT Request
async function updateAdvancedInfo(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        user.preferences = req.body.preferences;
        await user.save();

        return res.status(200).json({ message: 'Informations avancées mises à jour avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour des informations avancées' });
    }
}

router.put("/update2/:id", updateAdvancedInfo);
// POST Request
async function addExperience(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const newExperience = {
            _id:req.body._id,
            titre: req.body.titre,
            company: req.body.company,
            annees: req.body.annees
        };
        user.experiences.push(newExperience);
        await user.save();

        return res.status(200).json({ message: 'Expérience ajoutée avec succès', experience: newExperience });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'expérience' });
    }
}

router.post("/add-experience/:id", addExperience);
// DELETE Request
async function deleteExperience(req, res) {
    try {
        const { id, experienceId } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        // Vérifie si l'expérience existe dans la liste des expériences de l'utilisateur
        const experienceIndex = user.experiences.findIndex(exp => exp._id == experienceId);

        if (experienceIndex === -1) {
            return res.status(404).json({ message: 'Expérience introuvable' });
        }

        // Supprime l'expérience de la liste
        user.experiences.splice(experienceIndex, 1);

        // Enregistre les modifications dans la base de données
        await user.save();

        return res.status(200).json({ message: 'Expérience supprimée avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'expérience' });
    }
}

router.delete("/delete-experience/:id/:experienceId", deleteExperience);
// PUT Request
async function updateLanguages(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        // Mettre à jour les langues
        user.langues = req.body.langues;

        // Enregistre les modifications dans la base de données
        await user.save();

        return res.status(200).json({ message: 'Langues mises à jour avec succès' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour des langues' });
    }
}

router.put("/update-languages/:id", updateLanguages);


module.exports = router;

