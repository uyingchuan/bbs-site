<template>
  <div class="container">
    <h1>首页</h1>
    <p>欢迎回来，{{ userStore.userInfo?.username }}</p>
    <button
      class="logout-btn"
      @click="handleLogout"
    >
      退出登录
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.logout-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-btn:hover {
  background: #cc0000;
}
</style>
