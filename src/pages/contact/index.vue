<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '联系我们',
  },
}
</route>

<script setup lang="ts">
const phoneNumber = '19858163283'

function callPhone() {
  uni.makePhoneCall({
    phoneNumber,
  })
}
</script>

<template>
  <view class="contact-container">
    <wd-cell-group>
      <wd-cell title="客服电话" value="19858163283" is-link @click="callPhone" />
    </wd-cell-group>
    <wd-button block type="primary" @click="callPhone">一键拨打电话</wd-button>
  </view>
</template>
