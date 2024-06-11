import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :
  cartId: 1,
  orderHistory: [],
  IndentId: 0,
  orderPDF: '',
  isLoading: false,
  error: null,
  total: 0,
};

// export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
//   const data = localStorage.getItem('cartItems');
//   return data ? JSON.parse(data) : [];
// });

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const item = action.payload;
    //   const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
    //   if (existingItem) {
    //     existingItem.quantity += action.payload.quantityToAdd || 1;
    //   } else {
    //     state.cartItems.push({ ...item, quantity: action.payload.quantityToAdd || 1 });
    //   }
    // },
    // removeFromCart: (state, action) => {
    //   const itemId = action.payload;
    //   const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);
    //   if (itemIndex !== -1) {
    //     state.cartItems.splice(itemIndex, 1);
    //   }
    // },
    // clearCart: (state) => {
    //   state.cartItems = [];
    // },
    // updateCartQuantity: (state, action) => {
    //   const { itemId, quantity } = action.payload;
    //   const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);
    //   if (itemIndex !== -1) {
    //     state.cartItems[itemIndex].quantity = quantity;
    //   }
    // },

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
