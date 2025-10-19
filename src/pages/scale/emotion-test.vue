<template>
	<view class="test-container">
		<view class="test-header">
			<text class="test-title">情绪状态评估</text>
			<text class="test-subtitle">请根据过去几个小时的真实感受回答</text>
		</view>
		
		<!-- 进度条 -->
		<view class="progress-container">
			<view class="progress-bar">
				<view class="progress-fill" :style="{ width: progressPercent + '%' }"></view>
			</view>
			<text class="progress-text">{{ currentQuestion + 1 }} / {{ totalQuestions }}</text>
		</view>
		
		<!-- 问题卡片 -->
		<view class="question-card">
			<text class="question-number">第{{ currentQuestion + 1 }}题</text>
			<text class="question-text">{{ currentQuestionData.question }}</text>
			
			<!-- Likert量表选项 -->
			<view v-if="currentQuestionData.type === 'likert'" class="options-list">
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
			
			<!-- 滑动条选项 -->
			<view v-else-if="currentQuestionData.type === 'slider'" class="slider-container">
				<view class="slider-labels">
					<text class="slider-label">完全没有</text>
					<text class="slider-label">非常严重</text>
				</view>
				<slider 
					:value="sliderValue" 
					:min="0" 
					:max="10" 
					:step="1"
					@change="onSliderChange"
					class="slider"
					activeColor="#2196f3"
					backgroundColor="#e0e0e0"
				/>
				<view class="slider-value">
					<text class="value-text">当前分值: {{ sliderValue }}</text>
				</view>
				<button class="confirm-btn" :class="{ confirmed: sliderConfirmed }" @click="confirmSlider">确认</button>
			</view>
			
			<!-- 分层评分选项 -->
			<view v-else-if="currentQuestionData.type === 'custom'" class="options-list">
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
				:disabled="!canProceed"
				@click="nextQuestion">
				{{ isLastQuestion ? '完成测试' : '下一题' }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			testType: 'morning', // morning/evening
			startTimeISO: '',
			currentQuestion: 0,
			selectedAnswer: null,
			sliderValue: 5,
			sliderConfirmed: false,
			answers: [],
			questions: [
				{
					question: "在过去的几个小时里，您是否觉得心情低落，或者对平常喜欢做的事情提不起兴趣？",
					type: "likert",
					options: [
						{ text: "😃 没有", score: 0 },
						{ text: "🙂 轻微", score: 1 },
						{ text: "😐 中等", score: 2 },
						{ text: "😞 很严重", score: 3 }
					]
				},
				{
					question: "在过去的几个小时里，您是否感到紧张、焦虑，或者坐立不安？",
					type: "slider",
					options: [
						{ text: "完全没有", score: 0 },
						{ text: "非常严重", score: 10 }
					]
				},
				{
					question: "在过去的几个小时里，您是否觉得没有精力，容易感到疲劳？",
					type: "likert",
					options: [
						{ text: "💪 没有", score: 0 },
						{ text: "🙂 有一点", score: 1 },
						{ text: "😔 明显", score: 2 },
						{ text: "😫 非常严重", score: 3 }
					]
				},
				{
					question: "请回顾今天（或昨晚），您的睡眠情况如何？",
					type: "custom",
					options: [
						{ text: "🌙 非常好", score: 0 },
						{ text: "😊 比较好", score: 1 },
						{ text: "😐 一般", score: 2 },
						{ text: "😟 不太好", score: 3 },
						{ text: "😴 很差", score: 4 }
					]
				}
			]
		}
	},
	onLoad(query) {
		// 读取来源（早/晚）与开始时间
		if (query) {
			if (query.type) this.testType = query.type
			if (query.testTime) this.startTimeISO = query.testTime
		}
		if (!this.startTimeISO) {
			this.startTimeISO = new Date().toISOString()
		}
	},
	computed: {
		currentQuestionData() {
			return this.questions[this.currentQuestion]
		},
		totalQuestions() {
			return this.questions.length
		},
		progressPercent() {
			return ((this.currentQuestion + 1) / this.totalQuestions) * 100
		},
		isLastQuestion() {
			return this.currentQuestion === this.totalQuestions - 1
		},
		canProceed() {
			if (this.currentQuestionData.type === 'slider') {
				return this.sliderValue !== null && this.sliderConfirmed
			}
			return this.selectedAnswer !== null
		}
	},
	methods: {
		selectAnswer(index) {
			this.selectedAnswer = index
		},
		
		onSliderChange(e) {
			this.sliderValue = e.detail.value
			this.sliderConfirmed = false
		},
		
		confirmSlider() {
			this.selectedAnswer = this.sliderValue
			this.sliderConfirmed = true
		},
		
		nextQuestion() {
			// 保存当前答案
			this.saveCurrentAnswer()
			
			if (this.isLastQuestion) {
				this.completeTest()
			} else {
				this.currentQuestion++
				this.resetCurrentAnswer()
			}
		},
		
		prevQuestion() {
			if (this.currentQuestion > 0) {
				this.currentQuestion--
				this.loadCurrentAnswer()
			}
		},
		
		saveCurrentAnswer() {
			let score = 0
			
			if (this.currentQuestionData.type === 'slider') {
				score = this.sliderValue
			} else {
				score = this.currentQuestionData.options[this.selectedAnswer]?.score || 0
			}
			
			this.answers[this.currentQuestion] = {
				questionIndex: this.currentQuestion,
				answer: this.selectedAnswer,
				score: score,
				questionType: this.currentQuestionData.type,
				question: this.currentQuestionData.question
			}
		},
		
		loadCurrentAnswer() {
			const savedAnswer = this.answers[this.currentQuestion]
			if (savedAnswer) {
				this.selectedAnswer = savedAnswer.answer
				if (this.currentQuestionData.type === 'slider') {
					this.sliderValue = savedAnswer.score
				}
			} else {
				this.resetCurrentAnswer()
			}
		},
		
		resetCurrentAnswer() {
			this.selectedAnswer = null
			if (this.currentQuestionData.type === 'slider') {
				this.sliderValue = 5
			}
		},
		
		async completeTest() {
			// 计算总分
			const totalScore = this.answers.reduce((sum, answer) => sum + (answer?.score || 0), 0)
			
			// 计算各项得分
			const depressionScore = this.answers[0]?.score || 0 // 心情低落
			const anxietyScore = this.answers[1]?.score || 0   // 紧张焦虑
			const fatigueScore = this.answers[2]?.score || 0   // 疲劳
			const sleepScore = this.answers[3]?.score || 0     // 睡眠
			
			// 评估结果
			const result = this.evaluateResults({
				totalScore,
				depressionScore,
				anxietyScore,
				fatigueScore,
				sleepScore
			})
			
			console.log('情绪测试完成', { 
				totalScore, 
				result, 
				answers: this.answers 
			})
			
			// 保存结果
			await this.saveTestResult(totalScore, result)
		},
		
		evaluateResults(scores) {
			const { depressionScore, anxietyScore, fatigueScore, sleepScore } = scores
			
			// 抑郁评估
			let depressionLevel = '无抑郁'
			if (depressionScore >= 3) depressionLevel = '严重抑郁'
			else if (depressionScore >= 2) depressionLevel = '中度抑郁'
			else if (depressionScore >= 1) depressionLevel = '轻度抑郁'
			
			// 焦虑评估
			let anxietyLevel = '无焦虑'
			if (anxietyScore >= 8) anxietyLevel = '严重焦虑'
			else if (anxietyScore >= 6) anxietyLevel = '中度焦虑'
			else if (anxietyScore >= 4) anxietyLevel = '轻度焦虑'
			
			// 疲劳评估
			let fatigueLevel = '无疲劳'
			if (fatigueScore >= 3) fatigueLevel = '严重疲劳'
			else if (fatigueScore >= 2) fatigueLevel = '中度疲劳'
			else if (fatigueScore >= 1) fatigueLevel = '轻度疲劳'
			
			// 睡眠评估
			let sleepLevel = '睡眠良好'
			if (sleepScore >= 4) sleepLevel = '睡眠很差'
			else if (sleepScore >= 3) sleepLevel = '睡眠不好'
			else if (sleepScore >= 2) sleepLevel = '睡眠一般'
			else if (sleepScore >= 1) sleepLevel = '睡眠较好'
			
			return {
				depressionLevel,
				anxietyLevel,
				fatigueLevel,
				sleepLevel,
				overallLevel: this.getOverallLevel(scores)
			}
		},
		
		getOverallLevel(scores) {
			const { depressionScore, anxietyScore, fatigueScore, sleepScore } = scores
			const maxScore = Math.max(depressionScore, anxietyScore, fatigueScore, sleepScore)
			
			if (maxScore >= 3) return '需要关注'
			if (maxScore >= 2) return '轻度异常'
			if (maxScore >= 1) return '基本正常'
			return '状态良好'
		},
		
		async saveTestResult(score, result) {
			try {
				const userInfo = uni.getStorageSync('userInfo') || {}
				const uid = userInfo.uid || userInfo.user_id
				
				if (!uid) {
					throw new Error('用户信息不完整')
				}
				
				const completedAtISO = new Date().toISOString()
				const startAtMs = Date.parse(this.startTimeISO)
				const completedAtMs = Date.parse(completedAtISO)
				// 生成 dateKey（与云端保持一致规则）
				const shanghaiOffsetMin = 8 * 60
				const local = new Date(completedAtMs + shanghaiOffsetMin * 60 * 1000)
				const y = local.getUTCFullYear()
				const m = String(local.getUTCMonth() + 1).padStart(2, '0')
				const d = String(local.getUTCDate()).padStart(2, '0')
				const dateKey = `${y}-${m}-${d}`
				
				const assessmentData = {
					userId: uid,
					score: score,
					level: result.overallLevel,
					answers: this.answers,
					questions: this.questions,
					detailedResults: result,
					completedAt: completedAtISO,
					startAt: this.startTimeISO,
					startAtMs,
					completedAtMs,
					dateKey,
					sessionType: this.testType // morning/evening
				}
				
				console.log('发送到云端的情绪测试数据:', assessmentData)
				
				// 调用新的云对象保存
				const svc = uniCloud.importObject('emotion-service')
				const saveResult = await svc.saveEmotionSession(assessmentData)
				
				if (saveResult.code === 0) {
					console.log('云端保存成功:', saveResult)
					this.showResult(score, result)
				} else {
					throw new Error(saveResult.message || '保存失败')
				}
			} catch (error) {
				console.error('云端保存失败，使用本地保存:', error)
				
				// 本地保存
				const localResult = {
					score: score,
					level: result.overallLevel,
					answers: this.answers,
					detailedResults: result,
					completedAt: new Date().toISOString(),
					type: 'Emotion'
				}
				
				uni.setStorageSync('emotion_result', localResult)
				console.log('本地保存成功:', localResult)
				
				this.showResult(score, result)
			}
		},
		
		showResult(score, result) {
			const content = `测试完成！

总分：${score}/20

评估结果：
• 抑郁状态：${result.depressionLevel}
• 焦虑状态：${result.anxietyLevel}
• 疲劳状态：${result.fatigueLevel}
• 睡眠质量：${result.sleepLevel}`

			uni.showModal({
				title: '情绪评估结果',
				content: content,
				showCancel: false,
				confirmText: '确定',
				success: () => {
					// 返回首页
					uni.switchTab({
						url: '/pages/home/home'
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.test-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #f0f8ff 0%, #e0f2fe 100%);
	padding: 20px 16px;
}

.test-header {
	text-align: center;
	margin-bottom: 24px;
	
	.test-title {
		display: block;
		font-size: 20px;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 8px;
	}
	
	.test-subtitle {
		font-size: 14px;
		color: #64748b;
	}
}

.progress-container {
	background: white;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 16px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	
	.progress-bar {
		width: 100%;
		height: 6px;
		background: #e2e8f0;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 8px;
		
		.progress-fill {
			height: 100%;
			background: linear-gradient(90deg, #2196f3 0%, #1976d2 100%);
			transition: width 0.3s ease;
		}
	}
	
	.progress-text {
		font-size: 12px;
		color: #64748b;
		text-align: center;
	}
}

.question-card {
	background: white;
	border-radius: 12px;
	padding: 20px;
	margin-bottom: 16px;
	box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	
	.question-number {
		display: block;
		font-size: 12px;
		color: #2196f3;
		font-weight: 600;
		margin-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}
	
	.question-text {
		display: block;
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 20px;
		line-height: 1.5;
	}
}

.options-list {
	.option-item {
		display: flex;
		align-items: center;
		padding: 12px 16px;
		margin-bottom: 8px;
		background: #f8fafc;
		border-radius: 8px;
		border: 2px solid transparent;
		transition: all 0.2s ease;
		
		&.active {
			background: #eff6ff;
			border-color: #2196f3;
		}
		
		&:active {
			transform: scale(0.98);
		}
		
		.option-radio {
			width: 20px;
			height: 20px;
			border: 2px solid #cbd5e1;
			border-radius: 50%;
			margin-right: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.radio-checked {
				width: 10px;
				height: 10px;
				background: #2196f3;
				border-radius: 50%;
			}
		}
		
		.option-text {
			flex: 1;
			font-size: 14px;
			color: #334155;
		}
	}
}

.slider-container {
	.slider-labels {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		
		.slider-label {
			font-size: 12px;
			color: #64748b;
		}
	}
	
	.slider {
		width: 100%;
		margin-bottom: 16px;
	}
	
	.slider-value {
		text-align: center;
		margin-bottom: 16px;
		
		.value-text {
			font-size: 16px;
			font-weight: 600;
			color: #2196f3;
		}
	}
	
	.confirm-btn {
		width: 100%;
		padding: 12px;
		background: #ffffff;
		color: #2196f3;
		border: none;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		
		&:active {
			transform: scale(0.98);
		}

		&.confirmed {
			background: #2196f3;
			color: #ffffff;
		}
	}
}

.action-buttons {
	display: flex;
	gap: 12px;
	
	.prev-btn {
		flex: 1;
		padding: 12px;
		background: #f8fafc;
		color: #64748b;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		
		&:active {
			transform: scale(0.98);
		}
	}
	
	.next-btn {
		flex: 2;
		padding: 12px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 600;
		border: none;
		
		&.primary {
			background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
			color: white;
			
			&:disabled {
				background: #cbd5e1;
				color: #94a3b8;
			}
		}
		
		&:active {
			transform: scale(0.98);
		}
	}
}
</style>