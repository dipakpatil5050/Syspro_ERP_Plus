import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
// import { Slider } from '../../../../components/slider/slider';
// import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarSingle } from '../../Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';

import {
  setCatalogueData,
  setCatalogueDataFiltered,
  setCatalogueTotalDataCount,
  // setClearFilter,
  setFilterData,
  setLoading,
  // setOffsetValue,
  setTotalCataloguePages,
} from '../../../../redux/reducers/authReducer';

// setOffsetValue

const Filters = React.memo(() => {
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedSubGroupIds, setSelectedSubGroupIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  // console.log('filter = ', setSelectedGroupIds);

  // Catalogue API variables

  const dispatch = useDispatch();
  const userMpinData = useSelector((state) => state.auth.userMpinData);
  const userData = useSelector((state) => state.auth.userData);
  const offsetValue = useSelector((state) => state.auth.offsetValue);
  // const totalCataloguePages = useSelector((state) => state.auth.totalCataloguePages);
  // const CatalogueData = useSelector((state) => state.auth.catalogueData);
  // const hasMoreData = useSelector((state) => state.auth.hasMoreData);

  // const filterStore = useSelector((state) => state.auth.catalogueData);
  const filterData = useSelector((state) => state.auth.filterData);

  // const filterData = filterStore?.filters;
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

  const buildFilterString = (groupIds, subGroupIds, categoryIds, brandIds) => {
    // dispatch(setCatalogueData([]));
    let filterString = '';

    if (groupIds?.length === 0 && subGroupIds?.length === 0 && categoryIds?.length === 0 && brandIds?.length === 0) {
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

    if (brandIds?.length > 0) {
      filterParts.push(`AND Brand_ID IN (${brandIds.join(',')}) `);
    }

    filterString = filterParts.join('');

    return filterString;
  };

  // Catalogue Filtered Data Fetching
  const fetchCatalogueDataFiltered = async (filterString) => {
    const CatalogueAPI = `${ServerBaseUrl}api/CommonAPI/FilterProducts`;

    const body = {
      ReportId: 0,
      FromDate: '',
      UptoDate: '',
      FilterString: filterString,
      OffsetValue: 0, // 0
      PageSize: 100000,
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

      const CatalogueDataFromAPI = response?.data?.Data;
      const productsData = CatalogueDataFromAPI?.products;
      const filteredData = CatalogueDataFromAPI?.filters;
      const FilterTotalCount = CatalogueDataFromAPI?.FilterTotalCount;
      const TotalPages = CatalogueDataFromAPI?.TotalPages;

      dispatch(setCatalogueDataFiltered(productsData));
      dispatch(setFilterData(filteredData));
      dispatch(setTotalCataloguePages(TotalPages));
      dispatch(setCatalogueTotalDataCount(FilterTotalCount));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error in Catalogue data fetching:', error);
      toast.error('Error in fetching catalogue report data from API Server.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGroupSelectionChange = (groupId, isChecked) => {
    const updatedSelectedGroupIds = isChecked
      ? [...selectedGroupIds, groupId] // Add ID if checked
      : selectedGroupIds.filter((id) => id !== groupId); // Remove ID if unchecked

    setSelectedGroupIds(updatedSelectedGroupIds);
    // Clear SubGroup selections when Group changes
    setSelectedSubGroupIds([]);

    const filterString = buildFilterString(updatedSelectedGroupIds);

    // dispatch(setOffsetValue(0));
    fetchCatalogueDataFiltered(filterString);
  };

  const handleSubGroupSelectionChange = (subGroupId, isChecked) => {
    const updatedSelectedSubGroupIds = isChecked
      ? [...selectedSubGroupIds, subGroupId] // Add ID if checked
      : selectedSubGroupIds.filter((id) => id !== subGroupId); // Remove ID if unchecked

    setSelectedSubGroupIds(updatedSelectedSubGroupIds);

    const filterString = buildFilterString(selectedGroupIds, updatedSelectedSubGroupIds); // Pass both Group and SubGroup IDs

    fetchCatalogueDataFiltered(filterString);
  };

  const handleCategorySelectionChange = (categoryId, isChecked) => {
    const updatedSelectedCategoryIds = isChecked
      ? [...selectedCategoryIds, categoryId]
      : selectedCategoryIds.filter((id) => id !== categoryId);

    setSelectedCategoryIds(updatedSelectedCategoryIds);

    const filterString = buildFilterString(selectedGroupIds, selectedSubGroupIds, updatedSelectedCategoryIds);

    fetchCatalogueDataFiltered(filterString);
  };

  const handleBrandSelectionChange = (brandId, isChecked) => {
    const updatedSelectedBrandIds = isChecked
      ? [...selectedBrandIds, brandId]
      : selectedBrandIds.filter((id) => id !== brandId);

    setSelectedBrandIds(updatedSelectedBrandIds);
    const filterString = buildFilterString(
      selectedGroupIds,
      selectedSubGroupIds,
      selectedCategoryIds,
      updatedSelectedBrandIds,
    );

    fetchCatalogueDataFiltered(filterString);
  };

  // const pageSize = () => {

  // };

  // Catalogue API Calling :

  // const isMounted = useRef(false);
  const fetchCatalogueData = async (filterString) => {
    const CatalogueAPI = `${ServerBaseUrl}api/CommonAPI/FilterProducts`;

    const body = {
      ReportId: 0,
      FromDate: '',
      UptoDate: '',
      FilterString: filterString,
      OffsetValue: offsetValue,
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
      // dispatch(setLoading(true));
      const response = await axios.post(CatalogueAPI, body, { headers });
      const CatalogueDataFromAPI = response?.data?.Data;
      const productsData = CatalogueDataFromAPI?.products;
      const filteredData = CatalogueDataFromAPI?.filters;
      const FilterTotalCount = CatalogueDataFromAPI?.FilterTotalCount;
      const TotalPages = CatalogueDataFromAPI?.TotalPages;
      dispatch(setCatalogueData(productsData));
      dispatch(setFilterData(filteredData));
      dispatch(setTotalCataloguePages(TotalPages));
      dispatch(setCatalogueTotalDataCount(FilterTotalCount));
      // dispatch(setLoading(false));
    } catch (error) {
      console.error('Error in Catalogue data fetching:', error);
      toast.error('Error in fetching catalogue report data from API Server.');
    } finally {
      // dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCatalogueData();
  }, [offsetValue]);

  // useEffect(() => {
  //   if (!filterData) {
  //     fetchCatalogueData();
  //   }
  // }, [filterData]);

  // useEffect(() => {
  //   const oldPageOffset = offsetValue;
  //   if (!filterData || offsetValue !== oldPageOffset) {
  //     fetchCatalogueData();
  //   }
  // }, [filterData, offsetValue]);

  // useEffect(() => {
  //   if (CatalogueData.length === 0) {
  //     fetchCatalogueData();
  //   }
  // }, []);

  // console.log(Math.random());

  // useEffect(() => {
  //   // if (hasMoreData) {
  //   fetchCatalogueData();
  //   // }
  // }, []);

  // useEffect(() => {
  //   console.log('objects loaded from API Server', Math.random());
  // }, []);

  // handle Clear filter button

  // const handleClearFilters = () => {
  //   setSelectedGroupIds([]);
  //   setSelectedSubGroupIds([]);

  //   setSelectedCategoryIds([]);
  //   setSelectedBrandIds([]);

  //   // dispatch(setCatalogueData([]));
  //   dispatch(setClearFilter());
  //   dispatch(setFilterData([]));
  //   fetchCatalogueData('');
  //   dispatch(setOffsetValue(0));
  //   // fetchCatalogueDataFiltered('');
  // };

  function capitalizeFirstLetter(str) {
    return str?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  // const [state, setState] = useState({
  //   min: 0,
  //   max: 500,
  // });

  // const { min, max } = state;
  // const onPriceChangeHandler = (value) => {
  //   setState({
  //     ...state,
  //     min: value[0],
  //     max: value[1],
  //   });
  //   // dispatch(filterByPriceRange(value));
  // };

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
        {/* clear filter Button */}
        {/* {filterData && (
          <Button style={{ marginBottom: 32 }} onClick={handleClearFilters} type="white">
            Clear Filter
          </Button>
        )} */}
        <>
          {filterData && (
            <>
              {/* Price Range */}

              {/* <SidebarSingle style={{ marginBottom: 32 }}>
                <Heading as="h5">Price Range</Heading>
                <Slider max={50} onChange={onPriceChangeHandler} range defaultValues={[min, max]} />
                <p className="ninjadash-price-text">
                  ₹ {min} - ₹ {max}
                </p>
              </SidebarSingle> */}

              {/* Category */}
              {filterData?.Category?.length > 0 && (
                <>
                  <SidebarSingle style={{ marginBottom: 32 }}>
                    <Heading as="h5">Category</Heading>

                    <Scrollbars autoHeight autoHide>
                      <Checkbox.Group className="ant-checkbox-group">
                        {filterData &&
                          filterData?.Category?.map((categoryItem) => (
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
                    </Scrollbars>
                  </SidebarSingle>
                </>
              )}

              {/* groups */}
              {filterData?.Group?.length > 0 && (
                <>
                  <SidebarSingle style={{ marginBottom: 32 }}>
                    <Heading as="h5">Group</Heading>
                    <Scrollbars autoHeight autoHide>
                      <Checkbox.Group className="ant-checkbox-group">
                        {filterData &&
                          filterData?.Group?.map((groupItem) => (
                            <Checkbox
                              className="ant-checkbox-group-item"
                              id={groupItem.Id}
                              key={groupItem.Id}
                              value={groupItem.Name}
                              checked={selectedGroupIds.includes(groupItem.Id)}
                              // checked={selectedGroupIds[groupItem.id]}
                              onChange={(e) => handleGroupSelectionChange(groupItem.Id, e.target.checked)}
                              // onChange={(e) => groupSelectionChange(groupItem.Id, e.target.checked)}
                            >
                              {capitalizeFirstLetter(groupItem.Name)}
                              <span className="ninjadash-category-count" style={{ fontSize: '12px' }}>
                                {groupItem.Count}
                              </span>
                            </Checkbox>
                          ))}
                      </Checkbox.Group>
                    </Scrollbars>
                  </SidebarSingle>
                </>
              )}
              {/* subGroup */}

              {/* style={{ marginBottom: 32, height: 300, overflow: 'auto' }} */}

              {filterData?.SubGroup?.length > 0 && (
                <>
                  <SidebarSingle className="">
                    <Heading as="h5">Sub Group</Heading>
                    <Scrollbars autoHeight>
                      <Checkbox.Group className="ant-checkbox-group" style={{ paddingRight: 10 }}>
                        {filterData &&
                          filterData?.SubGroup?.map((subgroupItem) => (
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
                    </Scrollbars>
                  </SidebarSingle>
                </>
              )}
              {/* Brand */}

              {filterData?.Brand?.length > 0 && (
                <>
                  <SidebarSingle>
                    <Heading as="h5">Brand</Heading>
                    <Scrollbars autoHeight autoHide>
                      <Checkbox.Group className="ant-checkbox-group">
                        {filterData &&
                          filterData?.Brand?.map((brandItem) => (
                            <Checkbox
                              className="ant-checkbox-group-item"
                              id={brandItem.Id}
                              key={brandItem.Id}
                              value={brandItem.Name}
                              checked={selectedBrandIds.includes(brandItem.Id)}
                              onChange={(e) => handleBrandSelectionChange(brandItem.Id, e.target.checked)}
                            >
                              {capitalizeFirstLetter(brandItem.Name)}
                            </Checkbox>
                          ))}
                      </Checkbox.Group>
                    </Scrollbars>
                  </SidebarSingle>
                </>
              )}
            </>
          )}
        </>
      </Cards>
    </Sidebar>
  );
});

// Filters.propTypes = {
//   handleGroupSelectionChange: PropTypes.func,
//   selectedGroupIds: PropTypes.func.isRequired,
//   handleSubGroupSelectionChange: PropTypes.func,
//   selectedSubGroupIds: PropTypes.func,
//   handleCategorySelectionChange: PropTypes.func,
//   selectedCategoryIds: PropTypes.func,
// };

export default Filters;
