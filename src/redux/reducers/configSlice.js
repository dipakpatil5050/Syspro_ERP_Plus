import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ruleCollection: [],
  tempRuleData: [],
  loading: false,
  error: null,
  ruleFilterData: [],
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRuleCollection: (state, action) => {
      state.ruleCollection = action.payload;
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
    setRuleFilterData: (state, action) => {
      state.ruleFilterData = action.payload;
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
  setRuleFilterData,
} = configSlice.actions;

export default configSlice.reducer;
