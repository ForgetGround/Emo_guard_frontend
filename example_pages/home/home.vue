<template>
  <view class="home-container">
    <!-- 顶部标题 -->
    <view class="page-header">
      <text class="page-title">每日健康监测</text>
      <text class="page-subtitle">{{ currentDate }}</text>
    </view>

    <!-- 任务概览提示 -->
    <view class="task-overview" v-if="pendingTasksCount > 0">
      <view class="overview-icon">📋</view>
      <text class="overview-text">今天你有 {{ pendingTasksCount }} 项情绪测试待完成</text>
    </view>

    <!-- 每日筛查任务 -->
    <view class="daily-task-section">
      <view class="task-header">
        <view class="task-icon">📋</view>
        <text class="task-title">每日筛查任务</text>
      </view>
      
      <view class="task-reminder">
        <view class="reminder-icon">🔔</view>
        <text class="reminder-text">今日任务：请在 8:00 - 10:00 完成早间情绪测试</text>
      </view>

      <!-- 早间测试卡片 -->
      <view class="test-card">
        <view class="card-header">
          <view class="card-left">
            <view class="card-title-row">
              <text class="status-icon">{{ getMorningStatusIcon() }}</text>
              <text class="card-title">早间测试</text>
            </view>
            <text class="card-time">08:00 - 10:00</text>
          </view>
          <view class="card-status" :class="morningCompleted ? 'completed' : getMorningTimeStatus()">
            <text class="status-text">{{ getMorningStatusText() }}</text>
          </view>
        </view>
        
        <!-- 情绪评分展示（已完成时显示） -->
        <view class="emotion-score" v-if="morningCompleted && morningResult">
          <text class="emotion-label">情绪状态：</text>
          <text class="emotion-icon">{{ getEmotionIcon(morningResult.result.overallLevel) }}</text>
          <text class="emotion-text">{{ morningResult.result.overallLevel }}</text>
        </view>
        
        <view class="card-progress">
          <view class="progress-bar">
            <view class="progress-fill" :style="{width: morningCompleted ? '100%' : '0%'}"></view>
          </view>
        </view>
        <button 
          class="test-btn morning" 
          :class="{ completed: morningCompleted }"
          :disabled="morningCompleted"
          @click="startTest('morning')">
          {{ morningCompleted ? '✓ 已完成' : '立即测试' }}
        </button>
      </view>

      <!-- 晚间测试卡片 -->
      <view class="test-card">
        <view class="card-header">
          <view class="card-left">
            <view class="card-title-row">
              <text class="status-icon">{{ getEveningStatusIcon() }}</text>
              <text class="card-title">晚间测试</text>
            </view>
            <text class="card-time">20:00 - 24:00</text>
          </view>
          <view class="card-status" :class="eveningCompleted ? 'completed' : getEveningTimeStatus()">
            <text class="status-text">{{ getEveningStatusText() }}</text>
          </view>
        </view>
        
        <!-- 情绪评分展示（已完成时显示） -->
        <view class="emotion-score" v-if="eveningCompleted && eveningResult">
          <text class="emotion-label">情绪状态：</text>
          <text class="emotion-icon">{{ getEmotionIcon(eveningResult.result.overallLevel) }}</text>
          <text class="emotion-text">{{ eveningResult.result.overallLevel }}</text>
        </view>
        
        <view class="card-progress">
          <view class="progress-bar">
            <view class="progress-fill" :style="{width: eveningCompleted ? '100%' : '0%'}"></view>
          </view>
        </view>
        <button 
          class="test-btn evening" 
          :class="{ completed: eveningCompleted }"
          :disabled="eveningCompleted"
          @click="startTest('evening')">
          {{ eveningCompleted ? '✓ 已完成' : '立即测试' }}
        </button>
      </view>

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
            @click="selectMood(mood.value)">
            <text class="mood-emoji">{{ mood.emoji }}</text>
            <text class="mood-label">{{ mood.label }}</text>
          </view>
        </view>
      </view>

      <!-- 心情原因输入 -->
      <view class="mood-reason">
        <text class="reason-label">心情原因（选填）</text>
        <textarea
          class="reason-input"
          v-model="moodReason"
          placeholder="分享一下现在的感受或发生了什么..."
          placeholder-class="reason-placeholder"
          :maxlength="200"
          :auto-height="true"
        />
        <text class="reason-count">{{ moodReason.length }}/200</text>
      </view>

      <!-- 提交按钮 -->
      <button 
        class="submit-mood-btn"
        :class="{ disabled: !selectedMood }"
        :disabled="!selectedMood"
        @click="submitMoodRecord">
        <text class="btn-icon">✓</text>
        <text class="btn-text">记录心情</text>
      </button>

      <!-- 最近记录 -->
      <view class="recent-records" v-if="recentMoods.length > 0">
        <view class="records-header">
          <text class="records-title">最近记录</text>
          <text class="records-count">{{ recentMoods.length }}条</text>
        </view>
        <view class="records-list">
          <view 
            v-for="(record, index) in recentMoods"
            :key="index"
            class="record-item">
            <view class="record-emoji">{{ getMoodEmoji(record.mood) }}</view>
            <view class="record-content">
              <text class="record-time">{{ record.time }}</text>
              <text class="record-reason" v-if="record.reason">{{ record.reason }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- AI助手入口 -->
    <view class="ai-assistant-section">
      <view class="section-header">
        <text class="section-title">AI健康助手</text>
      </view>
      
      <view class="ai-card" @click="goToAiAssistant">
        <view class="ai-icon">🤖</view>
        <view class="ai-info">
          <text class="ai-title">24小时智能陪伴</text>
          <text class="ai-desc">健康咨询、情绪支持、用药提醒</text>
        </view>
        <view class="ai-status">
          <text class="status-badge">在线</text>
        </view>
        <view class="ai-arrow">→</view>
      </view>
    </view>

    <!-- 健康科普入口 -->
    <view class="science-section">
      <view class="section-header">
        <text class="section-title">健康科普</text>
      </view>
      
      <view class="science-card" @click="goToScience">
        <view class="science-icon">📚</view>
        <view class="science-info">
          <text class="science-title">认知健康科普</text>
          <text class="science-desc">阿尔兹海默预防·康复训练·营养指导</text>
        </view>
        <view class="science-badge">
          <text class="badge-text">6篇</text>
        </view>
        <view class="science-arrow">→</view>
      </view>
    </view>

    <!-- 健康测评入口 -->
    <view class="health-section">
      <view class="section-header">
        <text class="section-title">健康测评</text>
      </view>
      
      <view class="health-card" @click="goToTest('first-assessment')">
        <view class="health-icon">🏥</view>
        <view class="health-info">
          <text class="health-title">完整健康评估</text>
          <text class="health-desc">认知、情绪、生活能力全面测评</text>
        </view>
        <view class="health-arrow">→</view>
      </view>
    </view>
  </view>
</template>

<script>
// import { CrudEmoService } from '@/api/client/services/CrudEmoService'

export default {
  data() {
    return {
      currentDate: '',
      currentTime: '',
      morningCompleted: false,
      eveningCompleted: false,
      morningResult: null,
      eveningResult: null,
      reminderConfig: null,
      checkTimer: null,
      // 心情记录相关
      selectedMood: '',
      moodReason: '',
      recentMoods: [],
      moodOptions: [
        { value: 'very-happy', emoji: '😄', label: '非常开心' },
        { value: 'happy', emoji: '😊', label: '开心' },
        { value: 'normal', emoji: '😐', label: '一般' },
        { value: 'sad', emoji: '😔', label: '难过' },
        { value: 'very-sad', emoji: '😢', label: '很难过' },
        { value: 'anxious', emoji: '😰', label: '焦虑' }
      ]
    }
  },
  computed: {
    // 待完成任务数量
    pendingTasksCount() {
      let count = 0
      if (!this.morningCompleted) count++
      if (!this.eveningCompleted) count++
      return count
    }
  },
  async onLoad() {
    this.getCurrentDate()
    this.getCurrentTime()
    this.loadTodayStatus()
    this.loadRecentMoods()
    
    // 加载提醒配置
    await this.loadReminderConfig()
    
    // 每分钟更新时间、状态和检查提醒
    this.timer = setInterval(() => {
      this.getCurrentTime()
      this.checkAndShowReminder()
    }, 60000)
    
    // 立即检查一次提醒
    this.checkAndShowReminder()
  },
  onShow() {
    // 每次显示页面时刷新状态
    this.loadTodayStatus()
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.checkTimer) {
      clearInterval(this.checkTimer)
    }
  },
  methods: {
    getCurrentDate() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const weekday = weekdays[now.getDay()]
      this.currentDate = `${year}年${month}月${day}日 ${weekday}`
    },
    
    getCurrentTime() {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      this.currentTime = `${hours}:${String(minutes).padStart(2, '0')}`
    },
    
    async loadTodayStatus() {
      try {
        // 调用统一API获取今日测试状态
        const response = await api.test.getTodayEmotionStatus()
        if (response.code === 0 && response.data) {
            const { morning, evening } = response.data
            this.morningCompleted = morning.completed
            this.eveningCompleted = evening.completed
            this.morningResult = morning.result
            this.eveningResult = evening.result
        }
      } catch (error) {
        console.error('获取今日状态失败:', error)
      }
    },
    
    // 获取早间测试状态图标
    getMorningStatusIcon() {
      if (this.morningCompleted) return '✅'
      const now = new Date()
      const hours = now.getHours()
      // 8:00-10:00
      if (hours >= 8 && hours < 10) return '⏳'
      if (hours >= 10) return '❗'
      return '⏰'
    },
    
    // 获取早间测试时间状态
    getMorningTimeStatus() {
      const now = new Date()
      const hours = now.getHours()
      if (hours >= 8 && hours < 10) return 'pending'  // 进行中
      if (hours >= 10) return 'expired'  // 已过期
      return 'locked'  // 未开始
    },
    
    // 获取早间测试状态文字
    getMorningStatusText() {
      if (this.morningCompleted) return '已完成'
      const now = new Date()
      const hours = now.getHours()
      if (hours >= 8 && hours < 10) return '待完成'
      if (hours >= 10) return '已过期'
      return '未开始'
    },
    
    // 获取晚间测试状态图标
    getEveningStatusIcon() {
      if (this.eveningCompleted) return '✅'
      const now = new Date()
      const hours = now.getHours()
      // 20:00-24:00
      if (hours >= 20 || hours < 1) return '⏳'
      if (hours >= 1) return '❗'
      return '⏰'
    },
    
    // 获取晚间测试时间状态
    getEveningTimeStatus() {
      const now = new Date()
      const hours = now.getHours()
      if (hours >= 20 || hours < 1) return 'pending'  // 进行中
      if (hours >= 1 && hours < 20) return hours >= 18 ? 'upcoming' : 'locked'
      return 'locked'
    },
    
    // 获取晚间测试状态文字
    getEveningStatusText() {
      if (this.eveningCompleted) return '已完成'
      const now = new Date()
      const hours = now.getHours()
      if (hours >= 20 || hours < 1) return '待完成'
      if (hours >= 1 && hours < 18) return '未开始'
      if (hours >= 18 && hours < 20) return '即将开始'
      return '未开始'
    },
    
    // 根据综合评价获取情绪图标
    getEmotionIcon(overallLevel) {
      const emotionMap = {
        '状态良好': '😊',
        '基本正常': '🙂',
        '轻度异常': '😐',
        '需要关注': '😟'
      }
      return emotionMap[overallLevel] || '😐'
    },
    
    // 加载提醒配置
    async loadReminderConfig() {
      try {
        const response = await api.test.getReminderConfig()
        if (response.code === 0) {
            this.reminderConfig = response.data
        }
      } catch (error) {
        console.error('加载提醒配置失败:', error)
      }
    },
    
    // 检查并显示提醒
    async checkAndShowReminder() {
        if (!this.reminderConfig) return
        
        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        
        // 检查早间测试提醒
        await this.checkTestReminder('morning', currentTime, hours, minutes)
        
        // 检查晚间测试提醒
        await this.checkTestReminder('evening', currentTime, hours, minutes)
    },
    
    // 检查单个测试的提醒
    async checkTestReminder(testType, currentTime, hours, minutes) {
        const config = this.reminderConfig[testType]
        const isCompleted = testType === 'morning' ? this.morningCompleted : this.eveningCompleted
        
        // 如果已完成，不提醒
        if (isCompleted) return
        
        // 检查开始时间提醒
        if (currentTime === config.startTime) {
            const shown = await api.test.hasReminderShown(testType, 'start')
            if (!shown) {
                this.showStartReminder(testType, config)
            }
        }
        
        // 检查截止前提醒
        const endParts = config.endTime.split(':')
        const endHour = parseInt(endParts[0])
        const endMinute = parseInt(endParts[1])
        
        // 计算截止前30分钟的时间
        let reminderHour = endHour
        let reminderMinute = endMinute - config.reminderBeforeEnd
        
        if (reminderMinute < 0) {
            reminderMinute += 60
            reminderHour -= 1
        }
        
        if (reminderHour < 0) {
            reminderHour += 24
        }
        
        if (hours === reminderHour && minutes === reminderMinute) {
            const shown = await api.test.hasReminderShown(testType, 'end')
            if (!shown) {
                this.showEndReminder(testType, config)
            }
        }
    },
    
    // 显示开始提醒
    showStartReminder(testType, config) {
      const typeText = testType === 'morning' ? '早间' : '晚间'
      
      uni.showModal({
        title: config.startTitle,
        content: config.startMessage,
        confirmText: '立即前往测试',
        cancelText: '稍后',
        success: async (res) => {
          // 记录已显示
          await api.test.markReminderShown(testType, 'start')
          if (res.confirm) {
              // 用户点击"立即前往测试"
              this.startTest(testType)
          }
        }
      })
    },
    
    // 显示截止提醒
    showEndReminder(testType, config) {
      uni.showModal({
        title: config.endTitle,
        content: config.endMessage,
        confirmText: '立即前往测试',
        cancelText: '稍后',
        success: async (res) => {
          // 记录已显示
          await api.test.markReminderShown(testType, 'end')
          if (res.confirm) {
              // 用户点击"立即前往测试"
              this.startTest(testType)
          }
        }
      })
    },
    
    startTest(type) {
      const typeText = type === 'morning' ? '早间' : '晚间'
      
      uni.showModal({
        title: `${typeText}情绪测试`,
        content: `准备开始${typeText}情绪状态测试，共4题，预计1-2分钟完成。`,
        confirmText: '开始',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 跳转到情绪测试页面
            uni.navigateTo({
              url: `/pages/test/emotion-test?type=${type}`
            })
          }
        }
      })
    },
    
    mockMorningReminder() {
      uni.showModal({
        title: '早间测试提醒',
        content: '现在是早上8:00，请完成今日早间情绪测试。\n\n内容：4题简版情绪评估\n时间：约1-2分钟',
        confirmText: '立即测试',
        cancelText: '稍后',
        success: (res) => {
          if (res.confirm) {
            this.startTest('morning')
          }
        }
      })
    },
    
    mockEveningReminder() {
      uni.showModal({
        title: '晚间测试提醒',
        content: '现在是晚上20:00，请完成今日晚间情绪测试。\n\n内容：4题简版情绪评估\n时间：约1-2分钟',
        confirmText: '立即测试',
        cancelText: '稍后',
        success: (res) => {
          if (res.confirm) {
            this.startTest('evening')
          }
        }
      })
    },
    
    goToTest(testType) {
      uni.showModal({
        title: '完整健康评估',
        content: '这将进行一次完整的健康评估，包括认知、情绪、生活能力等多个维度，预计需要15-20分钟。',
        confirmText: '开始评估',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: `/pages/test/${testType}`
            })
          }
        }
      })
    },

    // 跳转到AI助手页面
    goToAiAssistant() {
      uni.switchTab({
        url: '/pages/ai-assistant/ai-assistant'
      })
    },

    // 跳转到科普页面
    goToScience() {
      uni.switchTab({
        url: '/pages/science/science-articles'
      })
    },

    // 心情记录相关方法
    selectMood(moodValue) {
      this.selectedMood = moodValue
    },

    async submitMoodRecord() {
      if (!this.selectedMood) {
        uni.showToast({
          title: '请选择心情',
          icon: 'none'
        })
        return
      }

      try {
        // TODO: 调用后端API保存心情记录
        // const response = await api.mood.createMoodRecord({
        //   mood: this.selectedMood,
        //   reason: this.moodReason.trim(),
        //   timestamp: new Date().toISOString()
        // })
        // if (response.code === 0) {
        //   // 成功处理
        // }

        // 临时模拟：添加到本地记录
        const newRecord = {
          mood: this.selectedMood,
          reason: this.moodReason.trim(),
          time: this.getFormattedTime()
        }
        
        this.recentMoods.unshift(newRecord)
        if (this.recentMoods.length > 5) {
          this.recentMoods = this.recentMoods.slice(0, 5)
        }

        // 清空输入
        this.selectedMood = ''
        this.moodReason = ''

        uni.showToast({
          title: '心情记录成功',
          icon: 'success'
        })

      } catch (error) {
        console.error('提交心情记录失败:', error)
        uni.showToast({
          title: '记录失败，请重试',
          icon: 'none'
        })
      }
    },

    async loadRecentMoods() {
      try {
        // TODO: 调用后端API获取最近的心情记录
        // const response = await api.mood.getRecentMoodRecords({ limit: 5 })
        // if (response.code === 0) {
        //   this.recentMoods = response.data
        // }

        // 临时模拟数据
        this.recentMoods = []
      } catch (error) {
        console.error('加载最近心情记录失败:', error)
      }
    },

    getMoodEmoji(moodValue) {
      const mood = this.moodOptions.find(m => m.value === moodValue)
      return mood ? mood.emoji : '😐'
    },

    getFormattedTime() {
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${month}月${day}日 ${hours}:${minutes}`
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
}

.page-header {
  text-align: center;
  margin-bottom: 24rpx;
  
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

// 任务概览提示
.task-overview {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%);
  border-left: 6rpx solid #fa8c16;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(250, 140, 22, 0.1);
  
  .overview-icon {
    font-size: 36rpx;
    margin-right: 16rpx;
  }
  
  .overview-text {
    flex: 1;
    font-size: 30rpx;
    color: #d46b08;
    font-weight: 600;
    line-height: 1.5;
  }
}

// 每日筛查任务
.daily-task-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);
}

.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  
  .task-icon {
    font-size: 40rpx;
    margin-right: 16rpx;
  }
  
  .task-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #333;
  }
}

.task-reminder {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 32rpx;
  border-left: 6rpx solid #1890ff;
  
  .reminder-icon {
    font-size: 32rpx;
    margin-right: 12rpx;
  }
  
  .reminder-text {
    flex: 1;
    font-size: 28rpx;
    color: #0050b3;
    line-height: 1.5;
  }
}

.test-card {
  background: #f8f9fa;
  border-radius: 20rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  
  &:last-of-type {
    margin-bottom: 32rpx;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-left {
  .card-title-row {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 8rpx;
    
    .status-icon {
      font-size: 32rpx;
    }
    
    .card-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }
  }
  
  .card-time {
    display: block;
    font-size: 24rpx;
    color: #999;
    margin-left: 44rpx;
  }
}

.card-status {
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
  
  .status-text {
    font-size: 24rpx;
    font-weight: 500;
  }
  
  &.pending {
    background: #fff7e6;
    
    .status-text {
      color: #fa8c16;
    }
  }
  
  &.completed {
    background: #f6ffed;
    
    .status-text {
      color: #52c41a;
    }
  }
  
  &.locked {
    background: #f5f5f5;
    
    .status-text {
      color: #999;
    }
  }
  
  &.expired {
    background: #fff1f0;
    
    .status-text {
      color: #cf1322;
    }
  }
  
  &.upcoming {
    background: #e6f7ff;
    
    .status-text {
      color: #1890ff;
    }
  }
}

// 情绪评分展示（放大版，适合老年人）
.emotion-score {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  border: 2rpx solid #91d5ff;
  border-radius: 16rpx;
  padding: 24rpx 28rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.08);
  
  .emotion-label {
    font-size: 32rpx;
    color: #595959;
    font-weight: 500;
    margin-right: 16rpx;
  }
  
  .emotion-icon {
    font-size: 56rpx;
    margin-right: 16rpx;
    line-height: 1;
  }
  
  .emotion-text {
    font-size: 36rpx;
    color: #0050b3;
    font-weight: 700;
    letter-spacing: 1rpx;
  }
}

.card-progress {
  margin-bottom: 20rpx;
  
  .progress-bar {
    width: 100%;
    height: 8rpx;
    background: #e0e0e0;
    border-radius: 4rpx;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1890ff 0%, #0050b3 100%);
      transition: width 0.3s ease;
    }
  }
}

.test-btn {
  width: 100%;
  border: none;
  border-radius: 16rpx;
  padding: 24rpx;
  font-size: 30rpx;
  font-weight: 600;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: white;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.3);
  
  &.completed {
    background: #f0f0f0;
    color: #999;
    box-shadow: none;
  }
  
  &:disabled {
    opacity: 1;
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
        position: relative;

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

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .mood-reason {
    margin-bottom: 28rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .reason-label {
      display: block;
      font-size: 28rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 16rpx;
      width: 100%;
      text-align: center;
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
      text-align: center;

      &:focus {
        border-color: #1890ff;
        background: #fafbfc;
      }
    }

    .reason-placeholder {
      color: #bfbfbf;
      font-size: 26rpx;
      text-align: center;
    }

    .reason-count {
      display: block;
      text-align: center;
      font-size: 22rpx;
      color: #bfbfbf;
      margin-top: 8rpx;
      width: 100%;
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
    border: none;
    border-radius: 16rpx;
    padding: 28rpx;
    font-size: 32rpx;
    font-weight: 700;
    box-shadow: 0 6rpx 20rpx rgba(24, 144, 255, 0.3);
    margin-bottom: 28rpx;

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

    &:not(.disabled):active {
      transform: scale(0.98);
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

          .record-time {
            display: block;
            font-size: 24rpx;
            color: #999;
            margin-bottom: 8rpx;
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

// AI助手区域
.ai-assistant-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);
}

.ai-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20rpx;
  padding: 28rpx;
  border: 2rpx solid #87e8de;
  position: relative;
  
  .ai-icon {
    font-size: 48rpx;
    margin-right: 20rpx;
  }
  
  .ai-info {
    flex: 1;
    
    .ai-title {
      display: block;
      font-size: 30rpx;
      font-weight: 600;
      color: #0050b3;
      margin-bottom: 8rpx;
    }
    
    .ai-desc {
      display: block;
      font-size: 24rpx;
      color: #096dd9;
    }
  }

  .ai-status {
    margin-right: 20rpx;

    .status-badge {
      background: #52c41a;
      color: white;
      font-size: 20rpx;
      padding: 6rpx 16rpx;
      border-radius: 20rpx;
      font-weight: 500;
    }
  }
  
  .ai-arrow {
    font-size: 36rpx;
    color: #1890ff;
    font-weight: 700;
  }

  // 添加闪烁动画效果，表示AI在线状态
  &::before {
    content: '';
    position: absolute;
    top: 20rpx;
    right: 80rpx;
    width: 16rpx;
    height: 16rpx;
    background: #52c41a;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10rpx rgba(82, 196, 26, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);
  }
}

// 科普区域
.science-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);
}

.science-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%);
  border-radius: 20rpx;
  padding: 28rpx;
  border: 2rpx solid #b7eb8f;
  position: relative;
  
  .science-icon {
    font-size: 48rpx;
    margin-right: 20rpx;
  }
  
  .science-info {
    flex: 1;
    
    .science-title {
      display: block;
      font-size: 30rpx;
      font-weight: 600;
      color: #389e0d;
      margin-bottom: 8rpx;
    }
    
    .science-desc {
      display: block;
      font-size: 24rpx;
      color: #52c41a;
    }
  }

  .science-badge {
    background: #52c41a;
    color: white;
    border-radius: 20rpx;
    padding: 8rpx 16rpx;
    margin-right: 20rpx;

    .badge-text {
      font-size: 20rpx;
      font-weight: 600;
    }
  }
  
  .science-arrow {
    font-size: 36rpx;
    color: #52c41a;
    font-weight: 700;
  }

  // 添加书本图标动画
  &::before {
    content: '📖';
    position: absolute;
    top: 16rpx;
    right: 80rpx;
    font-size: 20rpx;
    opacity: 0.6;
    animation: bounce 2s infinite;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8rpx);
  }
  60% {
    transform: translateY(-4rpx);
  }
}

// 健康测评
.health-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: 700;
    color: #333;
  }
}

.health-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  border-radius: 20rpx;
  padding: 28rpx;
  border: 2rpx solid #91d5ff;
  
  .health-icon {
    font-size: 48rpx;
    margin-right: 20rpx;
  }
  
  .health-info {
    flex: 1;
    
    .health-title {
      display: block;
      font-size: 30rpx;
      font-weight: 600;
      color: #0050b3;
      margin-bottom: 8rpx;
    }
    
    .health-desc {
      display: block;
      font-size: 24rpx;
      color: #096dd9;
    }
  }
  
  .health-arrow {
    font-size: 36rpx;
    color: #1890ff;
    font-weight: 700;
  }
}
</style>


