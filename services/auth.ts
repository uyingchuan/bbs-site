import { $http, ApiError } from '~/utils/http';
import type { LoginResponse } from '~/stores/user';

interface LoginParams {
  email: string;
  password: string;
}

export const authService = {
  // 登录
  async login(data: LoginParams): Promise<LoginResponse> {
    const res = await $http.doPost<LoginResponse>('/auth/login', data);
    if (res.success) {
      return res.data!;
    }

    throw new ApiError(res.message);
  },
};
