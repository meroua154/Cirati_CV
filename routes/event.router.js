const express = require('express');
const router = express.Router();
const Event = require('../models/Event.model');

router.post('/', async (req, res) => {
    const {
        titre,
        description,
        user,
        date,
        heure,
        lieu,
        typeEvenement,
        organisateur,
        emailContact,
        telephoneContact,
        secteur,
        promotionMedia,
        partenariatsExistants,
        accepteTermes
    } = req.body;

    try {
        const newEvent = new Event({
            titre,
            description,
            user,
            date,
            heure,
            lieu,
            typeEvenement,
            organisateur,
            emailContact,
            telephoneContact,
            secteur,
            promotionMedia,
            partenariatsExistants,
            accepteTermes
        });
        await newEvent.validate();

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);

        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ errors });
        }

        res.status(500).send('Server Error');
    }
});

module.exports = router;
