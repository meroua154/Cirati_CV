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
import { jwtDecode } from 'jwt-decode'
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
  const decoded = jwtDecode(token);

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
  <Route path="/password" element={<Password />} />
  <Route path="/validation" element={<ValidationEmail/>}  />
  <Route path="/passrec/:resetToken" element={<PassRecLog/>}  /> 
      {/* <Route path="/reclog" element={<PrivateRoute element={<RecLogin/>} />} />
            <Route path="/ess" element={<PrivateRoute element={<EssGratuitement/>} />} />  ???why hado than*/}
              {/* <Route path="/recform" element={<RecForm />} />  no need  */}
            <Route path="/company" element={<PrivateRoute element={<CompanyPage/>} />} />
            <Route path="/emploi" element={<PrivateRoute element={<OffresEmploi/>} />} />
            <Route path="/form" element={<PrivateRoute element={<FormPage/>} />} />
            <Route path="/rec" element={<PrivateRoute element={<RecuiterPage/>} />} />
        

  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
