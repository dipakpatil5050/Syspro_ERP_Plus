import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Select, Modal } from 'antd';
import toast from 'react-hot-toast';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import UilPaperclip from '@iconscout/react-unicons/icons/uil-paperclip';
import { Link } from 'react-router-dom';
import data from './data.json';
import { PageHeader } from '../../page-headers/page-headers';
import { Cards } from '../../cards/frame/cards-frame';
import { Main, BasicFormWrapper } from '../../styled';
import TempRuleTable from '../../../container/Rule-collection-table/TempRuleTable';

const { Option } = Select;

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
  const [selectedType, setSelectedType] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);
  const [filters, setFilters] = useState(data.filters);
  const [rules, setRules] = useState([]);
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([]);
  const [isRuleNameDisabled, setIsRuleNameDisabled] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

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

  //   const handleAddValue = () => {
  //     if (!ruleName || !selectedType || selectedValues.length === 0) {
  //       alert('Please fill all fields before adding a rule type.');
  //       return;
  //     }

  //     const newRule = { ruleName, selectedType, selectedValues };
  //     setRules([...rules, newRule]);
  //     setSelectedRuleTypes([...selectedRuleTypes, selectedType]);
  //     setIsRuleNameDisabled(true);

  //     setSelectedType('');
  //     setSelectedValues([]);
  //     form.setFieldsValue({
  //       ruletype: '',
  //       rulevalue: [],
  //     });
  //     console.log('Added Rule : ', rules);
  //     console.log('Selected Rule Types :', selectedRuleTypes);
  //   };

  const getSelectedValueNames = (type, values) => {
    return values.map((valueId) => {
      const filter = filters[type].find((filter) => filter.Id === valueId);
      return filter ? filter.Name : valueId;
    });
  };

  const ruleTypeOptions = ['Group', 'SubGroup', 'Category', 'Brand'].filter(
    (type) => !selectedRuleTypes.includes(type),
  );

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
        <Row gutter={15}>
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
                </Form>
              </BasicFormWrapper>
            </Cards>
            <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
              {/* <InquiryForm handleCancel={handleCancel} /> */}
              <h1>Modal inputs </h1>
            </Modal>
          </Col>
        </Row>
        <TempRuleTable />
      </Main>
    </>
  );
}

export default CreateRule;
