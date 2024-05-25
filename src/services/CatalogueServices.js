import { http } from '../http-common';

class CatalogueServices {
  /* eslint-disable class-methods-use-this */
  fetchSingleProductDetailById(itemId) {
    return http.get(`api/CommonAPI/GetProductByID?Item_ID=${itemId}`);
  }

  // addToCart(itemID, selectedDocId) {
  //   const body = {
  //     Item_Id: itemID,
  //     Document_Id: selectedDocId,
  //   };
  //   return http.post('api/CommonAPI/Save_Cart', body);
  // }

  /* eslint-disable class-methods-use-this */
  addToCart(body) {
    return http.post('api/CommonAPI/Save_Cart', body);
  }
}

export default new CatalogueServices();
