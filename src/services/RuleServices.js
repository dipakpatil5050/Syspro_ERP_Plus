import { http } from '../API-Interceptor';

class RuleServices {
  filterRuleCollection(body) {
    return http.post('api/B2B/FillRuleCollection', body);
  }

  getRuleDataById(ruleId) {
    return http.get(`api/B2B/GetByIdRuleCollectionData?Rule_id=${ruleId}`);
  }

  getAllRules(body) {
    return http.post('api/B2B/ListRuleCollection', body);
  }

  saveRuleToCollection(body) {
    return http.post('api/B2B/SaveRuleCollectionData', body);
  }

  getAllUsers(body) {
    return http.post('api/', body);
  }

  deleteRule(body) {
    return http.post('api/', body);
  }
}

export default new RuleServices();
