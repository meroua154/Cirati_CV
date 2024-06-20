import React from 'react';
import { Link } from 'react-router-dom';
const ApplicationElement = ({ application }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); 
  };

  return (
    <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
      <div className="flex items-center mb-4">
        <img src={application.recruiterId.profilpic} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
        <div>
          <p className="text-lg font-lg">{application.recruiterId.name}</p>
          <div className="flex items-center text-gray-600">
            <i className="fas fa-map-marker-alt mr-2"></i>
            <p>lieu de l'emploi: {application.jobId.address}</p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Date d'application</h3>
        <p><i className="fas fa-calendar mr-2"></i>{formatDate(application.dateOfApplication)}</p>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Statut de l'application</h3>
        <p><i className="fas fa-info-circle mr-2"></i>{application.statut}</p>
      </div>
      {application.jobId && (
        <div className="mb-8">
          <h3 className="font-semibold">Poste appliqué</h3>
          <p>{application.jobId.title}</p>
          <p>Type de contrat : {application.jobId.Contratype}</p>
          <Link to={`/singleoffre/${application.jobId.recruiter}/${application.jobId._id}`} className="bg-green-700 hover:bg-green-800 text-white  py-2 px-4 rounded mt-4 inline-block">
            Voir l'offre
          </Link>
        </div>
      )}
    </div>
  );
};

export default ApplicationElement;
