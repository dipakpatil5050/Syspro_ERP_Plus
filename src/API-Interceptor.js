import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
// import { ServerBaseurl } from './common';
import store from './redux/store';

export const http = axios.create();
export const httpFormData = axios.create();

export const whatsapp = axios.create({
  baseURL: 'https://md.enotify.app/api/',
});

// for Request from API endpoint

http.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access_token');
    const state = store.getState(); // Access Redux state
    const { userData, userMpinData } = state.auth;
    const mPin = userMpinData?.Data?.mPin;

    const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
    if (ServerBaseUrl) {
      config.baseURL = ServerBaseUrl;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['x-api-key'] = mPin;

    if (userData && userMpinData) {
      config.headers.CompanyID = userData.Data.CompanyID;
      config.headers.YearMasterID = userData.Data.YearMasterID;
      config.headers.PremiseID = userData.Data.PremiseID;
      config.headers.DepartmentID = userData.Data.DepartmentID;
      config.headers.UserID = userData.Data.UserID;
      config.headers.client = userMpinData.Data.SlugUrl;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// for response

http.interceptors.response.use(
  (response) => {
    // Handle successful response here
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      Cookies.remove('access_token');
      toast.error('Session expired', 'Please log in again.');
    }
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");

    return Promise.reject(error);
  },
);

// Whats App Sharing API interceptor

whatsapp.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// for response

whatsapp.interceptors.response.use(
  (response) => {
    // Handle successful response here
    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      Cookies.remove('access_token');
      toast.error('Session expired', 'Please log in again.');
    }
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");

    return Promise.reject(error);
  },
);

// for Request from API endpoint for Form Data =  Content-Type

httpFormData.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('access_token');
    const state = store.getState(); // Access Redux state
    const { userData, userMpinData } = state.auth;
    const mPin = userMpinData?.Data?.mPin;

    const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
    if (ServerBaseUrl) {
      config.baseURL = ServerBaseUrl;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['x-api-key'] = mPin;

    if (userData && userMpinData) {
      config.headers.CompanyID = userData.Data.CompanyID;
      config.headers.YearMasterID = userData.Data.YearMasterID;
      config.headers.PremiseID = userData.Data.PremiseID;
      config.headers.DepartmentID = userData.Data.DepartmentID;
      config.headers.UserID = userData.Data.UserID;
      config.headers.client = userMpinData.Data.SlugUrl;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// for response

httpFormData.interceptors.response.use(
  (response) => {
    // Handle successful response here

    return response;
  },
  async (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      // Unauthorized access - maybe token expired
      Cookies.remove('access_token');
      toast.error('Session expired', 'Please log in again.');
    }
    // Alert.alert("Error", error.response?.data?.message || "An error occurred");

    return Promise.reject(error);
  },
);
