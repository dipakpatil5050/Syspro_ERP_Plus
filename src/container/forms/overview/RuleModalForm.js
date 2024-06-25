import React, { useState } from 'react';
import { Form, Button, Spin, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import data from './data.json';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { setTempRuleData } from '../../../redux/reducers/configSlice';

const { Option } = Select;

function RuleModalForm({ handleCancel }) {
  const [form] = Form.useForm();
  const [ruleType, setRuleType] = useState('');
  const [ruleValue, setRuleValue] = useState([]);

  const [filters, setFilters] = useState(data.filters);
  const [rules, setRules] = useState([]);
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([]);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleRuleTypeChange = (value) => {
    setRuleType(value);
    setRuleValue([]);
  };

  const renderSelectOptions = () => {
    if (!ruleType) return null;

    const options = filters[ruleType].map((item) => (
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
        value={ruleValue}
        onChange={setRuleValue}
        placeholder={`Select ${ruleType} values`}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        {options}
      </Select>
    );
  };

  const handleAdd = () => {
    if (!ruleType || ruleValue.length === 0) {
      alert('Please fill all fields before adding a rule type.');
      return;
    }

    const newRule = {
      selectedType: ruleType,
      selectedValues: ruleValue,
    };

    setRules([...rules, newRule]);
    setSelectedRuleTypes([...selectedRuleTypes, ruleType]);
    dispatch(
      setTempRuleData({
        selectedType: ruleType,
        selectedValues: ruleValue,
      }),
    );

    setRuleType('');
    setRuleValue([]);
    form.setFieldsValue({
      ruletype: '',
      rulevalue: [],
    });
    handleCancel();
    console.log('Added Rule : ', rules);
    console.log('Selected Rule Types :', selectedRuleTypes);
  };

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
      {loading && (
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
      )}
      <BasicFormWrapper>
        <VerticalFormStyleWrap>
          <Cards title="Add Rule">
            <Form form={form} onSubmit={handleAdd} name="inquiry-form" layout="vertical">
              <Form.Item
                name="ruletype"
                label="Select Rule Type"
                rules={[{ required: true, message: 'Please enter rule type' }]}
              >
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

              {ruleType && (
                <Form.Item name="rulevalue" label={`Select ${ruleType} values`} size="large">
                  {renderSelectOptions()}
                </Form.Item>
              )}

              <div className="ninjadash-form-action">
                <Button
                  loading={loading}
                  htmlType="submit"
                  className="btn-signin"
                  type="primary"
                  onClick={handleAdd}
                  size="large"
                >
                  + Add
                </Button>
              </div>
            </Form>
          </Cards>
        </VerticalFormStyleWrap>
      </BasicFormWrapper>
    </>
  );
}

RuleModalForm.propTypes = {
  handleCancel: PropTypes.func,
};

export default RuleModalForm;
