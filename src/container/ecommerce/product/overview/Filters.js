import UilSlidersV from '@iconscout/react-unicons/icons/uil-sliders-v';
import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Input } from 'antd';
import { IoIosSearch } from 'react-icons/io';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebar, SidebarSingle } from '../../Style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { getFilterProducts } from '../../../../Actions/Catalogue/CartAction';
import { setOffsetValue } from '../../../../redux/reducers/authReducer';

const Filters = React.memo(() => {
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedSubGroupIds, setSelectedSubGroupIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);
  const [selectedCatalogueIds, setSelectedCatalogueIds] = useState([]);
  const [selectedColIds, setSelectedColIds] = useState([]);
  const [selectedSizeIds, setSelectedSizeIds] = useState([]);

  const [catalogueSearchQuery, setCatalogueSearchQuery] = useState('');

  const handleCatalogueSearch = (e) => {
    setCatalogueSearchQuery(e.target.value);
  };

  // Catalogue API variables

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const offsetValue = useSelector((state) => state.auth.offsetValue);
  const filterData = useSelector((state) => state.auth.filterData);
  const AccessValueData = userData?.Data?.Access_Value;

  const AccessValue = AccessValueData || '';

  const buildFilterString = (groupIds, subGroupIds, categoryIds, brandIds, catalogueIds, colorIds, sizeIds) => {
    let filterString = '';
    const filterParts = [];

    if (groupIds?.length > 0) {
      filterParts.push(`AND Group_Id IN (${groupIds.join(',')})`);
    }
    if (subGroupIds?.length > 0) {
      filterParts.push(`AND SubGroup_Id IN (${subGroupIds.join(',')})`);
    }
    if (categoryIds?.length > 0) {
      filterParts.push(`AND Cat_Id IN (${categoryIds.join(',')})`);
    }
    if (brandIds?.length > 0) {
      filterParts.push(`AND Brand_ID IN (${brandIds.join(',')})`);
    }
    if (catalogueIds?.length > 0) {
      filterParts.push(`AND Item_Id IN (${catalogueIds.join(',')})`);
    }
    if (colorIds?.length > 0) {
      filterParts.push(`AND Col_Id IN (${colorIds.join(',')})`);
    }
    if (sizeIds?.length > 0) {
      filterParts.push(`AND Size_ID IN (${sizeIds.join(',')})`);
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
      case 'catalogue':
        updatedSelection = isChecked
          ? [...selectedCatalogueIds, id]
          : selectedCatalogueIds.filter((item) => item !== id);
        setSelectedCatalogueIds(updatedSelection);
        break;
      case 'color':
        updatedSelection = isChecked ? [...selectedColIds, id] : selectedColIds.filter((item) => item !== id);
        setSelectedColIds(updatedSelection);
        break;
      case 'size':
        updatedSelection = isChecked ? [...selectedSizeIds, id] : selectedSizeIds.filter((item) => item !== id);
        setSelectedSizeIds(updatedSelection);
        break;
      default:
        return;
    }

    const filterString = buildFilterString(
      type === 'group' ? updatedSelection : selectedGroupIds,
      type === 'subGroup' ? updatedSelection : selectedSubGroupIds,
      type === 'category' ? updatedSelection : selectedCategoryIds,
      type === 'brand' ? updatedSelection : selectedBrandIds,
      type === 'catalogue' ? updatedSelection : selectedCatalogueIds,
      type === 'color' ? updatedSelection : selectedColIds,
      type === 'size' ? updatedSelection : selectedSizeIds,
    );

    dispatch(setOffsetValue(0));
    dispatch(getFilterProducts(AccessValue, filterString, 0));
  };

  const handleClearFilters = () => {
    setSelectedGroupIds([]);
    setSelectedSubGroupIds([]);
    setSelectedCategoryIds([]);
    setSelectedBrandIds([]);
    dispatch(setOffsetValue(0));
    dispatch(getFilterProducts(AccessValue, '', offsetValue));
  };

  // useEffect to call all data initially with empty filterstring

  // useEffect(() => {
  //   dispatch(getFilterProducts(AccessValue, '', offsetValue));
  // }, [offsetValue, AccessValue]);

  // const initialFetch = useCallback(() => {
  //   dispatch(getFilterProducts(AccessValue, '', offsetValue));
  // }, [AccessValue, dispatch]);

  // if OffsetValue put inside the Dependancies array then it will call API twice but pagination issue reolved on to call data to take on 1st page with 0 offset
  // and if not include the offset value into dependancies then it will not allow to go on zero offset value API calls

  // useEffect(() => {
  //   initialFetch();
  // }, [initialFetch]);

  useEffect(() => {
    // if (offsetValue !== 0) {
    const buildFilterStringValue =
      buildFilterString(selectedGroupIds, selectedSubGroupIds, selectedCategoryIds, selectedBrandIds) || '';
    dispatch(getFilterProducts(AccessValue, buildFilterStringValue, offsetValue));
  }, [
    offsetValue,
    AccessValue,
    selectedGroupIds,
    selectedSubGroupIds,
    selectedCategoryIds,
    selectedBrandIds,
    dispatch,
  ]);

  // useEffect(() => {
  //   if (offsetValue !== 0) {
  //     dispatch(
  //       getFilterProducts(
  //         AccessValue,
  //         buildFilterString(selectedGroupIds, selectedSubGroupIds, selectedCategoryIds, selectedBrandIds),
  //         offsetValue,
  //       ),
  //     );
  //   }
  // }, [
  //   offsetValue,
  //   AccessValue,
  //   selectedGroupIds,
  //   selectedSubGroupIds,
  //   selectedCategoryIds,
  //   selectedBrandIds,
  //   dispatch,
  // ]);

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
                  <SidebarSingle style={{ marginBottom: 25 }}>
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
                  <SidebarSingle style={{ marginBottom: 25 }}>
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
                  <SidebarSingle style={{ marginBottom: 25 }}>
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
                  <SidebarSingle style={{ marginBottom: 25 }}>
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

              {/* Catalogue */}

              {filterData?.Catalogue?.length > 0 && (
                <>
                  <SidebarSingle style={{ marginBottom: 25 }}>
                    <Heading as="h5">Catalogue</Heading>
                    {/* <IoIosSearch /> */}

                    {/* <Input
                      style={{ height: 5, marginBottom: 20 }}
                      type="text"
                      placeholder="Search Items"
                      value={catalogueSearchQuery}
                      onChange={handleCatalogueSearch}
                    /> */}

                    <Scrollbars autoHeight autoHide>
                      <Checkbox.Group className="ant-checkbox-group">
                        {filterData &&
                          filterData?.Catalogue?.filter((cataItem) =>
                            cataItem.Name.toLowerCase().includes(catalogueSearchQuery.toLowerCase()),
                          ).map((cataItem) => (
                            <Checkbox
                              className="ant-checkbox-group-item"
                              id={cataItem.Id}
                              key={cataItem.Id}
                              value={cataItem.Name}
                              checked={selectedCatalogueIds.includes(cataItem.Id)}
                              onChange={(e) => handleSelectionChange('catalogue', cataItem.Id, e.target.checked)}
                            >
                              {capitalizeFirstLetter(cataItem.Name)}
                            </Checkbox>
                          ))}
                      </Checkbox.Group>
                    </Scrollbars>
                  </SidebarSingle>
                </>
              )}

              {/* color */}

              {filterData?.color?.length > 0 && (
                <>
                  <SidebarSingle style={{ marginBottom: 25 }}>
                    <Heading as="h5">Color</Heading>
                    <Scrollbars autoHeight autoHide>
                      <Checkbox.Group className="ant-checkbox-group">
                        {filterData &&
                          filterData?.color?.map((colorItem) => (
                            <Checkbox
                              className="ant-checkbox-group-item"
                              id={colorItem.Id}
                              key={colorItem.Id}
                              value={colorItem.Name}
                              checked={selectedColIds.includes(colorItem.Id)}
                              onChange={(e) => handleSelectionChange('color', colorItem.Id, e.target.checked)}
                            >
                              {capitalizeFirstLetter(colorItem.Name)}
                            </Checkbox>
                          ))}
                      </Checkbox.Group>
                    </Scrollbars>
                  </SidebarSingle>
                </>
              )}

              {/* size */}

              {filterData?.Size?.length > 0 && (
                <>
                  <SidebarSingle style={{ marginBottom: 25 }}>
                    <Heading as="h5">Size</Heading>
                    <Scrollbars autoHeight autoHide>
                      <Checkbox.Group className="ant-checkbox-group">
                        {filterData &&
                          filterData?.Size?.map((Size) => (
                            <Checkbox
                              className="ant-checkbox-group-item"
                              id={Size.Id}
                              key={Size.Id}
                              value={Size.Name}
                              checked={selectedSizeIds.includes(Size.Id)}
                              onChange={(e) => handleSelectionChange('color', Size.Id, e.target.checked)}
                            >
                              {capitalizeFirstLetter(Size.Name)}
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
