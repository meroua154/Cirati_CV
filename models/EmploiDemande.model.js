const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emploiSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    degreeTitle: {
        type: String
    },
    desiredPosition: {
        type: String,
        required: true
    },
    professionalSummary: {
        type: String
    },
    location: {
        type: String
    },
    yearsOfExperience: {
        type: String
    },
    usefulLinks: {
        LinkedIn: {
            type: String
        },
        GitHub: {
            type: String
        },
        Portfolio: {
            type: String
        },
        CV: {
            type: String
        }
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

module.exports = mongoose.model('Emploi', emploiSchema);
