import React, { useState} from 'react';
import { TESelect } from "tw-elements-react";

const FormPage = () => {
    const data = [
        { text: "One", value: 1 },
        { text: "Two", value: 2 },
        { text: "Three", value: 3 },
        { text: "Four", value: 4 },
        { text: "Five", value: 5 },
        { text: "Six", value: 6 },
        { text: "Seven", value: 7 },
        { text: "Eight", value: 8 },
      ];
    
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    languages: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
   
  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      languages: selectedLanguages
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md my-24">
      <h2 className="text-2xl font-semibold mb-4">Simple Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Education</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Experiences</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500" />
        </div>
        <div className=" flex mb-4">
           <TESelect data={data} multiple label="Example label"  className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'/>
        </div>



        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows="4" className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
