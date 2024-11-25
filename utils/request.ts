import { UseFetchOptions } from 'nuxt/app'

// 基础配置
const baseURL = 'http://localhost:8080/api'  // 替换为您的实际API地址
const timeout = 5000

// 请求配置类型
interface RequestConfig extends UseFetchOptions<any> {
  timeout?: number
}

// 创建请求实例
export const request = async (url: string, config: RequestConfig = {}) => {
  // 合并配置
  const finalConfig: RequestConfig = {
    baseURL,
    timeout,
    ...config,
    // 请求拦截
    onRequest({ options }) {
      // 添加token到请求头
      const userStore = useUserStore()
      if (userStore.isLoggedIn) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    },
    // 响应拦截
    onResponse({ response }) {
      // 统一处理响应
      const data = response._data
      if (data.code !== 200) {
        throw new Error(data.message || '请求失败')
      }
      return data
    },
    // 错误处理
    onResponseError({ response }) {
      const status = response.status
      switch (status) {
        case 401:
          // token过期，清除用户信息并跳转到登录页
          const userStore = useUserStore()
          userStore.logout()
          navigateTo('/login')
          break
        case 403:
          throw new Error('没有权限访问')
        case 404:
          throw new Error('请求的资源不存在')
        case 500:
          throw new Error('服务器错误')
        default:
          throw new Error('网络错误')
      }
    }
  }

  return useFetch(url, finalConfig);
} 
