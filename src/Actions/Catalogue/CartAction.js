import toast from 'react-hot-toast';
import CatalogueServices from '../../services/CatalogueServices';

import {
  setCatalogueData,
  setCatalogueDataFiltered,
  setCatalogueTotalDataCount,
  setFilterData,
  setHasmoreData,
  setItemList,
  setLoading,
  setSingleProduct,
  setTotalCataloguePages,
} from '../../redux/reducers/authReducer';

import { setCartItems, setCartId } from '../../redux/reducers/cartSlice';

export const getAllProducts = (AccessValue, offsetValue) => async (dispatch) => {
  const body = {
    ReportId: 0,
    FromDate: '',
    UptoDate: '',
    FilterString: AccessValue,
    OffsetValue: offsetValue,
    PageSize: 100,
    OrderByColumn: 'i.Item_id Desc',
    LinkId: 0,
  };

  try {
    dispatch(setLoading(true));
    const response = await CatalogueServices.AllproductsData(body);
    const CatalogueDataFromAPI = response?.data?.Data;
    const productsData = CatalogueDataFromAPI?.products;
    const filteredData = CatalogueDataFromAPI?.filters;
    const FilterTotalCount = CatalogueDataFromAPI?.FilterTotalCount;
    const TotalPages = CatalogueDataFromAPI?.TotalPages;

    dispatch(setCatalogueData(productsData));
    dispatch(setFilterData(filteredData));
    dispatch(setTotalCataloguePages(TotalPages));
    dispatch(setCatalogueTotalDataCount(FilterTotalCount));
    dispatch(setLoading(false));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected error in catalogue, please Refresh Page.');
    }
    console.error('Error fetching data:', error);
    dispatch(setHasmoreData(false));
    dispatch(setLoading(false));
  }
};

export const getFilterProducts = (AccessValue, filterString, offsetValue) => async (dispatch) => {
  const body = {
    ReportId: 0,
    FromDate: '',
    UptoDate: '',
    FilterString: AccessValue + filterString,
    OffsetValue: offsetValue,
    PageSize: 100,
    OrderByColumn: 'i.Item_id Desc',
    LinkId: 0,
  };

  try {
    dispatch(setLoading(true));
    const response = await CatalogueServices.AllproductsData(body);

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
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected error in catalogue, please Refresh Page.');
    }
    console.error('Error fetching data:', error);
    dispatch(setLoading(false));
  }
};

export const fetchSingleProductDetailById = (itemId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await CatalogueServices.fetchSingleProductDetailById(itemId);
    dispatch(setSingleProduct(response.data?.Data?.products));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected error.');
    }
    console.error('Error fetching data:', error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToCart = (itemID, selectedDocId) => async (dispatch) => {
  const body = {
    Item_Id: itemID,
    Document_Id: selectedDocId,
  };

  try {
    const response = await CatalogueServices.addToCart(body);

    if (response.status === 200) {
      const successMsg = response?.data?.Message;
      dispatch(setCartId(response.data?.Data?.Cart_Id));
      toast.success(successMsg || 'Item added to cart successfully!');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected error adding to cart.');
    }
    console.error('Unexpected error:', error);
  }
};

export const getCartItem = (cartId) => async (dispatch) => {
  const body = {
    Cart_Id: cartId,
  };

  try {
    const response = await CatalogueServices.getCartItem(body);
    dispatch(setCartItems(response?.data?.Data));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error(`${error.message} in AllCartItemDetails API`);
    }
    console.error('Error to get cart items:', error);
  }
};

export const removeFromCart = (itemID, cartId) => async (dispatch) => {
  const body = {
    Id: itemID,
    Cart_Id: cartId,
  };

  try {
    const response = await CatalogueServices.removeFromCart(body);
    toast.success(response.data?.Message);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected error.');
    }
  }
};

export const updateCartItem = (itemID, cartId, quantity, remark) => async (dispatch) => {
  const body = {
    Id: itemID,
    Cart_Id: cartId,
    Qty: quantity,
    Remark: remark,
  };
  try {
    const response = await CatalogueServices.updateCartItem(body);
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error(error.message);
  }
};

export const uploadItem = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const uploadRes = await CatalogueServices.uploadItem(formData);
    toast.success('Item Upload Successfully !');

    dispatch(setLoading(false));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.Message);
    } else {
      toast.error('Unexpected error adding to product.');
    }
    console.error('Unexpected error:', error);
    dispatch(setLoading(false));
  }
};

export const getItemList = () => async (dispatch) => {
  const body = {
    SYSKey: 2,
    Access_Type: '',
    Access_Key: '',
    Access_From: '',
  };

  try {
    const itemRes = await CatalogueServices.itemList(body);
    dispatch(setItemList(itemRes?.data?.Data?.Table));
  } catch (error) {
    if (error.response && error.response.data && error.response.data.ErrorMessage) {
      toast.error(error.response.data.ErrorMessage);
    } else {
      toast.error('Unexpected error in getItemList API .');
    }
  }
};
