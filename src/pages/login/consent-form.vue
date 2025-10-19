<template>
	<view class="consent-container">
		<view class="consent-header">
			<text class="consent-title">知情同意书</text>
			<text class="consent-subtitle">认知情绪守护</text>
		</view>
		
		<scroll-view class="consent-content" scroll-y="true">
			<view class="content-section">
				<text class="section-title">一、评估目的</text>
				<text class="section-text">本认知健康评估旨在通过科学的量表测试，帮助您了解自身的认知功能状态、情绪健康水平和日常生活能力，为您提供个性化的健康建议和干预方案。</text>
			</view>
			
			<view class="content-section">
				<text class="section-title">二、评估内容</text>
				<text class="section-text">评估包括以下几个方面：</text>
				<text class="list-item">• SCD主观认知下降量表</text>
				<text class="list-item">• ADL日常生活能力量表</text>
				<text class="list-item">• PHQ-9抑郁症筛查量表</text>
				<text class="list-item">• GAD-7焦虑症筛查量表</text>
			</view>
			
			<view class="content-section">
				<text class="section-title">三、评估流程</text>
				<text class="section-text">1. 首次评估：完成全套量表测试，建立个人健康档案</text>
				<text class="section-text">2. 日常筛查：每日完成情绪测试（早间和晚间各一次）</text>
				<text class="section-text">3. 定期评估：根据筛查结果，定期进行认知功能复测</text>
				<text class="section-text">4. 报告生成：AI自动生成个性化健康报告和建议</text>
			</view>
			
			<view class="content-section">
				<text class="section-title">四、数据使用</text>
				<text class="section-text">您的测评数据将用于：</text>
				<text class="list-item">• 生成个人健康报告</text>
				<text class="list-item">• 提供个性化健康建议</text>
				<text class="list-item">• 跟踪健康状态变化趋势</text>
				<text class="list-item">• 科学研究（匿名化处理）</text>
			</view>
			
			<view class="content-section">
				<text class="section-title">五、隐私保护</text>
				<text class="section-text">我们承诺：</text>
				<text class="list-item">• 严格保护您的个人隐私信息</text>
				<text class="list-item">• 数据传输和存储采用加密技术</text>
				<text class="list-item">• 不会向第三方泄露您的个人信息</text>
				<text class="list-item">• 您有权随时查看、修改或删除个人数据</text>
			</view>
			
			<view class="content-section">
				<text class="section-title">六、注意事项</text>
				<text class="section-text">• 请在安静、无干扰的环境中进行测试</text>
				<text class="section-text">• 请如实回答所有问题</text>
				<text class="section-text">• 测试结果仅供参考，不能替代专业医学诊断</text>
				<text class="section-text">• 如有异常结果，建议及时就医</text>
			</view>
			
			<view class="content-section">
				<text class="section-title">七、联系方式</text>
				<text class="section-text">如有疑问，请联系：</text>
				<text class="contact-info">电话：19858163283</text>
				<text class="contact-info">或通过个人中心的反馈功能与我们联系</text>
			</view>
		</scroll-view>
		
		<view class="consent-footer">
			<view class="agreement-check">
				<checkbox-group @change="onAgreeChange">
					<label class="agreement-label">
						<checkbox value="agree" :checked="hasAgreed" color="#1890ff" />
						<text class="agreement-text">我已仔细阅读并完全理解上述内容，同意参与认知健康评估</text>
					</label>
				</checkbox-group>
			</view>
			
			<view class="footer-buttons">
				<button class="cancel-btn" @click="goBack">取消</button>
				<button class="confirm-btn" :class="{ disabled: !hasAgreed }" :disabled="!hasAgreed" @click="confirmConsent">确认同意</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hasAgreed: false
		}
	},
	methods: {
		onAgreeChange(e) {
			this.hasAgreed = e.detail.value.includes('agree')
		},
		goBack() {
			uni.navigateBack()
		},
		confirmConsent() {
			if (this.hasAgreed) {
				// 保存同意状态到本地
				uni.setStorageSync('hasConsent', true)
				
				uni.showToast({
					title: '感谢您的同意',
					icon: 'success'
				})
				
				// 跳转到个人信息填写页面
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/user-info'
					})
				}, 1000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.consent-container {
	height: 100vh;
	background: white;
	display: flex;
	flex-direction: column;
}

.consent-header {
	background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
	padding: 30rpx 32rpx;
	text-align: center;
	
	.consent-title {
		display: block;
		color: white;
		font-size: 40rpx;
		font-weight: 600;
		margin-bottom: 8rpx;
	}
	
	.consent-subtitle {
		display: block;
		color: rgba(255, 255, 255, 0.9);
		font-size: 28rpx;
	}
}

.consent-content {
	flex: 1;
	padding: 32rpx;
}

.content-section {
	margin-bottom: 40rpx;
	
	.section-title {
		display: block;
		font-size: 32rpx;
		font-weight: 600;
		color: #1890ff;
		margin-bottom: 16rpx;
	}
	
	.section-text {
		display: block;
		font-size: 28rpx;
		color: #333;
		line-height: 1.6;
		margin-bottom: 16rpx;
	}
	
	.list-item {
		display: block;
		font-size: 28rpx;
		color: #555;
		line-height: 1.6;
		margin-bottom: 8rpx;
		padding-left: 16rpx;
	}
	
	.contact-info {
		display: block;
		font-size: 28rpx;
		color: #1890ff;
		margin-bottom: 8rpx;
		font-weight: 500;
	}
}

.consent-footer {
	background: #f8f9fa;
	padding: 32rpx;
	border-top: 1px solid #e0e0e0;
	box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.05);
}

.agreement-check {
	margin-bottom: 32rpx;
	
	.agreement-label {
		display: flex;
		align-items: flex-start;
		gap: 16rpx;
		width: 100%;
	}

	.agreement-text {
		font-size: 26rpx;
		color: #333;
		line-height: 1.6;
		flex: 1;
		word-wrap: break-word;
		word-break: break-all;
		white-space: normal;
	}
}

.footer-buttons {
	display: flex;
	gap: 24rpx;
	
	.cancel-btn, .confirm-btn {
		flex: 1;
		border: none;
		border-radius: 16rpx;
		padding: 24rpx;
		font-size: 28rpx;
		font-weight: 500;
	}
	
	.cancel-btn {
		background: #f3f3f3;
		color: #666;
	}
	
	.confirm-btn {
		background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
		color: white;
		
		&.disabled {
			background: #f3f3f3;
			color: #999;
		}
	}
}
</style>

