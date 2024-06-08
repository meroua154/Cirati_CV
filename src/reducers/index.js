import React from 'react'
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import jobsSlice from '../containers/Landing/slices/jobsSlice';
export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    jobs: jobsSlice,
});