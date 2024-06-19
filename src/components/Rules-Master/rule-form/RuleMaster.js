import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import data from './data.json';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import RuleCollection from '../../../container/Rule-collection-table/RuleCollection';

const { Option } = Select;

const PageRoutes = [
  {
    breadcrumbName: 'Configuration',
  },
  {
    breadcrumbName: 'Rule master',
  },
];

function RuleMaster() {
  const [ruleName, setRuleName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [filters, setFilters] = useState(data.filters);
  const [array, setArray] = useState();

  const handleRuleTypeChange = (value) => {
    setSelectedType(value);
    setSelectedValues([]);
  };

  const renderSelectOptions = () => {
    if (!selectedType) return null;

    const options = filters[selectedType].map((item) => (
      <Option key={item.Id} value={item.Id}>
        {item.Name}
      </Option>
    ));

    return (
      <Select
        mode="multiple"
        value={selectedValues}
        onChange={setSelectedValues}
        placeholder={`Select ${selectedType} values`}
      >
        {options}
      </Select>
    );
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Post Rule Data to API :', { ruleName, selectedType, selectedValues });
  };

  const handleAddValue = () => {
    setArray({ ruleName, selectedType, selectedValues });

    console.log('Rule Name : ', ruleName);
    console.log('Selected Type : ', selectedType);
    console.log('selected Values for type :', selectedValues);
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main ninjadash-pageheader-with-back" routes={PageRoutes} />
      <Main>
        <Row gutter={15}>
          <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} lg={16} xs={24}>
            <Cards title="Rule Master">
              <BasicFormWrapper className="mb-25">
                <Form name="ninjadash-vertical-form" layout="vertical" onFinish={handleSubmit}>
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
                  <Form.Item
                    name="ruletype"
                    label="Select Rule Type"
                    rules={[{ required: true, message: 'Please select rule type' }]}
                  >
                    <Select size="default" placeholder="Select Rule Type" onChange={handleRuleTypeChange}>
                      <Option value="Group">Group</Option>
                      <Option value="SubGroup">Sub-Group</Option>
                      <Option value="Category">Category</Option>
                      <Option value="Brand">Brand</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="rulevalue"
                    label={`Select ${selectedType} values`}
                    rules={[{ required: true, message: `Please select ${selectedType} values` }]}
                  >
                    {renderSelectOptions()}
                  </Form.Item>
                  <Row>
                    <Col lg={{ span: 16, offset: 5 }} md={{ span: 15, offset: 9 }} xs={{ span: 24, offset: 0 }}>
                      <div className="ninjadash-form-action">
                        <Button
                          onClick={handleAddValue}
                          className="btn-signin"
                          type="secondary"
                          size="large"
                          htmlType="button"
                        >
                          + Add Rule Type
                        </Button>
                        <Button className="btn-signin" type="primary" size="large" htmlType="submit">
                          Create Rule
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </BasicFormWrapper>
            </Cards>
          </Col>
        </Row>
        <RuleCollection />
      </Main>
    </>
  );
}

export default RuleMaster;
