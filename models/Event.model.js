const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir un schéma pour les options de secteur et de type d'événement
const optionSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const eventSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    heure: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    typeEvenement: {
        type: [optionSchema],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least one type of event']
    },
    organisateur: {
        type: String,
        required: true
    },
    emailContact: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    telephoneContact: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please fill a valid phone number']
    },
    secteur: {
        type: [optionSchema],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least one sector']
    },
    promotionMedia: {
        type: String,
        required: true
    },
    partenariatsExistants: {
        type: String,
        required: true
    },
    accepteTermes: {
        type: Boolean,
        required: true
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});


function arrayLimit(val) {
    return val.length > 0;
}

module.exports = Event = mongoose.model('Event', eventSchema);
