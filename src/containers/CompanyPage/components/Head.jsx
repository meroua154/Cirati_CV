import React from 'react';
import Header from './Header';

const Head = ({ coverPhoto, profilePhoto, companyName }) => {
  return (
    <div>
      {/* Photo de couverture */}
      <div className="relative">
        <img
          src={coverPhoto}
          alt="Photo de couverture de l'entreprise"
          className="w-full h-60 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 left-0 ml-96 mb-8">
          <p className="text-white font-bold text-2xl">{companyName}</p>
        </div>
        
        {/* Photo de profil */}
        <div className="absolute top-0 left-0 mt-20 ml-12 mb-6">
          <img
            src={profilePhoto}
            alt="Photo de profil de l'entreprise" 
            className="h-60 w-70 border-2 border-white bg-white shadow-xl rounded-lg"
          />
        </div>
      </div>
      <Header></Header>
    </div>
  );
};

export default Head;
