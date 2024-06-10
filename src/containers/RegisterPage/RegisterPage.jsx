import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { useSelector, useDispatch } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RegisterPage = () => {
  useEffect(() => {
    AOS.init();
  }, []); 
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    role: '',
    localisation: '',
    phone_number: '',
    bio: '',
    website: '',
    LinkedIn: '',
    Facebook: '',
    preferences: {
      secteur: [],
      salaire: '',
      mobilite: '',
      metier: '',
      statut: ''
    },
    cv: null,
    experiences: [{ titre: '', annees: '' }],
    langues: {
      Kabyle: Boolean,
      Arabe: Boolean,
      Français: Boolean,
      Anglais: Boolean,
      Espagnol: Boolean,
      Turc: Boolean
  },
    profilpic: null,
    coverpic: null
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index][name] = value;
    setFormData({
      ...formData,
      experiences: updatedExperiences
    });
  };

  const addExperienceField = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { titre: '', annees: '' }]
    });
  };

  const responseGoogle = (response) => {
    console.log(response);
  };
  const handleLangueChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      langues: {
        ...formData.langues,
        [name]: checked
      }
    });
  };
  const handlePreferenceChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [name]: value
      }
    });
  };
  
  
  const secteurValue = Array.isArray(formData.preferences.secteur)
    ? formData.preferences.secteur.join(',')
    : formData.preferences.secteur;  
  
const handleSubmit = async (event) => {
  event.preventDefault();
  
  try {
    const userData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'cv' || key === 'profilpic' || key === 'coverpic') {
        userData.append(key, value);
      } else if (key === 'preferences') {
        userData.append(key, JSON.stringify(value));
      } else if (key === 'experiences') {
        // Convertit chaque expérience en une chaîne JSON
        value.forEach((exp, index) => {
          userData.append(`experiences[${index}][titre]`, exp.titre);
          userData.append(`experiences[${index}][annees]`, exp.annees);
        });
      } else {
        userData.append(key, value);
      }
    });

    const res = await dispatch(registerUser(userData));

    if (res.role) {
      setNotification({
        type: "success",
        message: "User registered successfully! You can log in now."
      });
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    }
  } catch (err) {
    console.error("Error during registration:", err);
  }
};

  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="max-w-lg mx-auto p-6 bg-slate-50 rounded-md shadow-md my-24">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscrivez-vous</h2>
          <p className='text-center mt-4 font-medium'>Déjà inscrit ? <a href="/login" className='text-primary'>Identifiez-vous</a></p>
        </div>
        <GoogleLogin
          clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
          buttonText="Se connecter avec Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          className="w-full flex justify-center mb-4 rounded-md"
        />
        <p className='text-center font-medium'>Ou</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              name="password2"
              id="password2"
              autoComplete="current-password"
              required
              value={formData.password2}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="localisation" className="
block text-sm font-medium text-gray-700">Localisation</label>
<input
  type="text"
  name="localisation"
  id="localisation"
  autoComplete="localisation"
  required
  value={formData.localisation}
  onChange={handleInputChange}
  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
/>
</div>
<div>
<label htmlFor="role" className="block text-sm font-medium text-gray-700">Rôle</label>
<select
  name="role"
  id="role"
  required
  value={formData.role}
  onChange={handleInputChange}
  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
>
  <option value="">Sélectionnez le rôle</option>
  <option value="applicant">Demandeur d'emploi</option>
  <option value="recruiter">Recruteur</option>
</select>
</div>
{/* Champs spécifiques au rôle */}
{(formData.role === 'applicant' || formData.role === 'recruiter') && (
<>
  <div>
    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
    <input
      type="text"
      name="phone_number"
      id="phone_number"
      autoComplete="phone_number"
      required
      value={formData.phone_number}
      onChange={handleInputChange}
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
  <div>
    <label htmlFor="profilpic" className="block text-sm font-medium text-gray-700">Photo de profil</label>
    <input
      type="file"
      name="profilpic"
      id="profilpic"
      accept="image/*"
      required={formData.role === 'applicant'}
      onChange={handleFileChange}
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
  {formData.role === 'applicant' && (
    <>
      <div>
        <label htmlFor="cv" className="block text-sm font-medium text-gray-700">CV (PDF)</label>
        <input
          type="file"
          name="cv"
          id="cv"
          accept="application/pdf"
          required
          onChange={handleFileChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="experiences" className="block text-sm font-medium text-gray-700">Expérience</label>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="flex space-x-4">
            <input
              type="text"
              name="titre"
              placeholder="Titre"
              value={exp.titre}
              onChange={(e) => handleExperienceChange(index, e)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="annees"
              placeholder="Années"
              value={exp.annees}
              onChange={(e) => handleExperienceChange(index, e)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        ))}
        <button type="button" onClick={addExperienceField} className="text-sm text-gray-500 mt-2">Ajouter une expérience</button>
      </div>
      <div className="mt-4">
      <div>
      <label className="block text-sm font-medium text-gray-700">Préférences</label>
      <div className="mt-1">
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Secteur</label>
          <input
            type="text"
            name="secteur"
            value={secteurValue}
            onChange={handlePreferenceChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Salaire</label>
          <input
            type="number"
            name="salaire"
            value={formData.preferences.salaire}
            onChange={handlePreferenceChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Mobilité</label>
          <select
            name="mobilite"
            value={formData.preferences.mobilite}
            onChange={handlePreferenceChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Sélectionnez la mobilité</option>
            <option value="Willing to relocate">Disponible pour déménager</option>
            <option value="local">Local</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Métier</label>
          <input
            type="text"
            name="metier"
            value={formData.preferences.metier}
            onChange={handlePreferenceChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            name="statut"
            value={formData.preferences.statut}
            onChange={handlePreferenceChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Sélectionnez le statut</option>
            <option value="all">Tous</option>
            <option value="Stager">Stage</option>
            <option value="Remote">Remote</option>
            <option value="Contract">Contrat</option>
            <option value="Fulltime">Temps plein</option>
            <option value="Parttime">Temps partiel</option>
          </select>
        </div>
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Langues</label>
      <div className="mt-1 grid grid-cols-1 gap-y-4">
        {Object.entries(formData.langues).map(([langue, isChecked]) => (
          <div key={langue} className="flex items-center">
            <input
              id={langue}
              name={langue}
              type="checkbox"
              checked={isChecked}
              onChange={handleLangueChange}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor={langue} className="ml-2 block text-sm text-gray-900">{langue}</label>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )}
  {formData.role === 'recruiter' && (
    <>
      <div>
        <label htmlFor="coverpic" className="block text-sm font-medium text-gray-700">Photo de couverture (Taille recommandée: 1600x400 pixels)</label>
        <input
          type="file"
          name="coverpic"
          id="coverpic"
          accept="image/*"
          required={formData.role === 'recruiter'}
          onChange={handleFileChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Site Web</label>
        <input
          type="text"
          name="website"
          id="website"
          autoComplete="website"
          required
          value={formData.website}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="LinkedIn" className="block text-sm font-medium text-gray-700">LinkedIn</label>
        <input
          type="text"
          name="LinkedIn"
          id="LinkedIn"
          autoComplete="LinkedIn"
          required
          value={formData.LinkedIn}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="Facebook" className="block text-sm font-medium text-gray-700">Facebook</label>
        <input
          type="text"
          name="Facebook"
          id="Facebook"
          autoComplete="Facebook"
          required
          value={formData.Facebook}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          id="bio"
          autoComplete="bio"
          required
          value={formData.bio}
          onChange={handleInputChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>
    </>
  )}
</>
)}
<div>
<button
  type="submit"
  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
>
  Créer mon compte
</button>
</div>
</form>
{errors && (
<div className="text-red-500">
{errors.email && <p>{errors.email}</p>}
{errors.password && <p>{errors.password}</p>}
</div>
)}
{notification && (
<div className={`text-center text-${notification.type === 'success' ? 'green' : 'red'}-500`}>
{notification.message}
</div>
)}
</div>
</div>
);
};

export default RegisterPage;
