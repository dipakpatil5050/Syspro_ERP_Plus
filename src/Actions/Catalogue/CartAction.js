import toast from 'react-hot-toast';
import CatalogueServices from '../../services/CatalogueServices';
import { setLoading, setSingleProduct } from '../../redux/reducers/authReducer';
import { setCartItems, setCartId, setIntentId, setOrderPdf } from '../../redux/reducers/cartSlice';

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

export const sendInquiry = (name, email, mobile, address, gst, remark, cartId, cartItems) => async (dispatch) => {
  const body = cartItems?.map((item) => ({
    Account_Name: name, // from user input
    MobileNo: mobile, // from user input
    Address: address, // from user input
    GST_No: gst, // from user input
    email: email, // from user input
    Remark: remark, // from user input

    Row_id: item.Id,
    Rate: item.Saleprice1,
    Qty: item.Qty,
    Amount: item.Total,

    Cart_Id: cartId,
    Indent_Id: 0,
    SetQty: 0,
    // Account_ID: 1006,
  }));

  try {
    const response = await CatalogueServices.sendInquiry(body);
    dispatch(setIntentId(response.data?.Data));
    toast.success('Product inquiry Sent successfully....!');

    const bodydata = {
      Indent_Id: response.data?.Data?.IndentID,
    };
    const res = await CatalogueServices.orderPrint(bodydata);
    dispatch(setOrderPdf(res.data?.Data?.ReportPath));
    console.log('Pdf File Path ', res.data?.Data?.ReportPath);
    dispatch(setCartItems([]));
  } catch (error) {
    console.error('Error while send Inquiry:', error);
    toast.error(error.message);
  }
};

// export const orderPrint = () => async (dispatch) => {
//   const body = {
//     Intent_Id: 0,
//   };

//   try {
//     const response = await CatalogueServices.orderPrint(body);
//   } catch (error) {
//     console.log('Error in order print : ', error);
//   }
// };
