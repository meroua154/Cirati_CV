var express = require("express");
var router = express.Router();
const User=require('../models/users.model')
const SibApiV3Sdk = require('sib-api-v3-sdk');
const {generateImageURL,generateImageURL2,upload} = require('../commun/communfun');

const Application = require("../models/application.model");
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
// GET request 
// Getting all the applications
router.get("/get_applications", function(req, res) {
    Application.find(function(err, applications) {
		if (err) {
			console.log(err);
		} else {
			res.json(applications);
		}
	})
});
router.put('/accept/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { statut: 'Accepté' },
      { new: true }
    ).populate('applicantId recruiterId jobId');

    const job = application.jobId;

    const emailContent = `
      <p>Bonjour ${application.applicantId.name},</p>
      <p>Félicitations, votre candidature pour le poste de ${job.title} chez ${application.recruiterId.name} a été acceptée.</p>
      <p>Pour plus de détails, vous pouvez consulter <a href="http://localhost:5173/singleoffre/${application.recruiterId._id}/${job._id}">cette page</a>.</p>
    `;
    await sendEmails(application.applicantId.email, 'Votre candidature a été acceptée', emailContent);
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/reject/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { statut: 'Non accepté' },
      { new: true }
    ).populate('applicantId recruiterId jobId');
    const job = application.jobId;

    const emailContent = `
      <p>Bonjour ${application.applicantId.name},</p>
      <p>Nous sommes désolés, mais votre candidature pour le poste de ${job.title} chez ${application.recruiterId.name} a été refusée.</p>
      <p>Pour plus de détails, vous pouvez consulter <a href="http://localhost:5173/singleoffre/${application.recruiterId._id}/${job._id}">cette page</a>.</p>
    `;

    await sendEmails(application.applicantId.email, 'Votre candidature a été refusée', emailContent);
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST request 
router.post("/EnvoiApplication", upload.fields([{ name: 'cv', maxCount: 1 }]), async (req, res) => {
  try {
    const cv = req.files["cv"] ? req.files["cv"][0].filename : undefined;
    const cvs = generateImageURL2(req, cv, 'cvs');
    if (!cv) {
      throw new Error('Fichier CV non téléchargé.');
    }
    const recruiterId=req.body.recruiterId;
    const recruiter = await User.findById(recruiterId);

    if (!recruiter) {
      throw new Error('Recruteur non trouvé.');
    }
    const emailSubject = 'Nouvelle candidature reçue';
    const emailContent = `
    <p>Bonjour,</p>
    <p>Une nouvelle candidature a été reçue.</p>
    <p>Vous pouvez également consulter le CV en ligne via ce lien : <a href="${cvs}">Voir le CV</a></p>
  `;
    await sendEmails(recruiter.email, emailSubject, emailContent);

    res.status(200).json({ message: 'CV envoyé par email avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la candidature et de l\'envoi du CV par email : ', error);
    res.status(400).json({ error: error.message });
  }
});
router.post("/add_application", 
upload.fields([{ name: 'cv', maxCount: 1 }]),
(req, res) => {
    const cv = req.files["cv"] ? req.files["cv"][0].filename : undefined;
    const cvs = generateImageURL2(req, cv, 'cvs');
    if (cv !== undefined) req.body.cv = cvs;
    const newApplication = new Application(req.body);
    newApplication.save()
        .then(application => {
            res.status(200).json(application);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.get("/check_application/:jobId/:applicantId", async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const applicantId = req.params.applicantId;
  
      const existingApplication = await Application.findOne({
        jobId: jobId,
        applicantId: applicantId,
      });
  
      if (existingApplication) {
        res.json({ applied: true });
      } else {
        res.json({ applied: false });
      }
    } catch (error) {
      console.error("Error checking application:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
   router.get("/get_job_applications/:jobId", async (req, res) => {
    try {
      const jobId = req.params.jobId;
  
      const applications = await Application.find({ jobId: jobId })
        .populate('applicantId', '-password -verified ')
        .exec();
  
      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching applications for job:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
router.put('/edit_application/:id', (req, res) => {
    Application.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.json(data)
            console.log('Application updated successfully !')
        }
    })
})

// DELETE request
// Delete an application from the db
router.delete('/del_application/:id', (req,res) => {
    Application.findById(req.params.id).then(application => 
        application.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});
router.get("/get_user_applications/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const applications = await Application.find({ applicantId: userId })
        .populate({
          path: 'jobId',
          match: { hidden: false }, 
          select: '-hidden'
        })
        .populate('applicantId', '-password -verified -_id')
        .populate('recruiterId', '-password -verified -_id')
        .exec();

      const filteredApplications = applications.filter(app => app.jobId !== null);
  
      res.status(200).json(filteredApplications);
    } catch (error) {
      console.error("Error fetching applications for user:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  
module.exports = router;

