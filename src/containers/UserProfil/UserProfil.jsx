import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css'; // Importation des icônes FontAwesome

const UserProfil = () => {
  // État local pour les informations du profil utilisateur
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    region: 'New York',
    profilePicture: 'https://via.placeholder.com/150', // Placeholder image
    recruitmentPreferences: {
      industry: 'Technology',
      salary: '$100,000',
      mobility: 'Willing to relocate',
      jobTitle: 'Software Developer',
      employmentStatus: 'Full-time'
    },
    experiences: [
      { id: 1, title: 'Software Developer', company: 'ABC Inc.', duration: '2020 - Present' },
      { id: 2, title: 'Intern', company: 'XYZ Corp.', duration: '2018 - 2019' }
    ]
  });

  // État local pour gérer l'édition des informations utilisateur
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

  // État local pour gérer l'édition des préférences de recrutement
  const [isEditingRecruitmentPreferences, setIsEditingRecruitmentPreferences] = useState(false);

  // État local pour gérer l'édition des expériences
  const [isEditingExperiences, setIsEditingExperiences] = useState(false);

  // État local pour stocker une nouvelle expérience
  const [newExperience, setNewExperience] = useState({ title: '', company: '', duration: '' });

  // Fonction pour activer le mode édition des informations utilisateur
  const handleEditUserInfo = () => {
    setIsEditingUserInfo(true);
  };

  // Fonction pour enregistrer les modifications des informations utilisateur
  const handleSaveUserInfo = () => {
    setIsEditingUserInfo(false);
    // Enregistrer les modifications dans la base de données, par exemple
  };

  // Fonction pour annuler les modifications des informations utilisateur
  const handleCancelEditUserInfo = () => {
    setIsEditingUserInfo(false);
    // Réinitialiser les champs avec les valeurs d'origine, par exemple
  };

  // Fonction pour activer le mode édition des préférences de recrutement
  const handleEditRecruitmentPreferences = () => {
    setIsEditingRecruitmentPreferences(true);
  };

  // Fonction pour enregistrer les modifications des préférences de recrutement
  const handleSaveRecruitmentPreferences = () => {
    setIsEditingRecruitmentPreferences(false);
    // Enregistrer les modifications dans la base de données, par exemple
  };

  // Fonction pour annuler les modifications des préférences de recrutement
  const handleCancelEditRecruitmentPreferences = () => {
    setIsEditingRecruitmentPreferences(false);
    // Réinitialiser les champs avec les valeurs d'origine, par exemple
  };

  // Fonction pour gérer le changement de la photo de profil
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prevState => ({
        ...prevState,
        profilePicture: reader.result // Mettre à jour la photo de profil avec le contenu du fichier
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour gérer l'ajout d'une nouvelle expérience
  const handleAddExperience = () => {
    const id = userData.experiences.length + 1;
    setUserData(prevState => ({
      ...prevState,
      experiences: [...prevState.experiences, { ...newExperience, id }]
    }));
    setNewExperience({ title: '', company: '', duration: '' });
  };

  // Fonction pour gérer la suppression d'une expérience
  const handleDeleteExperience = (id) => {
    setUserData(prevState => ({
      ...prevState,
      experiences: prevState.experiences.filter(exp => exp.id !== id)
    }));
  };

  // Fonction pour activer le mode édition des expériences
  const handleEditExperiences = () => {
    setIsEditingExperiences(true);
  };

  // Fonction pour enregistrer les modifications des expériences
  const handleSaveExperiences = () => {
    setIsEditingExperiences(false);
  };

  // Fonction pour annuler les modifications des expériences
  const handleCancelEditExperiences = () => {
    setIsEditingExperiences(false);
    setNewExperience({ title: '', company: '', duration: '' });
  };

  // Déclarez un état local pour gérer le CV et son édition
  const [cv, setCv] = useState(null);
  const [isEditingCV, setIsEditingCV] = useState(false);

  // Fonction pour gérer le changement du CV
  const handleCVChange = (e) => {
    const file = e.target.files[0];
    setCv(file);
  };

  // Fonction pour enregistrer le CV
  const handleSaveCV = () => {
    setIsEditingCV(false);
    // Enregistrer le CV dans la base de données ou dans le système de stockage, par exemple
  };

  // Fonction pour annuler l'édition du CV
  const handleCancelEditCV = () => {
    setIsEditingCV(false);
    setCv(null);
    // Réinitialiser le champ avec la valeur d'origine, par exemple
  };

    // Déclarez un état local pour gérer les langues et leur édition
    const [languages, setLanguages] = useState(['English', 'French']);
    const [newLanguage, setNewLanguage] = useState('');
    const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  
    // Fonction pour ajouter une langue
    const handleAddLanguage = () => {
      if (newLanguage.trim() !== '') {
        setLanguages(prevLanguages => [...prevLanguages, newLanguage]);
        setNewLanguage('');
      }
    };
  
    // Fonction pour supprimer une langue
    const handleDeleteLanguage = (index) => {
      setLanguages(prevLanguages => prevLanguages.filter((_, i) => i !== index));
    };
  
    // Fonction pour enregistrer les langues
    const handleSaveLanguages = () => {
      setIsEditingLanguages(false);
      // Enregistrer les modifications dans la base de données, par exemple
    };
  
    // Fonction pour annuler l'édition des langues
    const handleCancelEditLanguages = () => {
      setIsEditingLanguages(false);
      // Réinitialiser les champs avec les valeurs d'origine, par exemple
    };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 md:h-screen  mt-24">
        <ul className="mt-8">
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-user mr-2"></i> Mon Profil</li>
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-sign-out-alt mr-2"></i> Se Déconnecter</li>
        </ul>
      </div>
      
      {/* Contenu principal */}
      <div className="w-full md:w-3/4 p-8 mt-24 bg-slate-50">
        <h1 className="text-2xl font-bold mb-4 md:ml-16">Profil</h1>
         {/* Box pour le CV */}
      <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
        <h2 className="text-xl mb-4 font-bold">Mon CV</h2>
        {isEditingCV ? (
          <div className="mb-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleCVChange}
              className="mb-2"
            />
            <button onClick={handleSaveCV} className="bg-primary text-white px-4 py-2 rounded-md mr-2">Enregistrer</button>
            <button onClick={handleCancelEditCV} className="bg-light text-white px-4 py-2 rounded-md">Annuler</button>
          </div>
        ) : (
          <div>
            {cv ? (
              <div>
                <p className='mb-2'>CV téléchargé : {cv.name}</p>
                <a href={URL.createObjectURL(cv)} target="_blank" rel="noopener noreferrer" className='font-semibold text-primary'>Voir le CV</a>
              </div>
            ) : (
              <p>Aucun CV téléchargé</p>
            )}
            <button onClick={() => setIsEditingCV(true)} className="bg-light text-white px-4 py-2 mt-4 rounded-md">Modifier</button>
          </div>
        )}
      </div>
        {/* Box Informations Générales */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-bold mb-2">Informations Générales</h2>
          <div className="flex items-center mb-4">
            {isEditingUserInfo ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                  id="profilePictureInput"
                />
                <label htmlFor="profilePictureInput">
                  <img src={userData.profilePicture} alt="Profile" className="w-20 h-20 rounded-full mr-4 cursor-pointer" />
                </label>
              </>
            ) : (
              <img src={userData.profilePicture} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
            )}
            <div>
              {isEditingUserInfo ? (
                <>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    className="text-lg font-lg mb-2 focus:outline-none border-b border-gray-400"
                  />
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="text-lg font-lg mb-2 focus:outline-none border-b border-gray-400"
                  />
                </>
              ) : (
                <>
                  <p className="text-lg font-lg">{userData.firstName} {userData.lastName}</p>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <p>{userData.region}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="font-semibold">Informations de Contact</h3>
            {isEditingUserInfo ? (
              <>
                <input
                  type="text"
                  value={userData.phoneNumber}
                  onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                  className="mb-2 focus:outline-none border-b border-gray-400"
                />
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="mb-2 focus:outline-none border-b border-gray-400"
                />
              </>
            ) : (
              <>
                <p><i className="fas fa-phone mr-4"></i>{userData.phoneNumber}</p>
                <p><i className="fas fa-envelope mr-2"></i>{userData.email}</p>
              </>
            )}
          </div>
          {isEditingUserInfo ? (
            <>
              <button onClick={handleSaveUserInfo} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Enregistrer</button>
              <button onClick={handleCancelEditUserInfo} className="bg-gray-500 text-white px-4 py-2 rounded-md">Annuler</button>
            </>
          ) : (
            <button onClick={handleEditUserInfo} className="bg-light text-white px-4 py-2 rounded-md">Modifier</button>
          )}
        </div>
        {/* Box Préférences de Recrutement */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-extrabold mb-2">Préférences de Recrutement</h2>
          {isEditingRecruitmentPreferences ? (
            <div className="mb-8">
              <input
                type="text"
                value={userData.recruitmentPreferences.industry}
                onChange={(e) => setUserData({ ...userData, recruitmentPreferences: { ...userData.recruitmentPreferences, industry: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.recruitmentPreferences.salary}
                onChange={(e) => setUserData({ ...userData, recruitmentPreferences: { ...userData.recruitmentPreferences, salary: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.recruitmentPreferences.mobility}
                onChange={(e) => setUserData({ ...userData, recruitmentPreferences: { ...userData.recruitmentPreferences, mobility: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.recruitmentPreferences.jobTitle}
                onChange={(e) => setUserData({ ...userData, recruitmentPreferences: { ...userData.recruitmentPreferences, jobTitle: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.recruitmentPreferences.employmentStatus}
                onChange={(e) => setUserData({ ...userData, recruitmentPreferences: { ...userData.recruitmentPreferences, employmentStatus: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
            </div>
          ) : (
            <div className="mb-8">
              <p><span className="font-semibold text-sm">Secteur d'activité souhaité:<br/></span> {userData.recruitmentPreferences.industry}</p>
              <p><span className="font-semibold text-sm">Salaire souhaité:<br/></span> {userData.recruitmentPreferences.salary}</p>
              <p><span className="font-semibold text-sm">Mobilité:<br/></span> {userData.recruitmentPreferences.mobility}</p>
              <p><span className="font-semibold text-sm">Métier:<br/></span> {userData.recruitmentPreferences.jobTitle}</p>
              <p><span className="font-semibold text-sm">Statut:<br/></span> {userData.recruitmentPreferences.employmentStatus}</p>
            </div>
          )}
          {isEditingRecruitmentPreferences ? (
            <>
              <button onClick={handleSaveRecruitmentPreferences} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Enregistrer</button>
              <button onClick={handleCancelEditRecruitmentPreferences} className="bg-gray-500 text-white px-4 py-2 rounded-md">Annuler</button>
            </>
          ) : (
            <button onClick={handleEditRecruitmentPreferences} className="bg-light text-white px-4 py-2 rounded-md">Modifier</button>
          )}
        </div>
        {/* Box Expériences */}
        <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
          <h2 className="text-xl font-extrabold mb-2">Expériences</h2>
          {isEditingExperiences && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Titre"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                placeholder="Société"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                placeholder="Durée"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <button onClick={handleAddExperience} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Ajouter</button>
              <button onClick={handleCancelEditExperiences} className="bg-gray-500 text-white px-4 py-2 rounded-md">Annuler</button>
            </div>
          )}
          {userData.experiences.map(experience => (
            <div key={experience.id} className="mb-2">
              <p className="font-semibold text-base">{experience.title} - {experience.company}</p>
              <p className="text-sm text-gray-600">{experience.duration}</p>
              {isEditingExperiences && (
                <button onClick={() => handleDeleteExperience(experience.id)} className="text-red-500 font-semibold">Supprimer</button>
              )}
            </div>
          ))}
          {!isEditingExperiences && (
            <button onClick={handleEditExperiences} className="bg-light text-white px-4 py-2 rounded-md">Ajouter</button>
          )}
          {isEditingExperiences && (
            <button onClick={handleSaveExperiences} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Enregistrer</button>
          )}
        </div>
        {/* Box pour les langues */}
      <div className="bg-white rounded shadow-md p-6 mb-8 md:mx-16">
        <h2 className="text-xl font-bold mb-2">Langues</h2>
        {isEditingLanguages && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Ajouter une langue"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="mb-2 focus:outline-none border-b border-gray-400"
            />
            <button onClick={handleAddLanguage} className="bg-primary text-white px-4 py-2 rounded-md mx-2">Ajouter</button>
            <button onClick={handleCancelEditLanguages} className="bg-light text-white px-4 py-2 rounded-md">Annuler</button>
          </div>
        )}
        {languages.map((language, index) => (
          <div key={index} className="mb-2">
            <p className="font-medium">{language}</p>
            {isEditingLanguages && (
              <button onClick={() => handleDeleteLanguage(index)} className="text-red-500 font-semibold">Supprimer</button>
            )}
          </div>
        ))}
        {!isEditingLanguages && (
          <button onClick={() => setIsEditingLanguages(true)} className="bg-light text-white px-4 py-2 rounded-md">Ajouter</button>
        )}
        {isEditingLanguages && (
          <button onClick={handleSaveLanguages} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Enregistrer</button>
        )}
      </div>
      
      </div>
    </div>
  );
};

export default UserProfil;
