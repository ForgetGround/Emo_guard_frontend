<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '健康科普',
  },
}
</route>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { listArticlesArticlesGet } from '@/service/app/article'
import { showToast } from '@/utils/toast'

const articles = ref<any[]>([])
const loading = ref(false)
const searchKeyword = ref('')
const selectedCategory = ref('all')

const categories = [
  { id: 'all', name: '全部', icon: '📚' },
  { id: 'cognitive', name: '认知健康', icon: '🧠' },
  { id: 'emotion', name: '情绪管理', icon: '😊' },
  { id: 'life', name: '生活方式', icon: '🏃' },
  { id: 'nutrition', name: '营养饮食', icon: '🥗' },
]

// 过滤后的文章列表
const filteredArticles = computed(() => {
  let result = articles.value

  // 按分类过滤
  if (selectedCategory.value !== 'all') {
    result = result.filter((item) => item.category === selectedCategory.value)
  }

  // 按关键词搜索
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(
      (item) =>
        item.title?.toLowerCase().includes(keyword) ||
        item.content?.toLowerCase().includes(keyword),
    )
  }

  return result
})

// 加载文章列表
async function loadArticles() {
  try {
    loading.value = true
    const list = await listArticlesArticlesGet({ params: { limit: '50', offset: '0' } })
    articles.value = list || []
  } catch (error: any) {
    console.error('加载文章失败:', error)
    showToast(error?.message || '加载失败')
  } finally {
    loading.value = false
  }
}

// 选择分类
function selectCategory(categoryId: string) {
  selectedCategory.value = categoryId
}

// 打开文章详情
function openArticle(article: any) {
  uni.navigateTo({ url: `/pages/articles/detail?id=${article.id}` })
}

onMounted(() => {
  loadArticles()
})
</script>

<template>
  <view class="articles-container">
    <!-- 顶部标题栏 -->
    <view class="page-header">
      <text class="page-title">健康科普</text>
      <text class="page-subtitle">守护认知健康</text>
    </view>

    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-container">
        <view class="search-icon">🔍</view>
        <input
          v-model="searchKeyword"
          class="search-input"
          placeholder="搜索科普内容..."
          placeholder-class="search-placeholder"
        />
      </view>
    </view>

    <!-- 分类标签 -->
    <view class="category-section">
      <scroll-view class="category-scroll" scroll-x>
        <view class="category-list">
          <view
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            <text class="category-icon">{{ category.icon }}</text>
            <text class="category-text">{{ category.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 文章列表 -->
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>

    <view v-else-if="filteredArticles.length === 0" class="empty-container">
      <text class="empty-icon">📚</text>
      <text class="empty-text">暂无相关科普文章</text>
    </view>

    <scroll-view v-else class="articles-scroll" scroll-y>
      <view class="articles-list">
        <view
          v-for="article in filteredArticles"
          :key="article.id"
          class="article-card"
          @click="openArticle(article)"
        >
          <view class="card-header">
            <view class="article-info">
              <text class="article-title">{{ article.title }}</text>
              <view v-if="article.cover_image" class="article-cover">
                <image :src="article.cover_image" mode="aspectFill" class="cover-image" />
              </view>
            </view>
          </view>

          <view v-if="article.content" class="card-content">
            <text class="content-preview">{{ article.content.substring(0, 100) }}...</text>
          </view>

          <view class="card-footer">
            <view class="article-meta">
              <text class="meta-item">📅 {{ article.publish_time || '未发布' }}</text>
              <text class="meta-item">👁️ {{ article.view_count || 0 }}次阅读</text>
            </view>
            <view class="status-badge" :class="article.status">
              <text class="status-text">
                {{ article.status === 'published' ? '已发布' : '草稿' }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.articles-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
  padding: 32rpx;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
}

.page-header {
  text-align: center;
  margin-bottom: 32rpx;

  .page-title {
    display: block;
    font-size: 44rpx;
    font-weight: 700;
    color: #1890ff;
    margin-bottom: 8rpx;
  }

  .page-subtitle {
    display: block;
    font-size: 24rpx;
    color: #666;
  }
}

.search-section {
  margin-bottom: 24rpx;

  .search-container {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 48rpx;
    padding: 16rpx 24rpx;
    box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.1);

    .search-icon {
      font-size: 32rpx;
      margin-right: 12rpx;
    }

    .search-input {
      flex: 1;
      font-size: 28rpx;
      color: #333;
    }

    .search-placeholder {
      color: #999;
    }
  }
}

.category-section {
  margin-bottom: 24rpx;

  .category-scroll {
    white-space: nowrap;
  }

  .category-list {
    display: inline-flex;
    gap: 12rpx;
    padding: 4rpx 0;

    .category-item {
      display: inline-flex;
      align-items: center;
      gap: 8rpx;
      background: white;
      border: 2rpx solid transparent;
      border-radius: 40rpx;
      padding: 12rpx 24rpx;
      white-space: nowrap;
      transition: all 0.3s;

      &.active {
        background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
        border-color: #1890ff;

        .category-icon,
        .category-text {
          color: white;
        }
      }

      .category-icon {
        font-size: 28rpx;
      }

      .category-text {
        font-size: 26rpx;
        color: #666;
        font-weight: 500;
      }
    }
  }
}

.loading-container,
.empty-container {
  flex: 1;
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

.articles-scroll {
  flex: 1;
  height: 1rpx; // hack for scroll-view
}

.articles-list {
  .article-card {
    background: white;
    border-radius: 20rpx;
    padding: 28rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.1);
    transition: all 0.3s;

    &:active {
      transform: scale(0.98);
    }

    .card-header {
      margin-bottom: 16rpx;

      .article-info {
        .article-title {
          display: block;
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
          margin-bottom: 16rpx;
          line-height: 1.5;
        }

        .article-cover {
          width: 100%;
          height: 300rpx;
          border-radius: 12rpx;
          overflow: hidden;

          .cover-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .card-content {
      margin-bottom: 16rpx;

      .content-preview {
        display: block;
        font-size: 26rpx;
        color: #666;
        line-height: 1.6;
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16rpx;
      border-top: 1rpx solid #f0f0f0;

      .article-meta {
        display: flex;
        gap: 20rpx;

        .meta-item {
          font-size: 22rpx;
          color: #999;
        }
      }

      .status-badge {
        padding: 6rpx 16rpx;
        border-radius: 12rpx;
        background: #e6f7ff;

        &.published {
          background: #f6ffed;
        }

        .status-text {
          font-size: 22rpx;
          font-weight: 500;
          color: #1890ff;
        }

        &.published .status-text {
          color: #52c41a;
        }
      }
    }
  }
}
</style>
