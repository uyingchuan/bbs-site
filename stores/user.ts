import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null as any,
    rememberMe: false,
  }),

  getters: {},

  actions: {
    setLoginState(status: boolean) {
      this.isLoggedIn = status;
    },

    setUserInfo(info: any) {
      this.userInfo = info;
    },

    setRememberMe(status: boolean) {
      this.rememberMe = status;
    },

    logout() {
      this.isLoggedIn = false;
      this.userInfo = null;
    },
  },

  persist: true,
});

export interface LoginResponse {
  token: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: string;
  email: string;
  userName: string;
}
