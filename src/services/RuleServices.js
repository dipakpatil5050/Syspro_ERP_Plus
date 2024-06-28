import { http } from '../API-Interceptor';

class RuleServices {
  getAllUsers(body) {
    return http.post('api/CommonAPI/Cart_Item_Update', body);
  }

  getAllRules(body) {
    return http.post('api/CommonAPI/AllRules', body);
  }

  deleteRule(body) {
    return http.post('api/CommonAPI/DeleteRule', body);
  }

  filterRuleCollection(body) {
    return http.post('api/CommonAPI/FillRuleCollectio', body);
  }
}

export default new RuleServices();
