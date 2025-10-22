<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录/注册',
  },
}
</route>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  userPasswordLoginAuthUserLoginPasswordPost,
  userRegisterAuthUserRegisterPost,
  userWechatLoginAuthUserLoginWechatPost,
} from '@/service/app/auth'
import { useUserStore } from '@/store/user'
import { showToast } from '@/utils/toast'

const router = useRouter()
const userStore = useUserStore()

const mode = ref<'login' | 'register'>('login')

const form = ref({
  username: '',
  password: '',
  real_name: '',
  occupation: '',
  education: '',
  region: '',
  mobile: '',
  age: '',
})

const agree = ref(false)
const envConfirm = ref(false)
const loading = ref(false)

// 登录表单项
const loginFields = [
  { key: 'username', label: '账号', required: true },
  { key: 'password', label: '密码', required: true, type: 'password' },
]

// 校验
function validateForm() {
  for (const field of loginFields) {
    if (!form.value[field.key]) {
      showToast(`请填写${field.label}`)
      return false
    }
  }
  return true
}

// 登录
async function handleLogin() {
  if (!validateForm()) return
  loading.value = true
  try {
    const res = await userPasswordLoginAuthUserLoginPasswordPost({
      body: {
        username: form.value.username,
        password: form.value.password,
      },
    })
    if (res?.access_token) {
      userStore.setUserInfo(res)
      showToast('登录成功')
      // 判断用户信息是否完整
      // 登录后获取完整用户信息，跳转逻辑见下方
    }
  } catch (e) {
    showToast('登录失败')
  } finally {
    loading.value = false
  }
}

// 注册
async function handleRegister() {
  if (!validateForm()) return
  loading.value = true
  try {
    const res = await userRegisterAuthUserRegisterPost({
      body: {
        username: form.value.username,
        password: form.value.password,
        real_name: form.value.real_name,
      },
    })
    if (res) {
      showToast('注册成功')
      // 注册后跳转信息收集页
      router.push('/pages/profile/index')
    }
  } catch (e) {
    showToast('注册失败')
  } finally {
    loading.value = false
  }
}

// 微信授权登录
async function handleWechatLogin() {
  loading.value = true
  try {
    const { code } = await new Promise<{ code: string }>((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: resolve,
        fail: reject,
      })
    })
    const res = await userWechatLoginAuthUserLoginWechatPost({ body: { code, ...form.value } })
    if (res?.access_token) {
      userStore.setUserInfo(res)
      showToast('登录成功')
      const { getUserCompleteInfoUserProfileGet } = await import('@/service/app/userProfile')
      try {
        const detail = await getUserCompleteInfoUserProfileGet({ params: {} })
        if (!detail.profile?.nickname) {
          router.push('/pages/profile/index')
        } else {
          router.push('/pages/assessment/index')
        }
      } catch {
        router.push('/pages/profile/index')
      }
    }
  } catch (e) {
    showToast('微信登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="auth-container">
    <view class="mode-switch">
      <wot-button :type="mode === 'login' ? 'primary' : 'default'" @click="mode = 'login'">
        登录
      </wot-button>
      <wot-button :type="mode === 'register' ? 'primary' : 'default'" @click="mode = 'register'">
        注册
      </wot-button>
    </view>
    <wot-form>
      <template v-if="mode === 'login'">
        <wot-input v-model="form.username" label="账号" required />
        <wot-input v-model="form.password" label="密码" required type="password" />
        <wot-button block type="primary" :loading="loading" @click="handleLogin">登录</wot-button>
        <wot-button block type="success" :loading="loading" @click="handleWechatLogin">
          微信授权登录
        </wot-button>
      </template>
      <template v-else>
        <wot-input v-model="form.username" label="账号" required />
        <wot-input v-model="form.password" label="密码" required type="password" />
        <wot-input v-model="form.real_name" label="姓名" required />
        <wot-input v-model="form.occupation" label="职业" required />
        <wot-input v-model="form.education" label="学历" required />
        <wot-input v-model="form.region" label="地区" required />
        <wot-input v-model="form.mobile" label="手机号" required type="number" />
        <wot-input v-model="form.age" label="年龄" required type="number" />
        <wot-checkbox v-model="agree">已阅读并同意知情同意书</wot-checkbox>
        <wot-checkbox v-model="envConfirm">已确认当前环境安全</wot-checkbox>
        <wot-button block type="primary" :loading="loading" @click="handleRegister">
          注册
        </wot-button>
      </template>
    </wot-form>
  </view>
</template>

<style lang="scss" scoped>
.auth-container {
  padding: 32rpx 24rpx;
  background: #fff;
  min-height: 100vh;
}
.mode-switch {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}
.wot-form {
  margin-top: 0;
}
</style>
