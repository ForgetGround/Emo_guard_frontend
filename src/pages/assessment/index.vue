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
    <w-navbar title="心理测评" />
    <w-card title="测评任务">
      <template #desc>
        <wot-loading v-if="isLoading" />
        <wot-empty v-else-if="!results || results.length === 0" description="暂无测评任务" />
        <w-list v-else>
          <w-list-item
            v-for="item in results"
            :key="item.id"
            :title="item.conclusion || '无结论'"
            :desc="`状态: ${item.status}`"
            :extra="item.created_at"
          />
        </w-list>
      </template>
    </w-card>
  </wot-page>
</template>

<!-- 禁止 SFC 内部 CSS，移除 style 标签 -->
