import { createSelector } from '@reduxjs/toolkit';

const selectAuthSlice = (state) => state.auth;

export const selectBaseUrl = createSelector(
  selectAuthSlice,
  (authSlice) => authSlice.userMpinData?.Data?.ServerBaseUrl,
);
