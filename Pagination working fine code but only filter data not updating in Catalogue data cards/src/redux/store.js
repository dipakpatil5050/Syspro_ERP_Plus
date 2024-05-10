import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartSlice';
// import productReducer from './reducers/catalogueReducer';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    // products: productReducer,
  },
});
