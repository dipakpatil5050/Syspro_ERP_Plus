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
