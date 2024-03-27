import React, { useState } from 'react';

export default function ValidationEmail() {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const inputCode = e.target.value;
        if (inputCode.length <= 6 && /^\d*$/.test(inputCode)) {
            setCode(inputCode);
            setErrorMessage('');
        } else {
            setErrorMessage('Le code ne doit pas dépasser 6 chiffres.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (code.length === 6) {
            console.log('Code de validation soumis :', code);
        } else {
            setErrorMessage('Le code doit comporter exactement 6 chiffres.');
        }
    };
  return (
    <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-slate-50 shadow-md rounded px-12 pt-8 pb-8 mb-4">
                <div className='mb-8'>
<<<<<<< HEAD
                   <h1 className='font-bold text-2xl tracking-widest'>Validez votre adresse email</h1> 
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm" htmlFor="code">
                       Saisissez le code de validation
                    </label>
                    <input
=======
                   <h1 className='font-bold text-2xl tracking-widest'>Votre email a été vérifié!</h1> 
                </div>
                
                <div className="mb-4">
                    {/* <label className="block text-gray-700 text-sm" htmlFor="code">
                       Saisissez le code de validation
                    </label> */}
                    {/* <input
>>>>>>> origin/main
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        id="code"
                        type="text"
                        placeholder="Entrez le code ici"
                        value={code}
                        onChange={handleChange}
                        required
<<<<<<< HEAD
                    />
=======
                    /> */}
>>>>>>> origin/main
                    {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                </div>
                <div className="">
                  <a href="/recform">
<<<<<<< HEAD
                    <button
=======
                    {/* <button
>>>>>>> origin/main
                        className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type="submit"
                    >
                        Valider
<<<<<<< HEAD
                    </button>
                  </a>
                    <p className='text-xs mt-2'>Rien recu ? <a href="" className='text-blue-600'>Renvoyer le code de validation</a></p>
=======
                    </button> */}
                  </a>
                    {/* <p className='text-xs mt-2'>Rien recu ? <a href="" className='text-blue-600'>Renvoyer le code de validation</a></p> */}
>>>>>>> origin/main
                </div>
            </form>
        </div>
  )
}
