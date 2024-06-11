const express = require('express');
const router = express.Router();
const SponsorForm = require('../models/Sponsor.model');

router.post('/', async (req, res) => {
    try {
        const {
            title,
            userId,
            projectDescription,
            projectObjectives,
            targetAudience,
            budget,
            sponsorBenefits,
            partnershipDuration,
            primaryContactName,
            primaryContactEmail,
            primaryContactPhone,
            sector,
            projectLocation,
            existingMediaPromotions,
            existingPartnerships,
            agreedToTerms
        } = req.body;
        const newSponsorForm = new SponsorForm({
            title,
            userId,
            projectDescription,
            projectObjectives,
            targetAudience,
            budget,
            sponsorBenefits,
            partnershipDuration,
            primaryContactName,
            primaryContactEmail,
            primaryContactPhone,
            sector,
            projectLocation,
            existingMediaPromotions,
            existingPartnerships,
            agreedToTerms
        });
        const sponsorForm = await newSponsorForm.save();

        res.status(201).json(sponsorForm);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
