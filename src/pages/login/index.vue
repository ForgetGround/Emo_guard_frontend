<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '登录',
  },
}
</route>

<script setup lang="ts">
onShow(() => {
  console.log('登录页面显示')
})
</script>

<template>
  <view class="login-container">
    <text>登录页面</text>
  </view>
</template>

<style lang="scss" scoped>
.login-container {
  padding: 20rpx;
}
</style>
