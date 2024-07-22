import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterProducts } from '../../../../Actions/Catalogue/CartAction';
import { setOffsetValue } from '../../../../redux/reducers/authReducer';

const useFilters = () => {
  const [selectedGroupIds, setSelectedGroupIds] = useState([]);
  const [selectedSubGroupIds, setSelectedSubGroupIds] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const offsetValue = useSelector((state) => state.auth.offsetValue);
  const filterData = useSelector((state) => state.auth.filterData);

  const AccessValue = userData?.Data?.Access_Value || '';

  const buildFilterString = useCallback((groupIds, subGroupIds, categoryIds, brandIds) => {
    const filterParts = [];
    if (groupIds.length > 0) filterParts.push(`AND Group_Id IN (${groupIds.join(',')})`);
    if (subGroupIds.length > 0) filterParts.push(`AND SubGroup_Id IN (${subGroupIds.join(',')})`);
    if (categoryIds.length > 0) filterParts.push(`AND Cat_Id IN (${categoryIds.join(',')})`);
    if (brandIds.length > 0) filterParts.push(`AND Brand_ID IN (${brandIds.join(',')})`);
    return filterParts.join(' ');
  }, []);

  const handleSelectionChange = useCallback(
    (type, id, isChecked) => {
      const updateSelection = (selectedIds, setSelectedIds) => {
        const updatedSelection = isChecked ? [...selectedIds, id] : selectedIds.filter((item) => item !== id);
        setSelectedIds(updatedSelection);
        return updatedSelection;
      };

      let updatedGroupIds = selectedGroupIds;
      let updatedSubGroupIds = selectedSubGroupIds;
      let updatedCategoryIds = selectedCategoryIds;
      let updatedBrandIds = selectedBrandIds;

      switch (type) {
        case 'group':
          updatedGroupIds = updateSelection(selectedGroupIds, setSelectedGroupIds);
          setSelectedSubGroupIds([]);
          break;
        case 'subGroup':
          updatedSubGroupIds = updateSelection(selectedSubGroupIds, setSelectedSubGroupIds);
          break;
        case 'category':
          updatedCategoryIds = updateSelection(selectedCategoryIds, setSelectedCategoryIds);
          break;
        case 'brand':
          updatedBrandIds = updateSelection(selectedBrandIds, setSelectedBrandIds);
          break;
        default:
          break;
      }

      const filterString = buildFilterString(updatedGroupIds, updatedSubGroupIds, updatedCategoryIds, updatedBrandIds);
      dispatch(setOffsetValue(0));
      dispatch(getFilterProducts(AccessValue, filterString, 0));
    },
    [
      dispatch,
      selectedGroupIds,
      selectedSubGroupIds,
      selectedCategoryIds,
      selectedBrandIds,
      buildFilterString,
      AccessValue,
    ],
  );

  const handleClearFilters = useCallback(() => {
    setSelectedGroupIds([]);
    setSelectedSubGroupIds([]);
    setSelectedCategoryIds([]);
    setSelectedBrandIds([]);
    dispatch(setOffsetValue(0));
    dispatch(getFilterProducts(AccessValue, '', 0));
  }, [dispatch, AccessValue]);

  useEffect(() => {
    dispatch(getFilterProducts(AccessValue, '', offsetValue));
  }, [dispatch, offsetValue, AccessValue]);

  return {
    filterData,
    selectedGroupIds,
    selectedSubGroupIds,
    selectedCategoryIds,
    selectedBrandIds,
    handleSelectionChange,
    handleClearFilters,
  };
};

export default useFilters;
