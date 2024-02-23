import React from 'react';

export default function Header() {
  return (
    <nav className="bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <ul className="flex space-x-4 ml-4 md:ml-80 "> {/* Déplacement de la classe de marge */}
            <li>
              <a href="/company" className="hover">Entreprise</a>
            </li>
            <li>
              <a href="/emploi" className="hover">Offres d'emploi</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
