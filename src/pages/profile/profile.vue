<template>
  <view class="profile-container">
    <!-- 顶部用户卡片 -->
    <view class="user-card">
      <view class="avatar-section">
        <view class="avatar">
          <text class="avatar-text">{{ userInfo.name ? userInfo.name.charAt(0) : '用' }}</text>
        </view>
      </view>
      <view class="user-basic-info">
        <text class="user-name">{{ userInfo.name || '未设置' }}</text>
        <text class="user-desc">{{ userInfo.age ? userInfo.age + '岁' : '' }} {{ userInfo.gender || '' }}</text>
      </view>
    </view>

    <!-- 个人信息卡片 -->
    <view class="info-section">
      <view class="section-header">
        <text class="section-title">个人信息</text>
        <button class="edit-btn" @click="toggleEditMode" v-if="!isEditing">
          <text class="edit-icon">✏️</text>
          <text>编辑</text>
        </button>
      </view>

      <view class="info-list">
        <!-- 姓名 -->
        <view class="info-item">
          <text class="info-label">姓名</text>
          <input 
            v-if="isEditing"
            class="info-input"
            v-model="editForm.name"
            placeholder="请输入姓名"
          />
          <text v-else class="info-value">{{ userInfo.name || '未设置' }}</text>
        </view>

        <!-- 性别 -->
        <view class="info-item">
          <text class="info-label">性别</text>
          <picker 
            v-if="isEditing"
            @change="onGenderChange" 
            :value="genderIndex" 
            :range="genderOptions"
          >
            <view class="info-picker">
              <text class="picker-text">{{ genderIndex >= 0 ? genderOptions[genderIndex] : '请选择性别' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ userInfo.gender || '未设置' }}</text>
        </view>

        <!-- 年龄 -->
        <view class="info-item">
          <text class="info-label">年龄</text>
          <input 
            v-if="isEditing"
            class="info-input"
            v-model="editForm.age"
            type="number"
            placeholder="请输入年龄"
          />
          <text v-else class="info-value">{{ userInfo.age || '未设置' }}</text>
        </view>

        <!-- 职业 -->
        <view class="info-item">
          <text class="info-label">职业</text>
          <picker 
            v-if="isEditing"
            @change="onJobChange" 
            :value="jobIndex" 
            :range="jobOptions"
          >
            <view class="info-picker">
              <text class="picker-text">{{ jobIndex >= 0 ? jobOptions[jobIndex] : '请选择职业' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ userInfo.job || '未设置' }}</text>
        </view>

        <!-- 学历 -->
        <view class="info-item">
          <text class="info-label">学历</text>
          <picker 
            v-if="isEditing"
            @change="onEducationChange" 
            :value="educationIndex" 
            :range="educationOptions"
          >
            <view class="info-picker">
              <text class="picker-text">{{ educationIndex >= 0 ? educationOptions[educationIndex] : '请选择学历' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ userInfo.education || '未设置' }}</text>
        </view>

        <!-- 所在地区 -->
        <view class="info-item">
          <text class="info-label">所在地区</text>
          <input 
            v-if="isEditing"
            class="info-input"
            v-model="editForm.location"
            placeholder="请输入所在地区"
          />
          <text v-else class="info-value">{{ userInfo.location || '未设置' }}</text>
        </view>
      </view>

      <!-- 编辑模式按钮 -->
      <view class="edit-actions" v-if="isEditing">
        <button class="cancel-btn" @click="cancelEdit">取消</button>
        <button class="save-btn" @click="saveInfo">保存</button>
      </view>
    </view>

    <!-- 统计信息 -->
    <view class="stats-section">
      <view class="section-header">
        <text class="section-title">使用统计</text>
      </view>
      <view class="stats-grid">
        <view class="stat-item">
          <text class="stat-value">{{ userInfo.testCount || 0 }}</text>
          <text class="stat-label">测评次数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ getDaysCount() }}</text>
          <text class="stat-label">使用天数</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">{{ userInfo.joinDate || '--' }}</text>
          <text class="stat-label">加入时间</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="action-section">
      <view class="action-item" @click="goToConsent">
        <text class="action-icon">📄</text>
        <text class="action-text">知情同意书</text>
        <text class="action-arrow">></text>
      </view>
      <view class="action-item" @click="handleLogout">
        <text class="action-icon">🚪</text>
        <text class="action-text">退出登录</text>
        <text class="action-arrow">></text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      userInfo: {
        name: '',
        gender: '',
        age: '',
        job: '',
        education: '',
        location: '',
        testCount: 0,
        joinDate: '',
        infoCompletedAt: ''
      },
      editForm: {
        name: '',
        gender: '',
        age: '',
        job: '',
        education: '',
        location: ''
      },
      genderIndex: -1,
      genderOptions: ['男', '女'],
      jobIndex: -1,
      jobOptions: ['干部', '工人', '农民', '军人', '自由职业', '无职业（退休、家庭妇女等）'],
      educationIndex: -1,
      educationOptions: ['文盲', '小学', '初中', '高中/中专', '大专', '本科及以上']
    }
  },
  onLoad() {
    this.loadUserInfo()
  },
  onShow() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      try {
        const storedUserInfo = uni.getStorageSync('userInfo')
        console.log('从本地存储获取的用户信息:', storedUserInfo)
        
        if (storedUserInfo) {
          this.userInfo = {
            name: storedUserInfo.name || storedUserInfo.real_name || '',
            gender: storedUserInfo.gender || '',
            age: storedUserInfo.age || '',
            job: storedUserInfo.job || storedUserInfo.occupation || '',
            education: storedUserInfo.education || '',
            location: storedUserInfo.location || '',
            testCount: storedUserInfo.testCount || 0,
            joinDate: this.formatDate(storedUserInfo.infoCompletedAt || storedUserInfo.create_time),
            infoCompletedAt: storedUserInfo.infoCompletedAt
          }
          
          // 设置选择器索引
          if (this.userInfo.gender) {
            this.genderIndex = this.genderOptions.indexOf(this.userInfo.gender)
          }
          if (this.userInfo.job) {
            this.jobIndex = this.jobOptions.indexOf(this.userInfo.job)
          }
          if (this.userInfo.education) {
            this.educationIndex = this.educationOptions.indexOf(this.userInfo.education)
          }
        }
      } catch (error) {
        console.error('加载用户信息失败:', error)
      }
    },

    toggleEditMode() {
      this.isEditing = true
      // 复制当前信息到编辑表单
      this.editForm = {
        name: this.userInfo.name,
        gender: this.userInfo.gender,
        age: this.userInfo.age,
        job: this.userInfo.job,
        education: this.userInfo.education,
        location: this.userInfo.location
      }
    },

    cancelEdit() {
      this.isEditing = false
      // 重置选择器索引
      if (this.userInfo.gender) {
        this.genderIndex = this.genderOptions.indexOf(this.userInfo.gender)
      }
      if (this.userInfo.job) {
        this.jobIndex = this.jobOptions.indexOf(this.userInfo.job)
      }
      if (this.userInfo.education) {
        this.educationIndex = this.educationOptions.indexOf(this.userInfo.education)
      }
    },

    onGenderChange(e) {
      this.genderIndex = e.detail.value
      this.editForm.gender = this.genderOptions[this.genderIndex]
    },

    onJobChange(e) {
      this.jobIndex = e.detail.value
      this.editForm.job = this.jobOptions[this.jobIndex]
    },

    onEducationChange(e) {
      this.educationIndex = e.detail.value
      this.editForm.education = this.educationOptions[this.educationIndex]
    },

    async saveInfo() {
      // 验证必填项
      if (!this.editForm.name) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
        return
      }

      if (!this.editForm.age) {
        uni.showToast({
          title: '请输入年龄',
          icon: 'none'
        })
        return
      }

      const age = parseInt(this.editForm.age)
      if (age < 1 || age > 150) {
        uni.showToast({
          title: '请输入正确的年龄',
          icon: 'none'
        })
        return
      }

      try {
        uni.showLoading({
          title: '保存中...'
        })

        // 获取已有的用户信息
        const existingUserInfo = uni.getStorageSync('userInfo') || {}

        // 合并更新
        const updatedUserInfo = {
          ...existingUserInfo,
          name: this.editForm.name,
          real_name: this.editForm.name,
          gender: this.editForm.gender,
          age: parseInt(this.editForm.age),
          job: this.editForm.job,
          occupation: this.editForm.job,
          education: this.editForm.education,
          location: this.editForm.location,
          infoCompleted: true
        }

        // 保存到本地存储
        uni.setStorageSync('userInfo', updatedUserInfo)

        // TODO: 调用后端API保存到服务器
        // await UserProfileService.updateProfile(updatedUserInfo)

        uni.hideLoading()

        uni.showToast({
          title: '保存成功',
          icon: 'success'
        })

        // 更新显示信息
        this.userInfo = {
          name: updatedUserInfo.name,
          gender: updatedUserInfo.gender,
          age: updatedUserInfo.age,
          job: updatedUserInfo.job,
          education: updatedUserInfo.education,
          location: updatedUserInfo.location,
          testCount: updatedUserInfo.testCount || 0,
          joinDate: this.formatDate(updatedUserInfo.infoCompletedAt || updatedUserInfo.create_time),
          infoCompletedAt: updatedUserInfo.infoCompletedAt
        }

        this.isEditing = false

      } catch (error) {
        uni.hideLoading()
        console.error('保存用户信息失败:', error)
        uni.showToast({
          title: '保存失败，请重试',
          icon: 'none'
        })
      }
    },

    formatDate(dateString) {
      if (!dateString) return '--'
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },

    getDaysCount() {
      if (!this.userInfo.infoCompletedAt) return 0
      const joinDate = new Date(this.userInfo.infoCompletedAt)
      const today = new Date()
      const diffTime = Math.abs(today - joinDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    },

    goToConsent() {
      uni.navigateTo({
        url: '/pages/login/consent-form'
      })
    },

    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除本地存储
            uni.removeStorageSync('userInfo')
            uni.removeStorageSync('token')
            uni.removeStorageSync('hasConsent')
            
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            })
            
            // 跳转到登录页
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + 120rpx + env(safe-area-inset-bottom));
}

// 用户卡片
.user-card {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: 24rpx;
  padding: 48rpx 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 12rpx 48rpx rgba(24, 144, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .avatar-section {
    margin-bottom: 24rpx;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 4rpx solid rgba(255, 255, 255, 0.5);
      
      .avatar-text {
        font-size: 56rpx;
        font-weight: 700;
        color: white;
      }
    }
  }
  
  .user-basic-info {
    text-align: center;
    
    .user-name {
      display: block;
      font-size: 40rpx;
      font-weight: 700;
      color: white;
      margin-bottom: 12rpx;
    }
    
    .user-desc {
      display: block;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

// 信息区域
.info-section {
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
  margin-bottom: 32rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
  
  .section-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #333;
  }
  
  .edit-btn {
    display: flex;
    align-items: center;
    gap: 8rpx;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: white;
    border: none;
    border-radius: 40rpx;
    padding: 12rpx 28rpx;
    font-size: 26rpx;
    
    .edit-icon {
      font-size: 28rpx;
    }
  }
}

.info-list {
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .info-label {
      font-size: 30rpx;
      color: #666;
      width: 160rpx;
      flex-shrink: 0;
    }
    
    .info-value {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      text-align: right;
    }
    
    .info-input {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      text-align: right;
      background: #f5f7fa;
      border-radius: 8rpx;
      padding: 12rpx 20rpx;
    }
    
    .info-picker {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      background: #f5f7fa;
      border-radius: 8rpx;
      padding: 12rpx 20rpx;
      
      .picker-text {
        font-size: 30rpx;
        color: #333;
      }
      
      .picker-arrow {
        font-size: 28rpx;
        color: #999;
        margin-left: 12rpx;
      }
    }
  }
}

.edit-actions {
  display: flex;
  gap: 24rpx;
  margin-top: 40rpx;
  
  .cancel-btn,
  .save-btn {
    flex: 1;
    border: none;
    border-radius: 48rpx;
    padding: 28rpx;
    font-size: 32rpx;
    font-weight: 600;
  }
  
  .cancel-btn {
    background: #f0f0f0;
    color: #666;
  }
  
  .save-btn {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: white;
  }
}

// 统计区域
.stats-section {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24rpx;
  
  .stat-item {
    text-align: center;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 16rpx;
    padding: 32rpx 16rpx;
    
    .stat-value {
      display: block;
      font-size: 40rpx;
      font-weight: 700;
      color: #1890ff;
      margin-bottom: 12rpx;
    }
    
    .stat-label {
      display: block;
      font-size: 24rpx;
      color: #666;
    }
  }
}

// 功能列表
.action-section {
  background: white;
  border-radius: 24rpx;
  padding: 16rpx 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.1);
  
  .action-item {
    display: flex;
    align-items: center;
    padding: 32rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .action-icon {
      font-size: 40rpx;
      margin-right: 20rpx;
    }
    
    .action-text {
      flex: 1;
      font-size: 30rpx;
      color: #333;
    }
    
    .action-arrow {
      font-size: 28rpx;
      color: #999;
    }
  }
}
</style>

