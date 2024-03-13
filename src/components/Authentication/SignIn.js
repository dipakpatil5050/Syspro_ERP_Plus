import { Button, Col, Form, Input, Row } from 'antd';
import { Auth0Lock } from 'auth0-lock';
import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { AuthFormWrap } from '../../container/profile/authentication/overview/style';

import { login, authOLogin } from '../../redux/authentication/actionCreator';

import { Checkbox } from '../checkbox/checkbox';
import { auth0options } from '../../config/auth0';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function ClientLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();

  const [state, setState] = useState({
    checked: null,
  });

  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(login(values, () => navigate('/admin')));
    },
    [navigate, dispatch],
  );

  const handleAuthOSubmit = useCallback(
    (values) => {
      dispatch(authOLogin(values, () => navigate('/admin')));
    },
    [navigate, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }
      handleAuthOSubmit(authResult);
      lock.hide();
    });
  });

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">Login to Galaxy Infotech</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ message: 'Please input your username or Email!', required: true }]}
                initialValue="ninjadash@dm.com"
                label="Username or Email Address"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item name="password" initialValue="123456" label="Password">
                <Input.Password placeholder="Password" />
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
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Don`t passed mpin?<Link to="/">mPin Page</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ClientLogin;
