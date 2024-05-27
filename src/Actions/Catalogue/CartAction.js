import toast from 'react-hot-toast';
import CatalogueServices from '../../services/CatalogueServices';
// import { setLoading, setSingleProduct } from '../redux/reducers/authReducer';
import { setLoading, setSingleProduct } from '../../redux/reducers/authReducer';
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

export const getCartItem = () => async (dispatch) => {
  const body = {
    Cart_Id: 1,
  };

  try {
    const response = await CatalogueServices.getCartItem(body);
    dispatch(setCartItems(response.data?.Data?.Table));
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error(error.message);
  }
};
