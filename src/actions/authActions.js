import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { jwtDecode } from 'jwt-decode'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
<<<<<<< HEAD
    USER_LOADING,
    LOGOUT
=======
    USER_LOADING
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
} from "./types";


export const registerUser = (userData) => {
    return async dispatch => {
        try {
            console.log(userData)
            const res = await axios.post("http://localhost:4000/user/register", userData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(userData)
            return res.data;
        } catch (err) {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });

            throw err;
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
<<<<<<< HEAD
    dispatch({ type: LOGOUT });
    // window.location.href = "/login";
=======
    window.location.href = "/login";
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
};