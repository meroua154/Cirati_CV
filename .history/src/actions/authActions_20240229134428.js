import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { jwtDecode } from 'jwt-decode'



import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData) => {
    return async dispatch => {
        try {
            const res = await axios.post("http://localhost:4000/user/register", userData);
            
            return res.data;
        } catch (err) {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            return {
                type: GET_ERRORS,
                payload: err.response.data,
            };
        }
    };
};



export const loginUser = (userData) => {
    return async dispatch => {
    try {
      const res = await axios.post("http://localhost:4000/user/login", userData);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);

      dispatch(setCurrentUser(decoded));
      return res
    } catch (err) {
        console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      return {
        type: GET_ERRORS,
        payload: err.response.data,
    };
    }
  }
};
  
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};