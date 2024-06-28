import toast from 'react-hot-toast';
import RuleServices from '../../services/RuleServices';
import { setLoading } from '../../redux/reducers/authReducer';
import { setRuleFilterData } from '../../redux/reducers/configSlice';

export const getAllUsers = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const response = await RuleServices.getAllRules(body);
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching rule configuration:', error);
    dispatch(setLoading(false));
  }
};

export const getAllRules = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const ruleResponse = await RuleServices.getAllRules(body);
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching rule configuration:', error);
    dispatch(setLoading(false));
  }
};

export const deleteRule = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const deleteRes = await RuleServices.deleteRule(body);
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching rule configuration: ', error);
    dispatch(setLoading(false));
  }
};

export const getRuleFilters = () => async (dispatch) => {
  const body = {
    SYSKey: 1,
    Access_Type: '',
    Access_Key: '',
  };

  try {
    dispatch(setLoading(true));
    const filterRes = await RuleServices.filterRuleCollection(body);
    console.log('Filter API data for Rule Configuration :', filterRes.data?.Data);
    dispatch(setRuleFilterData(filterRes?.data?.Data));
    dispatch(setLoading(false));
  } catch {
    console.log(error);
    console.error('Error while Data fetching from API', error);
    dispatch(setLoading(false));
  }
};
