import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import store from "../store";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from "../assets/Images/logo.png";
import { logoutUser } from "../actions/authActions";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Navbarred() {
  useEffect(() => {
    AOS.init();
  }, [])

  const [dropdown, setDropdown] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    store.dispatch(logoutUser());
  };

  return (
    <nav className="container backdrop-blur-xl bg-white/30  h-20  w-full justify-center items-center relative z-20 mt-0">
      <div  data-aos="zoom-in-down" data-aos-duration="1500" className="mx-auto lg:px-6 mt-4" >
        <div className="lg:w-full w-11/12 mx-auto  flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <a href="/">
                <img src={logo} alt="logo" width={90} height={90} />
              </a>
            </div>
          </div>
          <ul className="flex-auto flex justify-center items-center ml-2 xl:gap-12 gap-x-12 max-lg:hidden">
            <a
              href="/rec"
              className="leading-normal tracking-wider no-underline text-black font-medium text-xs hover:text-primary"
            >
              Espace recruteur
            </a>
            <a
              href="/fulljob"
              className="leading-normal tracking-wider no-underline text-black font-medium text-xs hover:text-primary"
            >
              Offres d'emploi
            </a>
                     <a
                     href="/eventpage"
                     className="leading-normal tracking-wider no-underline text-black font-medium text-xs hover:text-primary"
                   >
                     Annonce Event
                   </a>
          
              <a
                  href="/sponsorpage"
                  className="leading-normal tracking-wider no-underline text-black font-medium text-xs hover:text-primary"
                >
                  Recherche Sponsor
                </a>
  
            <a
              href="/formred"
              className="leading-normal tracking-wider no-underline text-black font-medium text-xs hover:text-primary"
            >
              Construire votre CV 
            </a>
          </ul>
          <div className="flex max-lg:hidden  gap-x-4">
            {isAuthenticated ? (
              <button onClick={(event) => handleLogout(event)} className="rounded-2xl bg-primary text-lg text-white border-none font-bold px-8 py-3 hoverBtn">
                Déconnexion
              </button>
            ) : (
              <>
                <Link to="/register">
                    <button className="rounded-2xl bg-primary text-sm text-white border-none font-medium px-6 py-2 hoverBtn">
                       S'inscrire
                    </button>
                </Link>
                <Link to="/login">
                    <button className="rounded-lg bg-none text-sm text-primary border-none font-medium px-8 py-3 hoverBtn">
                       Se connecter
                    </button>
                </Link>
              </>
            )}
          </div>
          {dropdown ? (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <MdClose />
            </div>
          ) : (
            <div
              onClick={showDropdown}
              className="lg:hidden text-[22px] cursor-pointer text-black"
            >
              <HiMenuAlt3 />
            </div>
          )}
        </div>
        {dropdown ? (
          <div
            onClick={showDropdown}
            className="lg:hidden w-full h-fit relative  bg-white ease-in-out duration-100"
          >
            <div className="w-full h-[380px] flex flex-col items-baseline pt-8 gap-4">
              <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8">
                <a
                  href="/rec"
                  className="leading-normal no-underline text-black font-medium text-base hover:text-primary"
                >
                  Espace recruteur
                </a>
                <a
                  href="/fulljob"
                  className="leading-normal no-underline text-black font-medium text-base hover:text-primary"
                >
                  Offres d'emploi
                </a>
                <a
                  href="/sponsorpage"
                  className="leading-normal no-underline text-black font-medium text-base hover:text-primary"
                >
                  Recherche Sponsor
                </a>
                <a
                  href="/formred"
                  className="leading-normal no-underline text-black font-medium text-base hover:text-primary"
                >
                  Construire votre CV
                </a>
              </ul>
              <div className="flex flex-col justify-center items-center w-full gap-y-8 mt-4">
                {isAuthenticated ? (
                  <button onClick={(event) => handleLogout(event)} className="rounded-2xl bg-primary text-lg text-white border-none font-bold px-8 py-3 hoverBtn">
                    Déconnexion
                  </button>
                ) : (
                  <>
                  <Link to="/register">
                    <button className="rounded-2xl bg-primary text-base text-white border-none font-medium px-8 py-3 hoverBtn">
                    S'inscrire
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="rounded-full bg-none text-base text-primary border-none font-medium px-8 py-2 hoverBtn">
                      Se connecter
                    </button>
                  </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
