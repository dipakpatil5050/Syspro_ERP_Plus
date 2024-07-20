import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  cartId: 1,
  orderHistory: [],
  IndentId: 0,
  orderPDF: '',
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setIntentId: (state, action) => {
      state.IndentId = action.payload;
    },
    setOrderPdf: (state, action) => {
      state.orderPDF = action.payload;
    },
    setOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCartItems, setCartId, setIntentId, setOrderPdf, setOrderHistory, setIsLoading } = cartSlice.actions;

export default cartSlice.reducer;
