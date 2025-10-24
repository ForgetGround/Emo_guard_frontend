<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
  },
}
</route>

<script lang="ts" setup>
import { ref } from 'vue'
// import { Client as api } from '@/api'

const loginType = ref<'wechat' | 'password'>('wechat')
const username = ref('')
const password = ref('')

const switchLoginType = (type: 'wechat' | 'password') => {
  loginType.value = type
}

const goToRegister = () => {
  uni.navigateTo({ url: '/pages/register/register' })
}

// 微信登录
const handleWechatLogin = async () => {
  try {
    uni.showLoading({ title: '登录中...' })
    // 调用后端 API
    // const result = await api.UserService.wechatLogin()
    // 保存登录信息
    // api.saveLoginInfo(result.userInfo, result.token)

    uni.showToast({ title: '登录成功', icon: 'success' })

    // 登录后检查首次评估
    checkAndNavigate()
  }
  catch (err: any) {
    uni.showToast({
      title: err.message || '登录失败',
      icon: 'none',
    })
  }
  finally {
    uni.hideLoading()
  }
}

// 账号密码登录
const handlePasswordLogin = async () => {
  if (!username.value || !password.value) {
    return uni.showToast({ title: '请填写完整信息', icon: 'none' })
  }

  try {
    uni.showLoading({ title: '登录中...' })
    // const result = await api.UserService.passwordLogin(
    //   username.value,
    //   password.value
    // )
    // api.saveLoginInfo(result.userInfo, result.token)
    uni.showToast({ title: '登录成功', icon: 'success' })
    checkAndNavigate()
  }
  catch (err: any) {
    uni.showToast({ title: err.message || '登录失败', icon: 'none' })
  }
  finally {
    uni.hideLoading()
  }
}

// 检查首次评估或首页跳转
const checkAndNavigate = async () => {
  const userInfo = uni.getStorageSync('userInfo')
  if (!userInfo?.infoCompleted) {
    uni.reLaunch({ url: '/pages/login/consent-form' })
    return
  }

  const completed = uni.getStorageSync('hasCompletedFirstAssessment')
  uni.reLaunch({
    url: completed ? '/pages/home/home' : '/pages/scale/first-assessment',
  })
}
</script>

<template>
  <view class="login-container">
    <!-- Logo和标题 -->
    <view class="header">
      <image
        class="logo"
        src="/public/static/logo.png"
        mode="aspectFit"
      />
      <text class="app-title">认知情绪守护</text>
      <text class="app-subtitle">CogniEmo Guard</text>
    </view>

    <!-- 登录方式切换 -->
    <view class="login-tabs">
      <view
        :class="['tab-item', loginType === 'wechat' ? 'active' : '']"
        @click="switchLoginType('wechat')"
      >
        <text class="tab-text">快捷登录</text>
      </view>
      <view
        :class="['tab-item', loginType === 'password' ? 'active' : '']"
        @click="switchLoginType('password')"
      >
        <text class="tab-text">密码登录</text>
      </view>
    </view>

    <!-- 微信快捷登录 -->
    <view v-if="loginType === 'wechat'" class="login-content">
      <view class="wechat-login-area">
        <text class="tip-text">使用微信快速登录，更方便</text>
        <button class="wechat-btn" @click="handleWechatLogin">
          <text class="wechat-icon">📱</text>
          <text class="btn-text">微信一键登录</text>
        </button>
      </view>
    </view>

    <!-- 账号密码登录 -->
    <view v-if="loginType === 'password'" class="login-content">
      <view class="form-area">
        <view class="input-group">
          <text class="input-label">账号</text>
          <input
            v-model="username"
            class="input-field"
            placeholder="请输入手机号或用户名"
            placeholder-class="placeholder"
          >
        </view>

        <view class="input-group">
          <text class="input-label">密码</text>
          <input
            v-model="password"
            class="input-field"
            type="password"
            placeholder="请输入密码"
            placeholder-class="placeholder"
          >
        </view>

        <button class="login-btn" @click="handlePasswordLogin">
          <text class="btn-text">登录</text>
        </button>

        <!-- 忘记密码 -->
        <view class="forgot-password-tip">
          <text class="link-text">忘记密码？</text>
        </view>
      </view>
    </view>

    <!-- 注册入口 -->
    <view class="register-tip">
      <text class="tip-text">还没有账号？</text>
      <text class="register-link" @click="goToRegister">立即注册</text>
    </view>

    <!-- 服务协议 -->
    <view class="agreement">
      <text class="agreement-text">登录即表示同意</text>
      <text class="link-text">《用户协议》</text>
      <text class="agreement-text">和</text>
      <text class="link-text">《隐私政策》</text>
    </view>
  </view>
</template>

<style scoped>
/* 整体容器 */
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 60rpx 40rpx;
  box-sizing: border-box;
}

/* 头部区域 */
.header {
  text-align: center;
  margin-bottom: 80rpx;
}

.logo {
  width: 180rpx;
  height: 180rpx;
  border-radius: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  margin-bottom: 40rpx;
}

.app-title {
  display: block;
  font-size: 56rpx;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 16rpx;
  letter-spacing: 4rpx;
}

.app-subtitle {
  display: block;
  font-size: 32rpx;
  color: #555;
  font-weight: 500;
}

/* 登录方式切换标签 */
.login-tabs {
  display: flex;
  background: #fff;
  border-radius: 50rpx;
  padding: 8rpx;
  margin-bottom: 60rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 24rpx 12rpx;
  border-radius: 44rpx;
  transition: all 0.3s;
}

.tab-item.active {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
}

.tab-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #666;
}

.tab-item.active .tab-text {
  color: #fff;
}

/* 登录内容区域 */
.login-content {
  background: #fff;
  border-radius: 40rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 40rpx;
}

/* 微信登录区域 */
.wechat-login-area {
  text-align: center;
}

.tip-text {
  display: block;
  font-size: 32rpx;
  color: #666;
  margin-bottom: 60rpx;
  font-weight: 500;
}

.wechat-btn {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  border: none;
  border-radius: 50rpx;
  padding: 32rpx 0;
  font-size: 38rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.3);
}

.wechat-icon {
  font-size: 48rpx;
  margin-right: 16rpx;
}

/* 表单区域 */
.form-area {
  width: 100%;
}

.input-group {
  margin-bottom: 40rpx;
}

.input-label {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 20rpx;
}

.input-field {
  width: 100%;
  height: 96rpx;
  background: #f5f7fa;
  border: 3rpx solid #e0e6ed;
  border-radius: 24rpx;
  padding: 0 32rpx;
  font-size: 36rpx;
  color: #1a1a1a;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #1890ff;
  background: #fff;
}

.placeholder {
  color: #999;
  font-size: 32rpx;
}

/* 登录按钮 */
.login-btn {
  width: 100%;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  border: none;
  border-radius: 50rpx;
  padding: 32rpx 0;
  font-size: 40rpx;
  font-weight: bold;
  margin-top: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.3);
}

.btn-text {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
}

/* 忘记密码提示 */
.forgot-password-tip {
  text-align: center;
  margin-top: 40rpx;
}

.link-text {
  color: #1890ff;
  font-size: 32rpx;
  font-weight: bold;
}

/* 注册入口 */
.register-tip {
  text-align: center;
  padding: 40rpx 0 20rpx;
}

.register-tip .tip-text {
  font-size: 32rpx;
  color: #666;
  margin-right: 10rpx;
}

.register-link {
  color: #1890ff;
  font-size: 36rpx;
  font-weight: bold;
}

/* 服务协议 */
.agreement {
  text-align: center;
  padding: 0 40rpx;
}

.agreement-text {
  font-size: 28rpx;
  color: #666;
}
</style>
