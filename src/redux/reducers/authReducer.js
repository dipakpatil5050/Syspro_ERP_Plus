import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: JSON.parse(sessionStorage.getItem('userData')) || null,
    userMpinData: JSON.parse(sessionStorage.getItem('userMpinData')) || null,
    LedgerReport: null,
    login: Cookies.get('logedIn'),
    loading: false,
    error: null,
    // isLoggedIn: !!JSON.parse(sessionStorage.getItem('userData')),
  },
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn); use it into another file

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setuserMpinData: (state, action) => {
      state.userMpinData = action.payload;
      sessionStorage.setItem('userMpinData', JSON.stringify(action.payload));
    },
    setLedgerReport: (state, action) => {
      state.LedgerReport = action.payload;
    },
    loginBegin: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.login = action.payload;
      state.loading = false;
    },
    loginErr: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutBegin: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.login = action.payload;
      state.loading = false;
    },
    logoutErr: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setuserMpinData,
  setUserData,
  setLedgerReport,
  loginBegin,
  loginSuccess,
  loginErr,
  logoutBegin,
  logoutSuccess,
  logoutErr,
} = authSlice.actions;
export default authSlice.reducer;
