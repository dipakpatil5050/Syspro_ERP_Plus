import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  isLoading: false,
  error: null,
  total: 0,
};

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const data = localStorage.getItem('cartItems');
  return data ? JSON.parse(data) : [];
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantityToAdd || 1;
      } else {
        state.cartItems.push({ ...item, quantity: action.payload.quantityToAdd || 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    updateCartQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = quantity;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
