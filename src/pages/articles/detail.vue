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
  <div>
    <w-card v-if="article">
      <template #title>
        <div>{{ article.title }}</div>
      </template>
      <template #desc>
        <div>{{ article.content }}</div>
      </template>
      <template #extra>
        <div>
          <span>发布时间: {{ article.publish_time }}</span>
          <span style="margin-left: 16rpx">状态: {{ article.status }}</span>
        </div>
      </template>
    </w-card>
    <w-button-group>
      <w-button type="primary" @click="handleLike">点赞</w-button>
      <w-button type="warning" @click="handleCollect">收藏</w-button>
      <w-button type="info" @click="handleShare">分享</w-button>
    </w-button-group>
  </div>
</template>

<!-- 禁止 SFC 内部 CSS，全部布局交由 wot-ui 组件完成 -->
