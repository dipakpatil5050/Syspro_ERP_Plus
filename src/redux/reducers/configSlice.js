import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ruleCollection: [],
  tempRuleData: [],
  loading: false,
  error: null,
  ruleFilterData: [],
  singleRuleData: [],
  allUsers: [],
  allRules: [],
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
    setSingleRuleData: (state, action) => {
      state.singleRuleData = action.payload;
      state.tempRuleData = action.payload?.Table1?.map((item) => ({
        selectedType: item.Rule_Type,
        selectedValues: item.RuleValue.split(',').map(Number),
        FilterId: item.RuleFilterId,
      }));
    },

    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setAllRules: (state, action) => {
      state.allRules = action.payload;
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
  setSingleRuleData,
  setAllUsers,
  setAllRules,
} = configSlice.actions;

export default configSlice.reducer;
