import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); 
};

const JobElement = ({ job }) => {
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
      <div className="mb-8">
        <h3 className="font-semibold">Description</h3>
        <p>{job.description}</p>
      </div>
      <div className="flex justify-end gap-4">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          // onClick={() => onViewApplications(job._id)}
        >
          Voir les candidatures
        </button>
        <button
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
          // onClick={() => onViewApplications(job._id)}
        >
          Archiver l'offre
        </button>
      </div>
    </div>
  );
};

export default JobElement;
