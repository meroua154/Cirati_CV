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



<<<<<<< HEAD
export const loginUser = userData => async dispatch => {
=======
export const loginUser = (userData) => {
    return async dispatch => {
>>>>>>> origin/main
    try {
      const res = await axios.post("http://localhost:4000/user/login", userData);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
<<<<<<< HEAD
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    } catch (err) {
=======
      const decoded = jwtDecode(token);

      dispatch(setCurrentUser(decoded));
      return res
    } catch (err) {
        console.log(err)
>>>>>>> origin/main
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
<<<<<<< HEAD
    }
  };
  

// Set logged in user
=======
      return {
        type: GET_ERRORS,
        payload: err.response.data,
    };
    }
  }
};
  
>>>>>>> origin/main
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

<<<<<<< HEAD
// User loading
=======
>>>>>>> origin/main
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

<<<<<<< HEAD
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
=======
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
>>>>>>> origin/main
    dispatch(setCurrentUser({}));
};