var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const SibApiV3Sdk = require('sib-api-v3-sdk');

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
router.post("/Resetpassword",  resetpassword);
router.post("/Resetpassword2/:resetToken", resetPassword2);
router.get("/verifyemail", verifyEmail);
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
// Getting one user
router.get("/:id", function(req, res) {
    User.findById(req.params.id).then(user => 
        res.json(user)
    )
    .catch(err => console.log(err));
});

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
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
            // Envoi de l'email
            sendEmails(req.body.email, emailSubject, emailContent)
            .then(() => {
                // Enregistrement de l'utilisateur dans la base de données après l'envoi réussi de l'email
                const newUser = new User(req.body);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.status(200).json(user); // Renvoyer l'utilisateur une fois enregistré
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
});


// PUT Request
// Edit User Details
router.route('/edit_profile/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Student updated successfully !')
      }
    })
})


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
            const verificationLink = `${req.protocol}://${req.get('host')}/user/verifyemail/verifyEmail?token=${verificationToken}`;
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
                id: user.id,
                name: user.name
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


// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else {
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

router.delete('/del_user/:id', (req,res) => {
    User.findById(req.params.id).then(user => 
        user.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;

