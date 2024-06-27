import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ruleCollection: [],
  tempRuleData: [],
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
    setTempRuleData: (state, action) => {
      state.tempRuleData.push(action.payload);
    },
    updateTempRuleData: (state, action) => {
      const { index, updatedRule } = action.payload;
      state.tempRuleData[index] = updatedRule;
    },
    deleteTempRuleData: (state, action) => {
      state.tempRuleData.splice(action.payload, 1);
    },
    clearTempRuleData: (state) => {
      state.tempRuleData = [];
    },
  },
});

export const {
  setLoading,
  setRuleCollection,
  setTempRuleData,
  updateTempRuleData,
  deleteTempRuleData,
  clearTempRuleData,
} = configSlice.actions;

export default configSlice.reducer;
