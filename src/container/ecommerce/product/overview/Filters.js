import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, SidebarSingle } from '../../Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { getFilterProducts } from '../../../../Actions/Catalogue/CartAction';

const Filters = React.memo(() => {
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedSubGroupIds, setSelectedSubGroupIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  // Catalogue API variables

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const offsetValue = useSelector((state) => state.auth.offsetValue);
  const filterData = useSelector((state) => state.auth.filterData);
  const AccessValueData = userData?.Data?.Access_Value;

  const AccessValue = AccessValueData || '';

  const buildFilterString = (groupIds, subGroupIds, categoryIds, brandIds) => {
    let filterString = '';
    const filterParts = [];

    if (groupIds.length > 0) {
      filterParts.push(`AND Group_Id IN (${groupIds.join(',')})`);
    }
    if (subGroupIds.length > 0) {
      filterParts.push(`AND SubGroup_Id IN (${subGroupIds.join(',')})`);
    }
    if (categoryIds.length > 0) {
      filterParts.push(`AND Cat_Id IN (${categoryIds.join(',')})`);
    }
    if (brandIds.length > 0) {
      filterParts.push(`AND Brand_ID IN (${brandIds.join(',')})`);
    }

    filterString = filterParts.join(' ');
    return filterString;
  };

  const handleSelectionChange = (type, id, isChecked) => {
    let updatedSelection;
    switch (type) {
      case 'group':
        updatedSelection = isChecked ? [...selectedGroupIds, id] : selectedGroupIds.filter((item) => item !== id);
        setSelectedGroupIds(updatedSelection);
        setSelectedSubGroupIds([]);
        break;
      case 'subGroup':
        updatedSelection = isChecked ? [...selectedSubGroupIds, id] : selectedSubGroupIds.filter((item) => item !== id);
        setSelectedSubGroupIds(updatedSelection);
        break;
      case 'category':
        updatedSelection = isChecked ? [...selectedCategoryIds, id] : selectedCategoryIds.filter((item) => item !== id);
        setSelectedCategoryIds(updatedSelection);
        break;
      case 'brand':
        updatedSelection = isChecked ? [...selectedBrandIds, id] : selectedBrandIds.filter((item) => item !== id);
        setSelectedBrandIds(updatedSelection);
        break;
      default:
        return;
    }

    const filterString = buildFilterString(
      type === 'group' ? updatedSelection : selectedGroupIds,
      type === 'subGroup' ? updatedSelection : selectedSubGroupIds,
      type === 'category' ? updatedSelection : selectedCategoryIds,
      type === 'brand' ? updatedSelection : selectedBrandIds,
    );

    dispatch(getFilterProducts(AccessValue, filterString, offsetValue));
  };

  const handleClearFilters = () => {
    setSelectedGroupIds([]);
    setSelectedSubGroupIds([]);
    setSelectedCategoryIds([]);
    setSelectedBrandIds([]);
    dispatch(getFilterProducts(AccessValue, '', offsetValue));
  };

  useEffect(() => {
    dispatch(getFilterProducts(AccessValue, '', offsetValue));
  }, [offsetValue, AccessValue]);

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
                              onChange={(e) => handleSelectionChange('category', categoryItem.Id, e.target.checked)}
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
                              onChange={(e) => handleSelectionChange('group', groupItem.Id, e.target.checked)}
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
                              onChange={(e) => handleSelectionChange('subGroup', subgroupItem.Id, e.target.checked)}
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
                              onChange={(e) => handleSelectionChange('brand', brandItem.Id, e.target.checked)}
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

export default Filters;
