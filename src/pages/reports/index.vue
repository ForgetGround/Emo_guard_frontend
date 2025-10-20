<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '健康报告'
  }
}
</route>

<template>
  <view class="reports-container">
    <text>健康报告页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('健康报告页面显示')
})
</script>

<style lang="scss" scoped>
.reports-container {
  padding: 20rpx;
}
</style>