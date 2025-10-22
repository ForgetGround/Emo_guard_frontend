<route lang="json5">
{
  style: {
    navigationBarTitleText: '测评详情',
  },
}
</route>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { getScaleConfigScalesScaleConfigIdGetQueryOptions } from '@/service/app/scaleConfig.vuequery'
import { useCreateResultResultsPostMutation } from '@/service/app/scaleResult.vuequery'

const showConsent = ref(true)
const showEnvConfirm = ref(false)
const scaleConfigId = ref(1) // 实际项目应通过路由参数获取
const answers = ref<any[]>([])

// 获取量表配置（题目列表）
const { data: scaleConfig, isLoading } = useQuery(
  getScaleConfigScalesScaleConfigIdGetQueryOptions({
    params: { scale_config_id: scaleConfigId.value },
  }),
)
const questions = computed(() => scaleConfig?.value?.questions ?? [])

function onConsentConfirm() {
  showConsent.value = false
  showEnvConfirm.value = true
}
function onEnvConfirm() {
  showEnvConfirm.value = false
}

// 提交答卷
const { mutate: submitResult } = useCreateResultResultsPostMutation()
function onSubmit(e: any) {
  submitResult({
    params: {},
    body: {
      scale_config_id: scaleConfigId.value,
      selected_options: questions.value.map((q, idx) => ({
        option_text: q.text,
        option_value: answers.value[idx],
      })),
    },
  })
}
onShow(() => {
  console.log('测评详情页面显示')
})
</script>

<template>
  <fg-navbar left-text="返回" bordered>
    <template #title>测评答题</template>
  </fg-navbar>
  <consent-modal v-model:show="showConsent" @confirm="onConsentConfirm" />
  <env-confirm-modal v-model:show="showEnvConfirm" @confirm="onEnvConfirm" />
  <view class="assessment-detail-container">
    <view v-if="isLoading">加载中...</view>
    <view v-else>
      <form @submit="onSubmit">
        <view v-for="(question, idx) in questions" :key="idx" style="margin-bottom: 32rpx">
          <view style="font-weight: bold">{{ idx + 1 }}. {{ question.text }}</view>
          <w-radio-group v-if="question.options && question.options.length" v-model="answers[idx]">
            <w-radio v-for="opt in question.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </w-radio>
          </w-radio-group>
          <w-input v-else v-model="answers[idx]" placeholder="请输入答案" />
        </view>
        <w-button block type="primary" html-type="submit">提交答卷</w-button>
      </form>
    </view>
  </view>
</template>

<!-- 禁止 SFC 内部 CSS，移除 style 标签 -->
