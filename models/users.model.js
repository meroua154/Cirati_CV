const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateImageURL } = require('../commun/communfun')

const userSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    role: {
        type: String,
        required: true,
        enum: ['applicant', 'recruiter'],
        default: 'applicant'
    },
    localisation: {
        type: String
    },
    phone_number: {
        type: String
    },
    bio: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    },
    // skills: {
    //     type: [String] 
    // },
    profilpic: {
        type: String
    },
    coverpic: {
        type: String
    },
    website: {
        type: String
    },
    LinkedIn: {
        type: String
    },
    Facebook: {
        type: String
    },
    preferences: {
        secteur: {
            type: [String] 
        },
        salaire: {
            type: Number 
        },
        mobilite: {
            type: String,
            enum: ['Willing to relocate', 'local']
        },
        metier: {
            type: String 
        },
        statut: {
            type: String,
            enum: ['all', 'Remote', 'Contract', 'Fulltime', 'Parttime']
        }
    },
    cv: {
        type: String
    },
    experiences: [{
        _id: {
            type: String,
            default: () => Math.random().toString(36).substring(7)
        },
        titre: {
            type: String
        },
        annees: {
            type: String
        },
        company: {
            type: String
        },
    }],
    langues: {
        Kabyle: Boolean,
        Arabe: Boolean,
        Français: Boolean,
        Anglais: Boolean,
        Espagnol: Boolean,
        Turc: Boolean
    },
});

userSchema.index({ name: 1 });

module.exports = User = mongoose.model("User", userSchema);
