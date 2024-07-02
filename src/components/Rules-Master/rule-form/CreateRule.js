import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Modal, Spin } from 'antd';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import RuleModalForm from '../../../container/forms/overview/RuleModalForm';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import TempRuleTable from '../../../container/Rule-collection-table/TempRuleTable';
import { clearTempRuleData } from '../../../redux/reducers/configSlice';
import { getRuleFilters, insertRuleToCollection } from '../../../Actions/Configuration/RuleAction';

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

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const RuleData = useSelector((state) => state.config.tempRuleData);
  const userData = useSelector((state) => state.auth.userData);

  const companyId = userData?.Data.CompanyID;
  const userId = userData?.Data.UserID;

  const loading = useSelector((state) => state.config.loading);

  const handleRuleSubmit = async (e) => {
    e.preventDefault();
    const Data = { ruleName, remark, RuleData };
    console.log('Rule Submit Post Data : ', Data);

    dispatch(insertRuleToCollection(ruleName, remark, companyId, userId, RuleData));
    dispatch(clearTempRuleData());
    form.resetFields();
    setRuleName('');
    setRemark('');
  };

  useEffect(() => {
    dispatch(getRuleFilters());
  }, []);

  return (
    <>
      <PageHeader
        className="ninjadash-page-header-main ninjadash-pageheader-with-back"
        title={
          <>
            <h4>Create Rule</h4>
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
        {/* {loading && (
          <>
            <Spin
              size="large"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: 99999,
                padding: '10px',
              }}
            />
          </>
        )} */}
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
                    />
                  </Form.Item>
                  <Form.Item name="remark" label="Remark">
                    <Input
                      type="text"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      size="large"
                      placeholder="write remark"
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
                          disabled={!ruleName}
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
                          disabled={!ruleName}
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
