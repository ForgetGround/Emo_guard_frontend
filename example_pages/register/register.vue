<route lang="json5">
{
  style: {
    navigationBarTitleText: '注册',
  },
}
</route>

<script lang="ts" setup>
import { ref } from 'vue'
// import { UserService } from '@/api/client/services/UserService'

const password = ref('')
const confirmPassword = ref('')
const nickname = ref('')

// 注册
const handleRegister = async () => {
  // 验证表单
  if (!password.value) {
    uni.showToast({
      title: '请设置密码',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  if (password.value.length < 6) {
    uni.showToast({
      title: '密码至少6位',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  if (password.value !== confirmPassword.value) {
    uni.showToast({
      title: '两次密码输入不一致',
      icon: 'none',
      duration: 2000,
    })
    return
  }

  try {
    uni.showLoading({ title: '注册中...' })
    try {
      // 使用统一API层进行注册
      // await user.register({
      //   password: password.value,
      //   nickname: nickname.value
      // })
      uni.hideLoading()
      uni.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 2000,
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 2000)
    }
    catch (error: any) {
      uni.hideLoading()
      uni.showToast({
        title: error.message || '注册失败，请重试',
        icon: 'none',
        duration: 2000,
      })
    }
  }
  catch (error: any) {
    uni.hideLoading()
    uni.showToast({
      title: error.message || '注册失败，请重试',
      icon: 'none',
      duration: 2000,
    })
  }
}

// 返回登录页
const goToLogin = () => {
  uni.navigateBack()
}
</script>

<template>
  <view class="register-container">
    <!-- Logo和标题 -->
    <view class="header">
      <image class="logo" src="/public/static/logo.png" mode="aspectFit" />
      <text class="app-title">注册账号</text>
      <text class="app-subtitle">欢迎加入认知情绪守护</text>
    </view>

    <!-- 注册表单 -->
    <view class="register-content">
      <view class="form-area">
        <!-- 设置密码 -->
        <view class="input-group">
          <text class="input-label">设置密码</text>
          <input
            v-model="password"
            class="input-field"
            type="password"
            placeholder="请设置6-20位密码"
            placeholder-class="placeholder"
            maxlength="20"
          >
        </view>

        <!-- 确认密码 -->
        <view class="input-group">
          <text class="input-label">确认密码</text>
          <input
            v-model="confirmPassword"
            class="input-field"
            type="password"
            placeholder="请再次输入密码"
            placeholder-class="placeholder"
            maxlength="20"
          >
        </view>

        <!-- 用户昵称（可选） -->
        <view class="input-group">
          <text class="input-label">用户昵称（可选）</text>
          <input
            v-model="nickname"
            class="input-field"
            placeholder="请输入昵称"
            placeholder-class="placeholder"
            maxlength="20"
          >
        </view>

        <!-- 注册按钮 -->
        <button class="register-btn" @click="handleRegister">
          <text class="btn-text">立即注册</text>
        </button>

        <!-- 返回登录 -->
        <view class="login-tip" @click="goToLogin">
          <text class="link-text">已有账号？去登录</text>
        </view>
      </view>
    </view>

    <!-- 服务协议 -->
    <view class="agreement">
      <text class="agreement-text">注册即表示同意</text>
      <text class="link-text">《用户协议》</text>
      <text class="agreement-text">和</text>
      <text class="link-text">《隐私政策》</text>
    </view>
  </view>
</template>

<style scoped>
/* 整体容器 */
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 60rpx 40rpx;
  box-sizing: border-box;
}

/* 头部区域 */
.header {
  text-align: center;
  margin-bottom: 60rpx;
}

.logo {
  width: 160rpx;
  height: 160rpx;
  border-radius: 40rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  margin-bottom: 30rpx;
}

.app-title {
  display: block;
  font-size: 52rpx;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 16rpx;
  letter-spacing: 4rpx;
}

.app-subtitle {
  display: block;
  font-size: 30rpx;
  color: #555;
  font-weight: 500;
}

/* 注册内容区域 */
.register-content {
  background: #fff;
  border-radius: 40rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 30rpx;
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

/* 注册按钮 */
.register-btn {
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

/* 登录提示 */
.login-tip {
  text-align: center;
  margin-top: 40rpx;
}

.link-text {
  color: #1890ff;
  font-size: 32rpx;
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
