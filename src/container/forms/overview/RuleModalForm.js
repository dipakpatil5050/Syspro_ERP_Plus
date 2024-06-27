import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import data from './data.json';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { setTempRuleData, updateTempRuleData } from '../../../redux/reducers/configSlice';

const { Option } = Select;

function RuleModalForm({ handleCancel, editRule, editIndex }) {
  const [form] = Form.useForm();
  const [ruleType, setRuleType] = useState(editRule ? editRule.selectedType : '');
  const [ruleValue, setRuleValue] = useState(editRule ? editRule.selectedValues : []);

  const [filters, setFilters] = useState(data.filters);
  const [rules, setRules] = useState([]);
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([]);
  const tempData = useSelector((state) => state.config.tempRuleData);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (editRule) {
      setRuleType(editRule.selectedType);
      setRuleValue(editRule.selectedValues);
      form.setFieldsValue({
        ruletype: editRule.selectedType,
        rulevalue: editRule.selectedValues,
      });
    }
    const existingRuleTypes = tempData.map((rule) => rule.selectedType);
    setSelectedRuleTypes(existingRuleTypes);
  }, [editRule, tempData, form]);

  const handleRuleTypeChange = (value) => {
    setRuleType(value);
    setRuleValue([]);
    form.setFieldsValue({ rulevalue: [] });
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

  const handleAddOrUpdate = () => {
    form.validateFields().then(() => {
      if (!ruleType || ruleValue.length === 0) {
        alert('Please fill all fields before adding or updating a rule.');
        return;
      }

      const newRule = {
        selectedType: ruleType,
        selectedValues: ruleValue,
      };

      if (editRule) {
        dispatch(updateTempRuleData({ index: editIndex, updatedRule: newRule }));
      } else {
        dispatch(setTempRuleData(newRule));
      }

      setSelectedRuleTypes([...selectedRuleTypes, ruleType]);

      setRuleType('');
      setRuleValue([]);
      form.resetFields();
      // form.setFieldsValue({
      //   ruletype: '',
      //   rulevalue: [],
      // });
      handleCancel();
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
          <Cards headless>
            <Form form={form} name="ruleModal-form" layout="vertical">
              <Form.Item
                name="ruletype"
                label="Select Rule Type"
                rules={[{ required: true, message: 'Please enter rule type' }]}
                initialValue={ruleType}
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
                <Form.Item name="rulevalue" label={`Select ${ruleType} values`} size="large" initialValue={ruleValue}>
                  {renderSelectOptions()}
                </Form.Item>
              )}

              <div className="ninjadash-form-action">
                <Button
                  loading={loading}
                  htmlType="submit"
                  className="btn-signin"
                  type="primary"
                  onClick={handleAddOrUpdate}
                  size="large"
                >
                  {editRule ? 'Update' : 'Add'}
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
  editRule: PropTypes.object,
  editIndex: PropTypes.number,
};

export default RuleModalForm;
