import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  // 如果用户未登录且访问的不是登录页面，则重定向到登录页
  if (!userStore.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login');
  }

  // 如果用户已登录且访问登录页面，则重定向到首页
  if (userStore.isLoggedIn && to.path === '/login') {
    return navigateTo('/');
  }
});
