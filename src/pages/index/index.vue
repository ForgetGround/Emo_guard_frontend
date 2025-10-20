<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '情绪守护',
    navigationStyle: 'custom',
  },
}
</route>

<script setup lang="ts">
// 页面显示时检查登录状态
onShow(() => {
  console.log('首页显示')
})
</script>

<template>
  <view class="home-container">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar">
      <text class="navbar-title">情绪守护</text>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <text>首页内容</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-navbar {
  padding: var(--window-top) 20rpx 20rpx;
  text-align: center;

  .navbar-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
  }
}

.main-content {
  padding: 40rpx 30rpx;
}
</style>
