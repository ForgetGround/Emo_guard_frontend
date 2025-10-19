<template>
	<view class="phq9-container">
		<view class="test-header">
			<text class="test-title">PHQ-9抑郁症筛查量表</text>
			<text class="test-subtitle">评估您的情绪状态</text>
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
			<text class="question-instruction">过去两周内，您有多经常被以下问题困扰？</text>
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
			<text class="instruction-text">请根据过去两周的实际情况如实回答</text>
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
					question: '做事时提不起劲或没有兴趣。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '感到心情低落、沮丧或绝望。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '入睡困难、睡不安稳或睡眠过多。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '感觉疲倦或没有活力。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '食欲不振或吃太多。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '觉得自己很糟——或觉得自己很失败，或让自己和家人失望。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '对事物专注有困难，例如阅读报纸或看电视时。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '动作或说话速度缓慢到别人已经察觉，或正好相反——烦躁或坐立不安、动来动去的情况更胜于平常。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
					]
				},
				{
					question: '有不如死掉或用某种方式伤害自己的念头。',
					options: [
						{ text: '完全不会', score: 0 },
						{ text: '好几天', score: 1 },
						{ text: '超过一周', score: 2 },
						{ text: '几乎每天', score: 3 }
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
						// 随机填充答案（模拟轻度抑郁：5-9分）
						this.answers = this.questions.map((q, index) => {
							// 生成轻度抑郁场景的答案
							const rand = Math.random()
							if (index === 8) {
								// 第9题（自杀倾向）通常为0或1
								return rand < 0.9 ? 0 : 1
							} else {
								// 其他题：50%选0，30%选1，15%选2，5%选3
								if (rand < 0.5) return 0
								else if (rand < 0.8) return 1
								else if (rand < 0.95) return 2
								else return 3
							}
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
			
			console.log('PHQ-9测试完成', {
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

				// 检查是否有严重的自杀倾向（第9题分数）
				const suicideRiskScore = this.questions[8].options[this.answers[8]].score
				if (suicideRiskScore >= 2) {
					uni.showModal({
						title: 'PHQ-9测试完成',
						content: `总分：${totalScore}分\n评估结果：${level}\n\n⚠️ 检测到您可能存在自我伤害倾向，请及时寻求专业帮助！\n\n将继续进入焦虑评估`,
						confirmText: '知道了',
						success: () => {
							uni.navigateTo({
								url: '/pages/test/gad7-test'
							})
						}
					})
				} else {
					uni.showModal({
						title: 'PHQ-9测试完成',
						content: `总分：${totalScore}分\n评估结果：${level}\n\n将继续进入焦虑评估`,
						success: () => {
							uni.navigateTo({
								url: '/pages/test/gad7-test'
							})
						}
					})
				}
			} catch (error) {
				uni.hideLoading()
				console.error('保存测评结果失败:', error)

				uni.showModal({
					title: 'PHQ-9测试完成',
					content: `总分：${totalScore}分\n评估结果：${level}\n\n注意：测评结果保存失败，请联系客服`,
					success: () => {
						uni.navigateTo({
							url: '/pages/test/gad7-test'
						})
					}
				})
			}
		},
		async saveTestResult(score, level) {
			try {
				// 获取用户信息
				const userInfo = uni.getStorageSync('userInfo') || {}
				console.log('保存PHQ-9结果，用户信息:', userInfo)
				
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
						suicideRisk: this.questions[8].options[this.answers[8]].score >= 2,
						completedAt: new Date().toISOString()
					}

					console.log('发送到云端的PHQ-9数据:', assessmentData)

					const result = await assessmentService.savePHQ9Result(assessmentData)

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
						type: 'PHQ-9',
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
			// PHQ-9判定标准
			// 无抑郁（0-4分）、轻度（5-9分）、中度（10-14分）、中重度（15-19分）、重度（20-27分）
			if (score <= 4) {
				return '无抑郁'
			} else if (score <= 9) {
				return '轻度抑郁'
			} else if (score <= 14) {
				return '中度抑郁'
			} else if (score <= 19) {
				return '中重度抑郁'
			} else {
				return '重度抑郁'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.phq9-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
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
			background: #e91e63;
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
		color: #e91e63;
		font-weight: 600;
		margin-bottom: 8px;
	}
	
	.question-instruction {
		display: block;
		font-size: 13px;
		color: #888;
		margin-bottom: 12px;
		line-height: 1.5;
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
			border-color: #e91e63;
			background: rgba(233, 30, 99, 0.05);
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
				background: #e91e63;
				border-radius: 50%;
			}
		}
		
		&.active .option-radio {
			border-color: #e91e63;
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
			background: #e91e63;
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
	background: rgba(233, 30, 99, 0.05);
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


