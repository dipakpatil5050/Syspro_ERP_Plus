import { http } from '../API-Interceptor';

class authService {
  /* eslint-disable class-methods-use-this */
  handleMPin(mPin) {
    return http.post(`SysMpin/authenticateSysmpin?mPin=${mPin}`, mPin);
  }

  handleLogin(body) {
    return http.post('api/Static/UserLogin', body);
  }

  handleLogout(body) {
    return http.post('api/Static/UserLogout', body);
  }
}

export default new authService();
