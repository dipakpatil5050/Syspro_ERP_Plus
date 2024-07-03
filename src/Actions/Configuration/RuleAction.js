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
    console.error('Error while fetching rule configuration:', error);
    dispatch(setLoading(false));
  }
};

export const insertRuleToCollection = (ruleName, remark, companyId, userId, RuleData) => async (dispatch) => {
  const ruleDetails = RuleData?.map((item, index) => ({
    company_id: companyId,
    rule_id: 0,
    row_id: index + 1,
    rule_type: item.selectedType,
    rulevalue: item.selectedValues.join(','),
    rulestring: item.FilterId,
    remark: remark,
    remark1: '',
  }));

  // And  In (3,6,5) And  In (1,3,22,17) And  In (1) And  In (2)
  // AND Group_Id IN (3,6,5) AND SubGroup_Id IN (1,3,22,17) AND Brand_ID IN (1) AND Cat_Id IN (2)

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

  // Entry Mode Data into body =
  // { 1 for  insert and
  //  2 for update the Data }

  // Rule Id into body   =
  // while insert: pass 0
  // while update: pass Rule Id from data object

  try {
    dispatch(setLoading(true));
    const saveRuleRes = await RuleServices.saveRuleToCollection(body);
    console.log('insert rule to collection response : ' + saveRuleRes.data.Data);
    toast.success('Rule Created successfully!');
    window.history.back();
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    console.error('Error while saving rule to Collection', error);
    dispatch(setLoading(false));
  }
};

export const updateRuleToCollection = (ruleName, remark, companyId, userId, RuleData) => async (dispatch) => {
  const ruleDetails = RuleData?.map((item, index) => ({
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
      EntMode: 2,
    },
    RuleCollectionDetail: ruleDetails,
  };

  // And  In (1,2,3,4,5,0) And  In (1,2,3,4,5,0) And  In (1,2,3,4,5,0)

  // Entry Mode Data into body =
  // { 1 for  insert and
  //   2 for update the Data }

  // Rule Id into body   =
  // while insert: pass 0
  // while update: pass Rule Id from data object

  try {
    dispatch(setLoading(true));
    const saveRuleRes = await RuleServices.saveRuleToCollection(body);
    console.log('insert rule to collection response : ' + saveRuleRes.data.Data);
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
