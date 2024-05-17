import React from 'react'
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  }
});
export const setAuthToken = token => {

    if (token) {
      instance.defaults.headers.common["Authorization"] = `${token}`;
    } else {

      delete instance.defaults.headers.common["Authorization"];
    }
  };
  


export default instance;
