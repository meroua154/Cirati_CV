import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { acceptApplication, rejectApplication, fetchJobApplications } from '../slices/candidatureSlice';

const CondidatureElement = ({ application }) => {
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  const handleAccept = () => {
    dispatch(acceptApplication(application._id))
      .then(() => dispatch(fetchJobApplications(application.jobId))); 
  };

  const handleReject = () => {
    dispatch(rejectApplication(application._id))
      .then(() => dispatch(fetchJobApplications(application.jobId))); 
  };
  const canAcceptOrReject = application.statut !== 'Accepté' && application.statut !== 'Non accepté';

  return (
    <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
      <div className="flex items-center mb-4">
        <img src={application.applicantId.profilpic} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
        <div>
          <p className="text-lg font-lg">{application.applicantId.name}</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Date de candidature</h3>
        <p><i className="fas fa-calendar mr-2"></i>{formatDate(application.dateOfApplication)}</p>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Statut de la candidature</h3>
        <p><i className="fas fa-info-circle mr-2"></i>{application.statut}</p>
      </div>
      <div className="flex justify-end gap-4">
      {canAcceptOrReject && (
        <div className="flex justify-end gap-4">
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={handleAccept}
          >
            Accepter la candidature
          </button>
          <button
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
            onClick={handleReject}
          >
            Refuser la candidature
          </button>
        </div>
      )}
      </div>
      <Link
        to="/profil"
        state={{ user: application.applicantId }}
        className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded mt-4 inline-block"
      >
        Voir le profil du candidat
      </Link>
    </div>
  );
};

export default CondidatureElement;
