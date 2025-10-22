<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '心情记录',
  },
}
</route>

<script setup lang="ts">
import type { MoodJournalResponse } from '@/service/app/types'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import { listHealthReportsHealthReportsGetQueryOptions } from '@/service/app/healthReport.vuequery'
import {
  listMoodJournalsMoodJournalsGetQueryOptions,
  useCreateMoodJournalMoodJournalsPostMutation,
} from '@/service/app/moodJournal.vuequery'

// 心情日志列表
const { data: moods, isLoading: moodsLoading } = useQuery(
  listMoodJournalsMoodJournalsGetQueryOptions({ params: {} }),
)

// 健康报告（手环数据、趋势图、历史数据）
const { data: reports, isLoading: reportsLoading } = useQuery(
  listHealthReportsHealthReportsGetQueryOptions({ params: {} }),
)

// 编辑心情日志
const moodText = ref('')
const moodScore = ref(0)
const moodName = ref('')
const moodEmoji = ref('')
const createMood = useCreateMoodJournalMoodJournalsPostMutation()
function submitMood() {
  createMood.mutate({
    params: {},
    body: {
      user_id: 1, // 实际应从用户信息获取
      mood_score: moodScore.value,
      mood_name: moodName.value,
      mood_emoji: moodEmoji.value,
      text: moodText.value,
      record_date: new Date().toISOString().slice(0, 10),
    },
  })
}

// 认知/情绪状态（取最新心情日志）
const latestMood = computed(() => (moods.value && moods.value.length > 0 ? moods.value[0] : null))

onShow(() => {
  // 页面显示时可做刷新等操作
})
</script>

<template>
  <wot-page>
    <w-navbar title="心情记录" />
    <w-card title="认知/情绪状态">
      <template #desc>
        <wot-loading v-if="moodsLoading" />
        <w-list v-else-if="latestMood">
          <w-list-item
            :title="latestMood.mood_name || '未命名'"
            :desc="latestMood.text"
            :extra="latestMood.record_date"
          />
        </w-list>
        <wot-empty v-else description="暂无心情记录" />
      </template>
    </w-card>
    <w-card title="编辑日志" desc="记录今日心情">
      <template #desc>
        <w-input v-model="moodText" placeholder="输入心情描述" />
        <w-slider v-model="moodScore" :min="0" :max="10" />
        <w-button type="primary" @click="submitMood">提交</w-button>
      </template>
    </w-card>
    <w-card title="心情变化">
      <template #desc>
        <wot-loading v-if="moodsLoading" />
        <wot-empty v-else-if="!moods || moods.length === 0" description="暂无心情日志" />
        <w-list v-else>
          <w-list-item
            v-for="item in moods"
            :key="item.id"
            :title="item.mood_name || '未命名'"
            :desc="item.mood_score"
            :extra="item.record_date"
          />
        </w-list>
      </template>
    </w-card>
    <w-card title="手环数据">
      <template #desc>
        <wot-loading v-if="reportsLoading" />
        <wot-empty v-else-if="!reports || reports.length === 0" description="暂无手环数据" />
        <w-list v-else>
          <w-list-item
            v-for="report in reports"
            :key="report.id"
            :title="`报告类型:${report.report_type}`"
            :desc="`摘要:${report.summary || ''}`"
            :extra="report.created_at"
          />
        </w-list>
      </template>
    </w-card>
    <!-- 历史数据查看 -->
    <w-card title="历史数据">
      <template #desc>
        <w-list>
          <w-list-item
            v-for="item in moods || []"
            :key="item.id"
            :title="item.mood_name || '未命名'"
            :desc="item.text || ''"
            :extra="item.record_date"
          />
          <w-list-item
            v-for="report in reports || []"
            :key="report.id"
            :title="`报告类型:${report.report_type}`"
            :desc="`摘要:${report.summary || ''}`"
            :extra="report.created_at"
          />
        </w-list>
      </template>
    </w-card>

    <!-- 综合报告与趋势图（周/月/年） -->
    <w-card title="综合报告与趋势图">
      <template #desc>
        <view v-if="reportsLoading">加载中...</view>
        <w-chart v-else :data="reports || []" type="line" />
      </template>
    </w-card>
  </wot-page>
</template>
