import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
// import productReducer from './reducers/catalogueReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    // products: productReducer,
  },
});
