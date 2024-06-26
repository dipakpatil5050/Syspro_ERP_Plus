import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ruleCollection: [],
  tempRuleData: [],
  loading: false,
  error: null,
};

// {
//   selectedType: 'Group',
//   selectedValues: [3, 4, 5],
// },
// {
//   selectedType: 'SubGroup',
//   selectedValues: [1, 2],
// },
// {
//   selectedType: 'Category',
//   selectedValues: [4, 2],
// },
// {
//   selectedType: 'Brand',
//   selectedValues: [2],
// },

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
  },
});

export const { setLoading, setRuleCollection, setTempRuleData, updateTempRuleData, deleteTempRuleData } =
  configSlice.actions;

export default configSlice.reducer;
