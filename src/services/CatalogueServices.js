import { http } from '../http-common';

class CatalogueServices {
  /* eslint-disable class-methods-use-this */
  fetchSingleProductDetailById(itemId) {
    return http.get(`api/CommonAPI/GetProductByID?Item_ID=${itemId}`);
  }

  addToCart(body) {
    return http.post('api/CommonAPI/Save_Cart', body);
  }

  getCartItem(body) {
    return http.post('api/CommonAPI//AllCartItemDetails', body);
  }
}

export default new CatalogueServices();
