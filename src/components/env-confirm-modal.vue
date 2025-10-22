<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['update:show', 'confirm'])

function confirmEnv() {
  emits('confirm')
  emits('update:show', false)
}
</script>

<template>
  <wot-popup v-model:show="show" position="center">
    <view style="padding: 32rpx; max-width: 600rpx">
      <view style="font-weight: bold; font-size: 32rpx; margin-bottom: 24rpx">环境确认</view>
      <scroll-view style="max-height: 400rpx; margin-bottom: 24rpx">
        <text>
          请确保当前处于安静环境，已准备好纸笔。测评过程中请保持专注，避免外界干扰。点击“我已准备好”即表示您已确认测评环境符合要求。
        </text>
      </scroll-view>
      <wot-button block type="primary" @click="confirmEnv">我已准备好</wot-button>
    </view>
  </wot-popup>
</template>
