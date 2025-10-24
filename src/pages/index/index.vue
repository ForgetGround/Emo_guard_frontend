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
function goAssessment() {
  uni.navigateTo({ url: '/pages/assessment/index' })
}
function goArticles() {
  uni.navigateTo({ url: '/pages/articles/index' })
}
function goMoodRecord() {
  uni.navigateTo({ url: '/pages/mood/record' })
}
</script>

<template>
  <wot-page>
    <wd-navbar title="情绪守护" />
    <div class="main-content">
      <wd-card title="功能导航">
        <template #desc>
          <div class="button-group">
            <wd-button type="primary" @click="goAssessment">
              心理自评
            </wd-button>
            <wd-button type="success" @click="goArticles">
              科普文章
            </wd-button>
            <wd-button type="warning" @click="goMoodRecord">量表记录</wd-button>
          </div>
        </template>
      </wd-card>
      <wd-card title="健康报告">
        <template #desc>
          <wot-loading v-if="loadingReports" />
          <wot-empty v-else-if="!reports || reports.length === 0" description="暂无健康报告" />
          <div v-else>
            <div
              v-for="report in reports"
              :key="report.id"
              style="margin-bottom: 16rpx; padding: 16rpx; border-radius: 8rpx; background: #f7f8fa"
            >
              <div style="font-weight: bold">
                {{ report.report_type }}
              </div>
              <div>风险: {{ report.overall_risk || '无风险信息' }}</div>
              <div>{{ report.created_at }}</div>
            </div>
          </div>
        </template>
      </wd-card>
    </div>
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
.button-group {
  display: flex;
  gap: 24rpx;
}
</style>
