import { Button } from 'antd';
import React, { useState, useEffect } from 'react';

function RuleManagement() {
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rules, setRules] = useState([]);
  const [ruleName, setRuleName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedRule, setSelectedRule] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories, groups, subgroups, brands, and rules from the backend
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('/api/categories');
        const groupsResponse = await fetch('/api/groups');
        const subgroupsResponse = await fetch('/api/subgroups');
        const brandsResponse = await fetch('/api/brands');
        const rulesResponse = await fetch('/api/admin/rules');
        setCategories(await categoriesResponse.json());
        setGroups(await groupsResponse.json());
        setSubgroups(await subgroupsResponse.json());
        setBrands(await brandsResponse.json());
        setRules(await rulesResponse.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rule = {
      name: ruleName,
      type: selectedType,
      value: selectedValue,
    };

    try {
      let response;
      if (selectedRule) {
        // Update rule
        response = await fetch(`/api/admin/rules/${selectedRule.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rule),
        });
      } else {
        // Create new rule
        response = await fetch('/api/admin/rules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rule),
        });
      }

      if (response.ok) {
        setMessage('Rule saved successfully.');
        setSelectedRule(null);
        setRuleName('');
        setSelectedType('');
        setSelectedValue('');
        // fetchData(); // Refresh rules
      } else {
        setMessage('Failed to save rule.');
      }
    } catch (error) {
      console.error('Error saving rule:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleEdit = (rule) => {
    setSelectedRule(rule);
    setRuleName(rule.name);
    setSelectedType(rule.type);
    setSelectedValue(rule.value);
  };

  const handleDelete = async (ruleId) => {
    try {
      const response = await fetch(`/api/admin/rules/${ruleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Rule deleted successfully.');
        // fetchData(); // Refresh rules
      } else {
        setMessage('Failed to delete rule.');
      }
    } catch (error) {
      console.error('Error deleting rule:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const createSelectOptions = (items, labelKey, valueKey) => {
    return items.map((item) => (
      <option key={item[valueKey]} value={item[valueKey]}>
        {item[labelKey]}
      </option>
    ));
  };

  const renderSelect = () => {
    switch (selectedType) {
      case 'Category':
        return (
          <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            <option value="">--Select Category--</option>
            {createSelectOptions(categories, 'name', 'id')}
          </select>
        );
      case 'Group':
        return (
          <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            <option value="">--Select Group--</option>
            {createSelectOptions(groups, 'name', 'id')}
          </select>
        );
      case 'Sub-Group':
        return (
          <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            <option value="">--Select Sub-Group--</option>
            {createSelectOptions(subgroups, 'name', 'id')}
          </select>
        );
      case 'Brand':
        return (
          <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            <option value="">--Select Brand--</option>
            {createSelectOptions(brands, 'name', 'id')}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Rule Management</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ruleName">Rule Name:</label>
          <input type="text" id="ruleName" value={ruleName} onChange={(e) => setRuleName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="typeSelect">Select Rule Type:</label>
          <select id="typeSelect" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">--Select Type--</option>
            <option value="Category">Category</option>
            <option value="Group">Group</option>
            <option value="Sub-Group">Sub-Group</option>
            <option value="Brand">Brand</option>
          </select>
        </div>
        <div>
          <label htmlFor="valueSelect">Select Value:</label>
          {renderSelect()}
        </div>
        <button type="submit">{selectedRule ? 'Update Rule' : 'Create Rule'}</button>
      </form>
      <h2>Rules Collection</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule.id}>
            {rule.name} - {rule.type} - {rule.value}
            <Button onClick={() => handleEdit(rule)}>Edit</Button>
            <Button onClick={() => handleDelete(rule.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RuleManagement;
