import React, { useState } from 'react';
import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarSingle } from '../../Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';

const { Option } = Select;

function Filters({ onFilterChange }) {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubGroup, setSelectedSubGroup] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filterStore = useSelector((state) => state.auth.catalogueData);

  const filterData = filterStore?.filters;

  const onChangeCategory = () => {};

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
          <Heading as="h5">Category</Heading>

          <nav>
            <ul className="ninjadash-category-list">
              <li>
                <Link onClick={() => onChangeCategory('all')} to="#">
                  <span>All</span>
                  {/* <span className="ninjadash-category-count">25</span>s */}
                </Link>
              </li>
              {filterData &&
                filterData.Category.map((categoryItem) => (
                  <>
                    <li key={categoryItem.Id}>
                      <Link onClick={() => onChangeCategory('all')} to="#">
                        <span>{categoryItem.Name}</span>
                        <span className="ninjadash-category-count">{categoryItem.Count}</span>
                      </Link>
                    </li>
                  </>
                ))}
            </ul>
          </nav>
          <div className="sidebar-single__action">
            <Link className="btn-seeMore" to="#">
              See more
            </Link>
          </div>
        </SidebarSingle>
        {/* groups */}

        {/* <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Brands</Heading>
          <CheckboxGroup options={optionsBrand} onChange={onChangeBrand} />

          <div className="sidebar-single__action">
            <Link className="btn-seeMore" to="#">
              See more
            </Link>
          </div>
        </SidebarSingle> */}

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Group</Heading>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Group"
            onChange={handleGroupChange}
            value={selectedGroup || ''}
          >
            <Option value="">All</Option>
            {filterData &&
              filterData?.Group?.map((groupItem) => (
                <Option key={groupItem.Id} value={groupItem.Name}>
                  {groupItem.Name}
                </Option>
              ))}
          </Select>
        </SidebarSingle>
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Sub-Group</Heading>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Sub-Group"
            onChange={handleSubGroupChange}
            value={selectedSubGroup || ''}
          >
            <Option value="">All</Option>
            {filterData &&
              filterData?.SubGroup.map((subgroupItem) => {
                return (
                  <Option key={subgroupItem.Id} value={subgroupItem.Name}>
                    {subgroupItem.Name}
                  </Option>
                );
              })}
          </Select>
        </SidebarSingle>
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Category</Heading>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Category"
            onChange={handleCategoryChange}
            value={selectedCategory || ''}
          >
            <Option value="">All</Option>
            {filterData &&
              filterData?.Category.map((categoryItem) => (
                <Option key={categoryItem.Id} value={categoryItem.Name}>
                  {categoryItem.Name}
                </Option>
              ))}
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
