<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '心理测评'
  }
}
</route>

<template>
  <view class="assessment-container">
    <text>心理测评页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('心理测评页面显示')
})
</script>

<style lang="scss" scoped>
.assessment-container {
  padding: 20rpx;
}
</style>