<route lang="json5">
{
  layout: 'tabbar',
  style: { 
    navigationBarTitleText: '科普文章'
  }
}
</route>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { listArticlesArticlesGetQueryOptions } from '@/service/app/article.vuequery'

// 获取科普文章列表
const { data: articles, isLoading } = useQuery(
  listArticlesArticlesGetQueryOptions({ params: {} })
)

onShow(() => {
  console.log('科普文章页面显示')
})
</script>

<template>
  <wot-page>
    <WdNavbar title="健康科普" />
    <WdCard title="科普内容">
      <template #desc>
        <wot-loading v-if="isLoading" />
        <wot-empty v-else-if="!articles || articles.length === 0" description="暂无科普内容" />
        <div v-else>
          <div
            v-for="item in articles"
            :key="item.id"
            style="margin-bottom: 16rpx; padding: 16rpx; border-radius: 8rpx; background: #f7f8fa;"
          >
            <div style="font-weight: bold;">{{ item.title }}</div>
            <div>状态: {{ item.status }}</div>
            <div>发布时间: {{ item.publish_time }}</div>
          </div>
        </div>
      </template>
    </WdCard>
  </wot-page>
</template>

<!-- 禁止 SFC 内部 CSS，全部布局交由 wot-ui 组件完成 -->