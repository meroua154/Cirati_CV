// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "../src/containers/Landing/Landing";
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Password from './containers/LoginPage/Password';
import CompanyPage from "../src/containers/CompanyPage/CompanyPage";
import MultiStepjobForm from './containers/Annonceform/form';
import FormPagered from './containers/CV-red/src/Cv';
import Fulljob from './containers/Fulljob/fulljob';
import Fullcv from "./containers/Full-stage/Fullcv";
import PassRecLog from './containers/RecruiterPage/PassRecLog';
import Fullcompanyinfo from "./containers/Annonceform/fullcompany";
import RecruiterPage from "./containers/RecruiterPage/RecruiterPage";
import Offrepagesingle from "./containers/CompanyPage/offre"
import Offrejob from "./containers/CompanyPage/offrepage";
import UserProfil from "./containers/UserProfil/UserProfil";
import FrontendLayout from "./hocs/FrontendLayout";
import { Provider } from "react-redux";
import store from "./store";
import SponsorForm from "./containers/Sponsor/SponsorForm";
import { setAuthToken } from "./utils/setAuthToken";
import RecRoute from "./components/private-route/RecRoute";
import ApplicantRoute from "./components/private-route/applicantroute";
import { jwtDecode } from 'jwt-decode' ;
import EventForm from "./containers/Events/EventForm";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Sponsor from "./containers/Sponsor/Sponsor";
import Event from "./containers/Events/Event";
import ApplicantOrRecRoute from "./components/private-route/ApplicantOrRecRoute ";
import FormEmploi from "./containers/Full-stage/components/FormEmploi";
import UserProfilStatic from "./containers/UserProfil/UserProfilstatic";
import Mesapplications from "./containers/Mesapplications/Mesapplications";
import MesEmplois from "./containers/Recjoblist/MesEmplois";
import MesCandidatures from "./containers/Condidatures/MesCandidatures";
import SavedJobsPage from "./containers/mesSauvegardes/savedJobsList";
function App() {
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
         <Route path="/"  element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/password" element={<Password />} />
            <Route path="/company/:id" element={<ApplicantRoute element={<CompanyPage/>} />} />
            <Route path="/sponsorpage" element={<ApplicantOrRecRoute element={<Sponsor/>} />} />
           <Route path="/eventpage" element={<ApplicantOrRecRoute  element={<Event/>} />} />
           <Route path="/formred" element={<FormPagered/>}  />
            <Route path="/annonce" element={<RecRoute element={<MultiStepjobForm />} />} />
            <Route path="/SponsorForm" element={<ApplicantOrRecRoute element={<SponsorForm/>} />} /> 
            <Route path="/EventForm" element={<RecRoute element={<EventForm/>} />} /> 
            <Route path="/fullcv" element={<ApplicantOrRecRoute element={<Fullcv/>} />} />
            <Route path="/Profil" element={<RecRoute element={<UserProfilStatic/>} />} />
            <Route path="/fullcompany" element={<RecRoute element={<Fullcompanyinfo />} />} />
            <Route path="/MesEmplois" element={<RecRoute element={<MesEmplois />} />} />
            <Route path="/MesCandidatures" element={<RecRoute element={<MesCandidatures />} />} />
            <Route path="/rec" element={<RecruiterPage />} />
            {/* <Route path="/ess" element={<RecRoute element={<EssGratuitement />} />} /> */}
            <Route path="/passrec/:resetToken"  element={<PassRecLog />} />
            {/* <Route path="/recform" element={<RecRoute element={<RecForm />} />} /> */}
            <Route path="/Fulljob" element={<ApplicantOrRecRoute element={<Fulljob/>} />} />
            <Route path="/FormEmploi" element={<ApplicantRoute element={<FormEmploi/>} />} />
            <Route path="/mesapplications" element={<ApplicantRoute element={<Mesapplications/>} />} />
            <Route path="/messauvegardes" element={<ApplicantRoute element={<SavedJobsPage/>} />} />
            <Route path="/singleoffre/:recId/:id"
             element={<ApplicantRoute element={<Offrepagesingle />} />}  />
                  {/* <Route path="/emploi/:id" element={<ApplicantRoute element={<OffresEmploi />} />} /> */}
                  <Route path="/offres/:id" element={<ApplicantRoute element={<Offrejob />} />} />
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
