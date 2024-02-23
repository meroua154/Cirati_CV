import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import * as jwt_decode from 'jwt-decode';


import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register User
export const registerUser = async (userData, history) => {
    try {
        const res = await axios.post("http://localhost:4000/user/register", userData)
        return res
    } catch (err) {
        console.log(err)
        return {
            type: GET_ERRORS,
            payload: err.response.data,
        };
    }
};



export const loginUser = userData => async dispatch => {
    try {
      const res = await axios.post("http://localhost:4000/user/login", userData);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
  

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};