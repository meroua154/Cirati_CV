import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PassRecLog = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const resetPasswordinputs = async (newPassword) => {
    try {
      const response = await axios.post(`http://localhost:4000/user/Resetpassword2/${resetToken}`, { newPassword });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6 || password.length > 128) {
      alert("Le mot de passe doit contenir entre 6 et 128 caractères.");
      return;
    }

    try {
      const response = await resetPasswordinputs(password);
      console.log(response);
      alert(response.message) 
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      alert(error)
      console.error("Une erreur s'est produite lors de la réinitialisation du mot de passe :", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-50 rounded-md shadow-md my-24">
      <div className="max-w-md w-full space-y-8">
        <div>
<<<<<<< HEAD
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Mot de passe oublié</h2>
=======
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Réinitialisez le mot de passe (le lien est valide pour 10min)</h2>
>>>>>>> origin/main
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
<<<<<<< HEAD
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" autoComplete="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Envoyer moi un email
            </button>
          </div>
          <div  className='text-blue-500 text-center text-xs mt-16'><a href="/reclog">Retour a la page de connexion</a></div>
          
=======
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
            <input type="password" name="password" id="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe </label>
            <input type="password" name="confirmPassword" id="confirmPassword" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Réinitialiser le mot de passe
            </button>
          </div>
          <div className='text-blue-500 text-center text-xs mt-16'><a href="/reclog">Retour à la page de connexion</a></div>
>>>>>>> origin/main
        </form>
      </div>
    </div>
  );
};

export default PassRecLog;
