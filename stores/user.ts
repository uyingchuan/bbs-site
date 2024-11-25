import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null as any,
    rememberMe: false
  }),
  
  actions: {
    setLoginState(status: boolean) {
      this.isLoggedIn = status
    },
    
    setUserInfo(info: any) {
      this.userInfo = info
    },
    
    setRememberMe(status: boolean) {
      this.rememberMe = status
    },
    
    logout() {
      this.isLoggedIn = false
      this.userInfo = null
    }
  },
  
  persist: true
}) 