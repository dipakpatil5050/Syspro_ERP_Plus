import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: JSON.parse(sessionStorage.getItem('userData')) || null,
    userMpinData: JSON.parse(sessionStorage.getItem('userMpinData')) || null,
    LedgerReport: null,
  },

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
  },
});

export const { setuserMpinData, setUserData, setLedgerReport } = authSlice.actions;
export default authSlice.reducer;
