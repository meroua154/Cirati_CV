import React from 'react'

export default function EssGratuitement() {
    
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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Créez votre compte recruteur</h2>
        <p className='text-center mt-4 font-medium'>Déjà inscrit ? <a href="/reclog" className='text-blue-500'>Identifiez-vous</a></p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" autoComplete="email" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">Nom de votre entreprise</label>
          <input type="text" name="text" id="text" autoComplete="text" required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          
        </div>
        <div>
          <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Continuer
          </button>
          <h6 className='text-sm text-left font-semibold mt-4'>Vous cherchez un emploi ? <a href="/" className='text-blue-600'>Cliquez ici</a></h6>
        </div>
      </form>
    </div>
  </div>
  )
}
