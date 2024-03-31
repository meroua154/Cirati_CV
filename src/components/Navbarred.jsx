import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import logo from "../assets/Images/logo.png"


export default function Navbarred() {
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <nav className="backdrop-blur-xl bg-white/30 container   w-full h-24 justify-center items-center fixed z-20">
      <div className="mx-auto lg:px-6">
        <div className="lg:w-full w-11/12 mx-auto h-full flex justify-between items-center">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <a href="/">
              <img src={logo} 
                   alt="logo"
                   width={90}
                   height={90} 
              />
              </a>
            </div>
          </div>
          <ul className="flex-1 flex justify-center items-center xl:gap-12 gap-x-4 max-lg:hidden">
            <a
              href="#"
              className="leading-normal tracking-wider no-underline text-primary font-semibold text-lg hover:text-primary"
            >
              Find jobs
            </a>
            <a
              href="#"
              className="leading-normal tracking-wider no-underline text-black font-semibold text-lg hover:text-primary"
            >
              People
            </a>
            <a
              href="#"
              className="leading-normal tracking-wider no-underline text-black font-semibold text-lg hover:text-primary"
            >
              Hiring site
            </a>
            <a
              href="#"
              className="leading-normal tracking-wider no-underline text-black font-semibold text-lg hover:text-primary"
            >
              Resume
            </a>
          </ul>
          <div className="flex max-lg:hidden gap-x-4">
            <button className="rounded-2xl bg-primary text-lg text-white border-none font-medium px-6 py-2 hoverBtn">
              Sign Up
            </button>
            <button className="rounded-lg bg-none text-lg text-primary border-none font-medium px-8 py-3 hoverBtn">
              Sign In
            </button>
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
            className="lg:hidden w-full h-[100vh] fixed top-24 bg-white ease-in-out duration-100"
          >
            <div className="w-full h-[320px] flex flex-col items-baseline pt-8 gap-4">
              <ul className="text-center p-0 flex flex-col justify-center w-full gap-y-8">
                <a
                  href="#"
                  className="leading-normal no-underline text-black font-semibold text-lg hover:text-primary"
                >
                  Find jobs
                </a>
                <a
                  href="#"
                  className="leading-normal no-underline text-black font-semibold text-lg hover:text-primary"
                >
                  People
                </a>
                <a
                  href="#"
                  className="leading-normal no-underline text-black font-semibold text-lg hover:text-primary"
                >
                  Hiring site
                </a>
                <a
                  href="#"
                  className="leading-normal no-underline text-black font-semibold text-lg hover:text-primary"
                >
                  Resume
                </a>
              </ul>
              <div className="flex flex-col justify-center items-center w-full gap-y-8 mt-4">
                <button className="rounded-2xl bg-primary text-lg text-white border-none font-bold px-8 py-3 hoverBtn">
                  Sign Up
                </button>
                <button className="rounded-full bg-none text-lg text-primary border-none font-bold px-8 py-3 hoverBtn">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
