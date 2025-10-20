<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '心情记录'
  }
}
</route>

<template>
  <view class="mood-record-container">
    <text>心情记录页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('心情记录页面显示')
})
</script>

<style lang="scss" scoped>
.mood-record-container {
  padding: 20rpx;
}
</style>