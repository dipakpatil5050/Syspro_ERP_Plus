import { http } from '../../http-common';

class CatalogueServices {
  getCatalogueById(id) {
    return http.get(`SysMpin/getCatalogueById?${id}`);
  }
}

export default new CatalogueServices();
