import React from "react";
import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}
export default Layout;

    