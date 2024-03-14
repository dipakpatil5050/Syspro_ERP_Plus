import { Button, Col, Form, Input, Row } from 'antd';
// import { Auth0Lock } from 'auth0-lock';
// import React, { useCallback, useState } from 'react';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthFormWrap } from '../../container/profile/authentication/overview/style';
// import { setUserData } from '../../redux/authlogin/actions';
import { setUserData } from '../../redux/reducers/authReducer';

import { Checkbox } from '../checkbox/checkbox';

function ClientLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const isLoading = useSelector((state) => state.auth.loading);
  // const [form] = Form.useForm();

  const userMpinData = useSelector((state) => state.auth.userMpinData);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  // const userData = useSelector((state) => state.auth.userData);

  const fetchLoginData = async () => {
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
      // const CompanyName = userData.CompanyName;

      // Cookies.set('token', Token, { expires: 7 });
      Cookies.set('access_token', Token);
      Cookies.set('logedIn', true);
      dispatch(setUserData(userData));
      navigate('/signin');
      toast.success('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Login failed. Please check your login credentials and try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetchLoginData();
      setIsLoading(false);
      // navigate("/Home");
      // toast.success("Login successful!");
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Login failed. Please check your login credentials and try again.');
    }
  };

  const [state, setState] = useState({
    checked: null,
  });

  // const lock = new Auth0Lock(clientId, domain, auth0options);

  // const handleSubmit = useCallback(
  //   (values) => {
  //     dispatch(login(values, () => navigate('/admin')));
  //   },
  //   [navigate, dispatch],
  // );

  // const handleAuthOSubmit = useCallback(
  //   (values) => {
  //     dispatch(authOLogin(values, () => navigate('/admin')));
  //   },
  //   [navigate, dispatch],
  // );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  // lock.on('authenticated', (authResult) => {
  //   lock.getUserInfo(authResult.accessToken, (error) => {
  //     if (error) {
  //       return;
  //     }
  //     handleAuthOSubmit(authResult);
  //     lock.hide();
  //   });
  // });

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Login to Galaxy Infotech</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" onFinish={handleLogin} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ message: 'Please input your username or Email!', required: true }]}
                // initialValue="ninjadash@dm.com"
                label="Username or Email Address"
              >
                <Input
                  placeholder="name@example.com"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Keep me logged in
                </Checkbox>
                <NavLink className="forgot-pass-link" to="/forgotPassword">
                  Forgot password?
                </NavLink>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={handleLogin}>
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Don`t passed mpin?<Link to="/">mPin page </Link>
              or
              <Link to="/signin">SignIn page</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ClientLogin;
