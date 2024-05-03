import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, SidebarSingle } from '../../Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { setCatalogueData, setLoading } from '../../../../redux/reducers/authReducer';

function Filters() {
  const [selectedGroupIds, setSelectedGroupIds] = useState('');
  const [selectedSubGroupIds, setSelectedSubGroupIds] = useState('');
  console.log(setSelectedGroupIds);
  // console.log(setSelectedSubGroupIds);
  // Catalogue API variables

  const dispatch = useDispatch();
  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const userData = useSelector((state) => state.auth.userData);

  const filterStore = useSelector((state) => state.auth.catalogueData);
  const filterData = filterStore?.filters;
  // const loading = useSelector((state) => state.auth.loading);

  const ServerBaseUrl = userMpinData?.Data?.ServerBaseUrl;
  const mPin = userMpinData?.Data?.mPin;
  const SlugUrl = userMpinData?.Data?.SlugUrl;

  const userheaderdata = userData?.Data;
  const Companyid = userheaderdata?.CompanyID;
  const YearMasterid = userheaderdata?.YearMasterID;
  const Premiseid = userheaderdata?.PremiseID;
  const Departmentid = userheaderdata?.DepartmentID;
  const Userid = userheaderdata?.UserID;

  const handleGroupSelectionChange = (groupId, isChecked) => {
    const updatedSelectedGroupIds = isChecked
      ? [...selectedGroupIds, groupId] // Add ID if checked
      : selectedGroupIds.filter((id) => id !== groupId); // Remove ID if unchecked

    setSelectedGroupIds(updatedSelectedGroupIds);

    // Clear SubGroup selections when Group changes
    setSelectedSubGroupIds([]);

    const filterString = buildFilterString(updatedSelectedGroupIds, selectedSubGroupIds); // Pass both Group and SubGroup IDs

    fetchCatalogueData(filterString);
  };

  const handleSubGroupSelectionChange = (subGroupId, isChecked) => {
    const updatedSelectedSubGroupIds = isChecked
      ? [...selectedSubGroupIds, subGroupId] // Add ID if checked
      : selectedSubGroupIds.filter((id) => id !== subGroupId); // Remove ID if unchecked

    setSelectedSubGroupIds(updatedSelectedSubGroupIds);

    const filterString = buildFilterString(selectedGroupIds, updatedSelectedSubGroupIds); // Pass both Group and SubGroup IDs

    fetchCatalogueData(filterString);
  };

  const buildFilterString = (groupIds, subGroupIds) => {
    let filterString = '';

    if (groupIds.length === 0 && subGroupIds.length === 0) {
      return ''; // Empty filter string if nothing is selected
    }

    if (groupIds.length > 0) {
      filterString += `AND Group_Id IN (${groupIds.join(',')})`;
    }

    if (subGroupIds.length > 0) {
      filterString += (filterString.length > 0 ? ' AND ' : '') + `SubGroup_Id IN (${subGroupIds.join(',')})`;
    }

    return filterString;
  };

  // Catalogue API Calling :

  const fetchCatalogueData = async (filterString) => {
    // const groupIds = selectedGroupIds;
    // const filterString = groupIds ? `AND Group_Id IN (${groupIds})` : '';
    // console.log(groupIds);

    console.log(filterString);
    // `AND Group_Id IN (${selectedGroupIds.join(',')})`
    console.log(selectedGroupIds);
    console.log(selectedSubGroupIds);
    const CatalogueAPI = `${ServerBaseUrl}api/CommonAPI/FilterProducts`;

    const body = {
      ReportId: 0,
      FromDate: '',
      UptoDate: '',
      FilterString: filterString,
      OffsetValue: 0,
      PageSize: 100,
      OrderByColumn: 'i.Item_id Desc',
      LinkId: 0,
    };

    const headers = {
      'Content-Type': 'application/json',
      CompanyID: Companyid,
      YearMasterID: YearMasterid,
      PremiseID: Premiseid,
      DepartmentID: Departmentid,
      UserID: Userid,
      client: SlugUrl,
      'x-api-key': mPin,
    };
    try {
      dispatch(setLoading(true));
      const response = await axios.post(CatalogueAPI, body, { headers });
      const CatalogueDatafromAPI = response?.data?.Data;
      dispatch(setCatalogueData(CatalogueDatafromAPI));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error in Catalogue data fetching:', error);
      toast.error('Error in fetching catalogue report data from API Server.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCatalogueData();
  }, []);

  const handleClearFilters = () => {
    setSelectedGroupIds([]);
    setSelectedSubGroupIds([]);
    fetchCatalogueData('');
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
        <Button style={{ marginBottom: 32 }} onClick={handleClearFilters} type="white">
          Clear Filter
        </Button>

        {/* Category */}

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Category</Heading>
          <Checkbox.Group className="ant-checkbox-group">
            {filterData &&
              filterData.Category.map((CategoryItem) => (
                <Checkbox
                  className="ant-checkbox-group-item"
                  id={CategoryItem.Id}
                  key={CategoryItem.Id}
                  value={CategoryItem.Name}
                >
                  {CategoryItem.Name}
                </Checkbox>
              ))}
          </Checkbox.Group>
        </SidebarSingle>

        {/* groups */}

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Group</Heading>
          <Checkbox.Group className="ant-checkbox-group">
            {filterData &&
              filterData.Group.map((groupItem) => (
                <Checkbox
                  className="ant-checkbox-group-item"
                  id={groupItem.Id}
                  key={groupItem.Id}
                  value={groupItem.Name}
                  checked={selectedGroupIds.includes(groupItem.Id)} // Set checked based on selectedGroupIds
                  onChange={(e) => handleGroupSelectionChange(groupItem.Id, e.target.checked)}
                >
                  {groupItem.Name}
                </Checkbox>
              ))}
          </Checkbox.Group>
        </SidebarSingle>

        {/* subGroup */}
        <SidebarSingle style={{ marginBottom: 32, height: 300, overflow: 'auto' }}>
          <Heading as="h5">Sub Group</Heading>
          <Checkbox.Group className="ant-checkbox-group">
            {filterData &&
              filterData.SubGroup.map((subgroupItem) => (
                <Checkbox
                  className="ant-checkbox-group-item"
                  id={subgroupItem.Id}
                  key={subgroupItem.Id}
                  value={subgroupItem.Name}
                  checked={selectedSubGroupIds.includes(subgroupItem.Id)}
                  onChange={(e) => handleSubGroupSelectionChange(subgroupItem.Id, e.target.checked)}
                >
                  {subgroupItem.Name}
                </Checkbox>
              ))}
          </Checkbox.Group>
        </SidebarSingle>
      </Cards>
    </Sidebar>
  );
}

Filters.propTypes = {
  onGroupSelectionChange: PropTypes.func.isRequired,
  selectedGroupIds: PropTypes.func.isRequired,
};

export default Filters;
