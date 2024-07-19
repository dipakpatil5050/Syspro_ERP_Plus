import toast from 'react-hot-toast';
import { setError, setLoading, setuserMpinData } from '../redux/reducers/authReducer';
import authService from '../services/authService';

export const addMPin = (mPin) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await authService.handleMPin(mPin);
    dispatch(setuserMpinData(res.data));
    localStorage.setItem('userMpinData', JSON.stringify(res.data));
    dispatch(setLoading(false));
    return res.data;
  } catch (error) {
    dispatch(setError(error.response.data));
    dispatch(setLoading(false));
  }
};

export const loginAPI = () => async (dispatch) => {
  const body = {};
  try {
    const response = await authService.handleLogin(body);
  } catch (error) {
    console.error(error);
  }
};

export const handleLogout = (userId) => async (dispatch) => {
  const body = {
    UserID: userId,
    DeviceId: 'B2BBrowser',
    IsActive: false,
    Status: 1,
  };

  try {
    const response = await authService.handleLogout(body);
    console.log(response.data);
    toast.success('Logout Successfully !');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected Error while Logout.');
    }
  }
};
