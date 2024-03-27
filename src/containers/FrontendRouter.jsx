import React from 'react'
import { Routes, Route,Navigate } from "react-router-dom"
import FrontendLayout from '../hocs/FrontendLayout'
import Landing from './Landing/Landing'
import LoginPage from './LoginPage/LoginPage'
import RegisterPage from './RegisterPage/RegisterPage'
import Password from './LoginPage/Password'
import CompanyPage from './CompanyPage/CompanyPage'
import OffresEmploi from './CompanyPage/OffresEmploi'
import FormPage from './CV/FormPage'
import RecLogin from './RecruiterPage/RecLogin'
import EssGratuitement from './RecruiterPage/EssGratuitement'
import ValidationEmail from './RecruiterPage/ValidationEmail'
import PassRecLog from './RecruiterPage/PassRecLog'
import RecForm from './RecruiterPage/RecForm'
import RecruiterPage from './RecruiterPage/RecruiterPage'
import { Provider } from "react-redux";
import store from '../store'
import { setCurrentUser, logoutUser } from "../actions/authActions"
import * as jwt_decode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";
import PrivateRoute from "../components/private-route/PrivateRoute";
import AdminRouter from './Admin/AdminRouter'


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

export default function FrontendRouter() {
    const isAdminPage = (pathname) => pathname.startsWith('/admin');
    const currentPath = window.location.pathname;

  return (
    <Provider store={store}>
    <Routes>
    {isAdminPage(currentPath) ? (
          <>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin/*" element={<AdminRouter />} />
          </>
        ) : (
        <Route path='/' element={<FrontendLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="password/:resetToken" element={<Password />} />
            <Route path="company" element={<CompanyPage />} />
            <Route path="emploi" element={<PrivateRoute element={<OffresEmploi />} />} />
            <Route path="form" element={<PrivateRoute element={<FormPage />} />} />
            <Route path="rec" element={<RecruiterPage />} />
            <Route path="reclog" element={<PrivateRoute element={<RecLogin />} />} />
            <Route path="ess" element={<PrivateRoute element={<EssGratuitement />} />} />
            <Route path="validation" element={<PrivateRoute element={<ValidationEmail />} />} />
            <Route path="passrec" element={<PrivateRoute element={<PassRecLog />} />} />
            <Route path="recform" element={<PrivateRoute element={<RecForm />} />} />
        </Route>
        )}
    </Routes>
    </Provider>
  )
}
