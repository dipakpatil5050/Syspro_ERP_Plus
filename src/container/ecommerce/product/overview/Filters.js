import React, { useState } from 'react';
import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import { Select } from 'antd';
import PropTypes from 'prop-types'; // Import PropTypes
import { Sidebar, SidebarSingle } from '../../Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';

const { Option } = Select;

function Filters({ onFilterChange }) {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubGroup, setSelectedSubGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    onFilterChange({ group: value, subGroup: selectedSubGroup, category: selectedCategory });
  };

  const handleSubGroupChange = (value) => {
    setSelectedSubGroup(value);
    onFilterChange({ group: selectedGroup, subGroup: value, category: selectedCategory });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange({ group: selectedGroup, subGroup: selectedSubGroup, category: value });
  };

  return (
    <Sidebar>
      <Cards
        title={
          <span>
            <UilSlidersV />
            Filters
          </span>
        }
      >
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Group</Heading>
          <Select style={{ width: '100%' }} placeholder="Select Group" onChange={handleGroupChange}>
            <Option value="">All</Option>
            <Option value="JIMMY CHOO">JIMMY CHOO</Option>
            {/* Add more options as needed */}
          </Select>
        </SidebarSingle>

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Sub-Group</Heading>
          <Select style={{ width: '100%' }} placeholder="Select Sub-Group" onChange={handleSubGroupChange}>
            <Option value="">All</Option>
            <Option value="JIMMY CHOO LEHENGA">JIMMY CHOO LEHENGA</Option>
          </Select>
        </SidebarSingle>

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Category</Heading>
          <Select style={{ width: '100%' }} placeholder="Select Category" onChange={handleCategoryChange}>
            <Option value="">All</Option>
            <Option value="UNSTICH LEHANGA">UNSTICH LEHANGA</Option>
          </Select>
        </SidebarSingle>
      </Cards>
    </Sidebar>
  );
}

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
