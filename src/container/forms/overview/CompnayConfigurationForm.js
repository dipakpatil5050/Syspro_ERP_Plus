import React, { useState, useEffect } from 'react';
import { Form, Spin, Select, Button, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';

const { Option } = Select;

const CenteredSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function CompnayConfigurationForm({ handleCancel }) {
  const [form] = Form.useForm();

  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [premise, setPremise] = useState('');
  const [location, setLocation] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.config.loading);

  const handleConfigSubmit = () => {
    form.validateFields().then(() => {
      handleCancel();
    });
  };

  return (
    <>
      <BasicFormWrapper>
        <VerticalFormStyleWrap>
          <Cards titless headless>
            {loading ? (
              <CenteredSpin size="large" />
            ) : (
              <Form form={form} onFinish={handleConfigSubmit} name="ruleModal-form" layout="vertical">
                <Form.Item
                  name="company"
                  label="Select Company Name"
                  rules={[{ required: true, message: 'Please select user' }]}
                >
                  <Select
                    allowClear
                    showSearch
                    autoClearSearchValue
                    size="default"
                    onChange={(value) => setCompany(value)}
                    placeholder="Select Company from list "
                    filterOption={(input, option) => option.children.toLowerCase()?.includes(input.toLowerCase())}
                  >
                    {/* {userList &&
                      userList.length > 0 &&
                      userList?.map((users) => (
                        <Option key={users.UserID} value={users.UserID}>
                          {users.UserName}
                        </Option>
                      ))} */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="duration"
                  label="Select financial year Duration"
                  rules={[{ required: true, message: 'Please select duration' }]}
                >
                  <Select
                    allowClear
                    showSearch
                    autoClearSearchValue
                    size="default"
                    onChange={(value) => setDuration(value)}
                    placeholder="Select Duration from list "
                    filterOption={(input, option) => option.children.toLowerCase()?.includes(input.toLowerCase())}
                  >
                    {/* {userList &&
                      userList.length > 0 &&
                      userList?.map((users) => (
                        <Option key={users.UserID} value={users.UserID}>
                          {users.UserName}
                        </Option>
                      ))} */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="premise"
                  label="Select Premise"
                  rules={[{ required: true, message: 'Please select Premise' }]}
                >
                  <Select
                    allowClear
                    showSearch
                    autoClearSearchValue
                    size="default"
                    onChange={(value) => setPremise(value)}
                    placeholder="Select Premise from list "
                    filterOption={(input, option) => option.children.toLowerCase()?.includes(input.toLowerCase())}
                  >
                    {/* {userList &&
                      userList.length > 0 &&
                      userList?.map((users) => (
                        <Option key={users.UserID} value={users.UserID}>
                          {users.UserName}
                        </Option>
                      ))} */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="location"
                  label="Select location"
                  rules={[{ required: true, message: 'Please select location' }]}
                >
                  <Select
                    allowClear
                    showSearch
                    autoClearSearchValue
                    size="default"
                    onChange={(value) => setLocation(value)}
                    placeholder="Select Company Location"
                    filterOption={(input, option) => option.children.toLowerCase()?.includes(input.toLowerCase())}
                  >
                    {/* {userList &&
                      userList.length > 0 &&
                      userList?.map((users) => (
                        <Option key={users.UserID} value={users.UserID}>
                          {users.UserName}
                        </Option>
                      ))} */}
                  </Select>
                </Form.Item>
                <Row justify="center">
                  <Col>
                    <div className="ninjadash-form-action">
                      <Button className="btn-signin" type="primary" htmlType="submit" size="large">
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Cards>
        </VerticalFormStyleWrap>
      </BasicFormWrapper>
    </>
  );
}

CompnayConfigurationForm.propTypes = {
  handleCancel: PropTypes.func,
};

export default CompnayConfigurationForm;
