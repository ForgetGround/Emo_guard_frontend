<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '报告详情',
  },
}
</route>

<script setup lang="ts">
import type { HealthReportResponse } from '@/service/app/types'
import { useQuery } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import { getHealthReportHealthReportsHealthReportIdGetQueryOptions } from '@/service/app/healthReport.vuequery'

const route = useRoute()
const reportId = Number(route.params.id)

const { data: report, isLoading } = useQuery(
  getHealthReportHealthReportsHealthReportIdGetQueryOptions({
    params: { health_report_id: reportId },
  }),
)
</script>

<template>
  <view>
    <w-navbar title="报告详情" />
    <w-card title="基本信息">
      <template #desc>
        <view v-if="isLoading">加载中...</view>
        <view v-else-if="report">
          <w-list>
            <w-list-item title="报告类型" :desc="report.report_type" />
            <w-list-item title="总体风险" :desc="report.overall_risk || '未知'" />
            <w-list-item title="创建时间" :desc="report.created_at" />
            <w-list-item title="摘要" :desc="report.summary || ''" />
          </w-list>
        </view>
        <view v-else>未找到报告</view>
      </template>
    </w-card>
    <w-card title="专业建议">
      <template #desc>
        <view v-if="report?.professional_advice">
          {{ report.professional_advice }}
        </view>
        <view v-else>暂无建议</view>
      </template>
    </w-card>
    <w-card title="趋势分析">
      <template #desc>
        <view v-if="report?.trend_analysis">
          {{ report.trend_analysis }}
        </view>
        <view v-else>暂无趋势分析</view>
      </template>
    </w-card>
  </view>
</template>
