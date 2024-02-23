import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import * as jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";

// Vérifie si un token JWT est présent dans le localStorage
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);

  // Définir l'utilisateur actuel
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; 
  // Vérifie si le token a expiré
  if (decoded.exp < currentTime) {
    // Déconnecter l'utilisateur et le rediriger vers la page de connexion
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
  <Route path="/form" element={<PrivateRoute component={FormPage} />} />
  <Route path="/rec" element={<PrivateRoute component={RecuiterPage} />} />
  <Route path="/reclog" element={<PrivateRoute component={RecLogin} />} />
  <Route path="/ess" element={<PrivateRoute component={EssGratuitement} />} />
  <Route path="/validation" element={<PrivateRoute component={ValidationEmail} />} />
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
