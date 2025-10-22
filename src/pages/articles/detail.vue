<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '文章详情',
  },
}
</route>

<script setup lang="ts">
import type { ArticleResponse } from '@/service/app/types'
import { useQuery } from '@tanstack/vue-query'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  getArticleArticlesArticleIdGetQueryOptions,
  useUpdateArticleArticlesArticleIdPutMutation,
} from '@/service/app/article.vuequery'

// 局部状态管理
const useArticleDetailStore = defineStore('articleDetail', {
  state: () => ({
    liked: false,
    collected: false,
  }),
  actions: {
    setLiked(val: boolean) {
      this.liked = val
    },
    setCollected(val: boolean) {
      this.collected = val
    },
  },
})
const articleStore = useArticleDetailStore()
const { liked, collected } = storeToRefs(articleStore)

const route = useRoute()
const articleId = Number(route.params.id)
const article = ref<ArticleResponse | null>(null)

const { data } = useQuery(
  getArticleArticlesArticleIdGetQueryOptions({ params: { article_id: articleId } }),
)
if (data.value) article.value = data.value as ArticleResponse

const { mutate: updateArticle } = useUpdateArticleArticlesArticleIdPutMutation()

function handleLike() {
  updateArticle({
    params: { article_id: articleId },
    body: { status: 'liked' },
  })
  articleStore.setLiked(true)
}
function handleCollect() {
  updateArticle({
    params: { article_id: articleId },
    body: { status: 'collected' },
  })
  articleStore.setCollected(true)
}
function handleShare() {
  uni.showToast({ title: '已分享', icon: 'success' })
}
</script>

<template>
  <w-navbar title="文章详情" />
  <view>
    <w-card v-if="article">
      <template #title>
        <view>{{ article.title }}</view>
      </template>
      <template #desc>
        <view>{{ article.content }}</view>
      </template>
      <template #extra>
        <view>
          <text>发布时间: {{ article.publish_time }}</text>
          <text style="margin-left: 16rpx">状态: {{ article.status }}</text>
        </view>
      </template>
    </w-card>
    <w-button-group>
      <w-button type="primary" @click="handleLike">点赞</w-button>
      <w-button type="warning" @click="handleCollect">收藏</w-button>
      <w-button type="info" @click="handleShare">分享</w-button>
    </w-button-group>
  </view>
</template>

<!-- 禁止 SFC 内部 CSS，全部布局交由 wot-ui 组件完成 -->
