import { SET_USER_DATA, SET_USER_MPIN_DATA, SET_LEDGER_REPORT } from './actionTypes';

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const setUserMpinData = (userMpinData) => ({
  type: SET_USER_MPIN_DATA,
  payload: userMpinData,
});

export const setLedgerReport = (ledgerReport) => ({
  type: SET_LEDGER_REPORT,
  payload: ledgerReport,
});
