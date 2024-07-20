import React, { useState, useEffect } from 'react';
import { Form, Spin, Select, Button, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import {
  getCompany,
  getLocation,
  getPremise,
  getYearDuration,
  saveCompanyConfig,
} from '../../../Actions/Configuration/CompanyAction';

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
  const companyList = useSelector((state) => state.config.company);
  const yearDurationList = useSelector((state) => state.config.yearDuration);
  const premiseList = useSelector((state) => state.config.premise);
  const locationList = useSelector((state) => state.config.location);
  const userData = useSelector((state) => state.auth.userData.Data);

  useEffect(() => {
    dispatch(getCompany());
    dispatch(getYearDuration());
    dispatch(getPremise());
    dispatch(getLocation());
  }, []);

  const handleConfigSubmit = () => {
    dispatch(saveCompanyConfig(userData, company, duration, premise, location));
    form.resetFields();
    setCompany('');
    setPremise('');
    setDuration('');
    setLocation('');
    handleCancel();
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
                    {companyList &&
                      companyList.length > 0 &&
                      companyList?.map((users) => (
                        <Option key={users.Company_ID} value={users.Company_ID}>
                          {users.Company_name}
                        </Option>
                      ))}
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
                    {yearDurationList &&
                      yearDurationList.length > 0 &&
                      yearDurationList?.map((users) => (
                        <Option key={users.Year_ID} value={users.Year_ID}>
                          {users.Year}
                        </Option>
                      ))}
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
                    {premiseList &&
                      premiseList.length > 0 &&
                      premiseList?.map((users) => (
                        <Option key={users.Premise_Id} value={users.Premise_Id}>
                          {users.Premise_Name}
                        </Option>
                      ))}
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
                    {locationList &&
                      locationList.length > 0 &&
                      locationList?.map((users) => (
                        <Option key={users.dept_id} value={users.dept_id}>
                          {users.dept_name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Row justify="center">
                  <Col>
                    <div className="ninjadash-form-action">
                      <Button disabled={!company} className="btn-signin" type="primary" htmlType="submit" size="large">
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
