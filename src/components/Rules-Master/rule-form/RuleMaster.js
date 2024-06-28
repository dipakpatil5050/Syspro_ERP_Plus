import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import toast from 'react-hot-toast';
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
  {
    breadcrumbName: 'Rule Collection',
  },
];

function RuleMaster() {
  const [ruleName, setRuleName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [filters, setFilters] = useState(data.filters);
  const [rules, setRules] = useState([]);
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([]);
  const [isRuleNameDisabled, setIsRuleNameDisabled] = useState(false);

  const [form] = Form.useForm();

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
        allowClear
        autoClearSearchValue
        showSearch
        mode="multiple"
        value={selectedValues}
        onChange={setSelectedValues}
        placeholder={`Select ${selectedType} values`}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        {options}
      </Select>
    );
  };

  const handleSubmit = () => {
    console.log('Post Rule Data to API : Rules :', rules);

    setRules([]);
    form.resetFields();
    setRuleName('');
    setSelectedType('');
    setSelectedValues([]);
    setSelectedRuleTypes([]);
    setIsRuleNameDisabled(false);
    toast.success('Rule Created Successfully!');
  };

  const handleAddValue = () => {
    if (!ruleName || !selectedType || selectedValues.length === 0) {
      alert('Please fill all fields before adding a rule type.');
      return;
    }

    const newRule = { ruleName, selectedType, selectedValues };
    setRules([...rules, newRule]);
    setSelectedRuleTypes([...selectedRuleTypes, selectedType]);
    setIsRuleNameDisabled(true);

    setSelectedType('');
    setSelectedValues([]);
    form.setFieldsValue({
      ruletype: '',
      rulevalue: [],
    });
    console.log('Added Rule : ', rules);
    console.log('Selected Rule Types :', selectedRuleTypes);
  };

  const getSelectedValueNames = (type, values) => {
    return values.map((valueId) => {
      const filter = filters[type].find((filter) => filter.Id === valueId);
      return filter ? filter.Name : valueId;
    });
  };

  const ruleTypeOptions = ['Group', 'SubGroup', 'Category', 'Brand', 'Design', 'Catalogue', 'Colour', 'Size'].filter(
    (type) => !selectedRuleTypes.includes(type),
  );

  return (
    <>
      <PageHeader className="ninjadash-page-header-main ninjadash-pageheader-with-back" routes={PageRoutes} />
      <Main>
        {/* <Row gutter={15}>
          <Col xxl={{ span: 12, offset: 6 }} xl={{ span: 16, offset: 4 }} lg={16} xs={24}>
            <Cards title="Rule Master">
              <BasicFormWrapper className="mb-25">
                <Form form={form} name="ninjadash-vertical-form" layout="vertical" onFinish={handleSubmit}>
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
                      disabled={isRuleNameDisabled}
                      placeholder="e.g. Rule 1"
                    />
                  </Form.Item>
                  <Form.Item name="ruletype" label="Select Rule Type">
                    <Select
                      allowClear
                      autoClearSearchValue
                      showSearch
                      size="default"
                      placeholder="Select Rule Type"
                      onChange={handleRuleTypeChange}
                      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                      {ruleTypeOptions.map((type) => (
                        <Option key={type} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {selectedType && (
                    <Form.Item name="rulevalue" label={`Select ${selectedType} values`} size="large">
                      {renderSelectOptions()}
                    </Form.Item>
                  )}
                  <Row>
                    <Col lg={{ span: 16, offset: 6 }} md={{ span: 15, offset: 9 }} xs={{ span: 24, offset: 0 }}>
                      <div className="ninjadash-form-action">
                        <Button
                          onClick={handleAddValue}
                          className="btn-signin"
                          type="secondary"
                          size="large"
                          htmlType="button"
                        >
                          + Add to Rule
                        </Button>
                        <Button className="btn-signin" type="primary" size="large" htmlType="submit">
                          Create Rule
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </BasicFormWrapper>
              {rules.length > 0 && (
                <div>
                  <h3>Added Rule:</h3>
                  <ul>
                    <b style={{ color: 'green' }}>Rule Name : </b>
                    {rules[0].ruleName}
                    {rules.map((rule, index) => (
                      <li key={index}>
                        <b>{rule.selectedType}</b>:{' '}
                        {getSelectedValueNames(rule.selectedType, rule.selectedValues).join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Cards>
          </Col>
        </Row> */}
        <RuleCollection />
      </Main>
    </>
  );
}

export default RuleMaster;
