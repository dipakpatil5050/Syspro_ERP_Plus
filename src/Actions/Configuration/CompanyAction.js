import toast from 'react-hot-toast';
import ConfigService from '../../services/ConfigService';
import { setCompany, setLoading, setLocation, setPremise, setYearDuration } from '../../redux/reducers/configSlice';
import { setUserData } from '../../redux/reducers/authReducer';

export const getCompany = () => async (dispatch) => {
  const body = {};

  try {
    dispatch(setLoading(true));
    const response = await ConfigService.getCompanyByUser(body);
    dispatch(setCompany(response?.data?.Data?.Table1));
    dispatch(setLoading(false));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected Error while fetching Company Data from API.');
    }
    console.error(':', error);
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
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected Error in get year duration API.');
    }
    console.error('Error while fetching year duration API:', error);
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
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected Error while fetching premise Data from API.');
    }
    console.error('Error while fetching premise Data from API:', error);
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
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected Error while fetching Department Data from API.');
    }
    console.error('Error while fetching department Data from API:', error);
    dispatch(setLoading(false));
  }
};

export const saveCompanyConfig = () => async (dispatch) => {
  const body = {};
  try {
    const response = await ConfigService.saveCompanyConfig(body);

    // dispatch(setUserData(response?.data?.Data))
    console.log('Save company configuration Demo : ', response?.data?.Data);
    toast.success('Company Configuration save Successfully !');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected Error while fetching save company config Data from API.');
    }
    console.error('Unexpected Error while fetching save company config Data from API');
  }
};
