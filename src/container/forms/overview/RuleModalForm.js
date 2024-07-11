import React, { useState, useEffect } from 'react';
import { Form, Button, Spin, Select, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VerticalFormStyleWrap } from './Style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { BasicFormWrapper } from '../../styled';
import { setTempRuleData, updateTempRuleData } from '../../../redux/reducers/configSlice';

const { Option } = Select;

const CenteredSpin = styled(Spin)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function RuleModalForm({ handleCancel, editRule, editIndex }) {
  const [form] = Form.useForm();

  const [ruleType, setRuleType] = useState(editRule ? editRule.selectedType : '');
  const [ruleValue, setRuleValue] = useState(editRule ? editRule.selectedValues : []);
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([]);

  const tempData = useSelector((state) => state.config.tempRuleData);
  const filters = useSelector((state) => state.config.ruleFilterData);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.config.loading);

  useEffect(() => {
    if (editRule) {
      setRuleType(editRule.selectedType);
      setRuleValue(editRule.selectedValues);
      form.setFieldsValue({
        ruletype: editRule.selectedType,
        rulevalue: editRule.selectedValues,
      });
    }
    const existingRuleTypes = tempData?.map((rule) => rule.selectedType);
    setSelectedRuleTypes(existingRuleTypes);
  }, [editRule, tempData, form]);

  const handleRuleTypeChange = (value) => {
    setRuleType(value);
    setRuleValue([]);
    form.setFieldsValue({ rulevalue: [] });
  };

  const renderSelectOptions = () => {
    if (!ruleType) return null;

    // option for rule value

    const options = filters[ruleType]?.map((item) => (
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

      const filterId = filters[ruleType]?.[0]?.FilterId;

      const newRule = {
        selectedType: ruleType,
        selectedValues: ruleValue,
        FilterId: filterId,
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

  const filterList = Object.keys(filters);
  const ruleTypeOptions = filterList?.filter((type) => !selectedRuleTypes.includes(type));

  return (
    <>
      <BasicFormWrapper>
        <VerticalFormStyleWrap>
          <Cards headless>
            {loading ? (
              <CenteredSpin size="large" />
            ) : (
              <Form form={form} name="ruleModal-form" layout="vertical">
                <Row justify="end">
                  <Col>
                    <div className="ninjadash-form-action">
                      <Button
                        htmlType="submit"
                        className="btn-signin"
                        type="primary"
                        onClick={handleAddOrUpdate}
                        size="large"
                      >
                        {editRule ? 'Update' : 'Add'}
                      </Button>
                    </div>
                  </Col>
                </Row>

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
                    disabled={!!editRule}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    {ruleTypeOptions?.map((type) => (
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
              </Form>
            )}
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
