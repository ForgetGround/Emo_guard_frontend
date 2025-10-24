<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录/注册',
  },
}
</route>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  userPasswordLoginAuthUserLoginPasswordPost,
  userRegisterAuthUserRegisterPost,
  userWechatLoginAuthUserLoginWechatPost,
} from '@/service/app/auth'
import { getUserCompleteInfoUserProfileGet } from '@/service/app/userProfile'
import { useUserStore } from '@/store/user'
import { showToast } from '@/utils/toast'

const userStore = useUserStore()

const mode = ref<'login' | 'register'>('login')
const showConsent = ref(false)
const hasConsent = ref(false)

const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  real_name: '',
})

const loading = ref(false)

// 表单验证
const isLoginValid = computed(() => {
  return form.value.username.trim() && form.value.password.trim()
})

const isRegisterValid = computed(() => {
  return (
    form.value.username.trim() &&
    form.value.password.trim() &&
    form.value.confirmPassword.trim() &&
    form.value.real_name.trim()
  )
})

// 显示知情同意书
function showConsentModal() {
  showConsent.value = true
}

// 确认知情同意书
function confirmConsent() {
  hasConsent.value = true
  uni.setStorageSync('hasConsent', true)
  showConsent.value = false
  showToast('感谢您的同意')
}

// 登录
async function handleLogin() {
  if (!isLoginValid.value) {
    showToast('请填写完整的登录信息')
    return
  }

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

      // 检查用户信息是否完整
      try {
        const userProfile = await getUserCompleteInfoUserProfileGet({ params: {} })
        if (!userProfile?.profile?.nickname) {
          // 信息不完整，跳转到个人信息页
          uni.redirectTo({ url: '/pages/profile/index' })
        } else {
          // 信息完整，跳转到评估页
          uni.redirectTo({ url: '/pages/assessment/index' })
        }
      } catch {
        uni.redirectTo({ url: '/pages/profile/index' })
      }
    }
  } catch (e: any) {
    showToast(e?.message || '登录失败，请检查账号密码')
  } finally {
    loading.value = false
  }
}

// 注册
async function handleRegister() {
  if (!isRegisterValid.value) {
    showToast('请填写完整的注册信息')
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    showToast('两次密码输入不一致')
    return
  }

  if (form.value.password.length < 6) {
    showToast('密码至少需要6位')
    return
  }

  if (!hasConsent.value) {
    showToast('请先阅读并同意知情同意书')
    showConsentModal()
    return
  }

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
      showToast('注册成功，请登录')
      mode.value = 'login'
      form.value.password = ''
      form.value.confirmPassword = ''
    }
  } catch (e: any) {
    showToast(e?.message || '注册失败，请重试')
  } finally {
    loading.value = false
  }
}

// 微信授权登录
async function handleWechatLogin() {
  if (!hasConsent.value) {
    showToast('请先阅读并同意知情同意书')
    showConsentModal()
    return
  }

  loading.value = true
  try {
    // 获取微信授权码
    const { code } = await new Promise<{ code: string }>((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: resolve,
        fail: reject,
      })
    })

    const res = await userWechatLoginAuthUserLoginWechatPost({
      body: { code },
    })

    if (res?.access_token) {
      userStore.setUserInfo(res)
      showToast('登录成功')

      // 检查用户信息是否完整
      try {
        const userProfile = await getUserCompleteInfoUserProfileGet({ params: {} })
        if (!userProfile?.profile?.nickname) {
          uni.redirectTo({ url: '/pages/profile/index' })
        } else {
          uni.redirectTo({ url: '/pages/assessment/index' })
        }
      } catch {
        uni.redirectTo({ url: '/pages/profile/index' })
      }
    }
  } catch (e: any) {
    showToast(e?.message || '微信登录失败')
  } finally {
    loading.value = false
  }
}

// 切换模式时清空确认密码
function switchMode(newMode: 'login' | 'register') {
  mode.value = newMode
  form.value.confirmPassword = ''
}
</script>

<template>
  <view class="auth-container">
    <view class="header">
      <text class="app-title">认知情绪守护</text>
      <text class="app-subtitle">Cognitive & Emotional Guardian</text>
    </view>

    <view class="mode-tabs">
      <view class="mode-tab" :class="{ active: mode === 'login' }" @click="switchMode('login')">
        <text class="mode-tab-text">登录</text>
      </view>
      <view
        class="mode-tab"
        :class="{ active: mode === 'register' }"
        @click="switchMode('register')"
      >
        <text class="mode-tab-text">注册</text>
      </view>
    </view>

    <view class="form-container">
      <!-- 登录表单 -->
      <view v-if="mode === 'login'" class="form-content">
        <view class="form-item">
          <text class="form-label">账号</text>
          <input
            v-model="form.username"
            class="form-input"
            placeholder="请输入账号"
            placeholder-class="placeholder"
          />
        </view>

        <view class="form-item">
          <text class="form-label">密码</text>
          <input
            v-model="form.password"
            class="form-input"
            type="password"
            placeholder="请输入密码"
            placeholder-class="placeholder"
          />
        </view>

        <view class="button-group">
          <view
            class="btn btn-primary"
            :class="{ disabled: !isLoginValid || loading }"
            @click="handleLogin"
          >
            <text class="btn-text">{{ loading ? '登录中...' : '登录' }}</text>
          </view>

          <!-- #ifdef MP-WEIXIN -->
          <view class="btn btn-success" :class="{ disabled: loading }" @click="handleWechatLogin">
            <text class="btn-text">微信授权登录</text>
          </view>
          <!-- #endif -->
        </view>
      </view>

      <!-- 注册表单 -->
      <view v-else class="form-content">
        <view class="form-item">
          <text class="form-label">账号 *</text>
          <input
            v-model="form.username"
            class="form-input"
            placeholder="请输入账号"
            placeholder-class="placeholder"
          />
        </view>

        <view class="form-item">
          <text class="form-label">真实姓名 *</text>
          <input
            v-model="form.real_name"
            class="form-input"
            placeholder="请输入真实姓名"
            placeholder-class="placeholder"
          />
        </view>

        <view class="form-item">
          <text class="form-label">密码 *</text>
          <input
            v-model="form.password"
            class="form-input"
            type="password"
            placeholder="请设置密码（至少6位）"
            placeholder-class="placeholder"
          />
        </view>

        <view class="form-item">
          <text class="form-label">确认密码 *</text>
          <input
            v-model="form.confirmPassword"
            class="form-input"
            type="password"
            placeholder="请再次输入密码"
            placeholder-class="placeholder"
          />
        </view>

        <view class="agreement-section">
          <view class="agreement-check" @click="showConsentModal">
            <checkbox :checked="hasConsent" color="#1890ff" />
            <text class="agreement-text">我已阅读并同意</text>
            <text class="agreement-link">《知情同意书》</text>
          </view>
        </view>

        <view class="button-group">
          <view
            class="btn btn-primary"
            :class="{ disabled: !isRegisterValid || loading }"
            @click="handleRegister"
          >
            <text class="btn-text">{{ loading ? '注册中...' : '注册' }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 知情同意书弹窗 -->
    <view v-if="showConsent" class="modal-mask" @click.self="showConsent = false">
      <view class="modal-container" @click.stop>
        <view class="modal-header">
          <text class="modal-title">知情同意书</text>
          <text class="modal-subtitle">认知情绪守护</text>
        </view>

        <scroll-view class="modal-content" scroll-y="true">
          <view class="content-section">
            <text class="section-title">一、评估目的</text>
            <text class="section-text">
              本认知健康评估旨在通过科学的量表测试，帮助您了解自身的认知功能状态、情绪健康水平和日常生活能力，为您提供个性化的健康建议和干预方案。
            </text>
          </view>

          <view class="content-section">
            <text class="section-title">二、评估内容</text>
            <text class="section-text">评估包括以下几个方面：</text>
            <text class="list-item">• SCD主观认知下降量表</text>
            <text class="list-item">• ADL日常生活能力量表</text>
            <text class="list-item">• PHQ-9抑郁症筛查量表</text>
            <text class="list-item">• GAD-7焦虑症筛查量表</text>
          </view>

          <view class="content-section">
            <text class="section-title">三、隐私保护</text>
            <text class="section-text">我们承诺：</text>
            <text class="list-item">• 严格保护您的个人隐私信息</text>
            <text class="list-item">• 数据传输和存储采用加密技术</text>
            <text class="list-item">• 不会向第三方泄露您的个人信息</text>
            <text class="list-item">• 您有权随时查看、修改或删除个人数据</text>
          </view>

          <view class="content-section">
            <text class="section-title">四、联系方式</text>
            <text class="section-text">如有疑问，请联系：</text>
            <text class="contact-info">电话：19858163283</text>
          </view>
        </scroll-view>

        <view class="modal-footer">
          <view class="btn btn-secondary" @click="showConsent = false">
            <text class="btn-text">取消</text>
          </view>
          <view class="btn btn-primary" @click="confirmConsent">
            <text class="btn-text">我已知情并同意</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 60rpx 32rpx 32rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;

  .app-title {
    display: block;
    font-size: 48rpx;
    font-weight: 600;
    color: #1890ff;
    margin-bottom: 12rpx;
  }

  .app-subtitle {
    display: block;
    font-size: 24rpx;
    color: #666;
  }
}

.mode-tabs {
  display: flex;
  background: white;
  border-radius: 16rpx;
  padding: 8rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);

  .mode-tab {
    flex: 1;
    padding: 20rpx;
    text-align: center;
    border-radius: 12rpx;
    transition: all 0.3s;

    &.active {
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);

      .mode-tab-text {
        color: white;
        font-weight: 600;
      }
    }

    .mode-tab-text {
      font-size: 28rpx;
      color: #666;
    }
  }
}

.form-container {
  background: white;
  border-radius: 16rpx;
  padding: 40rpx 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);
}

.form-content {
  .form-item {
    margin-bottom: 32rpx;

    .form-label {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 12rpx;
    }

    .form-input {
      width: 100%;
      padding: 20rpx;
      border: 2rpx solid #e0e0e0;
      border-radius: 12rpx;
      font-size: 28rpx;
      background: #f8f9fa;
      transition: all 0.3s;

      &:focus {
        border-color: #1890ff;
        background: white;
      }
    }

    .placeholder {
      color: #999;
    }
  }
}

.agreement-section {
  margin-bottom: 32rpx;

  .agreement-check {
    display: flex;
    align-items: center;
    gap: 12rpx;

    .agreement-text {
      font-size: 26rpx;
      color: #666;
    }

    .agreement-link {
      font-size: 26rpx;
      color: #1890ff;
      text-decoration: underline;
    }
  }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.btn {
  width: 100%;
  padding: 28rpx;
  border-radius: 16rpx;
  text-align: center;
  transition: all 0.3s;

  &.btn-primary {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.3);

    .btn-text {
      color: white;
    }

    &.disabled {
      background: #f3f3f3;
      box-shadow: none;

      .btn-text {
        color: #999;
      }
    }
  }

  &.btn-secondary {
    background: #f3f3f3;

    .btn-text {
      color: #666;
    }
  }

  &.btn-success {
    background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%);
    box-shadow: 0 8rpx 24rpx rgba(82, 196, 26, 0.3);

    .btn-text {
      color: white;
    }
  }

  .btn-text {
    font-size: 32rpx;
    font-weight: 500;
  }
}

// 弹窗样式
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 32rpx;
}

.modal-container {
  width: 100%;
  max-width: 600rpx;
  max-height: 80vh;
  background: white;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  padding: 32rpx;
  text-align: center;

  .modal-title {
    display: block;
    color: white;
    font-size: 36rpx;
    font-weight: 600;
    margin-bottom: 8rpx;
  }

  .modal-subtitle {
    display: block;
    color: rgba(255, 255, 255, 0.9);
    font-size: 24rpx;
  }
}

.modal-content {
  flex: 1;
  padding: 32rpx;
  overflow-y: auto;

  .content-section {
    margin-bottom: 32rpx;

    .section-title {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      color: #1890ff;
      margin-bottom: 12rpx;
    }

    .section-text {
      display: block;
      font-size: 26rpx;
      color: #333;
      line-height: 1.6;
      margin-bottom: 12rpx;
    }

    .list-item {
      display: block;
      font-size: 26rpx;
      color: #555;
      line-height: 1.6;
      margin-bottom: 8rpx;
    }

    .contact-info {
      display: block;
      font-size: 26rpx;
      color: #1890ff;
      font-weight: 500;
      margin-bottom: 8rpx;
    }
  }
}

.modal-footer {
  display: flex;
  gap: 16rpx;
  padding: 24rpx 32rpx;
  border-top: 1px solid #f0f0f0;
}
</style>
