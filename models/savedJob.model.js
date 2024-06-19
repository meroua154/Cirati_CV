const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedJobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

const SavedJob = mongoose.model('SavedJob', savedJobSchema);

module.exports = SavedJob;