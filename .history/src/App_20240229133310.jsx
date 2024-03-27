import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./hocs/Layout";
import Landing from "../src/containers/Landing/Landing";
import CompanyPage from "../src/containers/CompanyPage/CompanyPage";
import OffresEmploi from './containers/CompanyPage/OffresEmploi';
import FormPage from './containers/CV/FormPage';
<<<<<<< HEAD
import FormPagered from './containers/CV-red/src/Cv';
=======
>>>>>>> origin/main
import LoginPage from './containers/LoginPage/LoginPage';
import RegisterPage from './containers/RegisterPage/RegisterPage';
import Password from './containers/LoginPage/Password';
import RecuiterPage from './containers/RecruiterPage/RecuiterPage';
import RecLogin from './containers/RecruiterPage/RecLogin';
import EssGratuitement from './containers/RecruiterPage/EssGratuitement';
import ValidationEmail from './containers/RecruiterPage/ValidationEmail';
<<<<<<< HEAD
import * as jwt_decode from 'jwt-decode';
=======
import { jwtDecode } from 'jwt-decode'
>>>>>>> origin/main
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import PassRecLog from './containers/RecruiterPage/PassRecLog';
import RecForm from './containers/RecruiterPage/RecForm';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
<<<<<<< HEAD
  const decoded = jwt_decode(token);
=======
  const decoded = jwtDecode(token);

>>>>>>> origin/main
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
  <Route path="/form" element={<PrivateRoute component={FormPage} />} />
  <Route path="/formred" element={<FormPagered />} />
  <Route path="/rec" element={<PrivateRoute component={RecuiterPage} />} />
  <Route path="/reclog" element={<PrivateRoute component={RecLogin} />} />
  <Route path="/ess" element={<PrivateRoute component={EssGratuitement} />} />
  <Route path="/validation" element={<PrivateRoute component={ValidationEmail} />} />
  <Route path="/passrec" element={<PrivateRoute component={PassRecLog} />} />
  <Route path="/recform" element={<PrivateRoute component={RecForm} />} />
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
