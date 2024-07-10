import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import { clearTempRuleData, setDraftRuleAssign } from '../../../redux/reducers/configSlice';
import TempRuleTable from '../../../container/Rule-collection-table/TempRuleTable';
import DraftRuleAssignTable from '../../../container/Rule-Assignment-table/DraftRuleAssignTable';

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Rule Assignment',
  },
];

const { Option } = Select;

function RuleAssignment() {
  const [form] = Form.useForm();

  const [user, setUser] = useState('');
  const [rule, setRule] = useState([]);

  const dispatch = useDispatch();

  const resetForm = () => {
    dispatch(clearTempRuleData());
    form.resetFields();
    setUser('');
    setRule('');
  };

  const handleAdd = () => {
    console.log('Add');

    const AssignRule = {
      user: user,
      rule: rule,
    };
    dispatch(setDraftRuleAssign(AssignRule));
  };

  const handleRuleSubmit = async (e) => {
    e.preventDefault();
    console.log('Selected User from the List :', rule);
    console.log('Selected Rules from the list :', user);
  };

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        title={
          <>
            <h4>Rule Assignment</h4>
          </>
        }
        routes={PageRoutes}
      />

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards tielless headless>
              <BasicFormWrapper className="mb-25">
                <Form form={form} onFinish={handleRuleSubmit} name="ninjadash-vertical-form" layout="vertical">
                  <Form.Item name="user" label="User Name" rules={[{ required: true, message: 'Please select user' }]}>
                    <Select
                      allowClear
                      showSearch
                      autoClearSearchValue
                      size="default"
                      onChange={(value) => setUser(value)}
                      placeholder="Select user from list "
                      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                      <Option value="user1">User 1</Option>
                      <Option value="user2">User 2</Option>
                      <Option value="user3">User 3</Option>
                      <Option value="user4">User 4</Option>
                      <Option value="user5">User 5</Option>
                      <Option value="user6">User 6</Option>
                      <Option value="user7">User 7</Option>
                      <Option value="user8">User 8</Option>
                      <Option value="user9">User 9</Option>
                      <Option value="user10">User 10</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="rule"
                    label="Rules"
                    rules={[{ required: true, message: 'Please select rules to assign' }]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      showSearch
                      autoClearSearchValue
                      size="large"
                      onChange={(value) => setRule(value)}
                      placeholder="Select Rules from list "
                      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                      <Option value="rule1">Rule 1</Option>
                      <Option value="rule2">Rule 2</Option>
                      <Option value="rule3">Rule 3</Option>
                      <Option value="rule4">Rule 4</Option>
                      <Option value="rule5">Rule 5</Option>
                      <Option value="rule6">Rule 6</Option>
                      <Option value="rule7">Rule 7</Option>
                      <Option value="rule8">Rule 8</Option>
                      <Option value="rule9">Rule 9</Option>
                    </Select>
                  </Form.Item>

                  <Row justify="end">
                    <Col Row="end">
                      <div className="ninjadash-form-action">
                        <Button
                          // onClick={showModal}
                          onClick={handleAdd}
                          className="btn-signin"
                          type="primary"
                          size="large"
                          htmlType="button"
                        >
                          + Assign
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  {/* <TempRuleTable mode={mode} /> */}
                  <DraftRuleAssignTable />
                  <Row justify="center">
                    <Col>
                      <div className="ninjadash-form-action" style={{ marginTop: '30px' }}>
                        <Button
                          onClick={handleRuleSubmit}
                          className="btn-signin"
                          type="primary"
                          size="large"
                          htmlType="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </BasicFormWrapper>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default RuleAssignment;
