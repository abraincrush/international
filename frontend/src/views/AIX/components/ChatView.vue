<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { ElMessage, ElButton, ElRadioGroup, ElRadioButton } from 'element-plus'
import { Icon } from '@iconify/vue'

// Types
type Role = 'user' | 'assistant' | 'system'
interface ChatMessage { id: string; role: Role; content: string; timestamp: number; images?: string[] }
interface SquarePost {
  id: string
  authorName: string
  authorAvatar: string
  image: string
  likes: number
  liked?: boolean
}
interface AssistantOption {
  id: string
  label: string
  emoji: string
  description: string
  system: string
  suggestions: string[]
}

const props = defineProps<{
  agentId: string
}>()

// 页面模式选择
const pageMode = ref<'chat' | 'square'>('chat')

// 广场示例数据
const squarePosts = ref<SquarePost[]>([
  {
    id: 'p1',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    likes: 123
  },
  {
    id: 'p2',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=2',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    likes: 222
  },
  {
    id: 'p3',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=3',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    likes: 88
  },
  {
    id: 'p4',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=4',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    likes: 156
  },
  {
    id: 'p5',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=5',
    image: 'https://images.unsplash.com/photo-1518552718888-7a1901f1b724?auto=format&fit=crop&w=800&q=80',
    likes: 97
  },
  {
    id: 'p6',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=6',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=800&q=80',
    likes: 301
  },
  {
    id: 'p7',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=7',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    likes: 64
  },
  {
    id: 'p8',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=8',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    likes: 142
  },
  {
    id: 'p9',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=9',
    image: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80',
    likes: 51
  },
  {
    id: 'p10',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=10',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    likes: 210
  },
  {
    id: 'p11',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=11',
    image: 'https://images.unsplash.com/photo-1520976197486-c8f6b1b2e994?auto=format&fit=crop&w=800&q=80',
    likes: 134
  },
  {
    id: 'p12',
    authorName: 'Jenny',
    authorAvatar: 'https://i.pravatar.cc/100?img=12',
    image: 'https://images.unsplash.com/photo-1503569752083-4bcb3a2b7815?auto=format&fit=crop&w=800&q=80',
    likes: 77
  }
])

function toggleLike(post: SquarePost) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

// 智能体配置（从原来的assistantOptions迁移）
const assistantOptions: AssistantOption[] = [
  {
    id: 'startup-coach',
    label: '创业助手',
    emoji: '🚀',
    description: '从想法→商业模型→路演材料，全流程辅导',
    system: '你是创业助手。用简单明确的步骤给出可执行建议，偏向精益创业、MVP、客户验证。输出结构化列表与简短模板。',
    suggestions: ['帮我把这个想法转成商业画布', '生成一页路演PPT大纲', '如何进行10位用户早测？']
  },
  {
    id: 'study-planner',
    label: '学习规划助手',
    emoji: '📚',
    description: '制定阶段目标、学习路径与每日清单',
    system: '你是学习规划助手。先询问目标与时间，再给阶段拆分、里程碑和每日任务清单，附关键资源链接占位符。',
    suggestions: ['帮我做三个月的英语口语计划', '为机器学习入门列出里程碑', '生成本周学习清单']
  },
  {
    id: 'career-mentor',
    label: '职业规划助手',
    emoji: '🎯',
    description: '胜任力画像、目标岗位差距与补全路径',
    system: '你是职业规划助手。根据目标岗位，生成能力矩阵、差距与补全建议，给出课程/项目建议占位。',
    suggestions: ['分析我与前端工程师岗位的差距', '给出三个月转岗路线', '生成面试准备清单']
  },
  {
    id: 'resume-coach',
    label: '简历辅导助手',
    emoji: '📝',
    description: '量化成果、STAR法则与要点优化',
    system: '你是简历辅导助手。以成果量化和STAR法优化要点，用中英文要点各3条。',
    suggestions: ['优化我这段项目经历', '把这段实习改写为要点', '生成英文简历要点']
  }
]

const activeAssistant = computed(() => 
  assistantOptions.find(a => a.id === props.agentId) || assistantOptions[0]
)

const messages = ref<ChatMessage[]>([])
const userInput = ref<string>('')
const isSending = ref<boolean>(false)
const chatBottomEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)
const maxInputHeight = 160

function scrollToBottom() {
  nextTick(() => {
    chatBottomEl.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

function autoResize() {
  if (!inputEl.value) return
  const el = inputEl.value
  el.style.height = 'auto'
  const newHeight = Math.min(el.scrollHeight, maxInputHeight)
  el.style.height = newHeight + 'px'
  el.style.overflowY = el.scrollHeight > maxInputHeight ? 'auto' : 'hidden'
}

function useSuggestion(suggestion: string) {
  userInput.value = suggestion
}

async function sendMessage() {
  const content = userInput.value.trim()
  if (!content) return

  // 如果是第一条消息，添加系统提示
  if (messages.value.length === 0) {
    messages.value.push({ 
      id: `m_${Date.now()-1}`, 
      role: 'system', 
      content: activeAssistant.value.system, 
      timestamp: Date.now() 
    })
  }

  messages.value.push({ 
    id: `m_${Date.now()}`, 
    role: 'user', 
    content, 
    timestamp: Date.now() 
  })
  userInput.value = ''
  nextTick(() => {
    autoResize()
  })
  scrollToBottom()

  isSending.value = true
  try {
    // 模拟流式响应
    const replyId = `m_${Date.now() + 1}`
    messages.value.push({ 
      id: replyId, 
      role: 'assistant', 
      content: '', 
      timestamp: Date.now(),
      images: [
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'
      ] 
    })

    const fakeChunks = [
      `作为${activeAssistant.value.label}，我已收到您的问题。`,
      '\n\n让我为您提供专业的建议：',
      '\n\n1. 首先分析您的需求...',
      '\n2. 然后制定具体方案...',
      '\n3. 最后给出执行步骤...',
      '\n\n如需更详细的指导，请继续提问。'
    ]
    
    for (const chunk of fakeChunks) {
      await new Promise(r => setTimeout(r, 300))
      const msg = messages.value.find(m => m.id === replyId)
      if (msg) msg.content += chunk
      scrollToBottom()
    }
  } catch (e) {
    console.error(e)
    ElMessage.error('发送失败，请稍后重试')
  } finally {
    isSending.value = false
  }
}

function clearChat() {
  messages.value = []
}

// 监听agentId变化，重置聊天
watch(() => props.agentId, () => {
  messages.value = []
}, { immediate: true })

onMounted(() => {
  nextTick(() => autoResize())
  // 预加载演示消息
  if (props.agentId === 'startup-coach') {
    messages.value.push({ 
      id: `m_demo_sys`, 
      role: 'system', 
      content: activeAssistant.value.system, 
      timestamp: Date.now() 
    })
    messages.value.push({ 
      id: `m_demo_u`, 
      role: 'user', 
      content: '我想把校园二手交易做成一个小程序，怎么验证有没有人需要？', 
      timestamp: Date.now() 
    })
    messages.value.push({ 
      id: `m_demo_a`, 
      role: 'assistant', 
      content: '建议：\n1) 明确目标用户（买家/卖家）\n2) 设计最小可行功能（发布/搜索/私聊）\n3) 用表单+海报在3天内收集50位意向用户\n4) 组织一次线下/群内"试卖"活动验证成交率', 
      images: [
        'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80'
      ],
      timestamp: Date.now() 
    })
  }
})
</script>

<template>
  <div class="chat-view">
    <!-- 主要内容容器 -->
    <div class="main-container">
      <!-- 页面模式选择 -->
      <div class="mode-selector">
        <div class="custom-radio-group">
          <div 
            class="custom-radio-item" 
            :class="{ active: pageMode === 'chat' }"
            @click="pageMode = 'chat'"
          >
            对话
          </div>
          <div 
            class="custom-radio-item" 
            :class="{ active: pageMode === 'square' }"
            @click="pageMode = 'square'"
          >
            广场
          </div>
        </div>
      </div>

      <!-- 对话模式内容 -->
      <div v-if="pageMode === 'chat'" class="chat-mode-content">
      <!-- 建议问题 -->
      <div v-if="messages.length === 0" class="suggestions-area">
        <div class="suggestions-title">试试这些问题：</div>
        <div class="suggestions-list">
          <div
            v-for="suggestion in activeAssistant.suggestions"
            :key="suggestion"
            class="suggestion-item"
            @click="useSuggestion(suggestion)"
          >
            {{ suggestion }}
          </div>
        </div>
      </div>

      <!-- 聊天区域 -->
      <div class="chat-area">
        <div class="messages-container">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="message.role"
          >
            <template v-if="message.role === 'assistant'">
              <!-- 左：头像 -->
              <div class="msg-left">
                <div class="assistant-avatar">{{ activeAssistant.emoji }}</div>
              </div>
              <!-- 中：内容块（文本 + 图片） -->
              <div class="msg-middle">
                <div class="msg-middle-inner">
                  <div class="assistant-title-group">
                    <div class="assistant-title">{{ activeAssistant.label }}</div>
                  </div>
                  <div class="assistant-card-text">{{ message.content }}</div>
                  <div v-if="message.images && message.images.length" class="assistant-image-grid">
                    <img v-for="(img, idx) in message.images" :key="idx" :src="img" alt="image" />
                  </div>
                </div>
              </div>
              <!-- 右：操作按钮 -->
              <div class="msg-right">
                <button class="square-action"><Icon icon="mdi:thumb-up-outline" width="16" /></button>
                <button class="square-action"><Icon icon="mdi:thumb-down-outline" width="16" /></button>
                <button class="square-action"><Icon icon="mdi:content-copy" width="16" /></button>
                <button class="square-action"><Icon icon="mdi:dots-vertical" width="16" /></button>
              </div>
            </template>
            <template v-else-if="message.role === 'user'">
              <!-- 右往左：右（操作） + 中（内容），无头像；logo 在文字左边 -->
              <div class="msg-right">
                <button class="square-action"><Icon icon="mdi:content-copy" width="16" /></button>
                <button class="square-action"><Icon icon="mdi:dots-vertical" width="16" /></button>
              </div>
              <div class="msg-middle">
                <div class="msg-middle-inner">
                  <div class="assistant-card-text">{{ message.content }}</div>
                  <div v-if="message.images && message.images.length" class="assistant-image-grid">
                    <img v-for="(img, idx) in message.images" :key="idx" :src="img" alt="image" />
                  </div>
                </div>
            </div>
            </template>
            <div v-else class="message-content">
              <div v-if="message.role !== 'system'" class="message-header">
                <span class="message-role">
                  {{ message.role === 'assistant' ? activeAssistant.label : '我' }}
                </span>
                <span class="message-time">
                  {{ new Date(message.timestamp).toLocaleTimeString() }}
                </span>
              </div>
              <div class="message-text">{{ message.content }}</div>
            </div>
          </div>
          <div ref="chatBottomEl"></div>
        </div>
        
        <!-- 固定输入区域 -->
        <div class="fixed-input-area">
          <div class="input-container">
            <!-- 左侧独立圆形logo -->
            <div class="logo-circle">
              <Icon icon="mdi:brush" width="16" />
            </div>
            <!-- 输入框容器 -->
            <div class="input-wrapper">
              <textarea
                ref="inputEl"
                v-model="userInput"
                placeholder="当前不可用，请稍作上面设可继续"
                class="message-input textarea-input"
                @input="autoResize"
                @keydown.enter.exact.prevent="sendMessage"
                rows="1"
              />
              <div class="input-right-icons">
                <div class="input-icon">
                  <Icon icon="mdi:plus-circle-outline" width="20" />
                </div>
                <div class="input-icon">
                  <Icon icon="mdi:microphone-outline" width="20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

          <!-- 广场模式内容 -->
      <div v-else class="square-mode-content">
        <div class="masonry-grid">
          <div
            v-for="post in squarePosts"
            :key="post.id"
            class="masonry-item"
          >
            <div class="post-card">
              <div class="post-image-wrapper">
                <img :src="post.image" alt="post" loading="lazy" />
              </div>
              <div class="post-meta">
                <div class="post-author">
                  <img :src="post.authorAvatar" alt="avatar" class="post-avatar" />
                  <span class="post-name">{{ post.authorName }}</span>
                </div>
                <div class="like-area">
                  <button
                    class="like-icon-btn"
                    :class="{ liked: post.liked }"
                    @click="toggleLike(post)"
                    aria-label="like"
                  >
                    <Icon v-if="!post.liked" icon="mdi:heart-outline" width="18" />
                    <Icon v-else icon="mdi:heart" width="18" />
                  </button>
                  <span class="like-count">{{ post.likes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 智能体信息区域 -->
    <div class="agent-info-section">
      <div class="agent-info-card">
        <div class="agent-row">
          <div class="agent-avatar">{{ activeAssistant.emoji }}</div>
          <div class="agent-meta">
            <div class="agent-name">{{ activeAssistant.label }}</div>
            <div class="agent-author">@作者</div>
          </div>
          <div class="agent-arrow">
            <Icon icon="mdi:chevron-double-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: transparent;
  gap: 0;
  padding: 0;
}

/* 主要内容容器 */
.main-container {
  flex: 1;
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

/* 模式选择器 */
.mode-selector {
  padding: 20px 24px 16px;
  background: #fff;
  text-align: center;
}

.custom-radio-group {
  display: inline-flex;
  background: #f0f2f5;
  border-radius: 20px;
  padding: 4px;
  gap: 2px;
}

.custom-radio-item {
  padding: 6px 16px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #606266;
  background: transparent;
  min-width: 50px;
  text-align: center;
}

.custom-radio-item:hover {
  color: #409eff;
}

.custom-radio-item.active {
  background: #8b5cf6;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3);
}

/* 对话模式内容 */
.chat-mode-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.suggestions-area {
  padding: 24px;
  background: #fff;
}

.suggestions-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.suggestion-item {
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #606266;
}

.suggestion-item:hover {
  border-color: #409eff;
  color: #409eff;
  background: #ecf5ff;
}

/* 聊天区域 */
.chat-area {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  min-height: 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 禁止横向滚动 */
  padding: 24px 24px 12px 24px;
  background: transparent;
  /* 启用滚动条并优化滚动体验 */
  scrollbar-width: thin; /* Firefox */
  -ms-overflow-style: auto; /* IE and Edge */
  -webkit-overflow-scrolling: touch; /* iOS 惯性滚动 */
  overscroll-behavior-y: contain; /* 阻止滚动穿透 */
}

.messages-container::-webkit-scrollbar { width: 6px; height: 6px; }
.messages-container::-webkit-scrollbar-track { background: transparent; }
.messages-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.18); border-radius: 6px; }
.messages-container::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.28); }

.message {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 20px;
}

.message.user {
  justify-content: flex-end;
  align-items: center; /* 垂直居中对齐操作按钮与文本块 */
}
/* 用户消息：限制最大宽度并靠右 */
.message.user .msg-right { order: 1; align-self: center; }
.message.user .msg-middle { order: 2; flex: 0 0 auto; }
.message.user { max-width: 820px; margin-left: auto; }
/* 用户消息：文本块自适应内容宽度，并与按钮居中对齐 */
.message.user .msg-middle-inner {
  display: inline-block; /* 允许根据文本收缩并在达到上限时换行 */
  width: auto;
  max-width: 680px;
  padding: 8px 10px;
  vertical-align: middle;
}
.message.user .assistant-card-text { margin-top: 0; }
.message.user .assistant-card-text { margin-top: 0; }

.message.system {
  display: none;
}

.message-avatar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  max-width: 70%;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
}

.message.user .message-content {
  background: linear-gradient(135deg, #409eff, #66b1ff);
  color: #fff;
  border-color: #409eff;
}

.message.assistant .message-content {
  background: #fff;
  border-color: #e4e7ed;
}

/* 新的助手卡片样式，模仿示例卡片布局 */
.assistant-avatar {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #f6f7fb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.assistant-title-group { flex: 1; min-width: 0; }
.assistant-title { font-size: 16px; font-weight: 700; color: #1d1d1f; }
.assistant-subtitle { font-size: 12px; color: #8e8e93; margin-top: 2px; }

/* 左中右布局 */
.msg-left { flex-shrink: 0; display: flex; align-items: flex-start; }
.msg-middle { flex: 1; padding-left: 6px; }
.msg-right { flex-shrink: 0; display: flex; gap: 6px; }

.msg-middle-inner {
  background: #f6f7fb;
  border: 1px solid #eef0f5;
  border-radius: 12px;
  padding: 10px;
}

.assistant-card-text { color: #303133; line-height: 1.7; margin-top: 6px; }
.assistant-card-text {
  white-space: normal; /* 允许换行 */
  word-break: break-word; /* 长单词/URL 断行 */
}

.assistant-image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.assistant-image-grid img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
}

.square-action {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: #f2f3f7;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* 限制整条助手消息最大宽度，不占满容器 */
.message.assistant { max-width: 820px; }

.message-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 12px;
}

.message-role {
  font-weight: 600;
  color: #409eff;
}

.message.user .message-role {
  color: rgba(255, 255, 255, 0.9);
}

.message-time {
  color: #909399;
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.7);
}

.message-text {
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  color: #303133;
}

.message.user .message-text {
  color: #fff;
}

/* 固定输入区域 */
.fixed-input-area {
  padding: 12px 24px 12px 24px;
  background: transparent;
  border-top: none;
  margin-bottom: 0;
  flex-shrink: 0; /* 固定在底部 */
}

.input-container {
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 100%;
}

.logo-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  flex-shrink: 0;
  border: 1px solid #e4e7ed;
}

.input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  padding: 8px 12px;
  gap: 10px;
  border: 1px solid #e5e5e5;
  transition: all 0.2s;
  min-height: 36px;
}

.input-wrapper:focus-within {
  border-color: #d1d5db;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.message-input {
  flex: 1;
  min-height: 20px;
  max-height: 160px;
  padding: 0;
  border: none;
  font-family: inherit;
  font-size: 13px;
  line-height: 20px;
  outline: none;
  background: transparent;
  vertical-align: middle;
  resize: none;
}

.textarea-input {
  width: 100%;
  overflow: hidden; /* 超过 max-height 后会切换到 auto */
}

.message-input::placeholder {
  color: #c0c4cc;
}

.input-right-icons {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #909399;
  cursor: pointer;
  transition: all 0.2s;
}

.input-icon:hover {
  background: #f0f0f0;
  color: #606266;
}

/* 广场模式内容 */
.square-mode-content {
  flex: 1;
  background: #fff;
  overflow: auto;
}

/* 瀑布流三列（仿小红书）：列宽固定，行不对齐 */
.masonry-grid {
  column-count: 3;
  column-gap: 12px;
  padding: 16px 16px 24px 16px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 12px;
}

.post-card {
  background: #fff;
  border: 1px solid #eef0f5;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.post-image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
}

.post-author { display: flex; align-items: center; gap: 8px; }
.post-avatar { width: 22px; height: 22px; border-radius: 50%; object-fit: cover; }
.post-name { font-size: 12px; color: #303133; }

.like-area { display: inline-flex; align-items: center; gap: 6px; }
.like-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 50%;
}
.like-icon-btn:hover { background: #f3f4f6; }
.like-icon-btn.liked { color: #ef4444; }
.like-count { font-size: 12px; color: #6b7280; }

/* 简单响应式：小屏两列 */
@media (max-width: 900px) {
  .masonry-grid { column-count: 2; }
}
@media (max-width: 600px) {
  .masonry-grid { column-count: 1; }
}

/* 智能体信息区域 */
.agent-info-section {
  padding: 0;
  margin-top: 12px; /* 控制与上方聊天容器的透明间隔 */
  background: transparent;
  flex-shrink: 0;
}

.agent-info-card {
  background: linear-gradient(to right, rgba(224, 242, 254, 0.6), rgba(243, 232, 255, 0.6));
  border-radius: 12px;
  padding: 12px 16px;
  border: none;
}

.agent-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.agent-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.agent-details {
  flex: 1;
}

.agent-name {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 1px 0;
}

.agent-author {
  font-size: 12px;
  color: #8e8e93;
  line-height: 1.2;
}

.agent-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-meta { flex: 1; min-width: 0; }

.agent-arrow { color: #c7c7cc; font-size: 16px; flex-shrink: 0; }
</style>
