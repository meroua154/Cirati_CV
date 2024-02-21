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
            // Ici, vous pouvez ajouter la logique pour valider le code d'email
            console.log('Code de validation soumis :', code);
        } else {
            setErrorMessage('Le code doit comporter exactement 6 chiffres.');
        }
    };
  return (
    <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                        Code de validation d'email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="code"
                        type="text"
                        placeholder="Entrez le code ici"
                        value={code}
                        onChange={handleChange}
                    />
                    {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Valider
                    </button>
                </div>
            </form>
        </div>
  )
}
