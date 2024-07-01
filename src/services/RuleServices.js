import { http } from '../API-Interceptor';

class RuleServices {
  filterRuleCollection(body) {
    return http.post('api/B2B/FillRuleCollection', body);
  }

  getRuleDataById(body) {
    return http.get('api/B2B/', body);
  }

  getAllRules(body) {
    return http.post('api/B2B/', body);
  }

  saveRuletoCollection(body) {
    return http.post('api/B2B/', body);
  }

  getAllUsers(body) {
    return http.post('api/', body);
  }

  deleteRule(body) {
    return http.post('api/', body);
  }
}

export default new RuleServices();
