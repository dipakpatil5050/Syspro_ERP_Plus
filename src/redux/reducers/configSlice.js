import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ruleCollection: [],
  loading: false,
  error: null,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRuleCollection: (state, { payload }) => {
      state.ruleCollection = payload;
    },
  },
});

export const { setLoading, setRuleCollection } = configSlice.actions;

export default configSlice.reducer;
