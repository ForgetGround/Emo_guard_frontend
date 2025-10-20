<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '报告详情',
  },
}
</route>

<script setup lang="ts">
onShow(() => {
  console.log('报告详情页面显示')
})
</script>

<template>
  <view class="report-detail-container">
    <text>报告详情页面</text>
  </view>
</template>

<style lang="scss" scoped>
.report-detail-container {
  padding: 20rpx;
}
</style>
