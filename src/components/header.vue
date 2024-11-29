<script setup lang="ts">
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
</script>

<template>
  <nav class="navbar flex shadow-1 surface-card">
    <div class="layout-container pt-0 flex justify-content-between">
      <div class="flex align-items-center">
        <a class="nav-link">话题</a>
        <a class="nav-link">广场</a>
      </div>
      <div class="flex align-items-center">
        <NuxtLink
          to="/article/create"
          class="nav-link text-primary"
        >
          发表文章
        </NuxtLink>
        <a class="nav-link text-base">{{ userStore.userInfo?.nickname }}</a>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3.25rem;
  z-index: 10;
}

.navbar > .container {
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: 100%;
}

@media (min-width: 1408px) {
  .navbar > .container {
    max-width: 1344px;
  }
}

@media (min-width: 1216px) {
  .navbar > .container {
    max-width: 1152px;
  }
}

@media (min-width: 1024px) {
  .navbar > .container {
    max-width: 960px;
  }
}

.navbar .nav-link {
  color: var(--text-color);
  padding: 5px 10px;
  margin-right: 1.25rem;
  position: relative;
  cursor: pointer;
  text-decoration: none;
}
</style>
