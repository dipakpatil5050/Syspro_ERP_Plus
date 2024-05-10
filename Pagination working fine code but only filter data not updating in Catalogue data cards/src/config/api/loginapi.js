import axios from 'axios';
import Cookies from 'js-cookie';
// import { setUserData } from '../../redux/reducers/authReducer';

export const fetchLoginData = async ({ username, password, mPin, ServerBaseUrl, dispatch, navigate, setUserData }) => {
  const loginUrl = `${ServerBaseUrl}api/Static/UserLogin`;

  const body = {
    UserName: username,
    Password: password,
    IsRemeber: true,
    DeviceId: '',
  };

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': mPin,
  };

  try {
    const response = await axios.post(loginUrl, body, { headers });
    const userData = response.data;
    const Token = userData?.Data?.Token;

    Cookies.set('access_token', Token);
    Cookies.set('logedIn', true);
    dispatch(setUserData(userData));
    navigate('/admin');

    return true;
  } catch (error) {
    console.error('Error fetching login data:', error);
    throw error;
  }
};
