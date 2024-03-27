import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./hocs/Layout";
import Landing from "../src/containers/Landing/Landing";
import CompanyPage from "../src/containers/CompanyPage/CompanyPage";
import OffresEmploi from './containers/CompanyPage/OffresEmploi';
import FormPage from './containers/CV/FormPage';
import FormPagered from './containers/CV-red/src/Cv';
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Password from './containers/LoginPage/Password';
import RecuiterPage from './containers/RecruiterPage/RecuiterPage';
import RecLogin from './containers/RecruiterPage/RecLogin';
import EssGratuitement from './containers/RecruiterPage/EssGratuitement';
import ValidationEmail from './containers/RecruiterPage/ValidationEmail';
import Fulljob from './containers/Fulljob/fulljob';
import Fullcv from "./containers/Full-stage/Fullcv";
import * as jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import PassRecLog from './containers/RecruiterPage/PassRecLog';
import RecForm from './containers/RecruiterPage/RecForm';
import MultiStepjobForm from './containers/Annonceform/form';
import Fullcompanyinfo from "./containers/Annonceform/fullcompany";
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <div className="container">
          <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/password/:resetToken" element={<Password />} />
  <Route path="/company" element={<PrivateRoute component={CompanyPage} />} />
  <Route path="/emploi" element={<PrivateRoute component={OffresEmploi} />} />
  <Route path="/form" element={<FormPage/> }/>
  <Route path="/annonce" element={<MultiStepjobForm /> }/>
  <Route path="/formred" element={<FormPagered />} />
  
   <Route path="/Fullcompany" element={<Fullcompanyinfo/>} />
  <Route path="/fullcv" element={<Fullcv/>} />
  <Route path="/rec" element={<RecuiterPage/> }/>
  <Route path="/reclog" element={<PrivateRoute component={RecLogin} />} />
  <Route path="/ess" element={<PrivateRoute component={EssGratuitement} />} />
  <Route path="/validation" element={<PrivateRoute component={ValidationEmail} />} />
  <Route path="/passrec" element={<PrivateRoute component={PassRecLog} />} />
  <Route path="/recform" element={<PrivateRoute component={RecForm} />} />
  <Route path="/Fulljob" element={<Fulljob/>} />
  
  {/* <Route path="/recform" exact element={<RecForm />} /> */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;