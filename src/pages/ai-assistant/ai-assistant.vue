<template>
  <view class="ai-assistant-container">
    <!-- 顶部标题栏 -->
    <view class="page-header">
      <view class="header-left"></view>
      <view class="header-center">
        <text class="page-title">AI健康助手</text>
        <text class="page-subtitle">24小时贴心陪伴</text>
      </view>
      <view class="header-right">
        <view class="status-indicator" :class="{ online: isOnline }">
          <text class="status-dot"></text>
          <text class="status-text">{{ isOnline ? '在线' : '离线' }}</text>
        </view>
      </view>
    </view>

    <!-- 聊天消息区域 -->
    <scroll-view 
      class="chat-container" 
      :scroll-top="scrollTop" 
      scroll-y
      scroll-with-animation
      :scroll-into-view="scrollToView"
      @scroll="onScroll">
      
      <!-- 欢迎消息 -->
      <view class="welcome-message" v-if="messages.length === 0">
        <view class="welcome-avatar">
          <text class="avatar-icon">🤖</text>
        </view>
        <view class="welcome-content">
          <text class="welcome-title">您好！我是您的AI健康助手</text>
          <text class="welcome-desc">我可以为您提供健康咨询、情绪支持、用药提醒等服务。有什么可以帮助您的吗？</text>
        </view>
      </view>

      <!-- 聊天消息列表 -->
      <view class="message-list">
        <view 
          v-for="(message, index) in messages" 
          :key="index"
          :id="'message-' + index"
          class="message-item"
          :class="{ 'user-message': message.isUser, 'ai-message': !message.isUser }">
          
          <!-- AI消息 -->
          <view class="ai-message-wrapper" v-if="!message.isUser">
            <view class="ai-avatar">
              <text class="avatar-icon">🤖</text>
            </view>
            <view class="message-content">
              <view class="message-bubble ai-bubble">
                <text class="message-text">{{ message.content }}</text>
                <view class="message-time">{{ message.time }}</view>
              </view>
              <!-- AI消息操作按钮 -->
              <view class="ai-actions">
                <view class="action-btn" @click="playAudio(message)">
                  <text class="action-icon">🔊</text>
                  <text class="action-text">播放</text>
                </view>
                <view class="action-btn" @click="copyMessage(message)">
                  <text class="action-icon">📋</text>
                  <text class="action-text">复制</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 用户消息 -->
          <view class="user-message-wrapper" v-else>
            <view class="message-content">
              <view class="message-bubble user-bubble">
                <text class="message-text">{{ message.content }}</text>
                <view class="message-time">{{ message.time }}</view>
              </view>
            </view>
            <view class="user-avatar">
              <text class="avatar-icon">👤</text>
            </view>
          </view>
        </view>

        <!-- 正在输入提示 -->
        <view class="typing-indicator" v-if="isTyping">
          <view class="ai-avatar">
            <text class="avatar-icon">🤖</text>
          </view>
          <view class="typing-content">
            <view class="typing-bubble">
              <view class="typing-dots">
                <view class="dot"></view>
                <view class="dot"></view>
                <view class="dot"></view>
              </view>
              <text class="typing-text">AI助手正在思考中...</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 快捷功能区域 -->
    <view class="quick-actions" v-if="showQuickActions">
      <text class="quick-title">常用咨询</text>
      <view class="quick-buttons">
        <view 
          v-for="(action, index) in quickActions"
          :key="index"
          class="quick-btn"
          @click="sendQuickMessage(action.text)">
          <text class="quick-icon">{{ action.icon }}</text>
          <text class="quick-text">{{ action.text }}</text>
        </view>
      </view>
    </view>

    <!-- 输入区域 -->
    <view class="input-area">
      <view class="input-container">
        <!-- 语音输入按钮 -->
        <view class="voice-btn" @click="toggleVoiceInput" :class="{ recording: isRecording }">
          <text class="voice-icon">{{ isRecording ? '🔴' : '🎤' }}</text>
        </view>

        <!-- 文字输入框 -->
        <input 
          class="text-input"
          v-model="inputText"
          placeholder="请输入您的问题..."
          placeholder-class="input-placeholder"
          :focus="inputFocus"
          @focus="onInputFocus"
          @blur="onInputBlur"
          @input="onInput"
          @confirm="sendMessage"
          confirm-type="send"
        />

        <!-- 发送按钮 -->
        <view 
          class="send-btn" 
          :class="{ active: canSend }"
          @click="sendMessage">
          <text class="send-icon">→</text>
        </view>
      </view>

      <!-- 语音录音界面 -->
      <view class="voice-recording" v-if="isRecording">
        <view class="recording-content">
          <view class="recording-wave">
            <view class="wave-item" v-for="n in 5" :key="n"></view>
          </view>
          <text class="recording-text">正在录音中，松开发送</text>
          <text class="recording-cancel">上滑取消</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 消息列表
      messages: [],
      // 输入文本
      inputText: '',
      // 滚动位置
      scrollTop: 0,
      scrollToView: '',
      // 在线状态
      isOnline: true,
      // 正在输入状态
      isTyping: false,
      // 输入框焦点状态
      inputFocus: false,
      // 语音录音状态
      isRecording: false,
      // 显示快捷功能
      showQuickActions: true,
      // 快捷操作按钮
      quickActions: [
        { icon: '💊', text: '用药提醒' },
        { icon: '😊', text: '情绪支持' },
        { icon: '🏥', text: '健康咨询' },
        { icon: '📊', text: '查看报告' },
        { icon: '⏰', text: '设置提醒' },
        { icon: '❓', text: '使用帮助' }
      ]
    }
  },
  computed: {
    canSend() {
      return this.inputText.trim().length > 0
    }
  },
  onLoad() {
    this.initializeChat()
  },
  methods: {
    // 初始化聊天
    initializeChat() {
      // 模拟加载历史消息
      setTimeout(() => {
        this.addMessage({
          content: '您好！我是您的AI健康助手小智，很高兴为您服务。您可以向我咨询健康相关的问题，我会尽力为您提供专业的建议。',
          isUser: false,
          time: this.getCurrentTime()
        })
      }, 1000)
    },

    // 发送消息
    async sendMessage() {
      if (!this.canSend) return

      const message = this.inputText.trim()
      this.inputText = ''

      // 添加用户消息
      this.addMessage({
        content: message,
        isUser: true,
        time: this.getCurrentTime()
      })

      // 显示正在输入状态
      this.isTyping = true
      this.showQuickActions = false

      try {
        // 模拟AI回复（这里可以接入真实的AI API）
        const aiResponse = await this.getAIResponse(message)
        
        setTimeout(() => {
          this.isTyping = false
          this.addMessage({
            content: aiResponse,
            isUser: false,
            time: this.getCurrentTime()
          })
        }, 2000) // 模拟思考时间

      } catch (error) {
        this.isTyping = false
        this.addMessage({
          content: '抱歉，我遇到了一些问题，请稍后再试。',
          isUser: false,
          time: this.getCurrentTime()
        })
      }
    },

    // 发送快捷消息
    sendQuickMessage(text) {
      this.inputText = text
      this.sendMessage()
    },

    // 添加消息
    addMessage(message) {
      this.messages.push(message)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },

    // 滚动到底部
    scrollToBottom() {
      const lastIndex = this.messages.length - 1
      this.scrollToView = 'message-' + lastIndex
    },

    // 获取AI回复（模拟）
    async getAIResponse(userMessage) {
      // 这里可以接入真实的AI API
      const responses = {
        '用药提醒': '我为您查看了今日用药计划：\n\n🕘 上午8:00 - 降压药（氨氯地平）1片\n🕐 下午1:00 - 胃药（奥美拉唑）1粒\n🕕 晚上6:00 - 钙片 1片\n\n请按时服用，如有不适请及时联系医生。',
        '情绪支持': '我理解您可能遇到了一些情绪困扰。请记住，每个人都会有情绪波动，这是很正常的。您可以试试深呼吸、听听轻音乐或者出去走走。如果需要，我们也可以安排心理医生的咨询。',
        '健康咨询': '我可以为您提供基础的健康建议，但不能替代专业医疗诊断。请描述一下您的具体症状或健康问题，我会尽力为您提供相关信息和建议。',
        '查看报告': '根据您最近的健康监测数据：\n\n📈 血压：正常范围\n💓 心率：68次/分钟\n😊 情绪状态：良好\n🚶 运动量：建议增加\n\n整体健康状况良好，建议保持规律作息。',
        '设置提醒': '我可以帮您设置各种提醒：\n\n⏰ 用药提醒\n🥛 喝水提醒\n🏃 运动提醒\n😴 睡眠提醒\n🏥 复查提醒\n\n请告诉我您需要设置什么提醒？',
        '使用帮助': '我是您的AI健康助手，可以为您提供：\n\n💊 用药指导和提醒\n😊 情绪支持和心理健康\n🏥 基础健康咨询\n📊 健康数据解读\n⏰ 各种健康提醒\n🎤 支持语音输入和播放\n\n您可以直接输入问题或点击快捷按钮与我对话。'
      }

      // 简单的关键词匹配
      for (let key in responses) {
        if (userMessage.includes(key)) {
          return responses[key]
        }
      }

      // 默认回复
      const defaultResponses = [
        '感谢您的问题。虽然我是AI助手，但我会尽力为您提供帮助。请您详细描述一下情况，我会根据我的知识为您提供建议。',
        '我理解您的关心。健康问题确实很重要，我建议您可以详细说明症状，我会为您提供一些基础的健康知识和建议。',
        '这是一个很好的问题。作为您的AI健康助手，我会基于医学知识为您提供参考建议，但请记住这不能替代专业医疗诊断。'
      ]

      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
    },

    // 输入框事件
    onInputFocus() {
      this.inputFocus = true
      this.showQuickActions = false
    },

    onInputBlur() {
      this.inputFocus = false
      if (this.messages.length === 1) { // 只有欢迎消息时显示快捷操作
        this.showQuickActions = true
      }
    },

    onInput(e) {
      this.inputText = e.detail.value
    },

    // 语音输入
    toggleVoiceInput() {
      if (this.isRecording) {
        this.stopRecording()
      } else {
        this.startRecording()
      }
    },

    startRecording() {
      this.isRecording = true
      // 这里可以接入真实的语音识别API
      uni.showToast({
        title: '语音功能开发中',
        icon: 'none'
      })
    },

    stopRecording() {
      this.isRecording = false
      // 模拟语音识别结果
      setTimeout(() => {
        this.inputText = '今天感觉有点累，血压怎么样？'
      }, 500)
    },

    // 播放语音
    playAudio(message) {
      // 这里可以接入语音合成API
      uni.showToast({
        title: '正在播放语音',
        icon: 'none'
      })
    },

    // 复制消息
    copyMessage(message) {
      uni.setClipboardData({
        data: message.content,
        success: () => {
          uni.showToast({
            title: '已复制到剪贴板',
            icon: 'success'
          })
        }
      })
    },

    // 获取当前时间
    getCurrentTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      return `${hours}:${minutes}`
    },

    // 滚动事件
    onScroll(e) {
      this.scrollTop = e.detail.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-assistant-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 顶部标题栏
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 24rpx 32rpx;
  padding-top: calc(24rpx + env(safe-area-inset-top));
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 100;
  flex-shrink: 0;

  .header-left {
    width: 120rpx;

    .back-btn {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 50%;
      
      .back-icon {
        font-size: 32rpx;
        color: #666;
        font-weight: bold;
      }
    }
  }

  .header-center {
    flex: 1;
    text-align: center;

    .page-title {
      display: block;
      font-size: 36rpx;
      font-weight: 700;
      color: #1890ff;
      margin-bottom: 4rpx;
    }

    .page-subtitle {
      display: block;
      font-size: 24rpx;
      color: #666;
    }
  }

  .header-right {
    width: 120rpx;
    display: flex;
    justify-content: flex-end;

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8rpx;
      padding: 8rpx 16rpx;
      background: #f5f5f5;
      border-radius: 20rpx;

      .status-dot {
        width: 12rpx;
        height: 12rpx;
        border-radius: 50%;
        background: #ccc;
      }

      .status-text {
        font-size: 24rpx;
        color: #666;
      }

      &.online {
        .status-dot {
          background: #52c41a;
        }
        .status-text {
          color: #52c41a;
        }
      }
    }
  }
}

// 聊天容器
.chat-container {
  flex: 1;
  padding: 24rpx 16rpx 24rpx 32rpx;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

// 欢迎消息
.welcome-message {
  display: flex;
  align-items: flex-start;
  margin: 0 3%;
  margin-bottom: 40rpx;
  padding: 32rpx;
  background: white;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);

  .welcome-avatar {
    width: 80rpx;
    height: 80rpx;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
    flex-shrink: 0;

    .avatar-icon {
      font-size: 40rpx;
      color: white;
    }
  }

  .welcome-content {
    flex: 1;

    .welcome-title {
      display: block;
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
      margin-bottom: 16rpx;
      line-height: 1.4;
    }

    .welcome-desc {
      display: block;
      font-size: 28rpx;
      color: #666;
      line-height: 1.6;
    }
  }
}

// 消息列表
.message-list {
  .message-item {
    margin-bottom: 32rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  // AI消息
  .ai-message-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 2%;

    .ai-avatar {
      width: 60rpx;
      height: 60rpx;
      background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
      margin-left: 0;
      flex-shrink: 0;

      .avatar-icon {
        font-size: 28rpx;
        color: white;
      }
    }

    .message-content {
      flex: 1;
      max-width: 65%;

      .message-bubble {
        background: white;
        border-radius: 0 24rpx 24rpx 24rpx;
        padding: 24rpx 28rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
        margin-bottom: 16rpx;

        .message-text {
          font-size: 30rpx;
          color: #333;
          line-height: 1.6;
          word-wrap: break-word;
        }

        .message-time {
          font-size: 22rpx;
          color: #999;
          margin-top: 12rpx;
          display: block;
        }
      }

      .ai-actions {
        display: flex;
        gap: 20rpx;

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8rpx;
          padding: 12rpx 20rpx;
          background: #f0f0f0;
          border-radius: 20rpx;

          .action-icon {
            font-size: 20rpx;
          }

          .action-text {
            font-size: 24rpx;
            color: #666;
          }
        }
      }
    }
  }

  // 用户消息
  .user-message-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-right: 10%;

    .message-content {
      flex: 1;
      max-width: 65%;
      display: flex;
      justify-content: flex-end;

      .message-bubble {
        background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
        border-radius: 24rpx 0 24rpx 24rpx;
        padding: 24rpx 28rpx;

        .message-text {
          font-size: 30rpx;
          color: white;
          line-height: 1.6;
          word-wrap: break-word;
        }

        .message-time {
          font-size: 22rpx;
          color: rgba(255, 255, 255, 0.8);
          margin-top: 12rpx;
          display: block;
        }
      }
    }

    .user-avatar {
      width: 60rpx;
      height: 60rpx;
      background: #52c41a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20rpx;
      margin-right: 0;
      flex-shrink: 0;

      .avatar-icon {
        font-size: 28rpx;
        color: white;
      }
    }
  }
}

// 正在输入提示
.typing-indicator {
  display: flex;
  align-items: flex-start;
  padding-left: 3%;

  .ai-avatar {
    width: 60rpx;
    height: 60rpx;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    margin-left: 0;
    flex-shrink: 0;

    .avatar-icon {
      font-size: 28rpx;
      color: white;
    }
  }

  .typing-content {
    .typing-bubble {
      background: white;
      border-radius: 0 24rpx 24rpx 24rpx;
      padding: 24rpx 28rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      gap: 16rpx;

      .typing-dots {
        display: flex;
        gap: 8rpx;

        .dot {
          width: 12rpx;
          height: 12rpx;
          background: #1890ff;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;

          &:nth-child(1) {
            animation-delay: -0.32s;
          }
          &:nth-child(2) {
            animation-delay: -0.16s;
          }
        }
      }

      .typing-text {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
}

@keyframes typing {
  0%, 80%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
}

// 快捷功能
.quick-actions {
  background: white;
  padding: 32rpx 32rpx 24rpx 32rpx;
  border-top: 1rpx solid #f0f0f0;
  flex-shrink: 0;
  overflow-y: auto;

  .quick-title {
    display: block;
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 24rpx;
  }

  .quick-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;

    .quick-btn {
      display: flex;
      align-items: center;
      gap: 12rpx;
      padding: 16rpx 24rpx;
      background: #f0f8ff;
      border: 2rpx solid #d6e4ff;
      border-radius: 32rpx;

      .quick-icon {
        font-size: 24rpx;
      }

      .quick-text {
        font-size: 26rpx;
        color: #1890ff;
      }
    }
  }
}

// 输入区域
.input-area {
  background: white;
  border-top: 1rpx solid #f0f0f0;
  padding-bottom: 0;
  margin-bottom: calc(env(safe-area-inset-bottom) + 120rpx);
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
  flex-shrink: 0;

  .input-container {
    display: flex;
    align-items: center;
    padding: 40rpx 40rpx 32rpx 40rpx;
    gap: 16rpx;

    .voice-btn {
      width: 80rpx;
      height: 80rpx;
      background: #f0f0f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .voice-icon {
        font-size: 36rpx;
        color: #666;
      }

      &.recording {
        background: #ff4d4f;
        
        .voice-icon {
          color: white;
        }
      }
    }

    .text-input {
      flex: 1;
      height: 80rpx;
      background: #f8f9fa;
      border: 2rpx solid #e0e6ed;
      border-radius: 40rpx;
      padding: 0 28rpx;
      font-size: 30rpx;
      color: #333;
    }

    .input-placeholder {
      color: #999;
      font-size: 28rpx;
    }

    .send-btn {
      width: 80rpx;
      height: 80rpx;
      background: #f0f0f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      .send-icon {
        font-size: 32rpx;
        color: #666;
        font-weight: bold;
      }

      &.active {
        background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);

        .send-icon {
          color: white;
        }
      }
    }
  }

  // 语音录音界面
  .voice-recording {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    padding: 60rpx 32rpx;

    .recording-content {
      text-align: center;

      .recording-wave {
        display: flex;
        justify-content: center;
        gap: 8rpx;
        margin-bottom: 32rpx;

        .wave-item {
          width: 8rpx;
          height: 40rpx;
          background: #1890ff;
          border-radius: 4rpx;
          animation: wave 0.8s infinite ease-in-out;

          &:nth-child(1) { animation-delay: -0.4s; }
          &:nth-child(2) { animation-delay: -0.3s; }
          &:nth-child(3) { animation-delay: -0.2s; }
          &:nth-child(4) { animation-delay: -0.1s; }
          &:nth-child(5) { animation-delay: 0s; }
        }
      }

      .recording-text {
        display: block;
        font-size: 32rpx;
        color: white;
        margin-bottom: 16rpx;
      }

      .recording-cancel {
        display: block;
        font-size: 26rpx;
        color: #ccc;
      }
    }
  }
}

@keyframes wave {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
