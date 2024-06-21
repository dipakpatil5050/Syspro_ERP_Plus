import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartSlice';
import configReducer from './reducers/configSlice';
// import productReducer from './reducers/catalogueReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    config: configReducer,
    // products: productReducer,
  },
});
