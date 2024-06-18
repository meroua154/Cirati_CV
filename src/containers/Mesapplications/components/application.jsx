import React from 'react';

const ApplicationElement = ({ application }) => {
  // Function to format the date
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
            <p>{application.recruiterId.localisation}</p>
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
    </div>
  );
};

export default ApplicationElement;
