const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        //required: true
    },
    recruiterName: {
        type: String,
    },
    recruiterEmail: {
        type: String,
    },
    title: {
        type: String,
        //required: true
    },
    logo: {
        type: String,
        //required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Remote', 'Contract', 'Fulltime', 'Parttime'],
        default: 'Remote'
        //required: true
    },
    duration: {
        type: Number,
        //required: true
    },
    salary: {
        type: Number,
    },
    app: {
        type: Number,
        default: 0
    },
    appmax: {
        type: Number,
    },
    numapp: {
        type: Number,
    },
    address: {
        type: String,
        //required: true
    },
    skills: {
        type: [String],
        //required: true
    },
    rating: {
        type: Number,
        //default: 5
    },
    numrate: {
        type: Number,
    },
    posmax: {
        type: Number,
    },
    numpos: {
        type: Number,
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    },
    deadline: {
        type: Date,
        //required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Experienced', 'Intermediate', 'Professional'],
        default: 'Beginner'
        //required: true
    }
});

jobSchema.index({ recruiter: 1 });

module.exports = Job = mongoose.model('Job', jobSchema);
