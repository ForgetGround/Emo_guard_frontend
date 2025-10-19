<template>
	<view class="adl-container">
		<view class="test-header">
			<text class="test-title">ADL日常生活活动能力量表</text>
			<text class="test-subtitle">评估您的日常生活自理能力</text>
		</view>
		
		<!-- 进度条 -->
		<view class="progress-container">
			<view class="progress-bar">
				<view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
			</view>
			<text class="progress-text">{{ currentQuestion + 1 }} / {{ questions.length }}</text>
		</view>
		
		<!-- 问题卡片 -->
		<view class="question-card">
			<text class="question-number">第{{ currentQuestion + 1 }}题</text>
			<text class="question-text">{{ currentQuestionData.question }}</text>
			
			<!-- 选项列表 -->
			<view class="options-list">
				<view 
					v-for="(option, index) in currentQuestionData.options" 
					:key="index"
					class="option-item"
					:class="{ active: selectedAnswer === index }"
					@click="selectAnswer(index)">
					<view class="option-radio">
						<view v-if="selectedAnswer === index" class="radio-checked"></view>
					</view>
					<text class="option-text">{{ option.text }}</text>
				</view>
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view class="action-buttons">
			<button 
				v-if="currentQuestion > 0" 
				class="prev-btn" 
				@click="prevQuestion">
				上一题
			</button>
			<button 
				class="next-btn primary" 
				:disabled="selectedAnswer === null"
				:class="{ 'complete-btn': isLastQuestion }"
				@click="nextQuestion">
				{{ isLastQuestion ? '完成测试' : '下一题' }}
			</button>
		</view>
		
		<!-- 测试说明 -->
		<view class="test-instruction">
			<text class="instruction-text">请根据您的实际情况如实回答</text>
		</view>
		
		<!-- 调试按钮（仅开发环境显示） -->
		<!-- #ifdef APP-PLUS || H5 -->
		<view class="debug-btn" @click="fillMockData">
			<text class="debug-icon">🐛</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentQuestion: 0,
			selectedAnswer: null,
			answers: [],
			questions: [
				{
					question: '自己搭公共汽车',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '到家附近的地方去（步行范围）',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '自己做饭（包括生火）',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '做家务',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '吃药',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '吃饭',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '穿脱衣服',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '梳头、刷牙等',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '洗自己的衣服',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '在平坦的室内走动',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '上下楼梯',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '上下床、坐下或站起',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '提水煮饭或洗澡',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '洗澡（水已放好）',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '剪脚趾甲',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '逛街，购物',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '定时去厕所',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '打电话',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '处理自己的钱财',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				},
				{
					question: '独自在家',
					options: [
						{ text: '自己可以做', score: 1 },
						{ text: '有些困难', score: 2 },
						{ text: '需要帮助', score: 3 },
						{ text: '根本没法做', score: 4 }
					]
				}
			]
		}
	},
	computed: {
		currentQuestionData() {
			return this.questions[this.currentQuestion] || {}
		},
		progressPercent() {
			return ((this.currentQuestion + 1) / this.questions.length) * 100
		},
		isLastQuestion() {
			return this.currentQuestion === this.questions.length - 1
		}
	},
	onLoad() {
		this.answers = new Array(this.questions.length).fill(null)
	},
	methods: {
		// 调试功能：自动填充模拟数据
		fillMockData() {
			uni.showModal({
				title: '调试功能',
				content: '是否自动填充模拟数据并完成测试？',
				success: (res) => {
					if (res.confirm) {
						// 随机填充答案（模拟正常场景：总分≤26）
						this.answers = this.questions.map(() => {
							// 80%选"自己可以做"，15%选"有些困难"，5%选"需要帮助"
							const rand = Math.random()
							if (rand < 0.8) return 0 // 自己可以做
							else if (rand < 0.95) return 1 // 有些困难
							else return 2 // 需要帮助
						})
						
						// 跳到最后一题
						this.currentQuestion = this.questions.length - 1
						this.selectedAnswer = this.answers[this.currentQuestion]
						
						uni.showToast({
							title: '已填充模拟数据',
							icon: 'success'
						})
					}
				}
			})
		},
		selectAnswer(index) {
			this.selectedAnswer = index
		},
		prevQuestion() {
			if (this.currentQuestion > 0) {
				this.answers[this.currentQuestion] = this.selectedAnswer
				this.currentQuestion--
				this.selectedAnswer = this.answers[this.currentQuestion]
			}
		},
		nextQuestion() {
			if (this.selectedAnswer === null) return
			
			this.answers[this.currentQuestion] = this.selectedAnswer
			
			if (this.isLastQuestion) {
				this.completeTest()
			} else {
				this.currentQuestion++
				this.selectedAnswer = this.answers[this.currentQuestion]
			}
		},
		async completeTest() {
			const totalScore = this.calculateScore()
			const level = this.getLevel(totalScore)
			
			console.log('ADL测试完成', {
				score: totalScore,
				level: level,
				answers: this.answers
			})
			
			try {
				uni.showLoading({
					title: '保存测评结果...'
				})

				// 保存测评结果到云端
				await this.saveTestResult(totalScore, level)

				uni.hideLoading()

				uni.showModal({
					title: 'ADL测试完成',
					content: `总分：${totalScore}分\n评估结果：${level}\n\n将继续进入情绪评估`,
					success: () => {
						// 跳转到PHQ-9问卷
						uni.navigateTo({
							url: '/pages/test/phq9-test'
						})
					}
				})
			} catch (error) {
				uni.hideLoading()
				console.error('保存测评结果失败:', error)

				uni.showModal({
					title: 'ADL测试完成',
					content: `总分：${totalScore}分\n评估结果：${level}\n\n注意：测评结果保存失败，请联系客服`,
					success: () => {
						uni.navigateTo({
							url: '/pages/test/phq9-test'
						})
					}
				})
			}
		},
		async saveTestResult(score, level) {
			try {
				// 获取用户信息
				const userInfo = uni.getStorageSync('userInfo') || {}
				console.log('保存ADL结果，用户信息:', userInfo)
				
				// 先尝试云端保存
				try {
					const assessmentService = uniCloud.importObject('assessment-service')

					// 确保获取到正确的用户ID
					const userId = userInfo.uid || userInfo.user_id
					if (!userId) {
						throw new Error('用户ID不存在，请重新登录')
					}
					
					const assessmentData = {
						userId: userId,
						score: score,
						level: level,
						answers: this.answers,
						questions: this.questions.map(q => ({
							question: q.question,
							options: q.options
						})),
						completedAt: new Date().toISOString()
					}

					console.log('发送到云端的ADL数据:', assessmentData)

					const result = await assessmentService.saveADLResult(assessmentData)

					if (result.code === 0) {
						console.log('云端保存成功:', result)
						return result
					} else {
						throw new Error(result.message || '云端保存失败')
					}
				} catch (cloudError) {
					console.log('云端保存失败，使用本地保存:', cloudError)
					
					// 云端保存失败，使用本地保存
					const localResult = {
						score: score,
						level: level,
						answers: this.answers,
						completedAt: new Date().toISOString(),
						type: 'ADL',
						userInfo: userInfo,
						cloudError: cloudError.message
					}

					let localResults = uni.getStorageSync('localTestResults') || []
					localResults.push(localResult)
					uni.setStorageSync('localTestResults', localResults)

					console.log('本地保存成功:', localResult)
					return { code: 0, message: '本地保存成功（云端保存失败）', data: localResult }
				}

			} catch (error) {
				console.error('保存测评结果失败:', error)
				throw error
			}
		},
		calculateScore() {
			let score = 0
			for (let i = 0; i < this.answers.length; i++) {
				const answerIndex = this.answers[i]
				if (answerIndex !== null) {
					score += this.questions[i].options[answerIndex].score
				}
			}
			return score
		},
		getLevel(score) {
			// ADL判定标准：总分≤26分为完全正常
			if (score <= 26) {
				return '完全正常'
			} else if (score <= 40) {
				return '轻度功能障碍'
			} else if (score <= 60) {
				return '中度功能障碍'
			} else {
				return '重度功能障碍'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.adl-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
	padding: 16px;
}

.test-header {
	text-align: center;
	margin-bottom: 20px;
	
	.test-title {
		display: block;
		font-size: 20px;
		font-weight: 600;
		color: #333;
		margin-bottom: 4px;
	}
	
	.test-subtitle {
		font-size: 13px;
		color: #666;
	}
}

.progress-container {
	margin-bottom: 20px;
	
	.progress-bar {
		height: 4px;
		background: #e0e0e0;
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 8px;
		
		.progress-fill {
			height: 100%;
			background: #ff9800;
			transition: width 0.3s ease;
		}
	}
	
	.progress-text {
		text-align: center;
		font-size: 12px;
		color: #666;
		display: block;
	}
}

.question-card {
	background: white;
	border-radius: 12px;
	padding: 20px;
	margin-bottom: 20px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
	
	.question-number {
		display: block;
		font-size: 12px;
		color: #ff9800;
		font-weight: 600;
		margin-bottom: 8px;
	}
	
	.question-text {
		display: block;
		font-size: 16px;
		color: #333;
		font-weight: 500;
		line-height: 1.5;
		margin-bottom: 20px;
	}
}

.options-list {
	.option-item {
		display: flex;
		align-items: center;
		padding: 12px;
		border-radius: 8px;
		margin-bottom: 8px;
		border: 1px solid #e0e0e0;
		transition: all 0.2s ease;
		
		&.active {
			border-color: #ff9800;
			background: rgba(255, 152, 0, 0.05);
		}
		
		.option-radio {
			width: 20px;
			height: 20px;
			border: 2px solid #e0e0e0;
			border-radius: 50%;
			margin-right: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.radio-checked {
				width: 10px;
				height: 10px;
				background: #ff9800;
				border-radius: 50%;
			}
		}
		
		&.active .option-radio {
			border-color: #ff9800;
		}
		
		.option-text {
			flex: 1;
			font-size: 14px;
			color: #333;
		}
	}
}

.action-buttons {
	display: flex;
	gap: 12px;
	margin-bottom: 20px;
	
	.prev-btn, .next-btn {
		flex: 1;
		border: none;
		border-radius: 8px;
		padding: 12px;
		font-size: 14px;
		font-weight: 500;
	}
	
	.prev-btn {
		background: #f3f3f3;
		color: #666;
	}
	
	.next-btn {
		&.primary {
			background: #ff9800;
			color: white;
			
			&:disabled {
				background: #f3f3f3;
				color: #999;
			}
			
			&.complete-btn {
				background: #00a870;
				font-weight: 600;
			}
		}
	}
}

.test-instruction {
	background: rgba(255, 152, 0, 0.05);
	border-radius: 8px;
	padding: 12px;
	text-align: center;
	
	.instruction-text {
		font-size: 12px;
		color: #666;
	}
}

// 调试按钮样式
.debug-btn {
	position: fixed;
	right: 20px;
	bottom: 100px;
	width: 50px;
	height: 50px;
	background: #ff4444;
	border-radius: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 12px rgba(255, 68, 68, 0.4);
	z-index: 9999;
	
	.debug-icon {
		font-size: 24px;
	}
}
</style>


