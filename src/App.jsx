import './index.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import Landing from "../src/containers/Landing/Landing";
import CompanyPage from "../src/containers/CompanyPage/CompanyPage";
import OffresEmploi from './containers/CompanyPage/OffresEmploi';
import FormPage from './containers/CV/FormPage';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Password from './containers/LoginPage/Password';


export default function App() {
  return (
    
      <Router>
        <Layout>
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Landing />} />
              <Route path="/company" exact element={<CompanyPage />} />
              <Route path="/emploi" exact element={<OffresEmploi />} />
              <Route path="/form" exact element={<FormPage />} />
              <Route path="/login" exact element={<LoginPage />} />
              <Route path="/register" exact element={<RegisterPage />} />
              <Route path="/password" exact element={<Password />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    
  );
}
