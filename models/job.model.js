const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    recruiter: {
        type: Schema.Types.ObjectId,
        ref: 'Recruiter',
        //required: true
    },
    title: {
        type: String,
        required: true
    },
    recruiterName: { 
        type: String,
    
    },
    recruiterPic: { 
        type: String,
    
    },
    secteur: {
        type: Schema.Types.Mixed,
        //required: true
    },
    address: {
        type: String,
        required: true
    },
    AnneeExperience: {
        type: String,
        //required: true
    },
    level: {
        type: String,
        enum: ['Débutant', 'Junior', 'Intermédiaire', 'Senior','Cadre supérieur'],
        default: 'Débutant'
        //required: true
    },
    levelEducation: {
        type: String,
        enum: ["Pas de formation formelle", "Diplôme d'études secondaires", "Diplôme d'associé", 'Licence','Master','Doctorat'],
        default: 'Débutant'
        //required: true
    },
    Nbposts: {
        type: Number,
    },

    description: {
        type: String,
        required: true
    },
    Contratype: {
        type: String,
        enum: ["Temps plein", "Temps partiel","Contrat à durée déterminée (CDD)", "Contrat à durée indéterminée (CDI)","Contrat d'apprentissage","Contrat de professionnalisation","Contrat de stage","Contrat d'intérim","Contrat de freelance","Contrat de mission"],
        default: "Temps plein"
        //required: true
    },

    duration: {
        type: Number,
        //required: true
    },
    salary: {
        type: Number,
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    },
    deadline: {
        atype: Date,
        //required: true
    },
    hidden: {
        atype: Boolean,
       default:false
    },
});

jobSchema.index({ recruiter: 1 });

module.exports = Job = mongoose.model('Job', jobSchema);
