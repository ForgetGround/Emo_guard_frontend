<route lang="json5">
{
  style: {
    navigationBarTitleText: '文章详情',
  },
}
</route>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getArticleArticlesArticleIdGet } from '@/service/app/article'
import { showToast } from '@/utils/toast'

const article = ref<any>(null)
const loading = ref(false)
const articleId = ref(0)

// 加载文章详情
async function loadArticle() {
  if (!articleId.value) {
    showToast('文章ID无效')
    return
  }

  try {
    loading.value = true
    const data = await getArticleArticlesArticleIdGet({
      params: { article_id: articleId.value },
    })
    article.value = data
  } catch (error: any) {
    console.error('加载文章详情失败:', error)
    showToast(error?.message || '加载失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 获取URL参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = (currentPage as any).options
  if (options?.id) {
    articleId.value = Number(options.id)
    loadArticle()
  }
})
</script>

<template>
  <view class="article-detail-container">
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>

    <view v-else-if="!article" class="empty-container">
      <text class="empty-icon">📄</text>
      <text class="empty-text">文章不存在</text>
    </view>

    <scroll-view v-else class="article-content" scroll-y>
      <!-- 文章头部 -->
      <view class="article-header">
        <text class="article-title">{{ article.title }}</text>
        <view class="article-meta">
          <text class="meta-item">📅 {{ article.publish_time || '未发布' }}</text>
          <text class="meta-item">👁️ {{ article.view_count || 0 }}次阅读</text>
        </view>
      </view>

      <!-- 文章封面 -->
      <view v-if="article.cover_image" class="article-cover">
        <image :src="article.cover_image" mode="widthFix" class="cover-image" />
      </view>

      <!-- 文章正文 -->
      <view class="article-body">
        <text class="body-text">{{ article.content }}</text>
      </view>

      <!-- 文章标签 -->
      <view v-if="article.tags && article.tags.length > 0" class="article-tags">
        <view v-for="(tag, index) in article.tags" :key="index" class="tag-item">
          <text class="tag-text">#{{ tag }}</text>
        </view>
      </view>

      <!-- 底部信息 -->
      <view class="article-footer">
        <text class="footer-text">— 以上内容仅供参考 —</text>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.article-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
}

.loading-container,
.empty-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.loading-text,
.empty-text {
  font-size: 28rpx;
  color: #999;
  margin-top: 24rpx;
}

.empty-icon {
  font-size: 80rpx;
}

.article-content {
  height: 100vh;
  padding: 32rpx;
}

.article-header {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);

  .article-title {
    display: block;
    font-size: 40rpx;
    font-weight: 700;
    color: #333;
    line-height: 1.5;
    margin-bottom: 20rpx;
  }

  .article-meta {
    display: flex;
    gap: 24rpx;

    .meta-item {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.article-cover {
  margin-bottom: 24rpx;
  border-radius: 20rpx;
  overflow: hidden;

  .cover-image {
    width: 100%;
    display: block;
  }
}

.article-body {
  background: white;
  border-radius: 20rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);

  .body-text {
    font-size: 30rpx;
    color: #333;
    line-height: 1.8;
    white-space: pre-wrap;
  }
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-bottom: 24rpx;

  .tag-item {
    background: rgba(24, 144, 255, 0.1);
    border-radius: 20rpx;
    padding: 8rpx 20rpx;

    .tag-text {
      font-size: 24rpx;
      color: #1890ff;
    }
  }
}

.article-footer {
  padding: 40rpx 0;
  text-align: center;

  .footer-text {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
