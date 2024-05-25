import toast from 'react-hot-toast';
import CatalogueServices from '../../services/CatalogueServices';
// import { setLoading, setSingleProduct } from '../redux/reducers/authReducer';
import { setLoading, setSingleProduct } from '../../redux/reducers/authReducer';

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
    dispatch(setLoading(true));
    const response = await CatalogueServices.addToCart(body);
    const alertMsg = response?.data?.Message;
    toast.success(alertMsg);
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error(error.message);
  } finally {
    dispatch(setLoading(false));
  }
};
