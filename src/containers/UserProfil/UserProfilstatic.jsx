import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import { useLocation } from "react-router";
const UserProfilStatic = () => {
  const location = useLocation();
  const user = location.state?.user || {};
  const [userData, setUserData] = useState({
    preferences: {
      secteur: [],
      salaire: null,
      mobilite: "",
      metier: "",
      statut: ""
    },
    role: "",
    // verified: false,
    // _id: "",
    name: "",
    email: "",
    // password: "",
    localisation: "",
    phone_number: "",
    bio: "",
    website: "",
    LinkedIn: "",
    Facebook: "",
    cv: null,
    langues: {
      Kabyle: false,
      Arabe: false,
      Français: false,
      Anglais: false,
      Espagnol: false,
      Turc: false
    },
    experiences: [
      {
        _id: "",
        titre: "",
        annees: null,
        company: ""
      }
    ],
    profilpic: "",
    coverpic: "",
    date: ""
  });



  useEffect(() => {
    if (user) {
      const cvFileName = extractFileName(user.cv);
      const oldCv = new File([user.cv], cvFileName, { type: 'application/pdf' });

      setUserData({
        ...user,
        cv: oldCv
      });
    }
  }, [user]);

  const extractFileName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      {/* <div className="w-full md:w-1/4 md:h-screen  mt-24"> */}
        {/* <ul className="mt-8">
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-user mr-2"></i> Mon Profil</li>
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-file mr-2"></i> Mes Applications</li>
        </ul> */}
      {/* </div> */}
      {/* Contenu principal */}
      <div className="w-full md:w-full p-8 mt-24 bg-slate-50">
        <h1 className="text-2xl font-bold mb-4 md:ml-16">Profil</h1>

        {/* Box pour le CV */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl mb-4 font-bold">Mon CV</h2>
          <div>
            {userData.cv ? (
              <div>
                <p className='mb-2'>CV téléchargé : {userData.cv.name}</p>
                <a href={user.cv} target="_blank" rel="noopener noreferrer" className='font-semibold text-primary'>Voir le CV</a>
              </div>
            ) : (
              <p>Aucun CV téléchargé</p>
            )}
          </div>
        </div>

        {/* Box Informations Générales */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-bold mb-2">Informations Générales</h2>
          <div className="flex items-center mb-4">
            <img src={userData.profilpic} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
            <div>
              <p className="text-lg font-lg">{userData.name}</p>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <p>{userData.localisation}</p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-semibold">Informations de Contact</h3>
            <p><i className="fas fa-phone mr-4"></i>{userData.phone_number}</p>
            <p><i className="fas fa-envelope mr-2"></i>{userData.email}</p>
          </div>
        </div>

        {/* Box Préférences de Recrutement */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-extrabold mb-2">Préférences de Recrutement</h2>
          <div className="mb-8">
            <p><span className="font-semibold text-sm">Secteur d'activité souhaité:</span> {userData.preferences.secteur}</p>
            <p><span className="font-semibold text-sm">Salaire souhaité:</span> {userData.preferences.salaire}</p>
            <p><span className="font-semibold text-sm">Mobilité:</span> {userData.preferences.mobilite}</p>
            <p><span className="font-semibold text-sm">Métier:</span> {userData.preferences.metier}</p>
            <p><span className="font-semibold text-sm">Statut:</span> {userData.preferences.statut}</p>
          </div>
        </div>

        {/* Box Expériences */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-extrabold mb-2">Expériences</h2>
          {userData.experiences.map(experience => (
            <div key={experience._id} className="mb-2">
              <p className="font-semibold text-base">{experience.titre} - {experience.company}</p>
              <p className="text-sm text-gray-600">{experience.annees}</p>
            </div>
          ))}
        </div>

        {/* Box pour les langues */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-bold mb-2">Langues</h2>
          <div className="mb-4">
            {Object.keys(userData.langues).map((lang, index) => (
              <div key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={lang}
                  checked={userData.langues[lang]}
                  className="mr-2"
                  disabled
                />
                <label htmlFor={lang} className="font-medium">{lang}</label>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfilStatic;
