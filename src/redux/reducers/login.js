// import { createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// // login action
// export const login = createAsyncThunk('auth/login', async ({ username, password, mPin, ServerBaseUrl, navigate }) => {
//   const loginUrl = `${ServerBaseUrl}api/Static/UserLogin`;

//   const body = {
//     UserName: username,
//     Password: password,
//     IsRemeber: true,
//     DeviceId: '',
//   };

//   const headers = {
//     'Content-Type': 'application/json',
//     'x-api-key': mPin,
//   };
//   try {
//     const response = await axios.post(loginUrl, body, { headers });
//     const userData = response.data;
//     const Token = userData?.Data?.Token;

//     Cookies.set('access_token', Token);
//     Cookies.set('logedIn', true);
//     // dispatch(setUserData(userData));
//     navigate('/admin');
//     toast.success('Login successful!');
//     return true;
//   } catch (error) {
//     // console.error('Error logging in:', error);
//     toast.error('Login failed. Please check your login credentials and try again.');
//     throw error; // Re-throw the error to handle it in the component
//   }
// });
