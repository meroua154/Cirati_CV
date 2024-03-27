<<<<<<< HEAD
import React from 'react';
import { GoogleLogin } from 'react-google-login';


const LoginPage = () => {
  const responseGoogle = (response) => {
    console.log(response);
    // Ici, vous pouvez gérer la réponse de Google, comme l'authentification du côté serveur, etc.
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gérer la soumission du formulaire ici
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('Email:', email);
    console.log('Password:', password);
=======
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { loginUser } from "../../actions/authActions";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch(); 
  const errors = useSelector(state => state.errors);
  const auth = useSelector(state => state.auth);
  console.log(auth)
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/"); 
    }
  }, [auth.isAuthenticated, navigate]);
  const [notification, setNotification] = useState(null);
  const responseGoogle = (response) => {
    console.log(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await dispatch(loginUser({ email, password }));
      if(res.status=="200"){
        setNotification({
          type: "success",
          message: "User Logged In."
        });
  
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
>>>>>>> origin/main
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-50 rounded-md shadow-md my-24">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connectez-vous</h2>
          <p className='text-center mt-4 font-medium'>Vous n'avez pas de compte ? <a href="/register" className='text-blue-500'>Inscrivez-vous</a></p>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
<<<<<<< HEAD
            <input type="email" name="email" id="email" autoComplete="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" name="password" id="password" autoComplete="current-password" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
=======
            <input 
              type="email" 
              name="email" 
              id="email" 
              autoComplete="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
            />
>>>>>>> origin/main
            <a href="/password" className='text-blue-500 mt-2'>Mot de passe oublié</a>
          </div>
          <div>
            <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Se connecter
            </button>
          </div>
        </form>
<<<<<<< HEAD
      </div>
=======

      </div>
      {errors && (
        <div className="text-red-500">
          {errors.email && <p>{errors.email}</p>}
          {errors.password && <p>{errors.password}</p>}
          {errors.emailnotfound && <p>{errors.emailnotfound}</p>}
          {errors.message && <p>{errors.message}</p>}
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

export default LoginPage;
