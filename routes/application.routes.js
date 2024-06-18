var express = require("express");
var router = express.Router();
const {generateImageURL,generateImageURL2,upload} = require('../commun/communfun');
// Load Application model
const Application = require("../models/application.model");

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

// POST request 
// Add an application to db
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
// PUT Request
// Edit Application Details
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

module.exports = router;

