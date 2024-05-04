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
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedSubGroupIds, setSelectedSubGroupIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  console.log(setSelectedGroupIds);

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

    const filterString = buildFilterString(updatedSelectedGroupIds, selectedSubGroupIds);

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

  const handleCategorySelectionChange = (categoryId, isChecked) => {
    const updatedSelectedCategoryIds = isChecked
      ? [...selectedCategoryIds, categoryId]
      : selectedCategoryIds.filter((id) => id !== categoryId);

    setSelectedCategoryIds(updatedSelectedCategoryIds);

    const filterString = buildFilterString(selectedGroupIds, selectedSubGroupIds, updatedSelectedCategoryIds);

    fetchCatalogueData(filterString);
  };

  const buildFilterString = (groupIds, subGroupIds, categoryIds) => {
    let filterString = '';

    if (groupIds?.length === 0 && subGroupIds?.length === 0 && categoryIds?.length === 0) {
      return filterString;
    }

    const filterParts = [];

    if (groupIds?.length > 0) {
      filterParts.push(`AND Group_Id IN (${groupIds.join(',')}) `);
    }

    if (subGroupIds?.length > 0) {
      filterParts.push(`AND SubGroup_Id IN (${subGroupIds.join(',')}) `);
    }

    if (categoryIds?.length > 0) {
      filterParts.push(`AND Cat_Id IN (${categoryIds.join(',')}) `);
    }

    filterString = filterParts.join(''); // Combine filter parts with AND

    return filterString;
  };

  // Catalogue API Calling :

  const fetchCatalogueData = async (filterString) => {
    // const groupIds = selectedGroupIds;
    // const filterString = groupIds ? `AND Group_Id IN (${groupIds})` : '';
    // console.log(groupIds);

    console.log(filterString);

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
    setSelectedCategoryIds([]);
    dispatch(setCatalogueData([]));
    fetchCatalogueData('');
  };

  function capitalizeFirstLetter(str) {
    return str?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

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

        <>
          {filterData && (
            <>
              {/* Category */}
              <SidebarSingle style={{ marginBottom: 32 }}>
                <Heading as="h5">Category</Heading>
                <Checkbox.Group className="ant-checkbox-group">
                  {filterData &&
                    filterData.Category.map((categoryItem) => (
                      <Checkbox
                        className="ant-checkbox-group-item"
                        id={categoryItem.Id}
                        key={categoryItem.Id}
                        value={categoryItem.Name}
                        checked={selectedCategoryIds.includes(categoryItem.Id)}
                        onChange={(e) => handleCategorySelectionChange(categoryItem.Id, e.target.checked)}
                      >
                        {capitalizeFirstLetter(categoryItem.Name)}
                        <span className="ninjadash-category-count" style={{ fontSize: '12px' }}>
                          {categoryItem.Count}
                        </span>
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
                        {capitalizeFirstLetter(groupItem.Name)}
                        <span className="ninjadash-category-count" style={{ fontSize: '12px' }}>
                          {groupItem.Count}
                        </span>
                      </Checkbox>
                    ))}
                </Checkbox.Group>
              </SidebarSingle>

              {/* subGroup */}

              <SidebarSingle className="" style={{ marginBottom: 32, height: 300, overflow: 'auto' }}>
                <Heading as="h5">Sub Group</Heading>
                <Checkbox.Group className="ant-checkbox-group">
                  {filterData &&
                    filterData.SubGroup.map((subgroupItem) => (
                      <Checkbox
                        className="ant-checkbox-group-item "
                        id={subgroupItem.Id}
                        key={subgroupItem.Id}
                        value={subgroupItem.Name}
                        checked={selectedSubGroupIds.includes(subgroupItem.Id)}
                        onChange={(e) => handleSubGroupSelectionChange(subgroupItem.Id, e.target.checked)}
                      >
                        {capitalizeFirstLetter(subgroupItem.Name)}
                        <span className="ninjadash-category-count" style={{ fontSize: '12px' }}>
                          {subgroupItem.Count}
                        </span>
                      </Checkbox>
                    ))}
                </Checkbox.Group>
              </SidebarSingle>
              {/* Brand */}
              {filterData.Brand?.length > 0 && (
                <>
                  <SidebarSingle>
                    <Heading as="h5">Brand</Heading>
                    <Checkbox.Group className="ant-checkbox-group">
                      {filterData &&
                        filterData.Brand.map((brandItem) => (
                          <Checkbox
                            className="ant-checkbox-group-item"
                            id={brandItem.Id}
                            key={brandItem.Id}
                            value={brandItem.Name}
                            // checked={selectedSubGroupIds.includes(subgroupItem.Id)}
                            // onChange={(e) => handleSubGroupSelectionChange(subgroupItem.Id, e.target.checked)}
                          >
                            {capitalizeFirstLetter(brandItem.Name)}
                          </Checkbox>
                        ))}
                    </Checkbox.Group>
                  </SidebarSingle>
                </>
              )}
            </>
          )}
        </>
      </Cards>
    </Sidebar>
  );
}

Filters.propTypes = {
  handleGroupSelectionChange: PropTypes.func.isRequired,
  selectedGroupIds: PropTypes.func.isRequired,
  handleSubGroupSelectionChange: PropTypes.func.isRequired,
  selectedSubGroupIds: PropTypes.func.isRequired,
  handleCategorySelectionChange: PropTypes.func.isRequired,
  selectedCategoryIds: PropTypes.func.isRequired,
};

export default Filters;
