<template>
  <view class="first-assessment-container">
    <view class="header">
      <text class="title">首次认知健康评估</text>
      <text class="subtitle">完整的认知与情绪健康评估</text>
    </view>
    <view class="flow-section">
      <view class="section-header">
        <text class="section-icon">📋</text>
        <text class="section-title">评估流程</text>
      </view>
      <view class="flow-steps">
        <view class="flow-step">
          <view class="step-number">1</view>
          <view class="step-content">
            <text class="step-title">SCD 主观认知下降量表</text>
            <text class="step-desc">快速评估您的认知状态感受（必做）</text>
          </view>
        </view>
        <view class="flow-arrow">↓</view>
        <view class="flow-step">
          <view class="step-number">2</view>
          <view class="step-content">
            <text class="step-title">智能流程判定</text>
            <text class="step-desc">根据SCD结果决定后续测评内容</text>
          </view>
        </view>
      </view>
    </view>
    <view class="assessment-section">
      <view class="section-header">
        <text class="section-icon">✅</text>
        <text class="section-title">包含的评估项目</text>
      </view>
      <view class="assessment-list">
        <view class="assessment-item required">
          <text class="item-icon">💭</text>
          <view class="item-info">
            <text class="item-title">SCD 主观认知下降</text>
            <view class="item-badge required-badge">必做</view>
          </view>
        </view>
        <view class="condition-note">
          <text class="note-text">若 SCD > 5分，将继续以下测评：</text>
        </view>
        <view class="assessment-item conditional">
          <text class="item-icon">🧠</text>
          <view class="item-info">
            <text class="item-title">MMSE 简易智能状态检查</text>
            <view class="item-badge">认知评估</view>
          </view>
        </view>
        <view class="assessment-item conditional">
          <text class="item-icon">🎯</text>
          <view class="item-info">
            <text class="item-title">MoCA 蒙特利尔认知评估</text>
            <view class="item-badge">认知评估</view>
          </view>
        </view>
        <view class="condition-note">
          <text class="note-text">所有人都需完成以下测评：</text>
        </view>
        <view class="assessment-item standard">
          <text class="item-icon">🏃‍♂️</text>
          <view class="item-info">
            <text class="item-title">ADL 日常生活能力</text>
            <view class="item-badge">生活评估</view>
          </view>
        </view>
        <view class="assessment-item standard">
          <text class="item-icon">😔</text>
          <view class="item-info">
            <text class="item-title">PHQ-9 抑郁筛查</text>
            <view class="item-badge">情绪评估</view>
          </view>
        </view>
        <view class="assessment-item standard">
          <text class="item-icon">😰</text>
          <view class="item-info">
            <text class="item-title">GAD-7 焦虑筛查</text>
            <view class="item-badge">情绪评估</view>
          </view>
        </view>
      </view>
    </view>
    <view class="tips-section">
      <view class="tips-header">
        <text class="tips-icon">💡</text>
        <text class="tips-title">温馨提示</text>
      </view>
      <view class="tips-content">
        <text class="tip-item">• 请在安静、舒适的环境中完成评估</text>
        <text class="tip-item">• 请准备好纸笔（部分测试需要）</text>
        <text class="tip-item">• 请根据真实情况如实填写</text>
        <text class="tip-item">• 评估过程中可随时暂停</text>
      </view>
    </view>
    <view class="action-section">
      <button class="start-btn" @click="startAssessment">
        <text class="btn-text">开始评估</text>
        <text class="btn-icon">→</text>
      </button>
      <text class="time-estimate">预计总用时：30-45分钟</text>
    </view>
    <!-- 问卷弹窗导航 -->
    <scale-questionnaire-modal
      v-if="showModal"
      :steps="steps"
      :currentStep="currentStep"
      @close="showModal = false"
      @step-complete="onStepComplete"
    />
  </view>
</template>

<script>
import ScaleQuestionnaireModal from "@/components/ScaleQuestionnaireModal.vue";

export default {
  components: { ScaleQuestionnaireModal },
  data() {
    return {
      hasCompleted: false,
      showModal: false,
      currentStep: 0,
      steps: [
        { scale_id: "scd", name: "SCD 主观认知下降量表" },
        { scale_id: "adl", name: "ADL 日常生活能力" },
        { scale_id: "phq9", name: "PHQ-9 抑郁筛查" },
        { scale_id: "gad7", name: "GAD-7 焦虑筛查" },
        // 可根据 SCD 结果动态插入 MMSE/MoCA
      ],
    };
  },
  onLoad() {
    this.checkIfCompleted();
  },
  methods: {
    async checkIfCompleted() {
      try {
        const res = await api.user.checkFirstAssessment();
        this.hasCompleted = !!res;
        if (this.hasCompleted) {
          uni.showModal({
            title: "提示",
            content: "您已完成首次评估，是否要重新评估？",
            success: (modalRes) => {
              if (!modalRes.confirm) {
                uni.navigateBack();
              }
            },
          });
        }
      } catch (error) {
        uni.showToast({
          title: "检查评估状态失败",
          icon: "none",
        });
      }
    },
    startAssessment() {
      this.showModal = true;
      this.currentStep = 0;
    },
    onStepComplete({ nextStep, scdScore }) {
      // 根据 SCD 分数动态插入认知评估
      if (nextStep === 1 && scdScore > 5) {
        this.steps.splice(
          1,
          0,
          { scale_id: "mmse", name: "MMSE 简易智能状态检查" },
          { scale_id: "moca", name: "MoCA 蒙特利尔认知评估" }
        );
      }
      this.currentStep = nextStep;
      if (nextStep >= this.steps.length) {
        this.showModal = false;
        uni.showModal({
          title: "评估完成",
          content: "感谢您的参与，评估已全部完成！",
          confirmText: "返回首页",
          success: () => {
            uni.reLaunch({ url: "/pages/home/home" });
          },
        });
      }
    },
  },
};
</script>

<style scoped>
@import "@/styles/mixins.scss";
/* 容器 */
.first-assessment-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 40rpx;
}

/* 头部 */
.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding: 40rpx 20rpx;
  background: #fff;
  border-radius: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.title {
  @include title-style;
  display: block;
  margin-bottom: 20rpx;
}

.subtitle {
  display: block;
  font-size: 32rpx;
  color: #666;
}

/* 区块 */
.flow-section,
.assessment-section,
.tips-section {
  background: #fff;
  border-radius: 30rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.section-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #1976d2;
}

/* 流程步骤 */
.flow-steps {
  padding: 20rpx 0;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.step-number {
  width: 60rpx;
  height: 60rpx;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  font-weight: bold;
  flex-shrink: 0;
  margin-right: 20rpx;
}

.step-content {
  flex: 1;
}

.step-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.step-desc {
  display: block;
  font-size: 30rpx;
  color: #666;
  line-height: 1.5;
}

.flow-arrow {
  text-align: center;
  font-size: 48rpx;
  color: #1890ff;
  margin: 20rpx 0;
}

/* 评估项目列表 */
.assessment-list {
  padding: 20rpx 0;
}

.assessment-item {
  @include card-style;
  display: flex;
  align-items: center;
  padding: 30rpx;
  margin-bottom: 20rpx;
  border: 3rpx solid transparent;
}

.assessment-item.required {
  border-color: #1890ff;
  background: #e6f7ff;
}

.assessment-item.conditional {
  border-color: #ffa726;
  background: #fff8e1;
}

.assessment-item.standard {
  border-color: #66bb6a;
  background: #f1f8e9;
}

.item-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.item-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.item-badge {
  padding: 8rpx 20rpx;
  background: #fff;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #666;
  border: 2rpx solid #e0e0e0;
}

.required-badge {
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
}

.condition-note {
  padding: 20rpx 30rpx;
  background: #fff9c4;
  border-radius: 15rpx;
  margin: 20rpx 0;
  border-left: 6rpx solid #ffa726;
}

.note-text {
  font-size: 32rpx;
  color: #666;
  font-weight: 500;
}

/* 温馨提示 */
.tips-header {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.tips-icon {
  font-size: 48rpx;
  margin-right: 20rpx;
}

.tips-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #1976d2;
}

.tips-content {
  padding: 20rpx 30rpx;
  background: #e3f2fd;
  border-radius: 20rpx;
}

.tip-item {
  display: block;
  font-size: 32rpx;
  color: #333;
  line-height: 2;
  margin-bottom: 10rpx;
}

/* 操作区域 */
.action-section {
  text-align: center;
  padding: 40rpx 0;
}

.start-btn {
  @include btn-primary;
  width: 100%;
  font-size: 42rpx;
  font-weight: bold;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
}

.btn-text {
  color: #fff;
  margin-right: 15rpx;
}

.btn-icon {
  font-size: 48rpx;
  color: #fff;
}

.time-estimate {
  font-size: 32rpx;
  color: #666;
}
</style>
