const express = require('express');
const router = express.Router();
const Emploi = require('../models/EmploiDemande.model');

router.post('/', async (req, res) => {
    try {
        const {
            user,
            fullName,
            jobTitle,
            degreeTitle,
            desiredPosition,
            professionalSummary,
            location,
            yearsOfExperience,
            usefulLinks,
            agreedToTerms
        } = req.body;

        const newEmploi = new Emploi({
            user,
            fullName,
            jobTitle,
            degreeTitle,
            desiredPosition,
            professionalSummary,
            location,
            yearsOfExperience,
            usefulLinks,
            agreedToTerms
        });

        const emploi = await newEmploi.save();
        res.status(201).json(emploi);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});
router.get('/All', async (req, res) => {
  try {
      const offres = await Emploi.find()

      res.status(200).json(offres);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
module.exports = router;
