import React from 'react'

export default function RecLogin() {
   
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Gérer la soumission du formulaire ici
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log('Email:', email);
        console.log('Password:', password);
      };
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md my-24">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connectez-vous</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" autoComplete="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" name="password" id="password" autoComplete="current-password" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          
        </div>
        <div>
          <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Se connecter
          </button>
          <p className='text-center mt-6'><a href="/password" className='text-blue-500 text-xs'>Mot de passe oublié</a></p>
          <p className='text-center mt-2'><a href="/rec"className='text-blue-500 text-xs'>Demandez votre demo</a></p>
        </div>
      </form>
    </div>
  </div>
  )
}
