import { http, whatsapp } from '../API-Interceptor';

class CatalogueServices {
  fetchSingleProductDetailById(itemId) {
    return http.get(`api/CommonAPI/GetProductByID?Item_ID=${itemId}`);
  }

  addToCart(body) {
    return http.post('api/CommonAPI/Save_Cart', body);
  }

  getCartItem(body) {
    return http.post('api/CommonAPI//AllCartItemDetails', body);
  }

  removeFromCart(body) {
    return http.post('api/CommonAPI/Cart_Item_Delete', body);
  }

  updateCartItem(body) {
    return http.post('api/CommonAPI/Cart_Item_Update', body);
  }

  sendInquiry(body) {
    return http.post('api/CommonAPI/OrderIndent', body);
  }

  orderPrint(body) {
    return http.post('api/CommonAPI/OrderPrint', body);
  }

  whatsAppFile(token, mobile, pdfPath, remark) {
    return whatsapp.post(`sendFileWithCaption?token=${token}&phone=91${mobile}&link=${pdfPath}&message=${remark}`);
  }
}

export default new CatalogueServices();
