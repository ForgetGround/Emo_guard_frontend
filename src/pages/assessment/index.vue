<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '心理测评',
  },
}
</route>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { listResultsResultsGetQueryOptions } from '@/service/app/scaleResult.vuequery'

// 获取测评任务/结果列表
const { data: results, isLoading } = useQuery(listResultsResultsGetQueryOptions({ params: {} }))

onShow(() => {
  console.log('心理测评页面显示')
})
</script>

<template>
  <wot-page>
    <WdNavbar title="心理测评" />
    <WdCard title="测评任务">
      <template #desc>
        <wot-loading v-if="isLoading" />
        <wot-empty v-else-if="!results || results.length === 0" description="暂无测评任务" />
        <div v-else>
          <div
            v-for="item in results"
            :key="item.id"
            style="margin-bottom: 16rpx; padding: 16rpx; border-radius: 8rpx; background: #f7f8fa;"
          >
            <div style="font-weight: bold;">{{ item.conclusion || '无结论' }}</div>
            <div>状态: {{ item.status }}</div>
            <div>创建时间: {{ item.created_at }}</div>
          </div>
        </div>
      </template>
    </WdCard>
  </wot-page>
</template>

<!-- 禁止 SFC 内部 CSS，移除 style 标签 -->
