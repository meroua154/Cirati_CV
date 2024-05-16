var express = require("express");
var router = express.Router();
const { upload,generateImageURL } = require('../commun/communfun');
// Load User model
const Job = require("../models/job.model");

// GET request 
// Getting all the jobs
router.get("/get_jobs", function(req, res) {
    Job.find(function(err, jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});
router.get("/derniersjobs", function(req, res) {
    
    Job.find() 
        .sort({ dateOfPost: -1 }) 
        .limit(10) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                console.log(jobs)
                res.status(200).json(jobs);
            }
        });
});

// Getting one job

router.get('/secteurs', async (req, res) => {
    try {
        const jobs = await Job.find()

        const secteursCount = {};
        jobs.forEach(job => {
            const secteurs = Object.keys(job.secteur);
            secteurs.forEach(secteur => {
                if (secteursCount[secteur]) {
                    secteursCount[secteur] += 1;
                } else {
                    secteursCount[secteur] = 1;
                }
            });
        });
        const secteursArray = Object.keys(secteursCount).map(secteur => ({
            title: secteur,
            opening: secteursCount[secteur]
        }));

        res.json(secteursArray);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

  router.get("/:id", function(req, res) {
    Job.findById(req.params.id).then(job => 
        res.json(job)
    )
    .catch(err => console.log(err));
});
router.get("/latest_jobs/:recruiterId", function(req, res) {
    Job.find({ recruiter: req.params.recruiterId }) 
        .sort({ dateOfPost: -1 }) 
        .limit(10) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                res.json(jobs);
            }
        });
});
// POST request 
// Add a job to db
router.post("/add_job", (req, res) => {
    const newJob = new Job(req.body);

    newJob.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// PUT Request
// Edit Job Details
router.put('/edit_job/:id', (req, res) => {
    const updatedFields = { ...req.body };
    Job.findByIdAndUpdate(req.params.id, { $set: updatedFields }, (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send("Une erreur s'est produite lors de la mise à jour de l'emploi.");
        } else {
            console.log('Job updated successfully!');
        }
    });
});

// DELETE request
// Delete a job from the db
router.delete('/del_job/:id', (req,res) => {
    Job.findById(req.params.id).then(job => 
        job.remove().then(() => res.json({success: true}))
    )
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
