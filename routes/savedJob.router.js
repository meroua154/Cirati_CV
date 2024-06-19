const express = require('express');
const router = express.Router();
const SavedJob = require('../models/savedJob.model');

// POST /api/savedjobs/add
// Ajouter une sauvegarde d'emploi
router.post('/add', async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    const savedJob = new SavedJob({ user: userId, job: jobId });
    await savedJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la sauvegarde d\'emploi : ', error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de la sauvegarde d\'emploi.' });
  }
});


router.delete('/remove/:id', async (req, res) => {
  const savedJobId = req.params.savedJobId;

  try {
    const deletedSavedJob = await SavedJob.findOneAndDelete({ 'job._id': savedJobId });
    if (!deletedSavedJob) {
      return res.status(404).json({ error: 'Sauvegarde d\'emploi non trouvée.' });
    }
    res.json({ message: 'Sauvegarde d\'emploi supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la sauvegarde d\'emploi : ', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de la sauvegarde d\'emploi.' });
  }

});
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const savedJobs = await SavedJob.find({ user: userId }).populate('job');
    res.json(savedJobs);
  } catch (error) {
    console.error('Erreur lors de la récupération des sauvegardes d\'emplois : ', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des sauvegardes d\'emplois.' });
  }
});
module.exports = router;