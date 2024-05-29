import { http } from '../API-Interceptor';

class authService {
  /* eslint-disable class-methods-use-this */
  handleMPin(mPin) {
    return http.post(`SysMpin/authenticateSysmpin?mPin=${mPin}`, mPin);
  }
}

export default new authService();
