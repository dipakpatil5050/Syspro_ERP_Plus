// import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

// const initialState = {
//   login: Cookies.get('logedIn'),
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginBegin: (state) => {
//       state.loading = true;
//     },
//     loginSuccess: (state, action) => {
//       state.login = action.payload;
//       state.loading = false;
//     },
//     loginErr: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//     logoutBegin: (state) => {
//       state.loading = true;
//     },
//     logoutSuccess: (state, action) => {
//       state.login = action.payload;
//       state.loading = false;
//     },
//     logoutErr: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = authSlice.actions;

// export default authSlice.reducer;
