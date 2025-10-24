<route lang="json5">
{
  style: {
    navigationBarTitleText: '测评详情',
  },
}
</route>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, reactive, ref } from 'vue'
import { getScaleConfigScalesScaleConfigIdGetQueryOptions } from '@/service/app/scaleConfig.vuequery'
import { useCreateResultResultsPostMutation } from '@/service/app/scaleResult.vuequery'

const showConsent = ref(true)
const showEnvConfirm = ref(false)
const scaleConfigId = ref(1) // 实际项目应通过路由参数获取

const model = reactive<Record<string, any>>({})
const rules = {}

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
function handleSubmit() {
  submitResult({
    params: {},
    body: {
      scale_config_id: scaleConfigId.value,
      selected_options: questions.value.map((q, idx) => ({
        option_text: q.text,
        option_value: model[`q_${idx}`],
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
  <div class="assessment-detail-container">
    <div v-if="isLoading">加载中...</div>
    <div v-else>
      <wd-form ref="form" :model="model" :rules="rules">
        <wd-cell-group border>
          <template v-for="(question, idx) in questions" :key="idx">
            <wd-radio-group
              v-if="question.options && question.options.length > 0"
              v-model="model[`q_${idx}`]"
              :label="question.text"
              :prop="`q_${idx}`"
              :options="question.options.map((opt) => ({ label: opt.label, value: opt.value }))"
              :rules="[{ required: true, message: '请选择选项' }]"
            />
            <wd-input
              v-else
              v-model="model[`q_${idx}`]"
              :label="question.text"
              :prop="`q_${idx}`"
              placeholder="请输入答案"
              :rules="[{ required: true, message: '请填写答案' }]"
            />
          </template>
        </wd-cell-group>
        <div class="footer">
          <wd-button type="primary" size="large" block @click="handleSubmit">提交</wd-button>
        </div>
      </wd-form>
    </div>
    <wot-button block type="primary" html-type="submit">提交答卷</wot-button>
  </div>
</template>

<!-- 禁止 SFC 内部 CSS，移除 style 标签 -->
