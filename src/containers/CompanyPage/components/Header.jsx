import React from 'react'

export default function Header() {
  return (
    <nav className="bg-white p-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center ml-96">
        <ul className="flex space-x-4">
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