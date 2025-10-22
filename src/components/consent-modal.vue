<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps<{ show: boolean }>()
const emits = defineEmits(['update:show', 'confirm'])

function confirmConsent() {
  emits('confirm')
  emits('update:show', false)
}
</script>

<template>
  <wot-popup v-model:show="show" position="center">
    <view style="padding: 32rpx; max-width: 600rpx">
      <view style="font-weight: bold; font-size: 32rpx; margin-bottom: 24rpx">知情同意书</view>
      <scroll-view style="max-height: 400rpx; margin-bottom: 24rpx">
        <text>
          本测评仅用于健康管理目的，您的个人信息将严格保密。请在安静环境下进行测评，准备好纸笔。点击“我已知情并同意”即表示您已充分理解并同意相关内容。
        </text>
      </scroll-view>
      <wot-button block type="primary" @click="confirmConsent">我已知情并同意</wot-button>
    </view>
  </wot-popup>
</template>
