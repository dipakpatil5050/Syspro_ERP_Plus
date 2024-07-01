import toast from 'react-hot-toast';
import RuleServices from '../../services/RuleServices';
import { setRuleFilterData, setLoading, setRuleCollection } from '../../redux/reducers/configSlice';

export const getRuleFilters = () => async (dispatch) => {
  const body = {
    FilterString: '',
  };

  try {
    dispatch(setLoading(true));
    const filterRes = await RuleServices.filterRuleCollection(body);
    dispatch(setRuleFilterData(filterRes?.data?.Data?.filters));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while Data fetching for rule filters from API', error);
    dispatch(setLoading(false));
  }
};

export const getAllRules = (currentPage, pageSize) => async (dispatch) => {
  const body = {
    OffsetValue: currentPage,
    PagingSize: pageSize,
  };

  try {
    dispatch(setLoading(true));
    const ruleResponse = await RuleServices.getAllRules(body);
    dispatch(setRuleCollection(ruleResponse?.data?.Data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching rule configuration:', error);
    dispatch(setLoading(false));
  }
};

export const getRuleDataById = (ruleId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const ruleIdResponse = await RuleServices.getRuleDataById(ruleId);
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching rule configuration:', error);
    dispatch(setLoading(false));
  }
};

export const saveRuleToCollection = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const saveRuleRes = await RuleServices.saveRuleToCollection(body);
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
