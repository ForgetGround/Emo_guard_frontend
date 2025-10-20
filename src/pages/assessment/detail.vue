<route lang="json5">
{
  style: { 
    navigationBarTitleText: '测评详情'
  }
}
</route>

<template>
  <view class="assessment-detail-container">
    <text>测评详情页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('测评详情页面显示')
})
</script>

<style lang="scss" scoped>
.assessment-detail-container {
  padding: 20rpx;
}
</style>