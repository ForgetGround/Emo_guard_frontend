<template>
  <view class="cognition-container">
    <!-- 顶部标题卡片 -->
    <view class="page-header-card">
      <text class="page-title">📊 心情数据分析</text>
      <text class="page-subtitle">了解您的情绪变化趋势 · 科学追踪心理健康</text>
    </view>

    <!-- 综合认知评估报告 -->
    <view class="comprehensive-report-section" v-if="comprehensiveReport && comprehensiveReport.hasData">
      <view class="section-header">
        <view class="section-icon">📋</view>
        <text class="section-title">综合认知评估报告</text>
      </view>

      <!-- 评估等级标签 -->
      <view class="assessment-level-card" :class="'level-' + comprehensiveReport.reportLevel">
        <text class="level-emoji">{{ comprehensiveReport.report.emoji }}</text>
        <text class="level-title">{{ comprehensiveReport.report.title }}</text>
        <text class="risk-badge" :class="'risk-' + comprehensiveReport.report.riskLevel">
          {{ getRiskText(comprehensiveReport.report.riskLevel) }}
        </text>
      </view>

      <!-- 量表评分概览 -->
      <view class="scale-scores-overview">
        <view class="scores-grid">
          <view class="score-item" v-if="comprehensiveReport.scaleResults.scd">
            <text class="score-label">SCD</text>
            <text class="score-value" :class="{'abnormal': comprehensiveReport.assessment.abnormal.scd}">
              {{ comprehensiveReport.scaleResults.scd.total_score }}
            </text>
            <text class="score-threshold">阈值: {{ comprehensiveReport.assessment.thresholds.scd }}</text>
          </view>
          <view class="score-item" v-if="comprehensiveReport.scaleResults.mmse">
            <text class="score-label">MMSE</text>
            <text class="score-value" :class="{'abnormal': comprehensiveReport.assessment.abnormal.mmse}">
              {{ comprehensiveReport.scaleResults.mmse.total_score }}
            </text>
            <text class="score-threshold">阈值: {{ comprehensiveReport.assessment.thresholds.mmse }}</text>
          </view>
          <view class="score-item" v-if="comprehensiveReport.scaleResults.moca">
            <text class="score-label">MoCA</text>
            <text class="score-value" :class="{'abnormal': comprehensiveReport.assessment.abnormal.moca}">
              {{ comprehensiveReport.scaleResults.moca.total_score }}
            </text>
            <text class="score-threshold">阈值: {{ comprehensiveReport.assessment.thresholds.moca }}</text>
          </view>
        </view>
      </view>

      <!-- 报告详细内容 -->
      <view class="report-content">
        <view 
          v-for="(section, index) in comprehensiveReport.report.sections" 
          :key="index"
          class="report-section-item"
          :class="[section.highlight ? 'highlight' : '', section.type ? 'type-' + section.type : '']">
          
          <text class="section-title">{{ section.title }}</text>
          
          <text class="section-content" v-if="section.content">{{ section.content }}</text>
          
          <!-- 详情列表 -->
          <view class="section-details" v-if="section.details && section.details.length > 0">
            <text 
              v-for="(detail, dIndex) in section.details" 
              :key="dIndex"
              class="detail-item">
              • {{ detail }}
            </text>
          </view>
          
          <!-- 建议列表 -->
          <view class="section-items" v-if="section.items && section.items.length > 0">
            <view 
              v-for="(item, iIndex) in section.items" 
              :key="iIndex"
              class="item-row">
              <text class="item-number">{{ iIndex + 1 }}</text>
              <text class="item-text">{{ item }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 生成时间 -->
      <view class="report-footer">
        <text class="footer-text">报告生成时间：{{ formatDateTime(comprehensiveReport.report.generatedAt) }}</text>
      </view>
    </view>

    <!-- 无评估数据提示 -->
    <view class="no-assessment-tip" v-if="comprehensiveReport && !comprehensiveReport.hasData">
      <text class="tip-icon">📋</text>
      <text class="tip-title">暂无认知评估数据</text>
      <text class="tip-desc">{{ comprehensiveReport.message }}</text>
      <button class="go-assessment-btn" @click="goToAssessment">前往评估</button>
    </view>

    <!-- 周选择器 -->
    <view class="week-selector">
      <view class="selector-btn" @click="changeWeek(-1)">
        <text class="btn-icon">◀</text>
      </view>
      <view class="week-info">
        <text class="week-text">{{ weekDisplay }}</text>
      </view>
      <view class="selector-btn" :class="{ disabled: weekOffset === 0 }" @click="changeWeek(1)">
        <text class="btn-icon">▶</text>
      </view>
    </view>

    <!-- 每周心情报告 -->
    <view class="report-section" v-if="weeklyReport">
      <view class="section-header">
        <view class="section-icon">📊</view>
        <text class="section-title">本周心情报告</text>
      </view>

      <!-- 报告摘要卡片 -->
      <view class="summary-cards">
        <view class="summary-card">
          <view class="card-value">{{ weeklyReport.summary.completeDays }}</view>
          <text class="card-label">完成天数</text>
          <text class="card-unit">天</text>
        </view>
        <view class="summary-card">
          <view class="card-value">{{ weeklyReport.summary.totalTests }}</view>
          <text class="card-label">测评次数</text>
          <text class="card-unit">次</text>
        </view>
        <view class="summary-card">
          <view class="card-value">{{ weeklyReport.summary.avgScore }}</view>
          <text class="card-label">平均分数</text>
          <text class="card-unit">分</text>
        </view>
        <view class="summary-card">
          <view class="card-value mood-status" :class="getMoodClass(weeklyReport.summary.overallMood)">
            {{ weeklyReport.summary.overallMood }}
          </view>
          <text class="card-label">整体状态</text>
        </view>
      </view>

      <!-- 每日详情 -->
      <view class="daily-details">
        <view class="details-header">
          <text class="details-title">每日测评详情</text>
        </view>
        <view class="day-list">
          <view 
            v-for="(day, index) in weeklyReport.dailyDetails" 
            :key="index"
            class="day-item">
            <view class="day-header">
              <text class="day-date">{{ day.date }}</text>
              <text class="day-week">{{ day.dayOfWeek }}</text>
            </view>
            <view class="day-tests">
              <view class="test-badge" :class="{ completed: day.morningCompleted }">
                <text class="badge-icon">{{ day.morningCompleted ? '✓' : '○' }}</text>
                <text class="badge-text">早间</text>
                <text class="badge-score" v-if="day.morningScore">{{ day.morningScore }}分</text>
              </view>
              <view class="test-badge" :class="{ completed: day.eveningCompleted }">
                <text class="badge-icon">{{ day.eveningCompleted ? '✓' : '○' }}</text>
                <text class="badge-text">晚间</text>
                <text class="badge-score" v-if="day.eveningScore">{{ day.eveningScore }}分</text>
              </view>
            </view>
            <view class="day-avg" v-if="day.avgScore">
              <text class="avg-label">日均:</text>
              <text class="avg-value">{{ day.avgScore }}分</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 建议 -->
      <view class="suggestions" v-if="weeklyReport.suggestions && weeklyReport.suggestions.length > 0">
        <view class="suggestions-header">
          <view class="header-icon">💡</view>
          <text class="header-text">健康建议</text>
        </view>
        <view class="suggestion-list">
          <view 
            v-for="(suggestion, index) in weeklyReport.suggestions" 
            :key="index"
            class="suggestion-item">
            <text class="suggestion-dot">•</text>
            <text class="suggestion-text">{{ suggestion }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- EMA情绪多指标趋势图 -->
    <view class="ema-trends-section" v-if="emaTrends">
      <view class="section-header">
        <view class="section-icon">📊</view>
        <text class="section-title">情绪 EMA 周报趋势（早晚对比）</text>
      </view>

      <!-- 趋势图卡片列表 -->
      <view class="trend-card" v-for="(trend, index) in emaTrends" :key="index">
        <view class="trend-header">
          <text class="trend-title">{{ trend.title }}</text>
          <text class="trend-subtitle">{{ trend.subtitle }}</text>
        </view>
        
        <!-- Canvas 图表容器 -->
        <view class="chart-canvas-container">
          <view class="chart-placeholder-text">📊 图表加载中...</view>
          <canvas 
            :canvas-id="'emaChart' + index" 
            :id="'emaChart' + index"
            class="chart-canvas"
            style="width: 100%; height: 300px;">
          </canvas>
        </view>

        <!-- 图例 -->
        <view class="chart-legend">
          <view class="legend-item">
            <view class="legend-dot morning"></view>
            <text class="legend-label">早晨</text>
          </view>
          <view class="legend-item">
            <view class="legend-dot evening"></view>
            <text class="legend-label">晚上</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 心情变化趋势图表 -->
    <view class="charts-section">
      <view class="section-header">
        <view class="section-icon">📈</view>
        <text class="section-title">心情变化趋势（近30天）</text>
      </view>

      <!-- 图表1: 每日平均情绪分数 -->
      <view class="chart-card" v-if="charts && charts.chart1_dailyAvg">
        <view class="chart-header">
          <text class="chart-title">{{ charts.chart1_dailyAvg.title }}</text>
        </view>
        <view class="chart-placeholder">
          <text class="placeholder-text">📊 图表展示区域</text>
          <text class="placeholder-desc">{{ charts.chart1_dailyAvg.title }}</text>
          <text class="placeholder-info">数据点数: {{ getValidDataCount(charts.chart1_dailyAvg.data) }}</text>
        </view>
      </view>

      <!-- 图表2: 早晚情绪对比 -->
      <view class="chart-card" v-if="charts && charts.chart2_morningEvening">
        <view class="chart-header">
          <text class="chart-title">{{ charts.chart2_morningEvening.title }}</text>
        </view>
        <view class="chart-legend">
          <view 
            v-for="(dataset, index) in charts.chart2_morningEvening.datasets" 
            :key="index"
            class="legend-item">
            <view class="legend-color" :style="{ background: dataset.color }"></view>
            <text class="legend-text">{{ dataset.label }}</text>
          </view>
        </view>
        <view class="chart-placeholder">
          <text class="placeholder-text">📊 图表展示区域</text>
          <text class="placeholder-desc">{{ charts.chart2_morningEvening.title }}</text>
          <text class="placeholder-info">
            早间: {{ getValidDataCount(charts.chart2_morningEvening.datasets[0].data) }}次 | 
            晚间: {{ getValidDataCount(charts.chart2_morningEvening.datasets[1].data) }}次
          </text>
        </view>
      </view>

      <!-- 图表3: PHQ-9 与 GAD-7 趋势 -->
      <view class="chart-card" v-if="charts && charts.chart3_phqGad">
        <view class="chart-header">
          <text class="chart-title">{{ charts.chart3_phqGad.title }}</text>
        </view>
        <view class="chart-legend">
          <view 
            v-for="(dataset, index) in charts.chart3_phqGad.datasets" 
            :key="index"
            class="legend-item">
            <view class="legend-color" :style="{ background: dataset.color }"></view>
            <text class="legend-text">{{ dataset.label }}</text>
          </view>
        </view>
        <view class="chart-placeholder">
          <text class="placeholder-text">📊 图表展示区域</text>
          <text class="placeholder-desc">{{ charts.chart3_phqGad.title }}</text>
          <text class="placeholder-info">
            PHQ-9: {{ getValidDataCount(charts.chart3_phqGad.datasets[0].data) }}次 | 
            GAD-7: {{ getValidDataCount(charts.chart3_phqGad.datasets[1].data) }}次
          </text>
        </view>
      </view>

      <!-- 图表4: 每周测试完成率 -->
      <view class="chart-card" v-if="charts && charts.chart4_completion">
        <view class="chart-header">
          <text class="chart-title">{{ charts.chart4_completion.title }}</text>
        </view>
        <view class="chart-placeholder">
          <text class="placeholder-text">📊 图表展示区域</text>
          <text class="placeholder-desc">{{ charts.chart4_completion.title }}</text>
          <text class="placeholder-info">周数: {{ charts.chart4_completion.labels.length }}</text>
        </view>
      </view>
    </view>

    <!-- 心情分析摘要 -->
    <view class="analysis-section" v-if="analysis">
      <view class="section-header">
        <view class="section-icon">🔍</view>
        <text class="section-title">智能分析</text>
      </view>

      <view class="analysis-card">
        <view class="analysis-item">
          <text class="analysis-label">总测评次数:</text>
          <text class="analysis-value">{{ analysis.totalTests }}次</text>
        </view>
        <view class="analysis-item">
          <text class="analysis-label">平均分数:</text>
          <text class="analysis-value">{{ analysis.avgScore }}分</text>
        </view>
        <view class="analysis-item">
          <text class="analysis-label">变化趋势:</text>
          <text class="analysis-value" :class="getTrendClass(analysis.trend)">{{ analysis.trend }}</text>
        </view>
      </view>

      <!-- 心情分布 -->
      <view class="mood-distribution" v-if="analysis.moodDistribution">
        <view class="distribution-title">心情分布</view>
        <view class="distribution-bars">
          <view class="bar-item">
            <view class="bar-label">😊 状态良好</view>
            <view class="bar-wrapper">
              <view class="bar-fill good" :style="{ width: getPercentage(analysis.moodDistribution.good, analysis.totalTests) }"></view>
            </view>
            <text class="bar-value">{{ analysis.moodDistribution.good }}次</text>
          </view>
          <view class="bar-item">
            <view class="bar-label">🙂 基本正常</view>
            <view class="bar-wrapper">
              <view class="bar-fill normal" :style="{ width: getPercentage(analysis.moodDistribution.normal, analysis.totalTests) }"></view>
            </view>
            <text class="bar-value">{{ analysis.moodDistribution.normal }}次</text>
          </view>
          <view class="bar-item">
            <view class="bar-label">😐 轻度异常</view>
            <view class="bar-wrapper">
              <view class="bar-fill mild" :style="{ width: getPercentage(analysis.moodDistribution.mild, analysis.totalTests) }"></view>
            </view>
            <text class="bar-value">{{ analysis.moodDistribution.mild }}次</text>
          </view>
          <view class="bar-item">
            <view class="bar-label">😟 需要关注</view>
            <view class="bar-wrapper">
              <view class="bar-fill concern" :style="{ width: getPercentage(analysis.moodDistribution.concern, analysis.totalTests) }"></view>
            </view>
            <text class="bar-value">{{ analysis.moodDistribution.concern }}次</text>
          </view>
        </view>
      </view>

      <!-- 智能洞察 -->
      <view class="insights" v-if="analysis.insights && analysis.insights.length > 0">
        <view class="insights-title">💡 智能洞察</view>
        <view class="insight-list">
          <view 
            v-for="(insight, index) in analysis.insights" 
            :key="index"
            class="insight-item">
            <text class="insight-number">{{ index + 1 }}</text>
            <text class="insight-text">{{ insight }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="loading-overlay" v-if="loading">
      <view class="loading-spinner"></view>
      <text class="loading-text">加载中...</text>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-if="!loading && !weeklyReport && !charts">
      <text class="empty-icon">📭</text>
      <text class="empty-title">暂无数据</text>
      <text class="empty-desc">请先完成每日情绪测评，积累数据后即可查看分析报告</text>
      <button class="empty-btn" @click="goToHome">前往测评</button>
    </view>
  </view>
</template>

<script>
import { CognitionService } from '@/api/client/services/CognitionService'

export default {
  data() {
    return {
      loading: false,
      weekOffset: 0, // 0=本周, -1=上周, -2=上上周
      weeklyReport: null,
      charts: null,
      analysis: null,
      emaTrends: null, // EMA情绪趋势数据
      comprehensiveReport: null // 综合认知评估报告
    }
  },
  computed: {
    weekDisplay() {
      if (this.weekOffset === 0) return '本周'
      if (this.weekOffset === -1) return '上周'
      return `${Math.abs(this.weekOffset)}周前`
    }
  },
  onLoad() {
    this.loadAllData()
  },
  onShow() {
    // 每次显示页面时刷新数据
    this.loadAllData()
  },
  methods: {
    async loadAllData() {
      this.loading = true
      try {
        await Promise.all([
          this.loadComprehensiveReport(),
          this.loadWeeklyReport(),
          this.loadMoodCharts(),
          this.loadMoodAnalysis(),
          this.loadEmaTrends()
        ])
      } catch (error) {
        console.error('加载数据失败:', error)
        uni.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        })
      } finally {
        this.loading = false
      }
    },

    async loadWeeklyReport() {
      try {
        const response = await CognitionService.getCognitionWeeklyReport({
          weekOffset: this.weekOffset
        })
        if (response.code === 0) {
          this.weeklyReport = response.data
        }
      } catch (error) {
        console.error('加载每周报告失败:', error)
        throw error
      }
    },

    async loadMoodCharts() {
      try {
        const response = await CognitionService.getCognitionMoodCharts({
          days: 30
        })
        if (response.code === 0) {
          this.charts = response.data
        }
      } catch (error) {
        console.error('加载图表数据失败:', error)
        throw error
      }
    },

    async loadMoodAnalysis() {
      try {
        const response = await CognitionService.getCognitionMoodAnalysis()
        if (response.code === 0) {
          this.analysis = response.data
        }
      } catch (error) {
        console.error('加载分析数据失败:', error)
        throw error
      }
    },

    async loadEmaTrends() {
      try {
        // TODO: 调用实际的API获取EMA趋势数据
        // const response = await CognitionService.getEmaTrends({ weekOffset: this.weekOffset })
        // if (response.code === 0) {
        //   this.emaTrends = response.data.trends
        //   this.$nextTick(() => {
        //     this.renderEmaCharts()
        //   })
        // }
        
        // 模拟数据结构（供开发使用）
        this.emaTrends = [
          {
            id: 'mood',
            title: '① 心情低落趋势',
            subtitle: '评分（0=无 → 3=严重）',
            labels: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
            morning: [1, 0, 0, 1, 1, 0, 1],
            evening: [2, 1, 1, 2, 2, 1, 2],
            color1: '#3b82f6',
            color2: '#f59e0b'
          },
          {
            id: 'anxiety',
            title: '② 焦虑紧张趋势',
            subtitle: '评分（0=无 → 3=严重）',
            labels: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
            morning: [1, 1, 0, 1, 0, 0, 1],
            evening: [2, 2, 1, 2, 1, 1, 2],
            color1: '#10b981',
            color2: '#ef4444'
          },
          {
            id: 'fatigue',
            title: '③ 精力疲劳趋势',
            subtitle: '评分（0=无 → 3=严重）',
            labels: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
            morning: [0, 1, 1, 0, 1, 0, 1],
            evening: [1, 2, 1, 1, 2, 1, 2],
            color1: '#8b5cf6',
            color2: '#ec4899'
          },
          {
            id: 'sleep',
            title: '④ 睡眠质量趋势',
            subtitle: '评分（0=无 → 3=严重）',
            labels: ['10-01', '10-02', '10-03', '10-04', '10-05', '10-06', '10-07'],
            morning: [2, 1, 1, 1, 2, 1, 1],
            evening: [3, 2, 2, 2, 3, 2, 2],
            color1: '#6366f1',
            color2: '#14b8a6'
          }
        ]
        
        // 在下一个tick渲染图表
        this.$nextTick(() => {
          this.renderEmaCharts()
        })
      } catch (error) {
        console.error('加载EMA趋势数据失败:', error)
        // 不抛出错误，允许页面其他部分正常加载
      }
    },

    renderEmaCharts() {
      // TODO: 使用Chart.js或uCharts渲染图表
      // 这里需要根据uni-app的图表库来实现
      // 示例: 使用uCharts或echarts for uni-app
      console.log('准备渲染EMA图表', this.emaTrends)
      
      // 由于uni-app不能直接使用Chart.js，建议：
      // 1. 使用 uCharts: https://www.ucharts.cn/
      // 2. 使用 echarts for uni-app: https://github.com/ecomfe/echarts-for-weixin
      // 3. 或者使用 renderjs (仅H5端支持)
    },

    changeWeek(offset) {
      // 只能查看历史，不能查看未来
      if (this.weekOffset + offset > 0) {
        uni.showToast({
          title: '不能查看未来数据',
          icon: 'none'
        })
        return
      }
      
      this.weekOffset += offset
      this.loadWeeklyReport()
    },

    getMoodClass(mood) {
      const moodMap = {
        '状态良好': 'good',
        '基本正常': 'normal',
        '轻度异常': 'mild',
        '需要关注': 'concern'
      }
      return moodMap[mood] || 'normal'
    },

    getTrendClass(trend) {
      const trendMap = {
        '改善': 'improve',
        '稳定': 'stable',
        '下降': 'decline'
      }
      return trendMap[trend] || 'stable'
    },

    getValidDataCount(dataArray) {
      if (!dataArray) return 0
      return dataArray.filter(d => d !== null && d !== undefined).length
    },

    getPercentage(value, total) {
      if (!total) return '0%'
      return ((value / total) * 100).toFixed(1) + '%'
    },

    goToHome() {
      uni.switchTab({
        url: '/pages/home/home'
      })
    },

    // 加载综合认知评估报告
    async loadComprehensiveReport() {
      try {
        // TODO: 调用实际的API获取综合报告
        // const response = await CognitionService.getCognitionComprehensiveReport()
        // if (response.code === 0) {
        //   this.comprehensiveReport = response.data
        // }
        
        // 模拟数据（供开发使用）
        this.comprehensiveReport = {
          hasData: false,
          message: '暂无量表评估数据，请先完成首次评估。',
          reportLevel: null,
          report: null
        }
      } catch (error) {
        console.error('加载综合评估报告失败:', error)
        // 不抛出错误，允许页面其他部分正常加载
      }
    },

    // 获取风险等级文字
    getRiskText(riskLevel) {
      const riskMap = {
        'low': '低风险',
        'medium': '中等风险',
        'medium-high': '中高风险',
        'high': '高风险'
      }
      return riskMap[riskLevel] || ''
    },

    // 格式化日期时间
    formatDateTime(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}`
    },

    // 前往评估页面
    goToAssessment() {
      uni.switchTab({
        url: '/pages/scale/first-assessment'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cognition-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + 120rpx + env(safe-area-inset-bottom));
}

// 顶部标题卡片
.page-header-card {
  text-align: center;
  background: white;
  padding: 48rpx 40rpx;
  border-radius: 32rpx;
  margin-bottom: 48rpx;
  box-shadow: 0 12rpx 48rpx rgba(24, 144, 255, 0.15);
  width: 100%;
  
  .page-title {
    display: block;
    font-size: 48rpx;
    font-weight: 700;
    color: #1890ff;
    margin-bottom: 16rpx;
    letter-spacing: 3rpx;
  }
  
  .page-subtitle {
    display: block;
    font-size: 26rpx;
    color: #8c8c8c;
    font-weight: 400;
    line-height: 1.6;
  }
}

// 周选择器
.week-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8px 32rpx rgba(24, 144, 255, 0.12);
  
  .selector-btn {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border-radius: 50%;
    
    .btn-icon {
      color: white;
      font-size: 32rpx;
      font-weight: 700;
    }
    
    &.disabled {
      background: #f0f0f0;
      
      .btn-icon {
        color: #bbb;
      }
    }
  }
  
  .week-info {
    flex: 1;
    text-align: center;
    
    .week-text {
      font-size: 36rpx;
      font-weight: 700;
      color: #333;
    }
  }
}

// 报告区域
.report-section {
  background: white;
  border-radius: 28rpx;
  padding: 40rpx 36rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
  border: 2rpx solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 16rpx 56rpx rgba(24, 144, 255, 0.18);
    transform: translateY(-4rpx);
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32rpx;
  padding-bottom: 20rpx;
  border-bottom: 3rpx solid #f0f0f0;
  width: 100%;
  
  .section-icon {
    font-size: 44rpx;
    margin-right: 16rpx;
  }
  
  .section-title {
    font-size: 38rpx;
    font-weight: 700;
    color: #262626;
    letter-spacing: 2rpx;
  }
}

// 摘要卡片
.summary-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 40rpx;
  width: 100%;
  max-width: 100%;
  
  .summary-card {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 20rpx;
    padding: 32rpx 24rpx;
    text-align: center;
    border: 2rpx solid #91d5ff;
    box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.08);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4rpx);
      box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.15);
    }
    
    .card-value {
      font-size: 56rpx;
      font-weight: 700;
      color: #1890ff;
      margin-bottom: 12rpx;
      line-height: 1.2;
      
      &.mood-status {
        font-size: 36rpx;
        
        &.good { color: #52c41a; }
        &.normal { color: #1890ff; }
        &.mild { color: #faad14; }
        &.concern { color: #f5222d; }
      }
    }
    
    .card-label {
      display: block;
      font-size: 24rpx;
      color: #666;
      margin-bottom: 4rpx;
    }
    
    .card-unit {
      font-size: 20rpx;
      color: #999;
    }
  }
}

// 每日详情
.daily-details {
  margin-bottom: 40rpx;
  
  .details-header {
    margin-bottom: 24rpx;
    text-align: center;
    
    .details-title {
      font-size: 30rpx;
      font-weight: 700;
      color: #333;
      letter-spacing: 1rpx;
    }
  }
  
  .day-list {
    .day-item {
      background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
      border-radius: 16rpx;
      padding: 24rpx;
      margin-bottom: 20rpx;
      border: 1rpx solid #e8e8e8;
      transition: all 0.3s ease;

      &:hover {
        background: white;
        box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);
        transform: translateX(4rpx);
      }
      
      .day-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12rpx;
        
        .day-date {
          font-size: 26rpx;
          font-weight: 600;
          color: #333;
        }
        
        .day-week {
          font-size: 24rpx;
          color: #666;
        }
      }
      
      .day-tests {
        display: flex;
        gap: 12rpx;
        margin-bottom: 8rpx;
        
        .test-badge {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8rpx;
          background: #e8e8e8;
          border-radius: 8rpx;
          padding: 12rpx;
          
          &.completed {
            background: #f6ffed;
            border: 1rpx solid #b7eb8f;
          }
          
          .badge-icon {
            font-size: 20rpx;
            color: #999;
          }
          
          .badge-text {
            font-size: 22rpx;
            color: #666;
          }
          
          .badge-score {
            margin-left: auto;
            font-size: 22rpx;
            font-weight: 600;
            color: #1890ff;
          }
          
          &.completed .badge-icon {
            color: #52c41a;
          }
        }
      }
      
      .day-avg {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8rpx;
        
        .avg-label {
          font-size: 22rpx;
          color: #999;
        }
        
        .avg-value {
          font-size: 24rpx;
          font-weight: 600;
          color: #1890ff;
        }
      }
    }
  }
}

// 建议
.suggestions {
  background: linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%);
  border-radius: 20rpx;
  padding: 32rpx;
  border-left: 6rpx solid #fa8c16;
  box-shadow: 0 4rpx 16rpx rgba(250, 140, 22, 0.1);
  
  .suggestions-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;
    
    .header-icon {
      font-size: 36rpx;
      margin-right: 12rpx;
    }
    
    .header-text {
      font-size: 30rpx;
      font-weight: 700;
      color: #d46b08;
      letter-spacing: 1rpx;
    }
  }
  
  .suggestion-list {
    .suggestion-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20rpx;
      background: rgba(255, 255, 255, 0.5);
      padding: 16rpx 20rpx;
      border-radius: 12rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .suggestion-dot {
        font-size: 36rpx;
        color: #fa8c16;
        margin-right: 16rpx;
        line-height: 1.3;
        flex-shrink: 0;
      }
      
      .suggestion-text {
        flex: 1;
        font-size: 28rpx;
        color: #873800;
        line-height: 1.7;
        font-weight: 500;
      }
    }
  }
}

// EMA趋势图区域
.ema-trends-section {
  margin-bottom: 40rpx;
  width: 100%;

  .trend-card {
    background: white;
    border-radius: 28rpx;
    padding: 40rpx 36rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
    border: 2rpx solid #f0f0f0;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 16rpx 56rpx rgba(24, 144, 255, 0.2);
      transform: translateY(-4rpx);
    }

    .trend-header {
      margin-bottom: 32rpx;
      padding-bottom: 20rpx;
      border-bottom: 2rpx solid #f0f0f0;
      text-align: center;

      .trend-title {
        display: block;
        font-size: 32rpx;
        font-weight: 700;
        color: #262626;
        margin-bottom: 12rpx;
        letter-spacing: 1rpx;
      }

      .trend-subtitle {
        display: block;
        font-size: 24rpx;
        color: #8c8c8c;
        font-weight: 400;
      }
    }

    .chart-canvas-container {
      width: 100%;
      margin-bottom: 20rpx;
      background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
      border-radius: 12rpx;
      padding: 20rpx;
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .chart-placeholder-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28rpx;
        color: #bfbfbf;
        z-index: 1;
        white-space: nowrap;
        pointer-events: none;
      }

      .chart-canvas {
        width: 100% !important;
        height: 260px !important;
        position: relative;
        z-index: 2;
      }
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 32rpx;
      padding-top: 16rpx;
      border-top: 1rpx solid #f0f0f0;
      width: 100%;

      .legend-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;

        .legend-dot {
          width: 28rpx;
          height: 12rpx;
          border-radius: 6rpx;
          flex-shrink: 0;

          &.morning {
            background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
          }

          &.evening {
            background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
          }
        }

        .legend-label {
          font-size: 26rpx;
          color: #666;
          font-weight: 500;
          white-space: nowrap;
        }
      }
    }
  }
}

// 图表区域
.charts-section {
  margin-bottom: 40rpx;
  width: 100%;
  
  .chart-card {
    background: white;
    border-radius: 28rpx;
    padding: 40rpx 36rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
    border: 2rpx solid #f0f0f0;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 16rpx 56rpx rgba(24, 144, 255, 0.2);
      transform: translateY(-4rpx);
    }
    
    .chart-header {
      margin-bottom: 32rpx;
      padding-bottom: 20rpx;
      border-bottom: 2rpx solid #f0f0f0;
      text-align: center;
      
      .chart-title {
        font-size: 32rpx;
        font-weight: 700;
        color: #262626;
        letter-spacing: 1rpx;
      }
    }
    
    .chart-legend {
      display: flex;
      gap: 24rpx;
      margin-bottom: 20rpx;
      flex-wrap: wrap;
      
      .legend-item {
        display: flex;
        align-items: center;
        gap: 8rpx;
        
        .legend-color {
          width: 32rpx;
          height: 16rpx;
          border-radius: 4rpx;
        }
        
        .legend-text {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
    
    .chart-placeholder {
      background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
      border: 2rpx dashed #d9d9d9;
      border-radius: 16rpx;
      padding: 100rpx 40rpx;
      text-align: center;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-color: #91d5ff;
      }
      
      .placeholder-text {
        display: block;
        font-size: 48rpx;
        margin-bottom: 16rpx;
      }
      
      .placeholder-desc {
        display: block;
        font-size: 28rpx;
        color: #666;
        margin-bottom: 12rpx;
      }
      
      .placeholder-info {
        display: block;
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}

// 分析区域
.analysis-section {
  background: white;
  border-radius: 28rpx;
  padding: 40rpx 36rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
  border: 2rpx solid #f0f0f0;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 16rpx 56rpx rgba(24, 144, 255, 0.2);
    transform: translateY(-4rpx);
  }
  
  .analysis-card {
    background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
    border-radius: 16rpx;
    padding: 32rpx 28rpx;
    margin-bottom: 32rpx;
    border: 1rpx solid #e8e8e8;
    
    .analysis-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx 0;
      border-bottom: 1rpx solid #e8e8e8;
      
      &:last-child {
        border-bottom: none;
      }
      
      .analysis-label {
        font-size: 28rpx;
        color: #666;
      }
      
      .analysis-value {
        font-size: 32rpx;
        font-weight: 600;
        color: #1890ff;
        
        &.improve { color: #52c41a; }
        &.stable { color: #1890ff; }
        &.decline { color: #f5222d; }
      }
    }
  }
  
  .mood-distribution {
    margin-bottom: 32rpx;
    
    .distribution-title {
      font-size: 30rpx;
      font-weight: 700;
      color: #333;
      margin-bottom: 24rpx;
      text-align: center;
      letter-spacing: 1rpx;
    }
    
    .distribution-bars {
      .bar-item {
        margin-bottom: 24rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .bar-label {
          font-size: 26rpx;
          color: #666;
          margin-bottom: 8rpx;
          display: block;
        }
        
        .bar-wrapper {
          height: 32rpx;
          background: #f0f0f0;
          border-radius: 16rpx;
          overflow: hidden;
          margin-bottom: 8rpx;
          
          .bar-fill {
            height: 100%;
            border-radius: 16rpx;
            transition: width 0.3s ease;
            
            &.good { background: linear-gradient(90deg, #52c41a 0%, #73d13d 100%); }
            &.normal { background: linear-gradient(90deg, #1890ff 0%, #40a9ff 100%); }
            &.mild { background: linear-gradient(90deg, #faad14 0%, #ffc53d 100%); }
            &.concern { background: linear-gradient(90deg, #f5222d 0%, #ff4d4f 100%); }
          }
        }
        
        .bar-value {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
  
  .insights {
    .insights-title {
      font-size: 30rpx;
      font-weight: 700;
      color: #333;
      margin-bottom: 24rpx;
      text-align: center;
      letter-spacing: 1rpx;
    }
    
    .insight-list {
      .insight-item {
        display: flex;
        align-items: flex-start;
        background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
        border-radius: 16rpx;
        padding: 24rpx;
        margin-bottom: 20rpx;
        border: 1rpx solid #91d5ff;
        box-shadow: 0 2rpx 8rpx rgba(24, 144, 255, 0.08);
        transition: all 0.3s ease;

        &:hover {
          box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.15);
          transform: translateX(4rpx);
        }
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .insight-number {
          width: 56rpx;
          height: 56rpx;
          background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26rpx;
          font-weight: 700;
          margin-right: 20rpx;
          flex-shrink: 0;
          box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.3);
        }
        
        .insight-text {
          flex: 1;
          font-size: 28rpx;
          color: #0050b3;
          line-height: 1.7;
          font-weight: 500;
        }
      }
    }
  }
}

// 加载状态
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0 5%;
  
  .loading-spinner {
    width: 80rpx;
    height: 80rpx;
    border: 6rpx solid #e8e8e8;
    border-top-color: #1890ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-text {
    margin-top: 24rpx;
    font-size: 28rpx;
    color: #666;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// 综合认知评估报告区域
.comprehensive-report-section {
  background: white;
  border-radius: 24rpx;
  padding: 40rpx 36rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
  border: 2rpx solid #f0f0f0;
}

// 评估等级卡片
.assessment-level-card {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-left: 6rpx solid #1890ff;
  
  &.level-normal {
    background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%);
    border-left-color: #52c41a;
  }
  
  &.level-scd {
    background: linear-gradient(135deg, #fffbe6 0%, #fff1b8 100%);
    border-left-color: #faad14;
  }
  
  &.level-possible_impairment {
    background: linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%);
    border-left-color: #fa8c16;
  }
  
  &.level-high_risk {
    background: linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%);
    border-left-color: #f5222d;
  }
  
  .level-emoji {
    font-size: 80rpx;
    margin-bottom: 16rpx;
  }
  
  .level-title {
    font-size: 38rpx;
    font-weight: 700;
    color: #333;
    margin-bottom: 12rpx;
  }
  
  .risk-badge {
    display: inline-block;
    padding: 8rpx 24rpx;
    border-radius: 40rpx;
    font-size: 24rpx;
    font-weight: 600;
    
    &.risk-low {
      background: rgba(82, 196, 26, 0.1);
      color: #52c41a;
    }
    
    &.risk-medium {
      background: rgba(250, 173, 20, 0.1);
      color: #faad14;
    }
    
    &.risk-medium-high {
      background: rgba(250, 140, 22, 0.1);
      color: #fa8c16;
    }
    
    &.risk-high {
      background: rgba(245, 34, 45, 0.1);
      color: #f5222d;
    }
  }
}

// 量表评分概览
.scale-scores-overview {
  margin-bottom: 32rpx;
  
  .scores-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    
    .score-item {
      background: linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%);
      border-radius: 16rpx;
      padding: 24rpx 16rpx;
      text-align: center;
      border: 2rpx solid #e8e8e8;
      
      .score-label {
        display: block;
        font-size: 24rpx;
        color: #666;
        margin-bottom: 8rpx;
        font-weight: 600;
      }
      
      .score-value {
        display: block;
        font-size: 48rpx;
        font-weight: 700;
        color: #1890ff;
        margin-bottom: 8rpx;
        
        &.abnormal {
          color: #f5222d;
        }
      }
      
      .score-threshold {
        display: block;
        font-size: 22rpx;
        color: #999;
      }
    }
  }
}

// 报告内容
.report-content {
  .report-section-item {
    background: #fafbfc;
    border-radius: 16rpx;
    padding: 28rpx;
    margin-bottom: 24rpx;
    border: 1rpx solid #e8e8e8;
    
    &.highlight {
      background: linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%);
      border-color: #fa8c16;
      border-width: 2rpx;
    }
    
    &.type-success {
      background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%);
      border-color: #52c41a;
    }
    
    &.type-warning {
      background: linear-gradient(135deg, #fffbe6 0%, #fff1b8 100%);
      border-color: #faad14;
    }
    
    &.type-danger {
      background: linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%);
      border-color: #f5222d;
      border-width: 2rpx;
    }
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: 700;
      color: #262626;
      margin-bottom: 16rpx;
      line-height: 1.5;
    }
    
    .section-content {
      display: block;
      font-size: 28rpx;
      color: #595959;
      line-height: 1.8;
      margin-bottom: 16rpx;
    }
    
    .section-details {
      margin-top: 16rpx;
      
      .detail-item {
        display: block;
        font-size: 26rpx;
        color: #595959;
        line-height: 1.8;
        margin-bottom: 12rpx;
        padding-left: 20rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    
    .section-items {
      margin-top: 16rpx;
      
      .item-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16rpx;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .item-number {
          width: 44rpx;
          height: 44rpx;
          background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          font-weight: 700;
          margin-right: 16rpx;
          flex-shrink: 0;
        }
        
        .item-text {
          flex: 1;
          font-size: 28rpx;
          color: #595959;
          line-height: 1.8;
        }
      }
    }
  }
}

// 报告页脚
.report-footer {
  margin-top: 24rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid #f0f0f0;
  text-align: center;
  
  .footer-text {
    font-size: 24rpx;
    color: #999;
  }
}

// 无评估数据提示
.no-assessment-tip {
  background: white;
  border-radius: 24rpx;
  padding: 80rpx 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
  border: 2rpx solid #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  .tip-icon {
    font-size: 100rpx;
    margin-bottom: 24rpx;
  }
  
  .tip-title {
    font-size: 36rpx;
    font-weight: 700;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .tip-desc {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
    margin-bottom: 32rpx;
  }
  
  .go-assessment-btn {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: white;
    border: none;
    border-radius: 48rpx;
    padding: 24rpx 64rpx;
    font-size: 30rpx;
    font-weight: 600;
  }
}

// 空状态
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  background: white;
  border-radius: 28rpx;
  box-shadow: 0 10rpx 40rpx rgba(24, 144, 255, 0.12);
  border: 2rpx solid #f0f0f0;
  
  .empty-icon {
    font-size: 120rpx;
    margin-bottom: 32rpx;
  }
  
  .empty-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .empty-desc {
    font-size: 28rpx;
    color: #999;
    text-align: center;
    line-height: 1.6;
    margin-bottom: 48rpx;
  }
  
  .empty-btn {
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    color: white;
    border: none;
    border-radius: 48rpx;
    padding: 24rpx 64rpx;
    font-size: 30rpx;
    font-weight: 600;
  }
}
</style>

