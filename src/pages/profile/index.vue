<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '个人中心',
  },
}
</route>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getUserCompleteInfoUserProfileGet,
  updateUserProfileUserProfilePut,
} from '@/service/app/userProfile'
import { useUserStore } from '@/store/user'
import { showToast } from '@/utils/toast'

const userStore = useUserStore()

const isEditing = ref(false)
const loading = ref(false)

const userInfo = ref({
  nickname: '',
  real_name: '',
  gender: 0,
  birth_date: '',
  occupation: '',
  education: '',
  marital_status: '',
  mobile: '',
  height: null as number | null,
  weight: null as number | null,
  location: '',
  chronic_diseases: [] as string[],
  smoking: false,
  drinking: false,
})

const editForm = ref({
  nickname: '',
  real_name: '',
  gender: 0,
  birth_date: '',
  occupation: '',
  education: '',
  marital_status: '',
  mobile: '',
  height: null as number | null,
  weight: null as number | null,
  location: '',
  chronic_diseases: [] as string[],
  smoking: false,
  drinking: false,
})

const genderOptions = ['未知', '男', '女']
const educationOptions = ['小学', '初中', '高中/中专', '大专', '本科', '硕士', '博士']
const maritalOptions = ['未婚', '已婚', '离异', '丧偶']

// 加载用户信息
async function loadUserInfo() {
  try {
    loading.value = true
    const res = await getUserCompleteInfoUserProfileGet({ params: {} })

    if (res?.profile) {
      const profile = res.profile
      userInfo.value = {
        nickname: profile.nickname || '',
        real_name: profile.real_name || '',
        gender: profile.gender || 0,
        birth_date: profile.birth_date || '',
        occupation: profile.occupation || '',
        education: profile.education || '',
        marital_status: profile.marital_status || '',
        mobile: profile.mobile || '',
        height: profile.height || null,
        weight: profile.weight || null,
        location: profile.location || '',
        chronic_diseases: profile.chronic_diseases || [],
        smoking: profile.smoking || false,
        drinking: profile.drinking || false,
      }
    }
  } catch (error: any) {
    console.error('加载用户信息失败:', error)
    showToast(error?.message || '加载失败')
  } finally {
    loading.value = false
  }
}

// 切换编辑模式
function toggleEditMode() {
  isEditing.value = true
  editForm.value = { ...userInfo.value }
}

// 取消编辑
function cancelEdit() {
  isEditing.value = false
  editForm.value = { ...userInfo.value }
}

// 保存信息
async function saveInfo() {
  if (!editForm.value.real_name) {
    showToast('请输入真实姓名')
    return
  }

  if (!editForm.value.nickname) {
    showToast('请输入昵称')
    return
  }

  try {
    uni.showLoading({ title: '保存中...' })

    await updateUserProfileUserProfilePut({
      params: {},
      body: {
        nickname: editForm.value.nickname,
        real_name: editForm.value.real_name,
        gender: editForm.value.gender,
        birth_date: editForm.value.birth_date || undefined,
        occupation: editForm.value.occupation || undefined,
        education: editForm.value.education || undefined,
        marital_status: editForm.value.marital_status || undefined,
        mobile: editForm.value.mobile || undefined,
        height: editForm.value.height || undefined,
        weight: editForm.value.weight || undefined,
        location: editForm.value.location || undefined,
        chronic_diseases: editForm.value.chronic_diseases,
        smoking: editForm.value.smoking,
        drinking: editForm.value.drinking,
      },
    })

    userInfo.value = { ...editForm.value }
    isEditing.value = false

    showToast('保存成功')
  } catch (error: any) {
    console.error('保存用户信息失败:', error)
    showToast(error?.message || '保存失败，请重试')
  } finally {
    uni.hideLoading()
  }
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.clearUserInfo()
        showToast('已退出登录')
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/auth/index' })
        }, 1000)
      }
    },
  })
}

// 性别变更
function onGenderChange(e: any) {
  editForm.value.gender = Number(e.detail.value)
}

// 学历变更
function onEducationChange(e: any) {
  editForm.value.education = educationOptions[e.detail.value]
}

// 婚姻状况变更
function onMaritalChange(e: any) {
  editForm.value.marital_status = maritalOptions[e.detail.value]
}

// 获取性别文本
function getGenderText(gender: number) {
  return genderOptions[gender] || '未知'
}

onMounted(() => {
  loadUserInfo()
})
</script>

<template>
  <view class="profile-container">
    <!-- 用户卡片 -->
    <view class="user-card">
      <view class="avatar-section">
        <view class="avatar">
          <text class="avatar-text">
            {{ userInfo.real_name ? userInfo.real_name.charAt(0) : '用' }}
          </text>
        </view>
      </view>
      <view class="user-basic-info">
        <text class="user-name">{{ userInfo.real_name || '未设置' }}</text>
        <text class="user-desc">{{ userInfo.nickname || '暂无昵称' }}</text>
      </view>
    </view>

    <!-- 个人信息卡片 -->
    <view class="info-section">
      <view class="section-header">
        <text class="section-title">个人信息</text>
        <view v-if="!isEditing" class="edit-btn" @click="toggleEditMode">
          <text class="edit-icon">✏️</text>
          <text>编辑</text>
        </view>
      </view>

      <view v-if="loading" class="loading-container">
        <text class="loading-text">加载中...</text>
      </view>

      <view v-else class="info-list">
        <!-- 昵称 -->
        <view class="info-item">
          <text class="info-label">昵称</text>
          <input
            v-if="isEditing"
            v-model="editForm.nickname"
            class="info-input"
            placeholder="请输入昵称"
          />
          <text v-else class="info-value">{{ userInfo.nickname || '未设置' }}</text>
        </view>

        <!-- 真实姓名 -->
        <view class="info-item">
          <text class="info-label">真实姓名</text>
          <input
            v-if="isEditing"
            v-model="editForm.real_name"
            class="info-input"
            placeholder="请输入真实姓名"
          />
          <text v-else class="info-value">{{ userInfo.real_name || '未设置' }}</text>
        </view>

        <!-- 性别 -->
        <view class="info-item">
          <text class="info-label">性别</text>
          <picker
            v-if="isEditing"
            :value="editForm.gender"
            :range="genderOptions"
            @change="onGenderChange"
          >
            <view class="info-picker">
              <text class="picker-text">{{ genderOptions[editForm.gender] }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ getGenderText(userInfo.gender) }}</text>
        </view>

        <!-- 出生日期 -->
        <view class="info-item">
          <text class="info-label">出生日期</text>
          <picker
            v-if="isEditing"
            mode="date"
            :value="editForm.birth_date"
            @change="(e) => (editForm.birth_date = e.detail.value)"
          >
            <view class="info-picker">
              <text class="picker-text">{{ editForm.birth_date || '请选择' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ userInfo.birth_date || '未设置' }}</text>
        </view>

        <!-- 职业 -->
        <view class="info-item">
          <text class="info-label">职业</text>
          <input
            v-if="isEditing"
            v-model="editForm.occupation"
            class="info-input"
            placeholder="请输入职业"
          />
          <text v-else class="info-value">{{ userInfo.occupation || '未设置' }}</text>
        </view>

        <!-- 学历 -->
        <view class="info-item">
          <text class="info-label">学历</text>
          <picker
            v-if="isEditing"
            :value="educationOptions.indexOf(editForm.education)"
            :range="educationOptions"
            @change="onEducationChange"
          >
            <view class="info-picker">
              <text class="picker-text">{{ editForm.education || '请选择' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ userInfo.education || '未设置' }}</text>
        </view>

        <!-- 婚姻状况 -->
        <view class="info-item">
          <text class="info-label">婚姻状况</text>
          <picker
            v-if="isEditing"
            :value="maritalOptions.indexOf(editForm.marital_status)"
            :range="maritalOptions"
            @change="onMaritalChange"
          >
            <view class="info-picker">
              <text class="picker-text">{{ editForm.marital_status || '请选择' }}</text>
              <text class="picker-arrow">></text>
            </view>
          </picker>
          <text v-else class="info-value">{{ userInfo.marital_status || '未设置' }}</text>
        </view>

        <!-- 手机号 -->
        <view class="info-item">
          <text class="info-label">手机号</text>
          <input
            v-if="isEditing"
            v-model="editForm.mobile"
            class="info-input"
            type="number"
            placeholder="请输入手机号"
          />
          <text v-else class="info-value">{{ userInfo.mobile || '未设置' }}</text>
        </view>

        <!-- 所在地 -->
        <view class="info-item">
          <text class="info-label">所在地</text>
          <input
            v-if="isEditing"
            v-model="editForm.location"
            class="info-input"
            placeholder="请输入所在地"
          />
          <text v-else class="info-value">{{ userInfo.location || '未设置' }}</text>
        </view>
      </view>

      <!-- 编辑模式按钮 -->
      <view v-if="isEditing" class="edit-actions">
        <view class="cancel-btn" @click="cancelEdit">
          <text class="btn-text">取消</text>
        </view>
        <view class="save-btn" @click="saveInfo">
          <text class="btn-text">保存</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="action-section">
      <view class="action-item" @click="handleLogout">
        <text class="action-icon">🚪</text>
        <text class="action-text">退出登录</text>
        <text class="action-arrow">></text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
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
    border-radius: 40rpx;
    padding: 12rpx 28rpx;
    font-size: 26rpx;

    .edit-icon {
      font-size: 28rpx;
    }
  }
}

.loading-container {
  padding: 60rpx 0;
  text-align: center;

  .loading-text {
    font-size: 28rpx;
    color: #999;
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
      width: 180rpx;
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
    border-radius: 48rpx;
    padding: 28rpx;
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
  }

  .cancel-btn {
    background: #f0f0f0;

    .btn-text {
      color: #666;
    }
  }

  .save-btn {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);

    .btn-text {
      color: white;
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
