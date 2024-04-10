import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthFormWrap } from '../../container/profile/authentication/overview/style';
import { login, setUserData } from '../../redux/reducers/authReducer';
import { Checkbox } from '../checkbox/checkbox';

function ClientLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInputRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await dispatch(login({ username, password, mPin, ServerBaseUrl, dispatch, navigate, setUserData }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error logging in:', error);
      toast.error('Login failed. Please check your login credentials and try again.');
    }
  };

  const [state, setState] = useState({
    checked: null,
  });

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  useEffect(() => {
    loginInputRef.current.focus();
  }, []);

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
                label="Username or Email Address"
              >
                <Input
                  placeholder="name@example.com"
                  autoComplete="username"
                  ref={loginInputRef}
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
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
              {/* <p className="ninjadash-form-divider">
                <span>Or</span>
              </p> */}
            </Form>
          </div>
          {/* <div className="ninjadash-authentication-bottom">
            <p>
              Dont have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div> */}
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ClientLogin;
