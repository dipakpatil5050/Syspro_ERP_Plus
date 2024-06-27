import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Modal } from 'antd';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import { Link } from 'react-router-dom';
import RuleModalForm from '../../../container/forms/overview/RuleModalForm';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import TempRuleTable from '../../../container/Rule-collection-table/TempRuleTable';

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

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

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
      {/* .gzVMmV{
            padding: 0px 30px 20px;
            min-height: 715px;
            background-color: transparent;
      } */}

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards title="Rule Master">
              <BasicFormWrapper className="mb-25">
                <Form form={form} name="ninjadash-vertical-form" layout="vertical">
                  <Form.Item
                    name="name"
                    label="Rule Name"
                    rules={[{ required: true, message: 'Please enter rule name' }]}
                  >
                    <Input
                      type="text"
                      value={ruleName}
                      onChange={(e) => setRuleName(e.target.value)}
                      size="large"
                      placeholder="e.g. Rule 1"
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
                        <Button className="btn-signin" type="primary" size="large" htmlType="submit">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>

                <Modal title="Add Rule" open={isModalVisible} onCancel={handleCancel} destroyOnClose footer={null}>
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
