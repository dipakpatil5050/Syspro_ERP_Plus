import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';

const { Option } = Select;

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Rule Assignment',
  },
];

function RuleAssignment() {
  const [user, setUser] = useState('');
  const [rule, setRule] = useState('');

  const handleRuleAssignSubmit = () => {};

  const handleRuleChange = () => {
    console.log('Handle Rule Change');
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main ninjadash-pageheader-with-back" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} lg={16} xs={24}>
            <Cards title="Rule Assignment to User">
              <BasicFormWrapper className="mb-25">
                <Form name="ninjadash-vertical-form" layout="vertical" onFinish={handleRuleAssignSubmit}>
                  <Form.Item
                    name="ruletype"
                    label="Select User"
                    rules={[{ required: true, message: 'Please select rule type' }]}
                  >
                    <Select size="default" placeholder="Select Rule Type">
                      <Option value="Group">User 1</Option>
                      <Option value="SubGroup">User 2</Option>
                      <Option value="Category">User 3</Option>
                      <Option value="Brand">User 4</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="rulevalue"
                    label="Select Rule to Assign"
                    rules={[{ required: true, message: 'Please select  values' }]}
                  >
                    <Select size="default" placeholder="Select Rule Type">
                      <Option value="user1">Rule 1</Option>
                      <Option value="user2">Rule 2</Option>
                      <Option value="user3">Rule 3</Option>
                      <Option value="user4">Rule 4</Option>
                      <Option value="user4">Rule 5</Option>
                      <Option value="user4">Rule 6</Option>
                      <Option value="user4">Rule 7</Option>
                      <Option value="user4">Rule 8</Option>
                      <Option value="user4">Rule 9</Option>
                    </Select>
                  </Form.Item>
                  {/* {renderSelectOptions()} */}
                  <Row>
                    <Col lg={{ span: 16, offset: 9 }} md={{ span: 15, offset: 9 }} xs={{ span: 24, offset: 0 }}>
                      <div className="ninjadash-form-action">
                        <Button className="btn-signin" type="primary" size="large" htmlType="submit">
                          Apply Rule
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
