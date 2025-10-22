<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '健康报告',
  },
}
</route>

<script setup lang="ts">
import type { HealthReportResponse } from '@/service/app/types'
import { useQuery } from '@tanstack/vue-query'
import { listHealthReportsHealthReportsGetQueryOptions } from '@/service/app/healthReport.vuequery'

// 健康报告列表
const { data: reports, isLoading } = useQuery(
  listHealthReportsHealthReportsGetQueryOptions({ params: {} }),
)
</script>

<template>
  <wot-page>
    <wd-navbar title="健康报告" />
    <wd-card title="报告列表">
      <template #desc>
        <wot-loading v-if="isLoading" />
        <wot-empty v-else-if="!reports || reports.length === 0" description="暂无健康报告" />
        <wd-list v-else>
          <wd-list-item
            v-for="report in reports"
            :key="report.id"
            :title="`报告类型: ${report.report_type}`"
            :desc="`用户ID: ${report.user_id} 完成时间: ${report.created_at} 总体风险: ${report.overall_risk || '未知'}`"
            :extra="report.summary"
          />
        </wd-list>
      </template>
    </wd-card>
  </wot-page>
</template>
