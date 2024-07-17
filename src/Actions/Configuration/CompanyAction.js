import toast from 'react-hot-toast';
import ConfigService from '../../services/ConfigService';
import { setCompany, setLoading, setLocation, setPremise, setYearDuration } from '../../redux/reducers/configSlice';

export const getCompany = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const response = await ConfigService.getCompanyByUser(body);
    dispatch(setCompany(response?.data?.Data?.Table1));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching Company Data from API:', error);
    toast.error(error);
    dispatch(setLoading(false));
  }
};

export const getYearDuration = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const response = await ConfigService.getYearByUser(body);
    dispatch(setYearDuration(response?.data?.Data?.Table1));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching Company Data from API:', error);
    toast.error(error);
    dispatch(setLoading(false));
  }
};

export const getPremise = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const response = await ConfigService.getPremiseByUser(body);
    dispatch(setPremise(response?.data?.Data?.Table1));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching Company Data from API:', error);
    toast.error(error);
    dispatch(setLoading(false));
  }
};

export const getLocation = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const response = await ConfigService.getDepartmentByUser(body);
    dispatch(setLocation(response?.data?.Data?.Table1));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error while fetching Company Data from API:', error);
    toast.error(error);
    dispatch(setLoading(false));
  }
};

export const saveCompanyConfig = () => async (dispatch) => {
  const body = {};
  try {
    const response = await ConfigService;
    console.log(response?.data?.Data);
    toast.success('Company Configuration save Successfully !');
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};
