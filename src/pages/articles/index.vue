<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '科普文章'
  }
}
</route>

<template>
  <view class="articles-container">
    <text>科普文章页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('科普文章页面显示')
})
</script>

<style lang="scss" scoped>
.articles-container {
  padding: 20rpx;
}
</style>