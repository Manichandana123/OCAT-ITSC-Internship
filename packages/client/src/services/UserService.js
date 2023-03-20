import Axios from '../utils/http.config';

export class UserService {
  static setAuthToken(token) {
    if (token) {
      // set the Authorization header with the token
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      // remove the Authorization header
      delete Axios.defaults.headers.common.Authorization;
    }
  }

  static async login(user) {
    try {
      const response = await Axios.post(`/user/login`, { user });
      const { message, status, token } = response.data;
      return { message, status, token };
    } catch (err) {
      console.log(`isse`);
      throw new Error(`${err.response.status} - ${err.response.data.message}`);
    }
  }

}
