import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

import Navbarred from "../components/Navbarred";


const FrontendLayout  = ({children}) => {
  return (
    <>
      <Navbarred />
       {children}
      <Footer />
     
    </>
  );
}
export default FrontendLayout;

     