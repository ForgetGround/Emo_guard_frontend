<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '情绪守护',
    navigationStyle: 'custom',
  },
}
</route>

<script setup lang="ts">
import type { HealthReportResponse } from '@/service/app/types'
import { useQuery } from '@tanstack/vue-query'
import { listHealthReportsHealthReportsGetQueryOptions } from '@/service/app/healthReport.vuequery'

// 获取健康报告列表
const { data: reports, isLoading: loadingReports } = useQuery(
  listHealthReportsHealthReportsGetQueryOptions({ params: {} }),
)
</script>

<template>
  <wot-page>
    <wd-navbar title="情绪守护" />
    <wd-card title="功能导航">
      <template #desc>
        <wd-button-group block gap="24rpx">
          <wd-button type="primary" @click="$router.push('/pages/assessment/index')">
            心理自评
          </wd-button>
          <wd-button type="success" @click="$router.push('/pages/articles/index')">
            科普文章
          </wd-button>
          <wd-button type="warning" @click="$router.push('/pages/mood/record')">量表记录</wd-button>
        </wd-button-group>
      </template>
    </wd-card>
    <wd-card title="健康报告">
      <template #desc>
        <wot-loading v-if="loadingReports" />
        <wot-empty v-else-if="!reports || reports.length === 0" description="暂无健康报告" />
        <wd-list v-else>
          <wd-list-item
            v-for="report in reports"
            :key="report.id"
            :title="report.report_type"
            :desc="`风险: ${report.overall_risk || '无风险信息'}`"
            :extra="report.created_at"
          />
        </wd-list>
      </template>
    </wd-card>
  </wot-page>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.main-content {
  padding: 40rpx 30rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}
</style>
