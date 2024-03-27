import React, { useState} from 'react';

export default function RecForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phonenumber: '',
        password: ''
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
       
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
  return (
    <div className="max-w-lg mx-auto p-6 bg-slate-50 rounded-md shadow-md my-24">
      <h2 className="text-xl font-semibold mb-2 tracking-widest">Créez votre <span className='text-blue-600'>compte</span> recruteur :</h2>
      <p className='text-xs mb-8 tracking-wider'>Poursuivez la création de votre compte recruteur en renseignant les informations suivantes.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2 tracking-widest">Nom</label>
          <input 
               type="text" 
               id="firstName" 
               name="firstName" 
               value={formData.firstName} 
               onChange={handleInputChange} 
               className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" 
               required
           />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 tracking-widest">Prénom</label>
          <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" 
                required
            />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 tracking-widest">Numero de telephone</label>
          <input 
                type="text" 
                id="education" 
                name="education" 
                value={formData.education} 
                onChange={handleInputChange} 
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                required
            />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 tracking-widest">Mot de passe</label>
          <input 
                type="password" 
                id="passwoed" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                required
            />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 tracking-widest">Confirmer votre mot de passe</label>
          <input 
                type="password" 
                id="passwoed" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                required
             />
        </div>
        <div class="flex items-center ps-3 mb-12">
                     <input id="checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                     <label for="checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
        <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Creer mon compte</button>
      </form>
    </div>
  )
}
