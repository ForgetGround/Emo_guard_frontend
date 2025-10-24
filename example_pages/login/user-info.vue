<route lang="json5">
{
  style: {
    navigationBarTitleText: '完善个人信息',
  },
}
</route>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

const userInfo = ref({
  name: '',
  gender: '',
  age: '',
  job: '',
  education: '',
  location: '',
})

const genderIndex = ref(-1)
const genderOptions = ['男', '女']
const jobIndex = ref(-1)
const jobOptions = ['干部', '工人', '农民', '军人', '自由职业', '无职业（退休、家庭妇女等）']
const educationIndex = ref(-1)
const educationOptions = ['文盲', '小学', '初中', '高中/中专', '大专', '本科及以上']

const isInfoValid = computed(() => {
  return userInfo.value.name
    && genderIndex.value >= 0
    && userInfo.value.age
    && jobIndex.value >= 0
    && educationIndex.value >= 0
    && userInfo.value.location
})

onMounted(() => {
  // 检查是否已经同意知情同意书
  const hasConsent = uni.getStorageSync('hasConsent')
  if (!hasConsent) {
    uni.showModal({
      title: '提示',
      content: '请先阅读并同意知情同意书',
      showCancel: false,
      success: () => {
        uni.redirectTo({
          url: '/pages/login/consent-form',
        })
      },
    })
    return
  }

  // 尝试加载已保存的用户信息（如果有）
  const savedUserInfo = uni.getStorageSync('userInfo')
  if (savedUserInfo) {
    userInfo.value.name = savedUserInfo.name || savedUserInfo.real_name || ''
    userInfo.value.age = savedUserInfo.age ? String(savedUserInfo.age) : ''
    userInfo.value.location = savedUserInfo.location || ''

    // 恢复选择器的索引
    if (savedUserInfo.gender) {
      genderIndex.value = genderOptions.indexOf(savedUserInfo.gender)
    }
    if (savedUserInfo.job || savedUserInfo.occupation) {
      jobIndex.value = jobOptions.indexOf(savedUserInfo.job || savedUserInfo.occupation)
    }
    if (savedUserInfo.education) {
      educationIndex.value = educationOptions.indexOf(savedUserInfo.education)
    }
  }
})

const onGenderChange = (e: any) => {
  genderIndex.value = e.detail.value
  userInfo.value.gender = genderOptions[genderIndex.value]
}

const onJobChange = (e: any) => {
  jobIndex.value = e.detail.value
  userInfo.value.job = jobOptions[jobIndex.value]
}

const onEducationChange = (e: any) => {
  educationIndex.value = e.detail.value
  userInfo.value.education = educationOptions[educationIndex.value]
}

const submitInfo = async () => {
  if (!isInfoValid.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
    })
    return
  }

  // 验证年龄
  const age = Number.parseInt(userInfo.value.age)
  if (age < 1 || age > 150) {
    uni.showToast({
      title: '请输入正确的年龄',
      icon: 'none',
    })
    return
  }

  try {
    uni.showLoading({
      title: '保存中...',
    })

    // 获取已有的用户信息（可能包含登录信息）
    const existingUserInfo = uni.getStorageSync('userInfo') || {}

    // 合并用户信息
    const completeUserInfo = {
      ...existingUserInfo,
      name: userInfo.value.name,
      real_name: userInfo.value.name,
      gender: userInfo.value.gender,
      age: Number.parseInt(userInfo.value.age),
      job: userInfo.value.job,
      occupation: userInfo.value.job,
      education: userInfo.value.education,
      location: userInfo.value.location,
      infoCompleted: true,
      infoCompletedAt: new Date().toISOString(),
    }

    // 保存到本地存储
    uni.setStorageSync('userInfo', completeUserInfo)

    uni.hideLoading()

    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })

    // 跳转到首次评估页面
    setTimeout(() => {
      uni.redirectTo({
        url: '/pages/scale/first-assessment',
      })
    }, 1000)
  }
  catch (error) {
    uni.hideLoading()
    console.error('保存用户信息失败:', error)
    uni.showToast({
      title: '保存失败，请重试',
      icon: 'none',
    })
  }
}
</script>

<template>
  <view class="user-info-container">
    <view class="page-header">
      <text class="page-title">完善个人信息</text>
      <text class="page-subtitle">请填写真实信息，用于测评分析</text>
    </view>

    <view class="form-container">
      <view class="form-item">
        <text class="form-label">真实姓名 *</text>
        <input
          v-model="userInfo.name"
          class="form-input"
          placeholder="请输入真实姓名"
          placeholder-class="input-placeholder"
        >
      </view>

      <view class="form-item">
        <text class="form-label">性别 *</text>
        <picker :value="genderIndex" :range="genderOptions" @change="onGenderChange">
          <view class="picker-input">
            <text :class="genderIndex >= 0 ? 'picker-text' : 'picker-placeholder'">
              {{ genderIndex >= 0 ? genderOptions[genderIndex] : '请选择性别' }}
            </text>
            <text class="picker-arrow">></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="form-label">年龄 *</text>
        <input
          v-model="userInfo.age"
          class="form-input"
          type="number"
          placeholder="请输入年龄"
          placeholder-class="input-placeholder"
          maxlength="3"
        >
      </view>

      <view class="form-item">
        <text class="form-label">职业 *</text>
        <picker :value="jobIndex" :range="jobOptions" @change="onJobChange">
          <view class="picker-input">
            <text :class="jobIndex >= 0 ? 'picker-text' : 'picker-placeholder'">
              {{ jobIndex >= 0 ? jobOptions[jobIndex] : '请选择职业' }}
            </text>
            <text class="picker-arrow">></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="form-label">学历 *</text>
        <picker :value="educationIndex" :range="educationOptions" @change="onEducationChange">
          <view class="picker-input">
            <text :class="educationIndex >= 0 ? 'picker-text' : 'picker-placeholder'">
              {{ educationIndex >= 0 ? educationOptions[educationIndex] : '请选择学历' }}
            </text>
            <text class="picker-arrow">></text>
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="form-label">所在地区 *</text>
        <input
          v-model="userInfo.location"
          class="form-input"
          placeholder="例如：浙江省杭州市"
          placeholder-class="input-placeholder"
        >
      </view>
    </view>

    <view class="form-tips">
      <text class="tip-icon">💡</text>
      <text class="tip-text">您的信息将严格保密，仅用于个性化健康分析</text>
    </view>

    <view class="button-container">
      <button class="submit-btn" :class="{ disabled: !isInfoValid }" :disabled="!isInfoValid" @click="submitInfo">
        保存并继续
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.user-info-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
	padding: 40rpx 32rpx;
}

.page-header {
	text-align: center;
	margin-bottom: 48rpx;

	.page-title {
		display: block;
		font-size: 36rpx;
		font-weight: 600;
		color: #1890ff;
		margin-bottom: 12rpx;
	}

	.page-subtitle {
		display: block;
		color: #666;
		font-size: 26rpx;
	}
}

.form-container {
	background: white;
	border-radius: 16rpx;
	padding: 32rpx;
	margin-bottom: 24rpx;
	box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);
}

.form-item {
	margin-bottom: 32rpx;

	&:last-child {
		margin-bottom: 0;
	}

	.form-label {
		display: block;
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 12rpx;
	}

	.form-input {
		width: 100%;
		padding: 20rpx;
		border: 2rpx solid #e0e0e0;
		border-radius: 12rpx;
		font-size: 28rpx;
		background: #f8f9fa;
		transition: all 0.3s;

		&:focus {
			border-color: #1890ff;
			background: white;
		}
	}

	.input-placeholder {
		color: #999;
	}

	.picker-input {
		width: 100%;
		padding: 20rpx;
		border: 2rpx solid #e0e0e0;
		border-radius: 12rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #f8f9fa;

		.picker-text {
			font-size: 28rpx;
			color: #333;
		}

		.picker-placeholder {
			font-size: 28rpx;
			color: #999;
		}

		.picker-arrow {
			color: #999;
			font-size: 28rpx;
		}
	}
}

.form-tips {
	background: rgba(255, 255, 255, 0.8);
	border-radius: 12rpx;
	padding: 20rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
	margin-bottom: 32rpx;

	.tip-icon {
		font-size: 32rpx;
	}

	.tip-text {
		flex: 1;
		font-size: 24rpx;
		color: #666;
		line-height: 1.5;
	}
}

.button-container {
	padding: 0 16rpx;
}

.submit-btn {
	width: 100%;
	border: none;
	border-radius: 16rpx;
	padding: 28rpx;
	font-size: 32rpx;
	font-weight: 500;
	background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
	color: white;
	box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.3);

	&.disabled {
		background: #f3f3f3;
		color: #999;
		box-shadow: none;
	}
}
</style>
