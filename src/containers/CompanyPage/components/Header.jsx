import React from 'react';

export default function Header({ idcomp}) {
  return (
    <nav className="bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <ul className="flex space-x-4 ml-56 md:ml-64 text-sm"> 
            <li>
              <a href={`/company/${idcomp}`} className="hover">Entreprise</a>
            </li>
            <li>
              <a href={`/offres/${idcomp}`} className="hover">Offres d'emploi</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
