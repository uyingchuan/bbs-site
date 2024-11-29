<template>
  <div
    v-if="userStore.userInfo"
    class="layout-container"
  >
    <div class="profile border-round-sm" />
    <div class="flex mt-2">
      <div class="flex flex-column w-20rem gap-2">
        <!-- 个人资料 -->
        <div class="widget">
          <div class="widget-header">
            <span class="text-lg">个人资料</span>
            <el-button
              text
              class="px-0"
            >
              编辑资料
            </el-button>
          </div>
          <div class="widget-content border-top-1 border-bottom-1 surface-border">
            <span class="text-color-secondary">昵称</span>
            <span>{{ userStore.userInfo.nickname }}</span>
          </div>
          <div class="widget-content">
            <span class="text-color-secondary">签名</span>
            <span class="text-sm">{{ userStore.userInfo.description }}</span>
          </div>
        </div>
        <!-- 粉丝列表 -->
        <div class="widget">
          <div class="widget-header">
            <span class="text-lg">
              <span>粉丝</span>
              <span
                v-if="userStore.userInfo.fansCount > 0"
                class="text-primary text-sm ml-2"
              >
                {{ userStore.userInfo.fansCount }}
              </span>
            </span>
            <el-button
              text
              class="px-0"
            >
              更多
            </el-button>
          </div>
          <div class="widget-content justify-content-center border-top-1 surface-border">
            <span class="text-sm text-color-secondary">暂无数据</span>
          </div>
        </div>
        <!-- 关注列表 -->
        <div class="widget">
          <div class="widget-header">
            <span class="text-lg">关注</span>
            <el-button
              text
              class="px-0"
            >
              更多
            </el-button>
          </div>
          <div class="widget-content justify-content-center border-top-1 surface-border">
            <span class="text-sm text-color-secondary">暂无数据</span>
          </div>
        </div>
      </div>

      <div class="right-container">
        <div class="">
          cc
        </div>
      </div>
    </div>
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

<style scoped lang="scss">
.layout-container {
  padding-top: 3.25rem;
  padding-bottom: 1rem;
  min-height: 100vh;
}

.profile {
  height: 220px;
  width: 100%;
  overflow: hidden;
  background-image: url('assets/images/profile/profile-bg.jpg');
  background-position: center 55%;
}

.widget {
  background: var(--surface-card);
  border-radius: var(--border-radius);
  padding: 0 1rem;

  span {
    max-width: 14rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.widget > .widget-header {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.widget > .widget-content {
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
