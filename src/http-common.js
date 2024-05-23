import axios from 'axios';
import Cookies from 'js-cookie';
import { BaseURLApi } from './common';

// import { logOut } from './src/redux/reducers/authReducer';

export const http = axios.create({
  baseURL: BaseURLApi,
});

// for Request

http.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access_token');
    const mPin = localStorage.getItem('mPin');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['x-api-key'] = config.data || mPin;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// for response

http.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      Cookies.remove('access_token');
      alert('Session expired', 'Please log in again.');
      // Optionally, navigate the user to the login screen
      // logOut
      // navigation.navigate("Login"); // assuming you have navigation setup
    }
    // Show error alert
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");
    return Promise.reject(error);
  },
);
