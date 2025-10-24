<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '每日健康监测',
  },
}
</route>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  createMoodJournalMoodJournalsPost,
  listMoodJournalsMoodJournalsGet,
} from '@/service/app/moodJournal'
import { listHealthReportsHealthReportsGet } from '@/service/app/healthReport'
import { showToast } from '@/utils/toast'

// 当前日期和时间
const currentDate = ref('')
const currentTime = ref('')

// 心情记录
const selectedMood = ref('')
const moodReason = ref('')
const recentMoods = ref<any[]>([])

const moodOptions = [
  { value: 'very-happy', emoji: '😄', label: '非常开心' },
  { value: 'happy', emoji: '😊', label: '开心' },
  { value: 'normal', emoji: '😐', label: '一般' },
  { value: 'sad', emoji: '😔', label: '难过' },
  { value: 'very-sad', emoji: '😢', label: '很难过' },
  { value: 'anxious', emoji: '😰', label: '焦虑' },
]

// 是否有效
const isMoodValid = computed(() => selectedMood.value !== '')

// 获取当前日期
function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekday = weekdays[now.getDay()]
  currentDate.value = `${year}年${month}月${day}日 ${weekday}`
}

// 获取当前时间
function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  currentTime.value = `${hours}:${String(minutes).padStart(2, '0')}`
}

// 选择心情
function selectMood(moodValue: string) {
  selectedMood.value = moodValue
}

// 提交心情记录
async function submitMoodRecord() {
  if (!selectedMood.value) {
    showToast('请选择心情')
    return
  }

  try {
    uni.showLoading({ title: '记录中...' })

    await createMoodJournalMoodJournalsPost({
      params: {},
      body: {
        mood: selectedMood.value,
        content: moodReason.value.trim() || undefined,
      },
    })

    // 清空输入
    selectedMood.value = ''
    moodReason.value = ''

    showToast('心情记录成功')

    // 刷新列表
    await loadRecentMoods()
  } catch (error: any) {
    console.error('提交心情记录失败:', error)
    showToast(error?.message || '记录失败，请重试')
  } finally {
    uni.hideLoading()
  }
}

// 加载最近心情记录
async function loadRecentMoods() {
  try {
    const list = await listMoodJournalsMoodJournalsGet({
      params: { limit: '5', offset: '0' },
    })
    recentMoods.value = list || []
  } catch (error) {
    console.error('加载心情记录失败:', error)
  }
}

// 获取心情图标
function getMoodEmoji(moodValue: string) {
  const mood = moodOptions.find((m) => m.value === moodValue)
  return mood ? mood.emoji : '😐'
}

// 获取心情标签
function getMoodLabel(moodValue: string) {
  const mood = moodOptions.find((m) => m.value === moodValue)
  return mood ? mood.label : '一般'
}

// 格式化时间
function formatTime(dateString: string) {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}月${day}日 ${hours}:${minutes}`
}

// 跳转到评估页面
function goToAssessment() {
  uni.navigateTo({ url: '/pages/assessment/index' })
}

// 跳转到文章列表
function goToArticles() {
  uni.navigateTo({ url: '/pages/articles/index' })
}

// 跳转到健康报告
function goToReports() {
  uni.navigateTo({ url: '/pages/reports/index' })
}

onMounted(() => {
  getCurrentDate()
  getCurrentTime()
  loadRecentMoods()

  // 每分钟更新时间
  setInterval(() => {
    getCurrentTime()
  }, 60000)
})
</script>

<template>
  <view class="home-container">
    <!-- 顶部标题 -->
    <view class="page-header">
      <text class="page-title">每日健康监测</text>
      <text class="page-subtitle">{{ currentDate }}</text>
    </view>

    <!-- 随时心情记录模块 -->
    <view class="mood-record-section">
      <view class="section-header">
        <view class="header-left">
          <view class="section-icon">💭</view>
          <text class="section-title">随时心情记录</text>
        </view>
        <text class="section-subtitle">记录此刻的心情</text>
      </view>

      <!-- 心情选择 -->
      <view class="mood-selector">
        <text class="selector-label">选择心情</text>
        <view class="mood-options">
          <view
            v-for="(mood, index) in moodOptions"
            :key="index"
            class="mood-option"
            :class="{ selected: selectedMood === mood.value }"
            @click="selectMood(mood.value)"
          >
            <text class="mood-emoji">{{ mood.emoji }}</text>
            <text class="mood-label">{{ mood.label }}</text>
          </view>
        </view>
      </view>

      <!-- 心情原因输入 -->
      <view class="mood-reason">
        <text class="reason-label">心情原因（选填）</text>
        <textarea
          v-model="moodReason"
          class="reason-input"
          placeholder="分享一下现在的感受或发生了什么..."
          placeholder-class="reason-placeholder"
          :maxlength="200"
          :auto-height="true"
        />
        <text class="reason-count">{{ moodReason.length }}/200</text>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-mood-btn" :class="{ disabled: !isMoodValid }" @click="submitMoodRecord">
        <text class="btn-icon">✓</text>
        <text class="btn-text">记录心情</text>
      </view>

      <!-- 最近记录 -->
      <view v-if="recentMoods.length > 0" class="recent-records">
        <view class="records-header">
          <text class="records-title">最近记录</text>
          <text class="records-count">{{ recentMoods.length }}条</text>
        </view>
        <view class="records-list">
          <view v-for="(record, index) in recentMoods" :key="index" class="record-item">
            <view class="record-emoji">{{ getMoodEmoji(record.mood) }}</view>
            <view class="record-content">
              <view class="record-header">
                <text class="record-mood-text">{{ getMoodLabel(record.mood) }}</text>
                <text class="record-time">{{ formatTime(record.created_at) }}</text>
              </view>
              <text v-if="record.content" class="record-reason">{{ record.content }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能卡片区 -->
    <view class="features-section">
      <!-- 健康测评 -->
      <view class="feature-card" @click="goToAssessment">
        <view class="feature-icon">🏥</view>
        <view class="feature-info">
          <text class="feature-title">健康测评</text>
          <text class="feature-desc">认知、情绪、生活能力全面测评</text>
        </view>
        <view class="feature-arrow">→</view>
      </view>

      <!-- 健康科普 -->
      <view class="feature-card" @click="goToArticles">
        <view class="feature-icon">📚</view>
        <view class="feature-info">
          <text class="feature-title">健康科普</text>
          <text class="feature-desc">认知健康知识、预防与康复指导</text>
        </view>
        <view class="feature-arrow">→</view>
      </view>

      <!-- 健康报告 -->
      <view class="feature-card" @click="goToReports">
        <view class="feature-icon">📊</view>
        <view class="feature-info">
          <text class="feature-title">健康报告</text>
          <text class="feature-desc">查看历史测评报告和趋势分析</text>
        </view>
        <view class="feature-arrow">→</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
}

.page-header {
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

// 心情记录模块
.mood-record-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28rpx;

    .header-left {
      display: flex;
      align-items: center;

      .section-icon {
        font-size: 40rpx;
        margin-right: 12rpx;
      }

      .section-title {
        font-size: 34rpx;
        font-weight: 700;
        color: #333;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #999;
    }
  }

  .mood-selector {
    margin-bottom: 28rpx;

    .selector-label {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 20rpx;
    }

    .mood-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16rpx;

      .mood-option {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border: 3rpx solid transparent;
        border-radius: 20rpx;
        padding: 24rpx 12rpx;
        transition: all 0.3s ease;

        .mood-emoji {
          font-size: 56rpx;
          margin-bottom: 8rpx;
          transition: transform 0.3s ease;
        }

        .mood-label {
          font-size: 24rpx;
          color: #666;
          font-weight: 500;
        }

        &.selected {
          background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
          border-color: #1890ff;
          box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.2);

          .mood-emoji {
            transform: scale(1.15);
          }

          .mood-label {
            color: #0050b3;
            font-weight: 700;
          }
        }
      }
    }
  }

  .mood-reason {
    margin-bottom: 28rpx;

    .reason-label {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 16rpx;
    }

    .reason-input {
      width: 100%;
      min-height: 160rpx;
      background: #f8f9fa;
      border: 2rpx solid #e0e6ed;
      border-radius: 16rpx;
      padding: 20rpx;
      font-size: 28rpx;
      color: #333;
      line-height: 1.6;
      box-sizing: border-box;

      &:focus {
        border-color: #1890ff;
        background: #fafbfc;
      }
    }

    .reason-placeholder {
      color: #bfbfbf;
      font-size: 26rpx;
    }

    .reason-count {
      display: block;
      text-align: right;
      font-size: 22rpx;
      color: #bfbfbf;
      margin-top: 8rpx;
    }
  }

  .submit-mood-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: white;
    border-radius: 16rpx;
    padding: 28rpx;
    font-size: 32rpx;
    font-weight: 700;
    box-shadow: 0 6rpx 20rpx rgba(24, 144, 255, 0.3);
    margin-bottom: 28rpx;
    transition: all 0.3s;

    .btn-icon {
      font-size: 28rpx;
    }

    .btn-text {
      font-size: 32rpx;
    }

    &.disabled {
      background: #f0f0f0;
      color: #bfbfbf;
      box-shadow: none;
    }
  }

  .recent-records {
    .records-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      padding-bottom: 16rpx;
      border-bottom: 2rpx solid #f0f0f0;

      .records-title {
        font-size: 28rpx;
        font-weight: 600;
        color: #333;
      }

      .records-count {
        font-size: 24rpx;
        color: #999;
        background: #f5f5f5;
        padding: 4rpx 16rpx;
        border-radius: 12rpx;
      }
    }

    .records-list {
      .record-item {
        display: flex;
        align-items: flex-start;
        background: #fafbfc;
        border-radius: 12rpx;
        padding: 20rpx;
        margin-bottom: 12rpx;

        &:last-child {
          margin-bottom: 0;
        }

        .record-emoji {
          font-size: 40rpx;
          margin-right: 16rpx;
          flex-shrink: 0;
        }

        .record-content {
          flex: 1;

          .record-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8rpx;

            .record-mood-text {
              font-size: 26rpx;
              color: #1890ff;
              font-weight: 600;
            }

            .record-time {
              font-size: 22rpx;
              color: #999;
            }
          }

          .record-reason {
            display: block;
            font-size: 26rpx;
            color: #595959;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

// 功能卡片区
.features-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;

  .feature-card {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 20rpx;
    padding: 28rpx;
    box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);
    transition: all 0.3s;

    &:active {
      transform: scale(0.98);
    }

    .feature-icon {
      font-size: 48rpx;
      margin-right: 20rpx;
    }

    .feature-info {
      flex: 1;

      .feature-title {
        display: block;
        font-size: 30rpx;
        font-weight: 600;
        color: #333;
        margin-bottom: 8rpx;
      }

      .feature-desc {
        display: block;
        font-size: 24rpx;
        color: #999;
      }
    }

    .feature-arrow {
      font-size: 36rpx;
      color: #1890ff;
      font-weight: 700;
    }
  }
}
</style>
