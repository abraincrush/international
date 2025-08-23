<script setup lang="ts">
import { ref } from 'vue'
import { ElTag, ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

interface Agent {
  id: string
  name: string
  avatar: string
  description: string
  category: string
  tags: string[]
  rating: number
  usageCount: number
  author: string
  coverImage: string
}

const featuredAgents = ref<Agent[]>([
  {
    id: 'writing-assistant',
    name: '智能写作助手',
    avatar: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop',
    description: '专业的中英文写作辅导与创意灵感',
    category: '写作',
    tags: ['写作', '文档', '创意'],
    rating: 4.8,
    usageCount: 12500,
    author: '@sheap',
    coverImage: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'code-reviewer',
    name: '代码审查大师',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop',
    description: '智能代码审查与优化建议',
    category: '编程',
    tags: ['编程', '代码审查', '优化'],
    rating: 4.9,
    usageCount: 8900,
    author: '@sheap',
    coverImage: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'data-analyst',
    name: '数据洞察专家',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
    description: '专业数据分析与可视化洞察',
    category: '数据',
    tags: ['数据分析', '可视化', '洞察'],
    rating: 4.7,
    usageCount: 6200,
    author: '@sheap',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'language-tutor',
    name: '多语言导师',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    description: '多语言学习与跨文化交流指导',
    category: '语言',
    tags: ['语言学习', '口语', '文化'],
    rating: 4.6,
    usageCount: 15600,
    author: '@sheap',
    coverImage: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600&auto=format&fit=crop'
  }
])

const categories = ref(['全部', '写作', '编程', '数据', '语言', '设计', '健康', '商业', '学习'])
const selectedCategory = ref('')
const searchQuery = ref('')

const emit = defineEmits<{
  selectAgent: [agentId: string]
}>()

function handleSelectAgent(agentId: string) {
  emit('selectAgent', agentId)
}

function handleCategoryChange(category: string) {
  selectedCategory.value = selectedCategory.value === category ? '' : category
}
</script>

<template>
  <div class="explore-view">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">探索</h1>
      <div class="search-box">
        <ElInput
          v-model="searchQuery"
          placeholder="搜索智能体"
          :prefix-icon="Search"
          clearable
          class="search-input"
        />
      </div>
    </div>

    <!-- AI快速体验入口 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">吉卜力风格滤镜</h1>
          <p class="hero-subtitle">上传你的照片秒变吉卜力风格照片</p>
          <button class="hero-btn">试一下</button>
        </div>
        <div class="hero-image">
          <div class="image-card image-card-1">
            <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=400&auto=format&fit=crop" alt="原图" />
          </div>
          <div class="image-card image-card-2">
            <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=400&auto=format&fit=crop&sat=-100&sepia=100&hue=240" alt="吉卜力风格" />
          </div>
        </div>
      </div>
    </section>

    <!-- 分类筛选 -->
    <section class="section">
      <div class="category-tags">
        <ElTag
          v-for="category in categories"
          :key="category"
          class="category-tag"
          :class="{ 'is-selected': selectedCategory === category }"
          effect="plain"
          @click="handleCategoryChange(category)"
        >
          {{ category }}
        </ElTag>
      </div>
    </section>

    <!-- 热门智能体 -->
    <section class="section">
      <div class="section-header-row">
        <span class="section-header-title">热门</span>
        <span class="section-header-arrow">></span>
      </div>
      
      <div class="explore-row">
        <div
          v-for="agent in featuredAgents"
          :key="agent.id"
          class="explore-card"
          @click="handleSelectAgent(agent.id)"
        >
          <img :src="agent.coverImage" class="explore-cover" />
          <div class="explore-info-row">
            <img :src="agent.avatar" class="explore-avatar" />
            <div class="explore-info-text">
              <span class="explore-title">{{ agent.name }}</span>
              <span class="explore-desc">{{ agent.description }}</span>
            </div>
            <button class="explore-btn">体验</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 编辑推荐 -->
    <section class="section section-full-width">
      <div class="section-header-row">
        <span class="section-header-title">编辑推荐</span>
        <span class="section-header-arrow">></span>
      </div>
      
      <div class="popular-row">
        <div
          v-for="agent in featuredAgents.slice(0, 3)"
          :key="agent.id + '-popular'"
          class="popular-card popular-horizontal"
          @click="handleSelectAgent(agent.id)"
        >
          <img :src="agent.avatar" class="popular-thumb" />
          <div class="popular-info-text">
            <span class="popular-title">{{ agent.name }}</span>
            <span class="popular-desc">{{ agent.description }}</span>
            <span class="popular-user">{{ agent.author }}</span>
          </div>
          <button class="popular-btn">体验</button>
        </div>
      </div>
      
      <div class="popular-row">
        <div
          v-for="agent in featuredAgents.slice(0, 3)"
          :key="agent.id + '-popular2'"
          class="popular-card popular-horizontal"
          @click="handleSelectAgent(agent.id)"
        >
          <img :src="agent.avatar" class="popular-thumb" />
          <div class="popular-info-text">
            <span class="popular-title">{{ agent.name }}</span>
            <span class="popular-desc">{{ agent.description }}</span>
            <span class="popular-user">{{ agent.author }}</span>
          </div>
          <button class="popular-btn">体验</button>
        </div>
      </div>
    </section>


  </div>
</template>

<style scoped>
.explore-view {
  padding: 0;
  height: 100%;
  overflow-y: auto;
  background: #fff;
}

/* 页面头部样式 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 0 16px;
  margin-bottom: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.search-box {
  width: 300px;
}

.search-input {
  border-radius: 20px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  background: #f5f5f7;
  border: none;
  box-shadow: none;
  padding: 0 16px;
  height: 40px;
}

.search-input :deep(.el-input__inner) {
  color: #8e8e93;
  font-size: 14px;
}

.search-input :deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

/* Hero区块样式 */
.hero-section {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 16px;
  margin: 16px;
  padding: 24px;
  overflow: hidden;
  position: relative;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.hero-text {
  flex: 1;
  max-width: 400px;
}

.hero-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.hero-btn {
  background: #333;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.hero-btn:hover {
  background: #555;
  transform: translateY(-1px);
}

.hero-image {
  flex-shrink: 0;
  width: 280px;
  height: 140px;
  position: relative;
}

.image-card {
  position: absolute;
  width: 160px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 3px solid #fff;
  transition: transform 0.3s ease;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-card-1 {
  top: 20px;
  left: 0;
  transform: rotate(-8deg);
  z-index: 1;
}

.image-card-2 {
  top: 0;
  right: 0;
  transform: rotate(5deg);
  z-index: 2;
}

.hero-image:hover .image-card-1 {
  transform: rotate(-8deg) translateY(-5px);
}

.hero-image:hover .image-card-2 {
  transform: rotate(5deg) translateY(-5px);
}

.section {
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 12px;
  padding: 0 16px;
  max-width: 100%;
}

.section-full-width {
  padding: 0;
}

.section-full-width .section-header-row {
  padding: 0 16px;
}

.section-header-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  gap: 8px;
}

.section-header-title {
  font-size: 1em;
  color: #222;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin-left: 0px;
  margin-top: 10px;
  margin-bottom: 0px;
  display: inline-block;
}

.section-header-arrow {
  font-size: 1.1em;
  color: #b5aeea;
  margin-left: -4px;
  margin-top: 10px;
}

/* 探索区块卡片横向排列样式 */
.explore-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 10px;
}

.explore-card {
  flex: 1 1 0;
  max-width: 33.333%;
  background: transparent;
  border-radius: 16px;
  padding: 0;
  text-align: left;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 0;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.explore-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(80,60,180,0.08);
}

.explore-cover {
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
  border-radius: 16px 16px 16px 16px;
  margin-bottom: 10px;
}

.explore-card:hover .explore-cover {
  filter: saturate(1.05) brightness(1.02);
}

.explore-info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding: 0;
}

.explore-avatar {
  width: 54px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.explore-info-text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.explore-title {
  font-weight: bold;
  font-size: 1.08em;
  margin-bottom: 2px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.explore-desc {
  color: #888;
  font-size: 0.96em;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.explore-btn {
  margin-left: 8px;
  border-radius: 16px;
  font-size: 0.98em;
  padding: 2px 16px;
  border: 1px solid #b5aeea;
  color: #7b5be6;
  background: rgba(245,243,255,0.5);
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.explore-btn:hover {
  background: #ede9fe;
  box-shadow: 0 6px 16px rgba(123,91,230,0.18);
}

/* 热门项目区块样式 */
.popular-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 10px;
  padding: 0 16px;
}

.section-full-width .popular-row {
  padding: 0 16px;
}

.popular-card {
  flex: 1 1 0;
  max-width: 33.333%;
  background: transparent;
  border-radius: 16px;
  padding: 0;
  text-align: left;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 0;
}

/* 横向卡片样式 */
.popular-card.popular-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 60px;
  padding: 6px 10px;
  gap: 8px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(80,60,180,0.04);
  border: 1px solid #eef1ff;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
  cursor: pointer;
}

.popular-card.popular-horizontal:hover {
  box-shadow: 0 8px 24px rgba(80,60,180,0.10);
  transform: translateY(-1px);
}

.popular-thumb {
  width: 54px;
  height: 44px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.popular-title {
  font-size: 1em;
  font-weight: 600;
  color: #222;
  margin-bottom: 0;
  line-height: 1.15;
}

.popular-desc {
  color: #aaa;
  font-size: 0.85em;
  line-height: 1.1;
  margin-bottom: 0;
}

.popular-user {
  color: #7b5be6;
  font-size: 0.92em;
  margin-top: 0;
}

.popular-btn {
  font-size: 0.92em;
  padding: 0 10px;
  border-radius: 12px;
  height: 24px;
  line-height: 22px;
  background: #fff;
  border: 1px solid #b5aeea;
  color: #7b5be6;
  cursor: pointer;
  transition: background 0.2s;
}

.popular-btn:hover {
  background: #ede9fe;
  box-shadow: 0 4px 12px rgba(123,91,230,0.18);
}

.popular-info-text {
  flex: 1 1 auto;
  min-width: 0;
  height: auto;
  display: grid;
  grid-template-rows: 14px 6px 12px 2px 12px;
  row-gap: 0;
  align-content: center;
}

.popular-title {
  grid-row: 1;
  margin: 0;
  height: auto;
  font-size: 13px;
  line-height: 14px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.popular-desc {
  grid-row: 3;
  margin: 0;
  height: auto;
  font-size: 11px;
  line-height: 11px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.popular-user {
  grid-row: 5;
  margin: 0;
  height: auto;
  font-size: 11px;
  line-height: 11px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #7b5be6;
}

/* 分类标签 */
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
}

.category-tag {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
}

/* 默认状态 - 灰色背景，黑色字 */
.category-tag {
  background: #f5f5f5 !important;
  color: #333 !important;
  border: none !important;
}

.category-tag:hover:not(.el-tag--primary) {
  background: #e8e8e8 !important;
  transform: translateY(-1px);
}

/* 选中状态 - 紫色背景，白色字 */
.category-tag.is-selected {
  background: #7b5be6 !important;
  color: #fff !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(123, 91, 230, 0.3);
}

.category-tag.is-selected:hover {
  background: #6a4fd3 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.4);
}
</style>
