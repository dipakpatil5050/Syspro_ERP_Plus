import toast from 'react-hot-toast';
import OrderServices from '../../services/OrderServices';
import { setLoading } from '../../redux/reducers/authReducer';
import { setCartItems, setIntentId, setOrderPdf } from '../../redux/reducers/cartSlice';

export const sendInquiry = (name, email, mobile, address, gst, remark, cartId, cartItems) => async (dispatch) => {
  const body = cartItems?.map((item) => ({
    Account_Name: name,
    MobileNo: mobile,
    Address: address,
    GST_No: gst,
    email: email,
    Remark: remark,

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
    dispatch(setLoading(true));
    const response = await OrderServices.sendInquiry(body);
    dispatch(setIntentId(response.data?.Data));

    const bodydata = {
      Indent_Id: response.data?.Data?.IndentID,
    };
    const res = await OrderServices.orderPrint(bodydata);
    dispatch(setOrderPdf(res.data?.Data?.ReportPath));
    toast.success('🛒🛍️Your Order has been Placed successfully....!✨');

    // What's App API

    const pdfPath = res.data?.Data?.ReportPath;
    const token = 'cltjual8g0gyf2sfyrd2bxrsb'; // whats app token it will be dynamic later here

    const whatsappresponse = await OrderServices.whatsAppFile(token, mobile, pdfPath, remark);
    console.log('Order Invoice shared to whats App : ', whatsappresponse?.data?.status);

    setTimeout(() => {
      window.open(pdfPath, '_blank');
    }, 2500);

    dispatch(setCartItems([]));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Inquiry sending Error:', error);
    toast.error(error.message);
    dispatch(setLoading(false));
  }
};
