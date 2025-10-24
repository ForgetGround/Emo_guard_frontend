<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '心理测评',
  },
}
</route>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { listResultsResultsGet } from '@/service/app/scaleResult'
import { showToast } from '@/utils/toast'

const results = ref<any[]>([])
const loading = ref(false)

// 加载测评结果列表
async function loadResults() {
  try {
    loading.value = true
    const list = await listResultsResultsGet({ params: { limit: '20', offset: '0' } })
    results.value = list || []
  } catch (error: any) {
    console.error('加载测评结果失败:', error)
    showToast(error?.message || '加载失败')
  } finally {
    loading.value = false
  }
}

// 跳转到测评详情
function goToDetail(id: number) {
  uni.navigateTo({ url: `/pages/assessment/detail?id=${id}` })
}

// 开始新评估
function startNewAssessment() {
  uni.navigateTo({ url: '/pages/assessment/detail?new=1' })
}

onMounted(() => {
  loadResults()
})
</script>

<template>
  <view class="assessment-container">
    <view class="header">
      <text class="page-title">心理测评</text>
      <text class="page-subtitle">认知与情绪健康评估</text>
    </view>

    <!-- 开始新评估按钮 -->
    <view class="start-section">
      <view class="start-card" @click="startNewAssessment">
        <view class="start-icon">🏥</view>
        <view class="start-info">
          <text class="start-title">开始新评估</text>
          <text class="start-desc">完成认知、情绪和生活能力评估</text>
        </view>
        <view class="start-arrow">→</view>
      </view>
    </view>

    <!-- 历史记录 -->
    <view class="results-section">
      <view class="section-header">
        <text class="section-title">历史记录</text>
        <text class="section-count">{{ results.length }}条</text>
      </view>

      <view v-if="loading" class="loading-container">
        <text class="loading-text">加载中...</text>
      </view>

      <view v-else-if="results.length === 0" class="empty-container">
        <text class="empty-icon">📝</text>
        <text class="empty-text">暂无测评记录</text>
        <text class="empty-desc">点击上方开始您的第一次评估</text>
      </view>

      <view v-else class="results-list">
        <view
          v-for="item in results"
          :key="item.id"
          class="result-item"
          @click="goToDetail(item.id)"
        >
          <view class="result-header">
            <text class="result-title">测评结果 #{{ item.id }}</text>
            <view class="result-status" :class="item.status">
              <text class="status-text">
                {{ item.status === 'completed' ? '已完成' : '进行中' }}
              </text>
            </view>
          </view>
          <text v-if="item.conclusion" class="result-conclusion">{{ item.conclusion }}</text>
          <text class="result-time">{{ item.created_at }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.assessment-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
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

.start-section {
  margin-bottom: 32rpx;

  .start-card {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 20rpx;
    padding: 32rpx;
    box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.15);
    transition: all 0.3s;

    &:active {
      transform: scale(0.98);
    }

    .start-icon {
      font-size: 56rpx;
      margin-right: 24rpx;
    }

    .start-info {
      flex: 1;

      .start-title {
        display: block;
        font-size: 34rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 8rpx;
      }

      .start-desc {
        display: block;
        font-size: 26rpx;
        color: #999;
      }
    }

    .start-arrow {
      font-size: 40rpx;
      color: #1890ff;
      font-weight: 700;
    }
  }
}

.results-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    padding-bottom: 16rpx;
    border-bottom: 2rpx solid #f0f0f0;

    .section-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #333;
    }

    .section-count {
      font-size: 24rpx;
      color: #999;
      background: #f5f5f5;
      padding: 4rpx 16rpx;
      border-radius: 12rpx;
    }
  }

  .loading-container,
  .empty-container {
    padding: 60rpx 0;
    text-align: center;
  }

  .loading-text,
  .empty-text {
    display: block;
    font-size: 28rpx;
    color: #999;
    margin-bottom: 12rpx;
  }

  .empty-icon {
    display: block;
    font-size: 80rpx;
    margin-bottom: 24rpx;
  }

  .empty-desc {
    display: block;
    font-size: 24rpx;
    color: #bbb;
  }

  .results-list {
    .result-item {
      background: #f8f9fa;
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 16rpx;
      transition: all 0.3s;

      &:last-child {
        margin-bottom: 0;
      }

      &:active {
        transform: scale(0.98);
        background: #f0f2f5;
      }

      .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12rpx;

        .result-title {
          font-size: 30rpx;
          font-weight: 600;
          color: #333;
        }

        .result-status {
          padding: 6rpx 16rpx;
          border-radius: 12rpx;
          background: #e6f7ff;

          &.completed {
            background: #f6ffed;
          }

          .status-text {
            font-size: 22rpx;
            font-weight: 500;
            color: #1890ff;
          }

          &.completed .status-text {
            color: #52c41a;
          }
        }
      }

      .result-conclusion {
        display: block;
        font-size: 26rpx;
        color: #666;
        margin-bottom: 12rpx;
        line-height: 1.5;
      }

      .result-time {
        display: block;
        font-size: 22rpx;
        color: #999;
      }
    }
  }
}
</style>
