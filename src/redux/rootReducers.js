import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authentication/reducers';

import firebaseAuth from './firebase/auth/reducers';

import { headerSearchReducer } from './headerSearch/reducers';

import ChangeLayoutMode from './themeLayout/reducers';
import loginReducer from './authlogin/reducers';

const rootReducers = combineReducers({
  login: loginReducer,
  fs: firestoreReducer,
  firebaseAuth,
  headerSearchData: headerSearchReducer,
  auth: authReducer,
  ChangeLayoutMode,
});

export default rootReducers;
