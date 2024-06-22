import toast from 'react-hot-toast';
import RuleServices from '../../services/RuleServices';
import { setLoading } from '../../redux/reducers/authReducer';

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
