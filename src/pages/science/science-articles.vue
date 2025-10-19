<template>
  <view class="science-container">
    <!-- 顶部标题栏 -->
    <view class="page-header">
      <view class="header-left"></view>
      <view class="header-center">
        <text class="page-title">健康科普</text>
        <text class="page-subtitle">守护认知健康</text>
      </view>
      <view class="header-right"></view>
    </view>

    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-container">
        <view class="search-icon">🔍</view>
        <input 
          class="search-input"
          v-model="searchKeyword"
          placeholder="搜索科普内容..."
          placeholder-class="search-placeholder"
          @input="onSearch"
        />
      </view>
    </view>

    <!-- 分类标签 -->
    <view class="category-section">
      <scroll-view class="category-scroll" scroll-x>
        <view class="category-list">
          <view 
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)">
            <text class="category-icon">{{ category.icon }}</text>
            <text class="category-text">{{ category.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 科普文章列表 -->
    <scroll-view class="articles-container" scroll-y>
      <view class="articles-list">
        <!-- 文章卡片 -->
        <view 
          v-for="(article, index) in filteredArticles"
          :key="index"
          class="article-card"
          @click="openArticle(article)">
          
          <view class="card-header">
            <view class="article-icon">{{ article.icon }}</view>
            <view class="article-info">
              <text class="article-title">{{ article.title }}</text>
              <text class="article-desc">{{ article.description }}</text>
            </view>
            <view class="read-status">
              <text class="status-text">{{ article.isRead ? '已读' : '未读' }}</text>
              <view class="status-dot" :class="{ read: article.isRead }"></view>
            </view>
          </view>

          <view class="card-content">
            <text class="content-preview">{{ article.preview }}</text>
            
            <view class="article-tags">
              <view 
                v-for="tag in article.tags"
                :key="tag"
                class="tag-item">
                <text class="tag-text">{{ tag }}</text>
              </view>
            </view>
          </view>

          <view class="card-footer">
            <view class="read-info">
              <text class="read-time">{{ article.readTime }}</text>
              <text class="difficulty">{{ article.difficulty }}</text>
            </view>
            <view class="arrow-icon">→</view>
          </view>
        </view>

        <!-- 加载更多 -->
        <view v-if="filteredArticles.length === 0" class="no-results">
          <text class="no-results-icon">📚</text>
          <text class="no-results-text">暂无相关科普文章</text>
        </view>
      </view>
    </scroll-view>

    <!-- 悬浮按钮 -->
    <view class="float-actions">
      <view class="float-btn ai-consult" @click="goToAI">
        <text class="float-icon">🤖</text>
        <text class="float-text">AI咨询</text>
      </view>
    </view>
  </view>

  <!-- 文章详情弹窗 -->
  <view v-if="showArticleDetail" class="article-modal" @click="closeArticle">
    <view class="modal-content" @click.stop="">
      <view class="modal-header">
        <text class="modal-title">{{ selectedArticle.title }}</text>
        <view class="close-btn" @click="closeArticle">×</view>
      </view>
      
      <scroll-view class="modal-body" scroll-y>
        <view class="article-full-content">
          <view 
            v-for="(section, index) in selectedArticle.fullContent"
            :key="index"
            class="content-section">
            
            <text class="section-title">{{ section.title }}</text>
            
            <view 
              v-for="(item, itemIndex) in section.items"
              :key="itemIndex"
              class="content-item">
              
              <view v-if="item.type === 'text'" class="text-content">
                <text class="content-text">{{ item.content }}</text>
              </view>
              
              <view v-if="item.type === 'list'" class="list-content">
                <view 
                  v-for="(listItem, listIndex) in item.items"
                  :key="listIndex"
                  class="list-item">
                  <text class="list-number">{{ listIndex + 1 }}.</text>
                  <text class="list-text">{{ listItem }}</text>
                </view>
              </view>
              
              <view v-if="item.type === 'tip'" class="tip-content">
                <text class="tip-icon">💡</text>
                <text class="tip-text">{{ item.content }}</text>
              </view>
              
              <view v-if="item.type === 'exercise'" class="exercise-content">
                <text class="exercise-icon">🏃</text>
                <text class="exercise-text">{{ item.content }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="modal-footer">
        <button class="action-btn favorite" @click="toggleFavorite">
          {{ selectedArticle.isFavorite ? '❤️ 已收藏' : '♡ 收藏' }}
        </button>
        <button class="action-btn share" @click="shareArticle">
          📤 分享
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      selectedCategory: 'all',
      showArticleDetail: false,
      selectedArticle: null,
      
      // 分类列表
      categories: [
        { id: 'all', name: '全部', icon: '📚' },
        { id: 'alzheimer', name: '阿尔兹海默', icon: '🧠' },
        { id: 'exercise', name: '康复训练', icon: '🏃' },
        { id: 'nutrition', name: '营养健康', icon: '🥗' },
        { id: 'lifestyle', name: '生活方式', icon: '🌅' },
        { id: 'emotion', name: '情绪管理', icon: '😊' }
      ],
      
      // 科普文章数据
      articles: [
        {
          id: 1,
          title: '大脑的小故事：阿尔兹海默病究竟是什么？',
          description: '了解阿尔兹海默病的基本知识和预防方法',
          preview: '阿尔兹海默病是一种进行性的大脑疾病，是痴呆症中最常见的类型，会导致记忆、思考和行为出现异常...',
          icon: '🧠',
          category: 'alzheimer',
          tags: ['认知障碍', '早期预防', '基础知识'],
          readTime: '5分钟',
          difficulty: '基础',
          isRead: false,
          isFavorite: false,
          fullContent: [
            {
              title: '什么是阿尔兹海默病？',
              items: [
                {
                  type: 'text',
                  content: '阿尔兹海默病是一种进行性的大脑疾病，是痴呆症中最常见的类型，会导致记忆、思考和行为出现异常，严重影响日常生活。'
                },
                {
                  type: 'text',
                  content: '想象一下，大脑就像一个巨大的仓库，里面存放着我们的一切记忆、知识和经验。每当我们学习新东西或经历新事物时，这个仓库就会增加新的"货物"。然而，随着年龄的增长，这个仓库可能会出现一些"管理"上的问题，导致我们难以存取或丢失一些"货物"。'
                },
                {
                  type: 'tip',
                  content: '早发现、早诊断、早干预，是应对阿尔兹海默病的最有效手段，可以有效延缓疾病进展，提高生活质量，减轻家庭负担。'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          title: '警惕这些早期信号！',
          description: '识别阿尔兹海默病的9个关键早期症状',
          preview: '如果出现记忆减退、计划困难、时间地点混淆等症状，可能是记忆的"黄灯"在闪烁...',
          icon: '⚠️',
          category: 'alzheimer',
          tags: ['早期症状', '自我检测', '预警信号'],
          readTime: '8分钟',
          difficulty: '基础',
          isRead: false,
          isFavorite: false,
          fullContent: [
            {
              title: '9个关键早期信号',
              items: [
                {
                  type: 'list',
                  items: [
                    '记忆减退：尤其是近期记忆，重复询问，忘记重要日期或事件',
                    '计划或解决问题困难：难以管理财务，遵循熟悉的食谱等',
                    '完成熟悉的任务有困难：如忘记如何开车去常去的地方',
                    '时间地点混淆：记不清年月日、季节，或者在熟悉的地方迷路',
                    '语言表达障碍：忘记简单的词汇，叫错名字、话到嘴边说不出',
                    '物品错放：把东西放在错误的地方，且忘记放在哪里无法找回',
                    '情绪或性格改变：变得困惑、多疑、抑郁、恐惧或焦虑',
                    '判断或做决定能力下降：做选择或分辨事情对错比以前更困难',
                    '做事失去主动性：不再自己想着去做事情，需要别人提醒'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          title: '手指动一动，大脑亮起来',
          description: '简单易学的手指操，激活大脑活力',
          preview: '通过简单的手指锻炼，可以有效刺激大脑，改善认知功能，预防记忆衰退...',
          icon: '✋',
          category: 'exercise',
          tags: ['手指操', '康复训练', '认知锻炼'],
          readTime: '6分钟',
          difficulty: '简单',
          isRead: true,
          isFavorite: true,
          fullContent: [
            {
              title: '手指锻炼操',
              items: [
                {
                  type: 'exercise',
                  content: '吸足气用力握拳。握拳时将拇指握在掌心，用力吐气同时急速依次伸开小指，无名指，中指，食指。双手均做若干次。'
                },
                {
                  type: 'exercise',
                  content: '双手手腕伸直，使五指靠拢，然后张开，反复做若干次。'
                },
                {
                  type: 'exercise',
                  content: '抬肘与胸平，两手手指相对，互相按压，用力深吸气，特别是拇指和小指要用力。边吐气，边用力按。'
                },
                {
                  type: 'exercise',
                  content: '将腕抬到与胸同高的位置上，双手对应手指互勾，用力向两侧拉。'
                },
                {
                  type: 'exercise',
                  content: '双手手指交叉相握，手指伸向手背，以腕为轴来回自由转动。'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          title: '五彩餐盘：饮食与大脑健康',
          description: '科学饮食搭配，为大脑提供最佳营养',
          preview: '合理的饮食搭配可以为大脑提供充足营养，有效预防认知衰退...',
          icon: '🥗',
          category: 'nutrition',
          tags: ['健康饮食', '抗氧化', '营养搭配'],
          readTime: '7分钟',
          difficulty: '基础',
          isRead: false,
          isFavorite: false,
          fullContent: [
            {
              title: '大脑健康饮食指南',
              items: [
                {
                  type: 'list',
                  items: [
                    '富有抗氧化成分的蔬果：菠菜、花椰菜、地瓜等绿色蔬菜，可使记忆衰退减缓40%',
                    '莓果类：草莓或蓝莓，可以预防身体和脑细胞老化，增加记忆、平衡和运动技巧',
                    '巧克力：可以活跃脑部血液循环，每天两杯可可，两周后脑血液循环加快10%',
                    '深海鱼：鲑鱼、金枪鱼、沙丁鱼等，每星期吃2-3次以上，认知症几率下降20-40%',
                    '坚果类：杏仁、核桃等，富有抗氧化成分，可以防止老年认知症'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          title: '大脑的节奏：日常作息与认知',
          description: '规律作息对大脑健康的重要性',
          preview: '我们的大脑就像一台精密的音乐厅，需要规律的作息才能保持最佳状态...',
          icon: '🌅',
          category: 'lifestyle',
          tags: ['作息规律', '睡眠质量', '生活习惯'],
          readTime: '6分钟',
          difficulty: '基础',
          isRead: false,
          isFavorite: false,
          fullContent: [
            {
              title: '规律作息的重要性',
              items: [
                {
                  type: 'text',
                  content: '我们的大脑就像一台小小的音乐厅，每天都有自己的节奏。它需要规律的作息、充足的睡眠和健康的生活习惯，才能保持"演奏"的流畅和精彩。'
                },
                {
                  type: 'tip',
                  content: '尽量每天保持7~8小时的高质量睡眠，晚上少看手机或电视，让大脑慢慢进入休息模式。'
                },
                {
                  type: 'list',
                  items: [
                    '大脑有隐形的生物钟，规律作息让记忆力和注意力更好',
                    '睡眠时大脑会清理"垃圾信息"，巩固白天学到的知识',
                    '晨间散步、与朋友聊天、下棋等活动让大脑更灵活',
                    '早睡早起、按时用餐、适度活动是认知健康的关键'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 6,
          title: '笑一笑，脑袋亮堂堂：情绪管理',
          description: '积极情绪对大脑健康的神奇作用',
          preview: '良好的情绪管理不仅让心情愉悦，更是大脑健康的秘密武器...',
          icon: '😊',
          category: 'emotion',
          tags: ['情绪管理', '心理健康', '压力缓解'],
          readTime: '5分钟',
          difficulty: '基础',
          isRead: false,
          isFavorite: false,
          fullContent: [
            {
              title: '情绪与大脑的关系',
              items: [
                {
                  type: 'text',
                  content: '你有没有发现，当心情好、笑容满面的时候，大脑似乎也特别"聪明活跃"？其实，情绪与大脑健康息息相关，学会管理情绪，就像给大脑加油一样。'
                },
                {
                  type: 'list',
                  items: [
                    '开心会让大脑释放"快乐激素"，记忆力更好，思维更敏捷',
                    '笑能放松大脑紧张感，改善血液循环，增强免疫力',
                    '深呼吸3~5次可以让大脑平静下来',
                    '写日记让情绪有出口，做喜欢的事转移注意力',
                    '与家人朋友多交流，减少孤独感，保持情绪稳定'
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    filteredArticles() {
      let articles = this.articles
      
      // 分类筛选
      if (this.selectedCategory !== 'all') {
        articles = articles.filter(article => article.category === this.selectedCategory)
      }
      
      // 搜索筛选
      if (this.searchKeyword.trim()) {
        const keyword = this.searchKeyword.toLowerCase()
        articles = articles.filter(article => 
          article.title.toLowerCase().includes(keyword) ||
          article.description.toLowerCase().includes(keyword) ||
          article.tags.some(tag => tag.toLowerCase().includes(keyword))
        )
      }
      
      return articles
    }
  },
  methods: {
    // 搜索
    onSearch() {
      // 搜索功能已通过计算属性实现
    },
    
    // 选择分类
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
    },
    
    // 打开文章详情
    openArticle(article) {
      this.selectedArticle = article
      this.showArticleDetail = true
      
      // 标记为已读
      article.isRead = true
    },
    
    // 关闭文章详情
    closeArticle() {
      this.showArticleDetail = false
      this.selectedArticle = null
    },
    
    // 切换收藏
    toggleFavorite() {
      if (this.selectedArticle) {
        this.selectedArticle.isFavorite = !this.selectedArticle.isFavorite
        uni.showToast({
          title: this.selectedArticle.isFavorite ? '已收藏' : '已取消收藏',
          icon: 'success'
        })
      }
    },
    
    // 分享文章
    shareArticle() {
      uni.showActionSheet({
        itemList: ['微信好友', '朋友圈', '复制链接'],
        success: (res) => {
          const actions = ['微信好友', '朋友圈', '复制链接']
          uni.showToast({
            title: `分享到${actions[res.tapIndex]}`,
            icon: 'success'
          })
        }
      })
    },
    
    // 跳转到AI咨询
    goToAI() {
      uni.switchTab({
        url: '/pages/ai-assistant/ai-assistant'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.science-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

// 顶部标题栏
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  padding: 32rpx 3% 32rpx 5%;
  padding-top: calc(32rpx + env(safe-area-inset-top));
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.3);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '📚';
    position: absolute;
    top: -20rpx;
    right: -20rpx;
    font-size: 200rpx;
    opacity: 0.1;
    transform: rotate(15deg);
  }

  .header-left, .header-right {
    width: 80rpx;
  }

  .back-btn {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    backdrop-filter: blur(10rpx);
    
    .back-icon {
      font-size: 32rpx;
      color: white;
      font-weight: bold;
    }
  }

  .header-center {
    flex: 1;
    text-align: center;

    .page-title {
      display: block;
      font-size: 40rpx;
      font-weight: 700;
      color: white;
      margin-bottom: 8rpx;
      letter-spacing: 2rpx;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }

    .page-subtitle {
      display: block;
      font-size: 26rpx;
      color: rgba(255, 255, 255, 0.95);
      letter-spacing: 1rpx;
    }
  }
}

// 搜索区域
.search-section {
  padding: 24rpx 3% 24rpx 5%;
  background: white;
  border-bottom: 1rpx solid #f0f0f0;
  flex-shrink: 0;

  .search-container {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
    border: 2rpx solid #91d5ff;
    border-radius: 40rpx;
    padding: 0 28rpx;
    height: 88rpx;
    max-width: 700rpx;
    margin: 0 auto;
    box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.1);
    transition: all 0.3s ease;

    &:focus-within {
      border-color: #1890ff;
      box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.2);
    }

    .search-icon {
      font-size: 36rpx;
      color: #1890ff;
      margin-right: 16rpx;
    }

    .search-input {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      background: transparent;
    }

    .search-placeholder {
      color: #999;
      font-size: 28rpx;
    }
  }
}

// 分类标签
.category-section {
  background: white;
  padding: 20rpx 0 24rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  flex-shrink: 0;

  .category-scroll {
    width: 100%;
  }

  .category-list {
    display: flex;
    padding: 0 3% 0 5%;
    gap: 20rpx;
  }

  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 28rpx;
    border-radius: 28rpx;
    background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
    border: 2rpx solid transparent;
    min-width: 130rpx;
    flex-shrink: 0;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4rpx;
      background: linear-gradient(90deg, #1890ff 0%, #096dd9 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .category-icon {
      font-size: 44rpx;
      margin-bottom: 8rpx;
      transition: transform 0.3s ease;
    }

    .category-text {
      font-size: 26rpx;
      color: #666;
      white-space: nowrap;
      font-weight: 500;
    }

    &.active {
      background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
      border-color: #91d5ff;
      box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.15);

      &::before {
        opacity: 1;
      }

      .category-icon {
        transform: scale(1.1);
      }

      .category-text {
        color: #0050b3;
        font-weight: 700;
      }
    }
  }
}

// 文章列表
.articles-container {
  flex: 1;
  padding: 32rpx 0;
  padding-bottom: calc(32rpx + 120rpx + env(safe-area-inset-bottom));
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 28rpx;
  max-width: 700rpx;
  width: 90%;
  margin: 0 auto;
}

.article-card {
  background: white;
  border-radius: 28rpx;
  padding: 36rpx;
  box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.12);
  border: 2rpx solid #f0f0f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 8rpx;
    height: 100%;
    background: linear-gradient(180deg, #1890ff 0%, #096dd9 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:active {
    border-color: #91d5ff;
    transform: scale(0.98);
    box-shadow: 0 12rpx 32rpx rgba(24, 144, 255, 0.2);

    &::before {
      opacity: 1;
    }
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24rpx;

    .article-icon {
      font-size: 56rpx;
      margin-right: 24rpx;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 88rpx;
      height: 88rpx;
      background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
      border-radius: 20rpx;
      box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.1);
    }

    .article-info {
      flex: 1;

      .article-title {
        display: block;
        font-size: 34rpx;
        font-weight: 700;
        color: #262626;
        margin-bottom: 12rpx;
        line-height: 1.4;
        letter-spacing: 0.5rpx;
      }

      .article-desc {
        display: block;
        font-size: 28rpx;
        color: #8c8c8c;
        line-height: 1.6;
      }
    }

    .read-status {
      display: flex;
      align-items: center;
      gap: 8rpx;
      flex-shrink: 0;
      padding: 8rpx 16rpx;
      background: #fafafa;
      border-radius: 20rpx;

      .status-text {
        font-size: 24rpx;
        color: #999;
        font-weight: 500;
      }

      .status-dot {
        width: 14rpx;
        height: 14rpx;
        border-radius: 50%;
        background: #d9d9d9;
        box-shadow: 0 0 0 3rpx rgba(217, 217, 217, 0.2);

        &.read {
          background: #52c41a;
          box-shadow: 0 0 0 3rpx rgba(82, 196, 26, 0.2);
          animation: pulse-read 2s infinite;
        }
      }
    }
  }

@keyframes pulse-read {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

  .card-content {
    margin-bottom: 28rpx;

    .content-preview {
      display: block;
      font-size: 30rpx;
      color: #595959;
      line-height: 1.8;
      margin-bottom: 24rpx;
      text-indent: 2em;
    }

    .article-tags {
      display: flex;
      gap: 16rpx;
      flex-wrap: wrap;

      .tag-item {
        padding: 10rpx 20rpx;
        background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
        border-radius: 20rpx;
        border: 1rpx solid #91d5ff;
        transition: all 0.3s ease;

        .tag-text {
          font-size: 24rpx;
          color: #1890ff;
          font-weight: 500;
        }
      }
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20rpx;
    border-top: 1rpx solid #f0f0f0;

    .read-info {
      display: flex;
      gap: 28rpx;
      align-items: center;

      .read-time, .difficulty {
        font-size: 26rpx;
        color: #8c8c8c;
        display: flex;
        align-items: center;
        gap: 6rpx;

        &::before {
          content: '';
          width: 8rpx;
          height: 8rpx;
          background: #1890ff;
          border-radius: 50%;
        }
      }

      .read-time::before {
        content: '⏱️';
        width: auto;
        height: auto;
        background: none;
      }

      .difficulty::before {
        content: '📊';
        width: auto;
        height: auto;
        background: none;
      }
    }

    .arrow-icon {
      font-size: 32rpx;
      color: #1890ff;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48rpx;
      height: 48rpx;
      background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
      border-radius: 50%;
    }
  }
}

// 无结果提示
.no-results {
  text-align: center;
  padding: 120rpx 32rpx;

  .no-results-icon {
    font-size: 120rpx;
    margin-bottom: 32rpx;
    display: block;
    animation: float 3s ease-in-out infinite;
  }

  .no-results-text {
    font-size: 30rpx;
    color: #bfbfbf;
    font-weight: 500;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20rpx);
  }
}

// 悬浮按钮
.float-actions {
  position: fixed;
  right: 3%;
  bottom: calc(32rpx + 120rpx + env(safe-area-inset-bottom));
  z-index: 100;

  .float-btn {
    display: flex;
    align-items: center;
    gap: 12rpx;
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    padding: 24rpx 36rpx;
    border-radius: 40rpx;
    box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.4);
    animation: pulse-btn 2s infinite;

    .float-icon {
      font-size: 32rpx;
      color: white;
    }

    .float-text {
      font-size: 28rpx;
      color: white;
      font-weight: 700;
      letter-spacing: 1rpx;
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

@keyframes pulse-btn {
  0%, 100% {
    box-shadow: 0 8rpx 24rpx rgba(24, 144, 255, 0.4);
  }
  50% {
    box-shadow: 0 12rpx 32rpx rgba(24, 144, 255, 0.6);
  }
}

// 文章详情弹窗
.article-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;

  .modal-content {
    background: white;
    width: 100%;
    height: 80vh;
    border-radius: 32rpx 32rpx 0 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 32rpx 5% 32rpx 5%;
      border-bottom: 1rpx solid #f0f0f0;

      .modal-title {
        font-size: 36rpx;
        font-weight: 600;
        color: #333;
        flex: 1;
        padding-right: 20rpx;
      }

      .close-btn {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 36rpx;
        color: #666;
      }
    }

    .modal-body {
      flex: 1;
      padding: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      .article-full-content {
        width: 90%;
        max-width: 700rpx;
        margin: 32rpx auto;
        padding: 0 20rpx;

        .content-section {
          margin-bottom: 40rpx;

          .section-title {
            display: block;
            font-size: 32rpx;
            font-weight: 600;
            color: #1890ff;
            margin-bottom: 24rpx;
            padding-left: 16rpx;
            border-left: 6rpx solid #1890ff;
          }

          .content-item {
            margin-bottom: 24rpx;

            .text-content .content-text {
              font-size: 30rpx;
              color: #333;
              line-height: 1.8;
            }

            .list-content {
              .list-item {
                display: flex;
                margin-bottom: 16rpx;
                padding: 16rpx;
                background: #f8f9fa;
                border-radius: 12rpx;

                .list-number {
                  font-size: 28rpx;
                  color: #1890ff;
                  font-weight: 600;
                  margin-right: 16rpx;
                  flex-shrink: 0;
                }

                .list-text {
                  font-size: 28rpx;
                  color: #333;
                  line-height: 1.6;
                }
              }
            }

            .tip-content {
              display: flex;
              align-items: flex-start;
              background: linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%);
              border-left: 6rpx solid #fa8c16;
              border-radius: 12rpx;
              padding: 24rpx;

              .tip-icon {
                font-size: 32rpx;
                margin-right: 16rpx;
                flex-shrink: 0;
              }

              .tip-text {
                font-size: 28rpx;
                color: #d46b08;
                line-height: 1.6;
              }
            }

            .exercise-content {
              display: flex;
              align-items: flex-start;
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border-left: 6rpx solid #1890ff;
              border-radius: 12rpx;
              padding: 24rpx;

              .exercise-icon {
                font-size: 32rpx;
                margin-right: 16rpx;
                flex-shrink: 0;
              }

              .exercise-text {
                font-size: 28rpx;
                color: #0050b3;
                line-height: 1.6;
              }
            }
          }
        }
      }
    }

    .modal-footer {
      padding: 24rpx 5%;
      padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
      background: #f8f9fa;
      display: flex;
      gap: 24rpx;
      justify-content: center;

      .action-btn {
        flex: 1;
        max-width: 340rpx;
        padding: 24rpx;
        border-radius: 16rpx;
        font-size: 28rpx;
        font-weight: 600;
        border: none;

        &.favorite {
          background: #f6ffed;
          color: #52c41a;
          border: 2rpx solid #b7eb8f;
        }

        &.share {
          background: #e6f7ff;
          color: #1890ff;
          border: 2rpx solid #91d5ff;
        }
      }
    }
  }
}
</style>

