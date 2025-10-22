<template>
  <wd-page>
    <wd-navbar title="智能客服" />
    <wd-card title="AI对话">
      <template #desc>
        <wd-empty description="AI对话功能暂未开放" />
      </template>
    </wd-card>
    <wd-card title="语音输出">
      <template #desc>
        <wd-empty description="语音输出功能暂未开放" />
      </template>
    </wd-card>
    <wd-card title="人工客服">
      <template #desc>
        <wd-button type="primary" block>
          跳转人工客服
        </wd-button>
      </template>
    </wd-card>
  </wd-page>
</template>

<script setup lang="ts">
// 页面仅实现结构与 UI，所有功能需基于 src/service/app 下已存在接口
</script>