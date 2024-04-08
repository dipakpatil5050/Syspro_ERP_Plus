import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import staticData from '../../demoData/products.json';

// Define initial state
// const initialStateFilter = {
//   data: staticData,
//   loading: false,
//   error: null,
// };

const initialstate = {
  data: staticData,
  loading: false,
  error: null,
};

// Define thunk for filtering products
export const filterProducts = createAsyncThunk('products/filter', async (paramsId, { getState, rejectWithValue }) => {
  try {
    const currentState = getState().products.data;
    const data = currentState.filter((product) => product.id === paramsId);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Define thunk for sorting products
export const sortProducts = createAsyncThunk('products/sort', async (sortBy, { getState, rejectWithValue }) => {
  try {
    const currentState = getState().products.data;
    const data = currentState.sort((a, b) => b[sortBy] - a[sortBy]);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Define slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState: initialstate,
  reducers: {},
  extraReducers: (builder) => {
    // Filter products reducers
    builder.addCase(filterProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(filterProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Sort products reducers
    builder.addCase(sortProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sortProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(sortProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export reducer
export const { data, loading, error } = productsSlice.actions;

export default productsSlice.reducer;
