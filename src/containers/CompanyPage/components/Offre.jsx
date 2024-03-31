import React from 'react';
import { BsBriefcase, BsGeoAlt, BsPersonCheck, BsClockHistory, BsBook } from 'react-icons/bs'; // Importez les icônes Bootstrap nécessaires

const Offre = ({ title, poste, experience, lieu, diplome, service }) => {
  return (
    <div className="description-container border-b-2 mt-4 pb-4">
        <a href="" className="description-title font-bold text-lg mb-8">{title}</a>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-2 mr-4" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <BsBriefcase className="me-2 font-bold" /> {/* Icône de mallette */}
            <p className="description-text text-wrap text-sm mt-2 mb-0 tracking-wider"><strong>Poste : </strong> {poste}</p>
          </div>
          <div className="mb-2" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <BsGeoAlt className="me-2 font-bold" /> {/* Icône de localisation */}
            <p className="description-text text-wrap text-sm mt-2 mb-0 tracking-wider"><strong>Lieu :</strong> {lieu}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-2" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <BsBook className="me-2 font-bold" /> {/* Icône de livre */}
            <p className="description-text text-wrap text-sm mt-2 mb-0 tracking-wider"><strong>Diplôme requis :</strong> {diplome}</p>
          </div>
          <div className="mb-2" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <BsClockHistory className="me-2 font-bold" /> {/* Icône d'horloge */}
            <p className="description-text text-wrap text-sm mt-2 mb-0 tracking-wider"><strong>Expérience requise :</strong> {experience}</p>
          </div>
          <div className="mb-2" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <BsPersonCheck className="me-2 font-bold" /> {/* Icône de personne vérifiée */}
            <p className="description-text text-wrap text-sm mt-2 mb-0 tracking-wider"><strong>Service :</strong> {service}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offre;



