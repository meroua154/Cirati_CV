var express = require("express");
var router = express.Router();
const { upload,generateImageURL } = require('../commun/communfun');
// Load User model
const Job = require("../models/job.model");

// GET request 
// Getting all the jobs
// router.get("/get_jobs", function(req, res) {
//     Job.find(function(err, jobs) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(jobs);
// 		}
// 	})
// });
router.get("/Alljobs", function(req, res) {
    
    Job.find({ hidden: false }) 
        .sort({ dateOfPost: -1 }) 
        .limit(6) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                res.status(200).json(jobs);
            }
        });
});
router.get("/MatchingJobs", function(req, res) {
    
    Job.find({ hidden: false }) 
        .sort({ dateOfPost: -1 }) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                res.status(200).json(jobs);
            }
        });
});

// Getting one job
router.get('/secteurs', async (req, res) => {
    try {
        const jobs = await Job.find({ hidden: false })

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
    Job.find({ recruiter: req.params.recruiterId,hidden: false }) 
        .sort({ dateOfPost: -1 }) 
        .limit(2) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                res.json(jobs);
            }
        });
});
router.get("/get_job/:recruiterId/:jobId", function(req, res) {
    const { recruiterId, jobId } = req.params;
    Job.findOne({ _id: jobId, recruiter: recruiterId })
        .then(job => {
            if (!job) {
                return res.status(404).json({ message: "Offre d'emploi non trouvée pour ce recruteur." });
            }
            res.json(job);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Erreur lors de la récupération de l'offre d'emploi.");
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
router.get("/get_jobs/:recruiterId", function(req, res) {
    Job.find({ recruiter: req.params.recruiterId}) 
        .sort({ dateOfPost: -1 }) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                res.json(jobs);
            }
        });
});
router.get("/get_jobs2/:recruiterId", function(req, res) {
    Job.find({ recruiter: req.params.recruiterId,hidden: false}) 
        .sort({ dateOfPost: -1 }) 
        .exec(function(err, jobs) {
            if (err) {
                console.log(err);
                res.status(500).send("Erreur lors de la récupération des emplois.");
            } else {
                res.json(jobs);
            }
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


router.put('/archiver/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id, { hidden: true })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false, error: err }));
});

router.put('/reactiver/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id, { hidden: false })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false, error: err }));
});
module.exports = router;
