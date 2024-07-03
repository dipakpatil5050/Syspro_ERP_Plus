import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Modal } from 'antd';
import { Link, useParams } from 'react-router-dom';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import { useSelector, useDispatch } from 'react-redux';
import RuleModalForm from '../../../container/forms/overview/RuleModalForm';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import TempRuleTable from '../../../container/Rule-collection-table/TempRuleTable';
import { clearTempRuleData } from '../../../redux/reducers/configSlice';
import {
  getRuleDataById,
  getRuleFilters,
  insertRuleToCollection,
  updateRuleToCollection,
} from '../../../Actions/Configuration/RuleAction';

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Create Rule',
  },
];

function CreateRule() {
  const [ruleName, setRuleName] = useState('');
  const [remark, setRemark] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { mode, ruleId } = useParams();

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  // tempData

  const tempData = useSelector((state) => state.config.tempRuleData);
  const ruleData = useSelector((state) => state.config.singleRuleData);

  const userData = useSelector((state) => state.auth.userData);
  console.log('Single Rule data : ', ruleData);

  const companyId = userData?.Data.CompanyID;
  const userId = userData?.Data.UserID;

  const loading = useSelector((state) => state.config.loading);

  useEffect(() => {
    if (ruleData.Table && ruleData.Table.length > 0) {
      const rule = ruleData.Table[0];
      setRuleName(rule.Rule_Name);
      setRemark(rule.Remark);
      form.setFieldsValue({
        rulename: rule.Rule_Name,
        remark: rule.Remark,
      });
    }
  }, [ruleData, form]);

  useEffect(() => {
    dispatch(getRuleFilters());
  }, []);

  // const handleRuleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(insertRuleToCollection(ruleName, remark, companyId, userId, tempData));
  //   dispatch(clearTempRuleData());
  //   form.resetFields();
  //   setRuleName('');
  //   setRemark('');
  // };

  const handleRuleSubmit = (values) => {
    if (mode === 'edit' && ruleId) {
      dispatch(updateRuleToCollection(ruleId, ruleName, remark, companyId, userId, ruleData));
    } else {
      dispatch(insertRuleToCollection(ruleName, remark, companyId, userId, tempData)).then(() => {
        dispatch(clearTempRuleData());
        form.resetFields();
        setRuleName('');
        setRemark('');
        // navigate('/rule-collection');
      });
    }
  };

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        title={
          <>
            <h4>{mode === 'edit' ? 'Edit Rule' : 'Create Rule'}</h4>
            <span className="back-link">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
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
            <Cards title="Rule Master">
              <BasicFormWrapper className="mb-25">
                <Form form={form} onFinish={handleRuleSubmit} name="ninjadash-vertical-form" layout="vertical">
                  <Form.Item
                    name="rulename"
                    label="Rule Name"
                    rules={[{ required: true, message: 'Please enter rule name' }]}
                  >
                    <Input
                      type="text"
                      value={ruleName}
                      onChange={(e) => setRuleName(e.target.value)}
                      size="large"
                      placeholder="Enter rule name : eg.Net Saree"
                      disabled={mode === 'view'}
                    />
                  </Form.Item>
                  <Form.Item name="remark" label="Remark">
                    <Input
                      type="text"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      size="large"
                      placeholder="write remark"
                      disabled={mode === 'view'}
                    />
                  </Form.Item>

                  <Row justify="end">
                    <Col Row="end">
                      <div className="ninjadash-form-action">
                        <Button
                          onClick={showModal}
                          className="btn-signin"
                          type="primary"
                          size="large"
                          htmlType="button"
                          disabled={!ruleName || mode === 'view'}
                        >
                          + Add Rule
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <TempRuleTable />
                  <Row justify="center">
                    <Col>
                      <div className="ninjadash-form-action" style={{ marginTop: '30px' }}>
                        <Button
                          onClick={handleRuleSubmit}
                          className="btn-signin"
                          type="primary"
                          size="large"
                          htmlType="submit"
                          disabled={!ruleName || mode === 'view'}
                        >
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
                <Modal
                  loading={loading}
                  title="Add Rule"
                  open={isModalVisible}
                  onCancel={handleCancel}
                  destroyOnClose
                  footer={null}
                >
                  <RuleModalForm handleCancel={handleCancel} />
                </Modal>
              </BasicFormWrapper>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default CreateRule;
