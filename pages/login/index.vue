<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/user';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { useLocalStorage } from '@vueuse/core';
import { authService } from '~/services/auth';

const router = useRouter();
const userStore = useUserStore();

const account = ref('');
const password = ref('');
const rememberMe = ref(userStore.rememberMe);
const loginError = ref('');
const isLoading = ref(false);

// 如果之前选择了记住密码，从localStorage加载保存的账号密码
const savedCredentials = useLocalStorage('credentials', {
  account: '',
  password: '',
});
account.value = savedCredentials.value.account;
password.value = savedCredentials.value.password;
rememberMe.value = !!account.value;

// 表单验证规则
const rules = {
  account: {
    required,
    email: email,
  },
  password: {
    required,
    minLength: minLength(6),
  },
};

const v$ = useVuelidate(rules, { account, password });

const handleLogin = async () => {
  loginError.value = '';

  // 验证表单
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    isLoading.value = true;

    // 调用登录接口
    const res = await authService.login({
      email: account.value,
      password: password.value,
    });
    // 保存token
    localStorage.setItem('token', res.token);

    // 保存登录状态
    userStore.setLoginState(true);
    userStore.setUserInfo(res.userInfo);

    // 处理记住密码
    userStore.setRememberMe(rememberMe.value);
    if (rememberMe.value) {
      useLocalStorage('credentials', {
        account: account.value,
        password: password.value,
      });
    } else {
      localStorage.removeItem('credentials');
    }

    // 登录成功后跳转
    await router.push('/');
  } catch (error: any) {
    loginError.value = error.message || '登录失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="title">
        登录
      </h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            id="account"
            v-model="account"
            type="email"
            autocomplete="email"
            :class="{ error: v$.account.$error }"
            placeholder="请输入邮箱账号"
            @blur="v$.account.$touch"
          >
          <span
            v-if="v$.account.$error"
            class="error-text"
          >
            {{ v$.account.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group">
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="user-password"
            :class="{ error: v$.password.$error }"
            placeholder="请输入密码"
            @blur="v$.password.$touch"
          >
          <span
            v-if="v$.password.$error"
            class="error-text"
          >
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label"> <input
            v-model="rememberMe"
            type="checkbox"
          > 记住密码 </label>
        </div>

        <div
          v-if="loginError"
          class="error-message"
        >
          {{ loginError }}
        </div>

        <button
          type="submit"
          class="login-btn"
          :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e0f7fa 0%, #4fc3f7 100%);
}

.login-form {
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: rgba(142, 142, 142, 0.19) 0 6px 15px 0;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.45);
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 4px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
}

input:focus {
  outline: none;
  border-color: #4fc3f7;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #4fc3f7;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #03a9f4;
}

.error {
  border-color: #ff4444 !important;
}

.error-text {
  color: #ff4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.error-message {
  color: #ff4444;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #ffebee;
  border-radius: 4px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
