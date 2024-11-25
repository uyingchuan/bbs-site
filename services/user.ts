import { request } from '~/utils/request';

export const userService = {
  // 获取用户列表
  getUsers(params: any) {
    return request('/users', {
      method: 'GET',
      params,
    });
  },

  // 更新用户信息
  updateUser(id: string, data: any) {
    return request(`/users/${id}`, {
      method: 'PUT',
      body: data,
    });
  },
};
