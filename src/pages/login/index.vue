<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  userPasswordLoginAuthUserLoginPasswordPost,
  userWechatLoginAuthUserLoginWechatPost,
} from '@/service/app/auth'
import { useUserStore } from '@/store/user'
import { showToast } from '@/utils/toast'

const fieldMap = {
  name: 'real_name',
  job: 'occupation',
  phone: 'mobile',
}

const router = useRouter()
const userStore = useUserStore()

// 表单字段
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

// 字段校验
function validateForm() {
  const { username, password, real_name, occupation, education, region, mobile, age } = form.value
  if (
    !real_name ||
    !occupation ||
    !education ||
    !region ||
    !mobile ||
    !age ||
    !username ||
    !password
  ) {
    showToast('请完整填写所有信息')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(mobile)) {
    showToast('手机号格式错误')
    return false
  }
  if (typeof age === 'string' ? !/^\d+$/.test(age) : Number(age) < 1) {
    showToast('年龄格式错误')
    return false
  }
  if (!agree.value) {
    showToast('请阅读并同意知情同意书')
    return false
  }
  if (!envConfirm.value) {
    showToast('请确认当前环境安全')
    return false
  }
  return true
}

// 微信授权登录
async function handleWechatLogin() {
  if (!validateForm()) return
  loading.value = true
  try {
    // 获取微信 code（uniapp接口）
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
      router.push('/pages/assessment/index')
    }
  } catch (e) {
    showToast('微信登录失败')
  } finally {
    loading.value = false
  }
}

// 手动信息登录
async function handleManualLogin() {
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
      router.push('/pages/assessment/index')
    }
  } catch (e) {
    showToast('信息登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <wot-page>
    <w-navbar title="登录" />
    <w-card title="登录信息">
      <template #desc>
        <wot-form>
          <wot-input v-model="form.real_name" label="姓名" required />
          <wot-input v-model="form.occupation" label="职业" required />
          <wot-input v-model="form.education" label="学历" required />
          <wot-input v-model="form.region" label="地区" required />
          <wot-input v-model="form.mobile" label="手机号" required type="number" />
          <wot-input v-model="form.age" label="年龄" required type="number" />
          <wot-checkbox v-model="agree">已阅读并同意知情同意书</wot-checkbox>
          <wot-checkbox v-model="envConfirm">已确认当前环境安全</wot-checkbox>
          <w-button-group block gap="16rpx">
            <wot-button type="primary" :loading="loading" @click="handleWechatLogin">
              微信授权登录
            </wot-button>
            <wot-button type="success" :loading="loading" @click="handleManualLogin">
              手动信息登录
            </wot-button>
          </w-button-group>
        </wot-form>
      </template>
    </w-card>
  </wot-page>
</template>

<style lang="scss" scoped>
.login-container {
  padding: 20rpx;
}
</style>
