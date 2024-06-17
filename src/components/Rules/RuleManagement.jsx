import { Button } from 'antd';
import React, { useState, useEffect } from 'react';

function RuleManagement() {
  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subgroups, setSubgroups] = useState([]);
  const [brands, setBrands] = useState([]);
  const [rules, setRules] = useState([]);
  const [ruleName, setRuleName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
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
      categoryId: selectedCategory,
      groupId: selectedGroup,
      subgroupId: selectedSubgroup,
      brandId: selectedBrand,
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
        setSelectedCategory('');
        setSelectedGroup('');
        setSelectedSubgroup('');
        setSelectedBrand('');
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
    setSelectedCategory(rule.categoryId);
    setSelectedGroup(rule.groupId);
    setSelectedSubgroup(rule.subgroupId);
    setSelectedBrand(rule.brandId);
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
          <label htmlFor="categorySelect">Select Category:</label>
          <select id="categorySelect" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">--Select Category--</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="groupSelect">Select Group:</label>
          <select id="groupSelect" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
            <option value="">--Select Group--</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subgroupSelect">Select Subgroup:</label>
          <select id="subgroupSelect" value={selectedSubgroup} onChange={(e) => setSelectedSubgroup(e.target.value)}>
            <option value="">--Select Subgroup--</option>
            {subgroups.map((subgroup) => (
              <option key={subgroup.id} value={subgroup.id}>
                {subgroup.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brandSelect">Select Brand:</label>
          <select id="brandSelect" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">--Select Brand--</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{selectedRule ? 'Update Rule' : 'Create Rule'}</button>
      </form>
      <h2>Existing Rules</h2>
      <ul>
        {rules.map((rule) => (
          <li key={rule.id}>
            {rule.name} - {rule.categoryId} - {rule.groupId} - {rule.subgroupId} - {rule.brandId}
            <Button onClick={() => handleEdit(rule)}>Edit</Button>
            <Button onClick={() => handleDelete(rule.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RuleManagement;
