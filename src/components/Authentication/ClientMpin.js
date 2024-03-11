import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthFormWrap } from '../../container/profile/authentication/overview/style';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function ClientMpin() {
  const [mPin, setMPin] = useState('');
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.auth.loading);
  // const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setMPin(e.target.value);
  };

  const fetchData = async () => {
    const mpinapi = `http://103.67.238.230:1385/SysMpin/authenticateSysmpin?mPin=${mPin}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your_token_here',
      'x-api-key': mPin,
    };

    try {
      const response = await axios.post(mpinapi, { mPin }, { headers });
      // dispatch(setuserMpinData(response.data));

      const apidata = response.data?.Data;
      const apiMpin = apidata?.mPin;

      if (apiMpin === mPin) {
        navigate('/login');
        toast.success('Mpin Verified !');
      } else {
        toast.error('Invalid MPIN');
        setMPin('');
      }
    } catch (error) {
      toast.error('Invalid MPIN');
      console.error('Error fetching data:', error);
    }
  };

  const handlempinSubmit = async (e) => {
    try {
      e.preventDefault();
      await fetchData();
    } catch (error) {
      console.log('Error : ', error);
    }
  };

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

  // const onChange = (checked) => {
  //   setState({ ...state, checked });
  // };

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
            <h2 className="ninjadash-authentication-top__title">Mpin to Galaxy Infotech</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" onFinish={handlempinSubmit} layout="vertical">
              <Form.Item
                name="mPin"
                rules={[{ message: 'Please input your mpin !', required: true }]}
                // initialValue="SYSPRO04"
                label="Enter Mpin to connect"
              >
                <Input placeholder="******" value={mPin} onChange={handleInputChange} name="mPin" />
              </Form.Item>

              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={handlempinSubmit}>
                  {/* {isLoading ? 'Loading...' : 'Connect Now'} */}
                  Connect
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
            </Form>
          </div>
          <div className="ninjadash-authentication-bottom">
            <p>
              Don`t have Mpin?<Link to="/login">login page</Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ClientMpin;
