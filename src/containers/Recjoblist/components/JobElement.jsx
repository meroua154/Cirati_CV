import React from 'react';
import instance from '../../../utils/setAuthToken';
import { useDispatch } from 'react-redux';
import { fetchEmploisByRecruiter } from '../slices/JobsSlice';
import { Link } from 'react-router-dom'; 
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); 
};

const JobElement = ({ job }) => {
  const dispatch = useDispatch();
  const handleArchive = async (jobId) => {
    try {
      await instance.put(`/job/archiver/${jobId}`);
      dispatch(fetchEmploisByRecruiter(job.recruiter));
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'offre:', error);
    }
  };

  const handleReactivate = async (jobId) => {
    try {
      await instance.put(`/job/reactiver/${jobId}`);
      dispatch(fetchEmploisByRecruiter(job.recruiter));
    } catch (error) {
      console.error('Erreur lors de la réactivation de l\'offre:', error);
    }
  }
  return (
    <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
      <h2 className="text-xl font-bold mb-2">{job.title}</h2>
      <div className="flex items-center mb-4">
        <img src={job.recruiterPic} alt="Recruiter Profile" className="w-20 h-20 rounded-full mr-4" />
        <div>
          <p className="text-lg font-lg">{job.recruiterName}</p>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-map-marker-alt mr-2"></i>
            <p>lieu de l'emploi: {job.address}</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Date de publication</h3>
        <p><i className="fas fa-calendar mr-2"></i>{formatDate(job.dateOfPost)}</p>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Type de contrat</h3>
        <p><i className="fas fa-info-circle mr-2"></i>{job.Contratype}</p>
      </div>
      {job.salary && (
        <div className="mb-8">
          <h3 className="font-semibold">Salaire</h3>
          <p>{job.salary} DA</p>
        </div>
      )}
      <div className="mb-8">
        <h3 className="font-semibold">Description</h3>
        <p>{job.description}</p>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Statut</h3>
        <p><i className="fas fa-check-circle mr-2"></i>{job.hidden ? 'Archivé' : 'Actif'}</p>
      </div>
      <div className="flex justify-end gap-4">
        {job.hidden ? (
          <button
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
            onClick={() => handleReactivate(job._id)}
          >
            Réactiver l'offre
          </button>
        ) : (
          <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          onClick={() => handleArchive(job._id)}
        >
          Archiver l'offre
        </button>
     
        )}
       <Link
          to="/MesCandidatures"
          
          state={{ jobId: job._id }}  
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Voir les candidatures
        </Link>
      </div>
    </div>
  );
};

export default JobElement;
