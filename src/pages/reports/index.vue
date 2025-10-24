<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '健康报告',
  },
}
</route>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { listHealthReportsHealthReportsGet } from '@/service/app/healthReport'
import { showToast } from '@/utils/toast'

const reports = ref<any[]>([])
const loading = ref(false)

// 加载报告列表
async function loadReports() {
  try {
    loading.value = true
    const list = await listHealthReportsHealthReportsGet({
      params: { limit: '20', offset: '0' },
    })
    reports.value = list || []
  } catch (error: any) {
    console.error('加载健康报告失败:', error)
    showToast(error?.message || '加载失败')
  } finally {
    loading.value = false
  }
}

// 查看报告详情
function viewReport(id: number) {
  uni.navigateTo({ url: `/pages/reports/detail?id=${id}` })
}

// 获取风险等级样式
function getRiskClass(risk: string) {
  const riskMap: Record<string, string> = {
    低风险: 'low',
    中风险: 'medium',
    高风险: 'high',
  }
  return riskMap[risk] || 'low'
}

onMounted(() => {
  loadReports()
})
</script>

<template>
  <view class="reports-container">
    <view class="header">
      <text class="page-title">健康报告</text>
      <text class="page-subtitle">查看您的测评结果与分析</text>
    </view>

    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>

    <view v-else-if="reports.length === 0" class="empty-container">
      <text class="empty-icon">📊</text>
      <text class="empty-text">暂无健康报告</text>
      <text class="empty-desc">完成测评后将生成健康报告</text>
    </view>

    <scroll-view v-else class="reports-scroll" scroll-y>
      <view class="reports-list">
        <view
          v-for="report in reports"
          :key="report.id"
          class="report-card"
          @click="viewReport(report.id)"
        >
          <view class="card-header">
            <view class="report-type">
              <text class="type-icon">📋</text>
              <text class="type-text">{{ report.report_type || '综合评估' }}</text>
            </view>
            <view class="risk-badge" :class="getRiskClass(report.overall_risk)">
              <text class="risk-text">{{ report.overall_risk || '未评估' }}</text>
            </view>
          </view>

          <view v-if="report.summary" class="card-content">
            <text class="summary-text">{{ report.summary }}</text>
          </view>

          <view class="card-footer">
            <text class="report-date">{{ report.created_at }}</text>
            <view class="view-btn">
              <text class="btn-text">查看详情</text>
              <text class="btn-arrow">→</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.reports-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 32rpx;

  .page-title {
    display: block;
    font-size: 44rpx;
    font-weight: 700;
    color: #1890ff;
    margin-bottom: 12rpx;
  }

  .page-subtitle {
    display: block;
    font-size: 28rpx;
    color: #666;
  }
}

.loading-container,
.empty-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.loading-text,
.empty-text {
  font-size: 28rpx;
  color: #999;
  margin-top: 24rpx;
}

.empty-icon {
  font-size: 80rpx;
}

.empty-desc {
  font-size: 24rpx;
  color: #bbb;
  margin-top: 12rpx;
}

.reports-scroll {
  flex: 1;
  height: 1rpx;
}

.reports-list {
  .report-card {
    background: white;
    border-radius: 20rpx;
    padding: 28rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);
    transition: all 0.3s;

    &:active {
      transform: scale(0.98);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .report-type {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .type-icon {
          font-size: 32rpx;
        }

        .type-text {
          font-size: 30rpx;
          font-weight: 600;
          color: #333;
        }
      }

      .risk-badge {
        padding: 8rpx 20rpx;
        border-radius: 20rpx;

        &.low {
          background: #f6ffed;

          .risk-text {
            color: #52c41a;
          }
        }

        &.medium {
          background: #fff7e6;

          .risk-text {
            color: #fa8c16;
          }
        }

        &.high {
          background: #fff1f0;

          .risk-text {
            color: #f5222d;
          }
        }

        .risk-text {
          font-size: 24rpx;
          font-weight: 600;
        }
      }
    }

    .card-content {
      margin-bottom: 16rpx;

      .summary-text {
        display: block;
        font-size: 26rpx;
        color: #666;
        line-height: 1.6;
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16rpx;
      border-top: 1rpx solid #f0f0f0;

      .report-date {
        font-size: 22rpx;
        color: #999;
      }

      .view-btn {
        display: flex;
        align-items: center;
        gap: 8rpx;

        .btn-text {
          font-size: 24rpx;
          color: #1890ff;
          font-weight: 500;
        }

        .btn-arrow {
          font-size: 24rpx;
          color: #1890ff;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
