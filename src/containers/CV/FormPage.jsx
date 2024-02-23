import React, { useState} from 'react';


const FormPage = () => {
    
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    education: '',
    experience: '',
    email: '',
    message: '',
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
      <h2 className="text-xl font-semibold mb-8 tracking-widest">Créez votre <span className='text-blue-600'>CV</span>  en remplissant ce formulaire :</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2 tracking-widest">Nom</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 tracking-widest">Prénom</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2 tracking-widest">Education</label>
          <input type="text" id="education" name="education" value={formData.education} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="experience" className="block text-gray-700 font-semibold mb-2 tracking-widest">Experiences</label>
          <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 tracking-widest">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2" for="user_avatar tracking-widest">Choisir une image</label>
          <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
        </div>
        <div>
        <h3 class="block text-gray-700 font-semibold mb-2 mt-4 tracking-widest">Languages</h3>
        <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
               <div class="flex items-center ps-3">
                   <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                   <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Anglais</label>
               </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                     <input id="react-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                     <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Francais</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                     <input id="angular-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                     <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Arabe</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                     <input id="laravel-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                     <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Espagnole</label>
                </div>
            </li>
        </ul>

        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 mt-4 tracking-widest">Description</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows="4" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
