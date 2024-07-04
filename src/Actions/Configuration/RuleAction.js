import toast from 'react-hot-toast';
import RuleServices from '../../services/RuleServices';
import { setRuleFilterData, setLoading, setRuleCollection, setSingleRuleData } from '../../redux/reducers/configSlice';

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
    dispatch(setSingleRuleData(ruleIdResponse.data.Data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching Single Rule Data from API:', error);
    dispatch(setLoading(false));
  } finally {
    dispatch(setLoading(false));
  }
};

export const insertRuleToCollection = (ruleName, remark, companyId, userId, tempData) => async (dispatch) => {
  const ruleDetails = tempData?.map((item, index) => ({
    company_id: companyId,
    rule_id: 0,
    row_id: index + 1,
    rule_type: item.selectedType,
    rulevalue: item.selectedValues.join(','),
    rulestring: item.FilterId,
    remark: remark,
    remark1: '',
  }));

  const body = {
    RuleCollection: {
      company_id: companyId,
      rule_id: 0,
      rule_name: ruleName,
      rulefilterstring: '',
      remark: remark,
      remark1: '',
      remark2: '',
      status: 0,
      entrydatetime: new Date().toLocaleDateString(),
      tranuserid: userId,
      EntMode: 1,
    },
    RuleCollectionDetail: ruleDetails,
  };

  // And  In (1,2,3,4,5,0) And  In (1,2,3,4,5,0) And  In (1,2,3,4,5,0)

  // Entry Mode Data into body should be  =
  // { 1 for  insert and
  //  2 for update the Data }

  // Rule Id into body   =
  // while insert rule to collection : pass 0
  // while update rule to collection : pass Rule Id from data object

  try {
    dispatch(setLoading(true));
    const saveRuleRes = await RuleServices.saveRuleToCollection(body);
    console.log('insert rule to collection response : ' + saveRuleRes.data);
    toast.success('Rule Created successfully!');
    window.history.back();
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    console.error('Error while saving rule to Collection', error);
    dispatch(setLoading(false));
  }
};

export const updateRuleToCollection = (ruleId, ruleName, remark, companyId, userId, tempData) => async (dispatch) => {
  const ruleDetails = tempData?.map((item, index) => ({
    company_id: companyId,
    rule_id: ruleId,
    row_id: index + 1,
    rule_type: item.selectedType,
    rulevalue: item.selectedValues.join(','),
    rulestring: item.FilterId,
    remark: remark,
    remark1: '',
  }));

  const body = {
    RuleCollection: {
      company_id: companyId,
      rule_id: ruleId,
      rule_name: ruleName,
      rulefilterstring: '',
      remark: remark,
      remark1: '',
      remark2: '',
      status: 0,
      entrydatetime: new Date().toLocaleDateString(),
      tranuserid: userId,
      EntMode: 2,
    },
    RuleCollectionDetail: ruleDetails,
  };

  try {
    dispatch(setLoading(true));
    const saveRuleRes = await RuleServices.saveRuleToCollection(body);
    console.log('Update rule to collection response:', saveRuleRes.data.Data);
    toast.success('Rule updated successfully!');
    window.history.back();
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    console.error('Error while saving rule to Collection', error);
    dispatch(setLoading(false));
    toast.error('Failed to update rule in collection.');
  } finally {
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
