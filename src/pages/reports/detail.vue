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
  <div>
    <w-navbar title="报告详情" />
    <w-card title="基本信息">
      <template #desc>
        <div v-if="isLoading">加载中...</div>
        <div v-else-if="report">
          <div>
             <div
               v-for="item in [
                 { title: '报告类型', desc: report.report_type },
                 { title: '总体风险', desc: report.overall_risk || '未知' },
                 { title: '创建时间', desc: report.created_at },
                 { title: '摘要', desc: report.summary || '' }
               ]"
               :key="item.title"
               style="margin-bottom: 16rpx; padding: 16rpx; border-radius: 8rpx; background: #f7f8fa"
             >
               <div style="font-weight: bold">{{ item.title }}</div>
               <div>{{ item.desc }}</div>
             </div>
          </div>
        </div>
        <div v-else>未找到报告</div>
      </template>
    </w-card>
    <w-card title="专业建议">
      <template #desc>
        <div v-if="report?.professional_advice">
          {{ report.professional_advice }}
        </div>
        <div v-else>暂无建议</div>
      </template>
    </w-card>
    <w-card title="趋势分析">
      <template #desc>
        <div v-if="report?.trend_analysis">
          {{ report.trend_analysis }}
        </div>
        <div v-else>暂无趋势分析</div>
      </template>
    </w-card>
  </div>
</template>
