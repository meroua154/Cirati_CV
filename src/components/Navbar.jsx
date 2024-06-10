import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "../store";

import { navLinks } from "../Constants";
// import { MdLightMode } from "react-icons/md";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { logoutUser } from "../actions/authActions";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log("ici",isAuthenticated)
  const user = useSelector(state => state.auth.user);
  const defaultUserImage = "https://via.placeholder.com/150";

  const toggleTheme = () => {

    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    store.dispatch(logoutUser());
};
  return (
    <header className={`mb-16 ${isDarkMode ? 'dark:bg-gray-900' : 'bg-white'}`}>
      <nav className="shadow-md w-full fixed top-0 left-0">
        <div className="md:px-10 py-4 px-7 md:flex items-center bg-white dark:bg-gray-900">
          <div className="flex text-xl cursor-pointer items-center">
            <a href="/">
              <h1 className="font-medium dark:text-white mr-42">
                <strong className="text-[#196a5c] font-extrabold mr-0.5">
                  Cirati
                </strong>
                CV
              </h1>
            </a>
          </div>
          
          <div onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
            {isOpen ? <XMarkIcon className="dark:invert" /> : <Bars3BottomRightIcon className="dark:invert" />}
          </div>
         
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white dark:bg-gray-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-4 ml-32 ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
            {navLinks.map((li) => (
              <li
                className="text-sm  my-7 md:my-0 md:ml-8"
                key={li.label}
              >
                <a className="text-[#6f6f6f] dark:text-white whitespace-nowrap hover:text-[#2a68ff] duration-500" href={li.href}>{li.label}</a>
              </li>
            ))}
          </ul>
          {isAuthenticated && user ? (
            <div className="flex items-center md:ml-auto">
              <img src={defaultUserImage} alt="User" className="w-10 h-10 rounded-full" />
              <a className="text-[#6f6f6f] dark:text-white whitespace-nowrap hover:text-[#2a68ff] duration-500" href="#">{user.name}</a>
              <button onClick={(event) => handleLogout(event)} className="btn bg-blue-600 text-white text-sm whitespace-nowrap py-2 px-4 ml-4 rounded-2xl">Déconnexion</button>

            </div>
          ) : (
            <>
              <a href="/login">
                <button className="btn bg-blue-600 text-white text-sm whitespace-nowrap py-2 px-4 md:ml-24 rounded-2xl md:static">Se connecter</button>
              </a>
              <a href="/rec">
                <button className="text-blue-600 hover:text-[#6f6f6f] ml-4 text-sm whitespace-nowrap md:static">espace recruteur</button>
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
