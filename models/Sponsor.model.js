const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sponsorFormSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Référence au modèle User
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectObjectives: {
        type: String,
        required: true
    },
    targetAudience: {
        type: String,
        required: true
    },
    budget: {
        type: String, // ou Number selon votre besoin
        required: true
    },
    sponsorBenefits: {
        type: String,
        required: true
    },
    partnershipDuration: {
        type: String,
        required: true
    },
    primaryContactName: {
        type: String,
        required: true
    },
    primaryContactEmail: {
        type: String,
        required: true
    },
    primaryContactPhone: {
        type: String,
        required: true
    },
    sector: [{
        type: String 
    }],
    projectLocation: {
        type: String,
        required: true
    },
    existingMediaPromotions: {
        type: String,
        required: true
    },
    existingPartnerships: {
        type: String,
        required: true
    },
    agreedToTerms: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SponsorForm', sponsorFormSchema);
