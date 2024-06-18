import React from 'react'
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import jobsSlice from '../containers/Landing/slices/jobsSlice';
import CompanySlice from '../containers/CompanyPage/Slices/CompanySlice';
import { applicantsReducer, applicantReducer }from '../containers/Full-stage/slices/applicantsSlice';
import offreSlice from '../containers/CompanyPage/Slices/offreSlice';
import FullcompanySlice from '../containers/Annonceform/slices/FullcompanySlice';
import sponsorsSlice from '../containers/Sponsor/Slices/SponsorSlice';
import EventSlice from '../containers/Events/Slices/EventSlice';
import Applicationslices from '../containers/Mesapplications/slices/Applicationslices';
import emploiSlice from '../containers/Recjoblist/slices/JobsSlice'
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    emploi:emploiSlice,
    jobs: jobsSlice,
    company: CompanySlice,
    applicants: applicantsReducer,
    applicant: applicantReducer,
    applications:Applicationslices,
    companyProfile:FullcompanySlice,
    offre:offreSlice,
    sponsor:sponsorsSlice,
    event:EventSlice
});