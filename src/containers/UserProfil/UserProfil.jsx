import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.css'; // Importation des icônes FontAwesome

const UserProfil = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    preferences: {
      secteur: [],
      salaire: null,
      mobilite: "",

      metier: "",
      statut: ""
  },
  role: "",
  verified: false,
  _id: "",
  name: "",
  email: "",
  password: "",
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
          company:""
      }
  ],
  profilpic: "",
  coverpic: "",
  date: ""
  });
    const extractFileName = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };
  useEffect(() => {
    setUserData(user);
   }, [user]);
   useEffect(() => {
    // Récupérer le nom du fichier du CV à partir de l'URL
    const cvFileName = extractFileName(user.cv);
    const OldCv = new File([userData.cv], cvFileName, { type: 'application/pdf' });
    setUserData(prevState => ({
      ...prevState,
      cv: OldCv
    }));
  }, [user.cv]);
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [isEditingRecruitmentPreferences, setIsEditingRecruitmentPreferences] = useState(false);
  const [isEditingExperiences, setIsEditingExperiences] = useState(false);
  const [newExperience, setNewExperience] = useState({ titre: '', company: '', annees: '' });
  const handleEditUserInfo = () => {
    setIsEditingUserInfo(true);
  };
  const [ProfPic,SetProfilPic]=useState()
  const handleSaveUserInfo = () => {
    
    setIsEditingUserInfo(false);
    const userId = userData._id;
    const formData = new FormData();
    formData.append('profilpic', ProfPic)
    formData.append('name', userData.name)
    formData.append('phone_number', userData.phone_number)
    formData.append('email', userData.email)
    
    fetch(`http://localhost:4000/user/update1/${userId}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du CV');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); 
    })
    .catch(error => {
        console.error(error);
    });
  };
  const handleCancelEditUserInfo = () => {
    setIsEditingUserInfo(false);
  };
  const handleEditRecruitmentPreferences = () => {
    setIsEditingRecruitmentPreferences(true);
  };
  const handleSaveRecruitmentPreferences = () => {
    setIsEditingRecruitmentPreferences(false);
    const userId = userData._id;
    const preferencesData = {
        preferences: userData.preferences
    };

    fetch(`http://localhost:4000/user/update2/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Spécifiez que le contenu est JSON
        },
        body: JSON.stringify(preferencesData) // Convertit les données en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour des préférences de recrutement');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); 
    })
    .catch(error => {
        console.error(error);
    });
};
  const handleCancelEditRecruitmentPreferences = () => {
    setIsEditingRecruitmentPreferences(false);
  };
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    SetProfilPic(file)
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prevState => ({
        ...prevState,
        profilpic: reader.result 
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddExperience = () => {

    const id = userData._id

    // Créer un objet représentant la nouvelle expérience
    const newExperienceData = {
        titre: newExperience.titre,
        company: newExperience.company,
        annees: newExperience.annees
    };

    fetch(`http://localhost:4000/user/add-experience/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Spécifier que le contenu est JSON
        },
        body: JSON.stringify(newExperienceData) // Convertir les données en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'expérience');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Afficher un message de succès si nécessaire
    })
    .catch(error => {
        console.error(error);
    });

    // Réinitialiser le formulaire après l'ajout de l'expérience
    setNewExperience({ titre: '', company: '', annees: '' });
};
const handleDeleteExperience = (id) => {
  const userId=userData._id
  fetch(`http://localhost:4000/user/delete-experience/${userId}/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de l\'expérience');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.message); 
    setUserData(prevState => ({
      ...prevState,
      experiences: prevState.experiences.filter(exp => exp._id !== id)
    }));
  })
  .catch(error => {
    console.error(error);
  });
};
  const handleEditExperiences = () => {
    setIsEditingExperiences(true);
  };
  const handleSaveExperiences = () => {
    setIsEditingExperiences(false);
  };
  const handleCancelEditExperiences = () => {
    setIsEditingExperiences(false);
    setNewExperience({ titre: '', company: '', annees: '' });
  }
  const [isEditingCV, setIsEditingCV] = useState(false);

  const handleCVChange = (e) => {
    const file = e.target.files[0];
   setUserData(prevState => ({
    ...prevState,
    cv: file 
  }));
  };

  // Fonction pour enregistrer le CV
  const handleSaveCV = () => {
    setIsEditingCV(false);
    const formData = new FormData();
    formData.append('cv', userData.cv);
    const userId = userData._id;
    fetch(`http://localhost:4000/user/update-cv/${userId}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du CV');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); 
    })
    .catch(error => {
        console.error(error);
    });
  };
  const handleCancelEditCV = () => {
    setIsEditingCV(false);

    const cvFileName = extractFileName(user.cv);
    
    const originalCv = new File([user.cv], cvFileName, { type: 'application/pdf' });
    setUserData(prevState => ({
      ...prevState,
      cv: originalCv
    }));
  };
  

    // Déclarez un état local pour gérer les langues et leur édition
    const [languages, setLanguages] = useState([
      { name: 'Kabyle', value: false },
      { name: 'Arabe', value: false },
      { name: 'Français', value: false },
      { name: 'Anglais', value: false },
      { name: 'Espagnol', value: false },
      { name: 'Turc', value: false }
    ]);
    const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  
    // Fonction pour ajouter une langue
    const handleLanguageChange = (lang) => {
      setIsEditingLanguages(true)
      setUserData(prevState => ({
        ...prevState,
        langues: {
          ...prevState.langues,
          [lang]: !prevState.langues[lang]
        }
      }));
    };
  
    // Fonction pour enregistrer les langues
    const handleSaveLanguages = () => {
      setIsEditingLanguages(false);
      const userId=userData._id
      console.log("Langues modifiées :", userData.langues);
      const languesData = {
        langues: userData.langues
    }; 

    fetch(`http://localhost:4000/user/update-languages/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(languesData) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour des langues');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); 
    })
    .catch(error => {
        console.error(error);
    });
    };
  
 // Fonction pour annuler l'édition des langues
 const handleCancelEditLanguages = () => {
  setIsEditingLanguages(false);
  setUserData(prevState => ({
    ...prevState,
    langues: user.langues
  }));
};

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 md:h-screen  mt-24">
        <ul className="mt-8">
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-user mr-2"></i> Mon Profil</li>
          {/* <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-sign-out-alt mr-2"></i> Se Déconnecter</li> */}
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
            {userData.cv ? (
              <div>
                <p className='mb-2'>CV téléchargé : {userData.cv.name}</p>
                <a  href={user.cv} target="_blank" rel="noopener noreferrer" className='font-semibold text-primary'>Voir le CV</a>
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
                  <img src={userData.profilpic} alt="Profile" className="w-20 h-20 rounded-full mr-4 cursor-pointer" />
                </label>
              </>
            ) : (
              <img src={userData.profilpic} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
            )}
            <div>
              {isEditingUserInfo ? (
                <>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="text-lg font-lg mb-2 focus:outline-none border-b border-gray-400"
                  />
                  {/* <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="text-lg font-lg mb-2 focus:outline-none border-b border-gray-400"
                  /> */}
                </>
              ) : (
                <>
                  <p className="text-lg font-lg">{userData.name}</p>
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <p>{userData.localisation}</p>
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
                  value={userData.phone_number}
                  onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
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
                <p><i className="fas fa-phone mr-4"></i>{userData.phone_number}</p>
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
                value={userData.preferences.secteur}
                onChange={(e) => setUserData({ ...userData, preferences: { ...userData.preferences, secteur: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.preferences.salaire}
                onChange={(e) => setUserData({ ...userData, preferences: { ...userData.preferences, salaire: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.preferences.mobilite}
                onChange={(e) => setUserData({ ...userData, preferences: { ...userData.preferences, mobilite: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.preferences.metier}
                onChange={(e) => setUserData({ ...userData, preferences: { ...userData.preferences, metier: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <input
                type="text"
                value={userData.preferences.statut}
                onChange={(e) => setUserData({ ...userData, preferences: { ...userData.preferences, statut: e.target.value } })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
            </div>
          ) : (
            <div className="mb-8">
              <p><span className="font-semibold text-sm">Secteur d'activité souhaité:<br/></span> {userData.preferences.secteur}</p>
              <p><span className="font-semibold text-sm">Salaire souhaité:<br/></span> {userData.preferences.salaire}</p>
              <p><span className="font-semibold text-sm">Mobilité:<br/></span> {userData.preferences.mobilite}</p>
              <p><span className="font-semibold text-sm">Métier:<br/></span> {userData.preferences.metier}</p>
              <p><span className="font-semibold text-sm">Statut:<br/></span> {userData.preferences.statut}</p>
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
                value={newExperience.titre}
                onChange={(e) => setNewExperience({ ...newExperience, titre: e.target.value })}
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
                value={newExperience.annees}
                onChange={(e) => setNewExperience({ ...newExperience, annees: e.target.value })}
                className="mb-2 focus:outline-none border-b border-gray-400"
              />
              <button onClick={handleAddExperience} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Ajouter</button>
              <button onClick={handleCancelEditExperiences} className="bg-gray-500 text-white px-4 py-2 rounded-md">Annuler</button>
            </div>
          )}
          {userData.experiences.map(experience => (
            <div key={experience._id} className="mb-2">
              <p className="font-semibold text-base">{experience.titre} - 
              {experience.company}
              </p>
              <p className="text-sm text-gray-600">{experience.annees}</p>
              {isEditingExperiences && (
                <button onClick={() => handleDeleteExperience(experience._id)} className="text-red-500 font-semibold">Supprimer</button>
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
          <div className="mb-4">
            {Object.keys(userData.langues).map((lang, index) => (
              <div key={index} className="mb-2">
                <input
                  type="checkbox"
                  id={lang}
                  checked={userData.langues[lang]}
                  onChange={() => handleLanguageChange(lang)}
                  className="mr-2"
                />
                <label htmlFor={lang} className="font-medium">{lang}</label>
              </div>
            ))}
          </div>
        {isEditingLanguages && (
          <button onClick={handleSaveLanguages} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Enregistrer</button>
        )}
      </div>
      
      </div>
    </div>
  );
};

export default UserProfil;
