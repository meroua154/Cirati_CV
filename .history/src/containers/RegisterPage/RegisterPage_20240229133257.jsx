<<<<<<< HEAD
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

=======
import React, { useState,useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import { useSelector, useDispatch } from 'react-redux';
>>>>>>> origin/main
const RegisterPage = () => {
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
    skills: ''
  });
  const navigate = useNavigate();
<<<<<<< HEAD

=======
  const dispatch = useDispatch(); 
  const errors = useSelector(state => state.errors);
  const auth = useSelector(state => state.auth);
  console.log(auth)
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/"); 
    }
  }, [auth.isAuthenticated, navigate]);
>>>>>>> origin/main
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const userData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : []
      };
      
<<<<<<< HEAD
      const res = await registerUser(userData);
      
      if (res.type === "GET_ERRORS" && res.payload && res.payload.email) {
        setNotification({
          type: "error",
          message: res.payload.email,
        });
      } else {
=======
      const res = await dispatch(registerUser(userData));

       if(res.role){
>>>>>>> origin/main
        setNotification({
          type: "success",
          message: "User registered successfully! You can log in now."
        });
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      }
<<<<<<< HEAD
    } catch (err) {
      console.error("Error during registration:", err);
      setNotification({
        type: "error",
        message: "An error occurred during registration. Please try again later.",
      });
    }
  };
  
=======
 

    } catch (err) {
      console.error("Error during registration:", err);
    }
  };
>>>>>>> origin/main

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-50 rounded-md shadow-md my-24">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inscrivez-vous</h2>
          <p className='text-center mt-4 font-medium'>Déjà inscrit ? <a href="/login" className='text-blue-500'>Identifiez-vous</a></p>
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
        <form onSubmit={(event) => handleSubmit(event)} className="space-y-4">
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
          <div>
            <label htmlFor="localisation" className="block text-sm font-medium text-gray-700">Localisation</label>
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
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Compétences</label>
            <input
              type="text"
              name="skills"
              id="skills"
              autoComplete="skills"
              required
              value={formData.skills}
              onChange={handleInputChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Créer mon compte
            </button>
          </div>
        </form>
      </div>
<<<<<<< HEAD
      {notification && (
        <div className={notification.type === "error" ? "text-red-500" : "text-green-500"}>
          {notification.message}
        </div>
      )}
=======
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
>>>>>>> origin/main
    </div>
  );
};

export default RegisterPage;
