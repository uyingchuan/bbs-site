import { request } from '~/utils/request';

interface LoginParams {
  email: string;
  password: string;
}

export const authService = {
  // 登录
  login(data: LoginParams) {
    return request('/auth/login', {
      method: 'POST',
      body: data,
    });
  },

  // 获取用户信息
  getUserInfo() {
    return request('/auth/user-info', {
      method: 'GET',
    });
  },

  // 登出
  logout() {
    return request('/auth/logout', {
      method: 'POST',
    });
  },
};
