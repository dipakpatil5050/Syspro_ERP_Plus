import toast from 'react-hot-toast';
import RuleServices from '../../services/RuleServices';
import { setRuleFilterData, setLoading } from '../../redux/reducers/configSlice';

export const getRuleFilters = () => async (dispatch) => {
  const body = {
    FilterString: '',
  };

  try {
    dispatch(setLoading(true));
    const filterRes = await RuleServices.filterRuleCollection(body);
    console.log('Filter API data for Rule Configuration :', filterRes.data?.Data);
    dispatch(setRuleFilterData(filterRes?.data?.Data?.filters));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    console.error('Error while Data fetching from API', error);
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

export const getRuleDataById = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const ruleIdResponse = await RuleServices.getRuleDataById(body);
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching rule configuration:', error);
    dispatch(setLoading(false));
  }
};

export const saveRuletoCollection = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const saveRuleRes = await RuleServices.saveRuletoCollection(body);
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    console.error('Error while saving rule to Collection', error);
    dispatch(setLoading(false));
  }
};

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
