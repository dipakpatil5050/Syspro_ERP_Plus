import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import DraftRuleAssignTable from '../../../container/Rule-Assignment-table/DraftRuleAssignTable';
import { getAllUsers, getRules } from '../../../Actions/Configuration/RuleAction';

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
  const dispatch = useDispatch();

  const [user, setUser] = useState('');
  const [selectedRules, setSelectedRules] = useState([]);
  const [draftRules, setDraftRules] = useState([]);

  const userList = useSelector((state) => state.config.allUsers);
  const rulesList = useSelector((state) => state.config.allRules);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getRules());
  }, [dispatch]);

  const handleRuleChange = (value) => {
    setSelectedRules(value);
    const selectedRuleDetails = rulesList.filter((rule) => value.includes(rule.Rule_id));
    setDraftRules(selectedRuleDetails);
  };

  // const handleAdd = () => {
  //   const selectedRuleDetails = rulesList.filter((rule) => selectedRules.includes(rule.Rule_id));
  //   setDraftRules(selectedRuleDetails);
  // };

  const handleRuleSubmit = async () => {
    // e.preventDefault();
    console.log('Selected User from the List :', user);
    console.log('Selected Rules from the list :', selectedRules);

    dispatch();
    form.resetFields();
    setUser('');
    setSelectedRules([]);
    setDraftRules([]);
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
                      {userList &&
                        userList.length > 0 &&
                        userList?.map((users) => (
                          <Option key={users.UserID} value={user.UserID}>
                            {users.UserName}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="rules"
                    label="Rules"
                    rules={[{ required: true, message: 'Please select rules to assign' }]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      showSearch
                      autoClearSearchValue
                      size="large"
                      onChange={handleRuleChange}
                      // onChange={(value) => setSelectedRules(value)}
                      placeholder="Select Rules from list "
                      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                      {rulesList &&
                        rulesList?.map((rule) => (
                          <Option key={rule.Rule_id} value={rule.Rule_id}>
                            {rule.Rule_Name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  {/* <Row justify="end">
                    <Col Row="end">
                      <div className="ninjadash-form-action">
                        <Button
                          onClick={handleAdd}
                          className="btn-signin"
                          type="primary"
                          size="large"
                          htmlType="button"
                        >
                          Review Rules
                        </Button>
                      </div>
                    </Col>
                  </Row> */}

                  <DraftRuleAssignTable draftRules={draftRules} />
                  <Row justify="center">
                    <Col>
                      <div className="ninjadash-form-action" style={{ marginTop: '30px' }}>
                        <Button
                          onClick={form.submit}
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
