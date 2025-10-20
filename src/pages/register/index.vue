<route lang="json5">
{
  style: { 
    navigationBarTitleText: '注册'
  }
}
</route>

<template>
  <view class="register-container">
    <text>注册页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('注册页面显示')
})
</script>

<style lang="scss" scoped>
.register-container {
  padding: 20rpx;
}
</style>