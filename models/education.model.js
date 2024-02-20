const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définition du schéma pour l'éducation
const educationSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date
  }
});

educationSchema.index({ school: 1 });

module.exports = mongoose.model('Education', educationSchema);
