import { setUserData, setUserMpinData, setLedgerReport } from './actions';

export const setUserDataAction = (userData) => {
  return (dispatch) => {
    dispatch(setUserData(userData));
    sessionStorage.setItem('userData', JSON.stringify(userData));
  };
};

export const setUserMpinDataAction = (userMpinData) => {
  return (dispatch) => {
    dispatch(setUserMpinData(userMpinData));
    sessionStorage.setItem('userMpinData', JSON.stringify(userMpinData));
  };
};

export const setLedgerReportAction = (ledgerReport) => {
  return (dispatch) => {
    dispatch(setLedgerReport(ledgerReport));
  };
};
