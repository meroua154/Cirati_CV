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
import RecuiterPage from './containers/RecruiterPage/RecuiterPage';
import RecLogin from './containers/RecruiterPage/RecLogin';
import EssGratuitement from './containers/RecruiterPage/EssGratuitement';
import ValidationEmail from './containers/RecruiterPage/ValidationEmail';
import PassRecLog from './containers/RecruiterPage/PassRecLog';
import RecForm from './containers/RecruiterPage/RecForm';


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
              <Route path="/rec" exact element={<RecuiterPage />} />
              <Route path="/reclog" exact element={<RecLogin />} />
              <Route path="/passrec" exact element={<PassRecLog />} />
              <Route path="/ess" exact element={<EssGratuitement />} />
              <Route path="/validation" exact element={<ValidationEmail />} />
              <Route path="/recform" exact element={<RecForm />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    
  );
}
