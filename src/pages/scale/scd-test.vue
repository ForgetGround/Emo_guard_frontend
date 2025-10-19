<template>
	<view class="scd-container">
		<view class="test-header">
			<text class="test-title">SCD主观认知下降量表</text>
			<text class="test-subtitle">评估您的主观认知功能变化</text>
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
				@click="nextQuestion">
				{{ isLastQuestion ? '完成测试' : '下一题' }}
			</button>
		</view>
		
		<!-- 测试说明 -->
		<view class="test-instruction">
			<text class="instruction-text">请根据您最近的感受如实回答以下问题</text>
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
					question: '你认为自己有记忆问题吗？',
					options: [
						{ text: '是', score: 1 },
						{ text: '否', score: 0 }
					]
				},
				{
					question: '你回忆3-5天前的对话有困难吗？',
					options: [
						{ text: '是', score: 1 },
						{ text: '否', score: 0 }
					]
				},
				{
					question: '你觉得自己近两年有记忆问题吗？',
					options: [
						{ text: '是', score: 1 },
						{ text: '否', score: 0 }
					]
				},
				{
					question: '下列问题经常发生吗：忘记对个人来说重要的日期（如生日等）',
					options: [
						{ text: '经常', score: 1 },
						{ text: '偶尔', score: 0.5 },
						{ text: '从未', score: 0 }
					]
				},
				{
					question: '下列问题经常发生吗：忘记常用号码（手机号、身份证号等）',
					options: [
						{ text: '经常', score: 1 },
						{ text: '偶尔', score: 0.5 },
						{ text: '从未', score: 0 }
					]
				},
				{
					question: '总的来说，你是否认为自己对要做的事或要说的话容易忘记？',
					options: [
						{ text: '是', score: 1 },
						{ text: '否', score: 0 }
					]
				},
				{
					question: '下列问题经常发生吗：到了商店忘记要买什么？',
					options: [
						{ text: '经常', score: 1 },
						{ text: '偶尔', score: 0.5 },
						{ text: '从未', score: 0 }
					]
				},
				{
					question: '你认为自己的记忆力比5年前要差吗？',
					options: [
						{ text: '是', score: 1 },
						{ text: '否', score: 0 }
					]
				},
				{
					question: '你认为自己越来越记不住东西放哪儿了吗？',
					options: [
						{ text: '是', score: 1 },
						{ text: '否', score: 0 }
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
						// 随机填充答案（模拟高分场景：SCD > 5）
						this.answers = this.questions.map((q, index) => {
							if (q.options.length === 2) {
								// 是/否题，80%选"是"
								return Math.random() > 0.2 ? 0 : 1
							} else {
								// 经常/偶尔/从未题，40%经常，40%偶尔，20%从未
								const rand = Math.random()
								if (rand < 0.4) return 0 // 经常
								else if (rand < 0.8) return 1 // 偶尔
								else return 2 // 从未
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
			
			console.log('SCD测试完成', {
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

				// 使用流程控制模块获取下一个问卷
				const QuestionnaireFlowModule = require('./questionnaire-flow.js').default
				const nextQuestionnaire = QuestionnaireFlowModule.getNextQuestionnaire('SCD-Q9', totalScore)
				console.log('SCD完成，分数:', totalScore, '下一个问卷:', nextQuestionnaire)
				
				// 保存SCD分数供后续使用
				uni.setStorageSync('lastSCDScore', totalScore)
				
				// 根据SCD结果决定下一步流程
				if (totalScore > 5) {
					// SCD>5分，需要继续做MMSE和MoCA
					uni.showModal({
						title: 'SCD测试完成',
						content: `总分：${totalScore}分\n评估结果：${level}\n\n需要继续认知评估，将进入下一个测评`,
						confirmText: '继续',
						success: () => {
							if (nextQuestionnaire) {
								uni.navigateTo({
									url: nextQuestionnaire
								})
							}
						}
					})
				} else {
					// SCD≤5分，暂时判断为正常，可以进入其他问卷
					uni.showModal({
						title: 'SCD测试完成',
						content: `总分：${totalScore}分\n评估结果：${level}\n\n认知功能正常，将继续其他评估`,
						confirmText: '继续',
						success: () => {
							if (nextQuestionnaire) {
								uni.navigateTo({
									url: nextQuestionnaire
								})
							}
						}
					})
				}
			} catch (error) {
				uni.hideLoading()
				console.error('保存测评结果失败:', error)

				uni.showModal({
					title: 'SCD测试完成',
					content: `总分：${totalScore}分\n评估结果：${level}\n\n注意：测评结果保存失败，请联系客服`,
					success: () => {
						uni.navigateBack()
					}
				})
			}
		},
		async saveTestResult(score, level) {
			try {
				// 获取用户信息
				const userInfo = uni.getStorageSync('userInfo') || {}
				console.log('保存SCD结果，用户信息:', userInfo)
				
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

					console.log('发送到云端的SCD数据:', assessmentData)

					const result = await assessmentService.saveSCDResult(assessmentData)

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
						type: 'SCD-Q9',
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
			// SCD-Q9判定标准：总分>5分→继续做MMSE和MoCA，总分≤5分→暂时判断为正常
			if (score > 5) {
				return '需要进一步认知评估'
			} else {
				return '正常'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.scd-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%);
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
			background: #2e7d32;
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
		color: #2e7d32;
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
			border-color: #2e7d32;
			background: rgba(46, 125, 50, 0.05);
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
				background: #2e7d32;
				border-radius: 50%;
			}
		}
		
		&.active .option-radio {
			border-color: #2e7d32;
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
			background: #2e7d32;
			color: white;
			
			&:disabled {
				background: #f3f3f3;
				color: #999;
			}
		}
	}
}

.test-instruction {
	background: rgba(46, 125, 50, 0.05);
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
