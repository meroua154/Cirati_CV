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
            <Route path="/sponsorpage" element={<Sponsor />} />
            <Route path="/eventpage" element={<Event />} />
           <Route path="/company/:id" element={<ApplicantRoute element={<CompanyPage/>} />} />
            <Route path="/annonce" element={<RecRoute element={<MultiStepjobForm />} />} />
            <Route path="/formred"  element={<FormPagered/>}  /> 
            <Route path="/SponsorForm" element={<ApplicantRoute element={<SponsorForm/>} />} /> 
            <Route path="/Sponsors" element={<Sponsor/>}  /> 
            <Route path="/EventForm" element={<RecRoute element={<EventForm/>} />} /> 
            <Route path="/fullcv" element={<Fullcv />}  />
            <Route path="/formemploi" element={<FormEmploi />}  />
            <Route path="/fullcompany" element={<RecRoute element={<Fullcompanyinfo />} />} />
            <Route path="/rec" element={<RecruiterPage />} />
            {/* <Route path="/ess" element={<RecRoute element={<EssGratuitement />} />} /> */}
            <Route path="/passrec/:resetToken"  element={<PassRecLog />} />
            {/* <Route path="/recform" element={<RecRoute element={<RecForm />} />} /> */}
            <Route path="/Fulljob"  element={<Fulljob/>}  />
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
