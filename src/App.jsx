// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importer les composants des différentes pages
import Landing from "../src/containers/Landing/Landing";
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Password from './containers/LoginPage/Password';
import CompanyPage from "../src/containers/CompanyPage/CompanyPage";
import OffresEmploi from './containers/CompanyPage/OffresEmploi';
import MultiStepjobForm from './containers/Annonceform/form';
import FormPagered from './containers/CV-red/src/Cv';
import EssGratuitement from './containers/RecruiterPage/EssGratuitement';
import ValidationEmail from './containers/RecruiterPage/ValidationEmail';
import Fulljob from './containers/Fulljob/fulljob';
import Fullcv from "./containers/Full-stage/Fullcv";
import PassRecLog from './containers/RecruiterPage/PassRecLog';
import RecForm from './containers/RecruiterPage/RecForm';
import Fullcompanyinfo from "./containers/Annonceform/fullcompany";
import RecruiterPage from "./containers/RecruiterPage/RecruiterPage";
import Offrejob from "./containers/CompanyPage/offre"
import Offrepagesingle from "./containers/CompanyPage/offrepagesingle";
import UserProfil from "./containers/UserProfil/UserProfil";
import FrontendLayout from "./hocs/FrontendLayout";
// Importer le store Redux
import { Provider } from "react-redux";
import store from "./store";
import { setAuthToken } from "./utils/setAuthToken";
// Importer les composants de route personnalisés
import RecRoute from "./components/private-route/RecRoute";
import ApplicantRoute from "./components/private-route/applicantroute";
// Importer les fonctions utilitaires
import { jwtDecode } from 'jwt-decode' ;

import { setCurrentUser, logoutUser } from "./actions/authActions";

// Fonction principale de l'application
function App() {
  // Vérifier si un token JWT est stocké dans le localStorage
  if (localStorage.jwtToken) {

    const token = localStorage.jwtToken;
    const decoded = jwtDecode(token);
    store.dispatch(setCurrentUser(decoded));
    setAuthToken(token);
    const currentTime = Date.now() / 1000; 
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    }
  }

  return (
    <Provider store={store}>
      <Router>
        <FrontendLayout>
        <div className="container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password" element={<Password />} />
            <Route path="/company/:id" element={<ApplicantRoute element={<CompanyPage/>} />} />
       
            <Route path="/annonce" element={<RecRoute element={<MultiStepjobForm />} />} />
            <Route path="/formred" element={<ApplicantRoute element={<FormPagered />} />} />
            <Route path="/fullcv" element={<RecRoute element={<Fullcv />} />} />
            <Route path="/rec"  element={<RecruiterPage />}/>
            {/* <Route path="/ess" element={<RecRoute element={<EssGratuitement />} />} /> */}
            <Route path="/passrec/:resetToken"  element={<PassRecLog />} />
            
            {/* <Route path="/recform" element={<RecRoute element={<RecForm />} />} /> */}
            <Route path="/Fulljob" element={<Fulljob />} />
            <Route path="/offre/:recId/:id"
             element={<ApplicantRoute element={<Offrejob />} />}  />
                  {/* <Route path="/emploi/:id" element={<ApplicantRoute element={<OffresEmploi />} />} /> */}
                  <Route path="/singleoffre/:id" element={<ApplicantRoute element={<Offrepagesingle />} />} />
            {/* <Route path="/singleoffre" element={<Offrepagesingle />} /> */}
            <Route path="/user" 
            element={<ApplicantRoute element={<UserProfil />} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        </FrontendLayout>
      </Router>
    </Provider>
  );
}

export default App;
