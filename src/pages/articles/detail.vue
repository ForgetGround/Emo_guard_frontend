<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '文章详情'
  }
}
</route>

<template>
  <view class="article-detail-container">
    <text>文章详情页面</text>
  </view>
</template>

<script setup lang="ts">
onShow(() => {
  console.log('文章详情页面显示')
})
</script>

<style lang="scss" scoped>
.article-detail-container {
  padding: 20rpx;
}
</style>