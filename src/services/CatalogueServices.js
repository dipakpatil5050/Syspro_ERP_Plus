import { http, httpFormData } from '../API-Interceptor';

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

  uploadItem(body) {
    return httpFormData.post('api/CatalogueSync/CatalogueUpload', body);
  }

  itemList(body) {
    return http.post('api/CommonAPI/ProductImageCatalogueReport', body);
  }
}

export default new CatalogueServices();
