import { API_ROOT } from '../constants.js';
import axios from 'axios';
import TokenService from './token_services';

const instance = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await TokenService.getLocalAccessToken();
    if (token) {
      config.headers['X-AUTH-USER'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig && originalConfig.url !== '/admin/login') {
      console.log(originalConfig.url)
      // JWT Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axios.get(`${API_ROOT}/login/refresh`, {
            headers: { 'X-AUTH-USER': await TokenService.getLocalRefreshToken() },
          });
          const { jwt_token } = rs.data;
          await TokenService.updateLocalAccessToken(jwt_token);
          return instance(originalConfig);
        } catch (_error) {
          //TokenService.removeUser();
          return Promise.reject(_error);
        }
      }else if(err.response.status === 500 && !originalConfig._retry) {
        originalConfig._retry = true;
        console.error(`Server error 500 for ${originalConfig.url} :(`);
        return instance(originalConfig);
      } else
        console.warn(err.response)
    }
    return Promise.reject(err);
  }
);

export default instance;