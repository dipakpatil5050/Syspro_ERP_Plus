import toast from 'react-hot-toast';
import CatalogueServices from '../../services/CatalogueServices';

import { setItemList, setLoading, setSingleProduct } from '../../redux/reducers/authReducer';
import { setCartItems, setCartId } from '../../redux/reducers/cartSlice';

export const fetchSingleProductDetailById = (itemId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await CatalogueServices.fetchSingleProductDetailById(itemId);
    dispatch(setSingleProduct(response.data?.Data?.products));
  } catch (error) {
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
    console.error('Error adding to cart:', error);
    toast.error(error.message, 'Please Refresh the Page');
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
    console.error('Error while remove from cart:', error);
    toast.error(error.message);
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

export const uploadItem = (file, itemId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('itemID', itemId);

  try {
    const uploadRes = await CatalogueServices.uploadItem(formData);
    console.log(uploadRes?.data?.Data);
    // toast.success('Item Upload Successfully !');
  } catch (error) {
    console.error('Image uploading Error , ', error);
    // toast.error('Item Upload Failed !');
  }
};

export const getItemList = () => async (dispatch) => {
  const body = {};

  try {
    const itemRes = await CatalogueServices.itemList(body);
    console.log('Item List : ', itemRes?.data?.Data);
    dispatch(setItemList(itemRes?.data?.Data?.Table));
  } catch (error) {
    console.error('Item List Fetching Error', error);
    toast.error('Item List Fetching Error');
  }
};
