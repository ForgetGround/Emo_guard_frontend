<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '我的'
  }
}
</route>

<template>
  <view class="profile-container">
    <text>个人中心页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('个人中心页面显示')
})
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 20rpx;
}
</style>