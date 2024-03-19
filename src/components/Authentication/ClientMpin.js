import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthFormWrap } from '../../container/profile/authentication/overview/style';
import { setuserMpinData } from '../../redux/reducers/authReducer';

function ClientMpin() {
  const [mPin, setMPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.auth.loading);
  // const [form] = Form.useForm();

  const handleInputChange = (e) => {
    setMPin(e.target.value.toUpperCase());
  };

  const fetchData = async () => {
    const mpinapi = `http://103.67.238.230:1385/SysMpin/authenticateSysmpin?mPin=${mPin}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your_token_here',
      'x-api-key': mPin,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(mpinapi, { mPin }, { headers });

      const apidata = response.data?.Data;
      const apiMpin = apidata?.mPin;
      dispatch(setuserMpinData(response.data));
      setIsLoading(false);
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
      setIsLoading(false);
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

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title">mPin to Galaxy Infotech</h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" onFinish={handlempinSubmit} layout="vertical">
              <Form.Item
                name="mPin"
                rules={[{ message: 'Please input your mpin !', required: true }]}
                // initialValue="SYSPRO04"
                label="Connect to your Business"
              >
                <Input
                  placeholder="Enter your mPin"
                  value={mPin}
                  onChange={handleInputChange}
                  name="mPin"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large" onClick={handlempinSubmit}>
                  {isLoading ? 'Connecting...' : 'Connect Now'}
                </Button>
              </Form.Item>
              {/* <p className="ninjadash-form-divider">
                <span>Or</span>
              </p> */}
            </Form>
          </div>
          {/* <div className="ninjadash-authentication-bottom">
            <p>
              Don`t have Mpin?<Link to="/admin">Dashboard</Link>
            </p>
          </div> */}
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ClientMpin;
