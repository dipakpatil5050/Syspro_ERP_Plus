import { http } from '../API-Interceptor';
class RuleServices {
  updateCartItem(body) {
    return http.post('api/CommonAPI/Cart_Item_Update', body);
  }
}

export default new RuleServices();
