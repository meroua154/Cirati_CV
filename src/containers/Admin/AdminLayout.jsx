import React from "react";
import Header from "./Components/Header";
import SideNav from "./Components/SideNav";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <SideNav/> 
      <Outlet/>
    </>
  );
}
export default AdminLayout;