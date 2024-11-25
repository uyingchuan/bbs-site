<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// 确保pinia store在应用启动时可用
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
</script>

<style>
/* 添加一些全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
