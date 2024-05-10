import { combineReducers } from 'redux';
import { SET_USER_DATA, SET_USER_MPIN_DATA, SET_LEDGER_REPORT } from './actionTypes';

const initialState = {
  userData: JSON.parse(sessionStorage.getItem('userData')) || null,
  userMpinData: JSON.parse(sessionStorage.getItem('userMpinData')) || null,
  LedgerReport: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case SET_USER_MPIN_DATA:
      return {
        ...state,
        userMpinData: action.payload,
      };
    case SET_LEDGER_REPORT:
      return {
        ...state,
        LedgerReport: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  auth: loginReducer,
});
