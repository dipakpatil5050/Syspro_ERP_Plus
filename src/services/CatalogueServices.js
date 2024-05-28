import { http } from '../http-common';

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
}

export default new CatalogueServices();
