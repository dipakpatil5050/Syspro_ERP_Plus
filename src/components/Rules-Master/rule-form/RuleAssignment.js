import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import DraftRuleAssignTable from '../../../container/Rule-Assignment-table/DraftRuleAssignTable';
import {
  assignRuleInsert,
  getAllUsers,
  getRuleFilters,
  getRules,
  getUserDataById,
} from '../../../Actions/Configuration/RuleAction';
import { clearTempRuleData } from '../../../redux/reducers/configSlice';

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Rule Assignment',
  },
  {
    breadcrumbName: 'User Rule Collection',
  },
  {
    breadcrumbName: 'Assign New Rule',
  },
];

const { Option } = Select;

function RuleAssignment() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { mode, userId } = useParams();

  const [user, setUser] = useState('');
  const [selectedRules, setSelectedRules] = useState([]);
  const [draftRules, setDraftRules] = useState([]);

  const userList = useSelector((state) => state.config.allUsers);
  const rulesList = useSelector((state) => state.config.allRules);
  const singleUserData = useSelector((state) => state.config.singleUserData);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getRules());
    dispatch(getRuleFilters());

    if (mode === 'edit' || mode === 'view') {
      dispatch(getUserDataById(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && singleUserData) {
      const userDataList = singleUserData[0];
      setUser(userDataList?.UserID);
      setSelectedRules(userDataList?.Rule_Key);

      const ruleIds = userDataList?.Rule_Key.split(',').map(Number);
      form.setFieldsValue({
        user: userDataList?.UserID,
        rules: ruleIds,
      });
      const selectedRuleDetails = rulesList.filter((rule) => ruleIds?.includes(rule.Rule_id));
      setDraftRules(selectedRuleDetails);
    }
  }, [singleUserData, mode, rulesList, form]);

  const handleRuleChange = (value) => {
    setSelectedRules(value);
    const selectedRuleDetails = rulesList.filter((rule) => value?.includes(rule.Rule_id));
    setDraftRules(selectedRuleDetails);
  };

  const handleRuleSubmit = async () => {
    const selectedRuleDetails = rulesList.filter((rule) => selectedRules?.includes(rule.Rule_id));
    const ruleFilterStrings = selectedRuleDetails.map((rule) => rule.RuleFilterString);

    await dispatch(assignRuleInsert(user, selectedRules, ruleFilterStrings));

    form.resetFields();
    setUser('');
    setSelectedRules([]);
    setDraftRules([]);
    dispatch(clearTempRuleData());
    window.history.back();
  };

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        title={
          <>
            <h4>
              {mode === 'edit' ? 'Edit Assigned Rule' : mode === 'view' ? 'View Assigned Rule' : 'Rule Assignment'}
            </h4>

            <span className="back-link">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                  dispatch(clearTempRuleData());
                  form.resetFields();
                }}
                to="#"
              >
                <UilArrowLeft />
                Go back
              </Link>
            </span>
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
                      disabled={mode === 'view' || mode === 'edit'}
                      allowClear
                      showSearch
                      autoClearSearchValue
                      size="default"
                      onChange={(value) => setUser(value)}
                      placeholder="Select user from list "
                      filterOption={(input, option) => option.children.toLowerCase()?.includes(input.toLowerCase())}
                    >
                      {userList &&
                        userList.length > 0 &&
                        userList?.map((users) => (
                          <Option key={users.UserID} value={users.UserID}>
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
                      disabled={mode === 'view'}
                      allowClear
                      showSearch
                      autoClearSearchValue
                      size="large"
                      onChange={handleRuleChange}
                      placeholder="Select Rules from list "
                      filterOption={(input, option) => option.children.toLowerCase()?.includes(input.toLowerCase())}
                    >
                      {rulesList &&
                        rulesList?.map((rule) => (
                          <Option key={rule.Rule_id} value={rule.Rule_id}>
                            {rule.Rule_Name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>

                  <DraftRuleAssignTable draftRules={draftRules} />
                  <Row justify="center">
                    <Col>
                      <div className="ninjadash-form-action" style={{ marginTop: '30px' }}>
                        <Button
                          disabled={mode === 'view'}
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
