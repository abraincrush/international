<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { ElMessage, ElButton } from 'element-plus'

// Types
type Role = 'user' | 'assistant' | 'system'
interface ChatMessage { id: string; role: Role; content: string; timestamp: number }
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

function scrollToBottom() {
  nextTick(() => {
    chatBottomEl.value?.scrollIntoView({ behavior: 'smooth' })
  })
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
  scrollToBottom()

  isSending.value = true
  try {
    // 模拟流式响应
    const replyId = `m_${Date.now() + 1}`
    messages.value.push({ 
      id: replyId, 
      role: 'assistant', 
      content: '', 
      timestamp: Date.now() 
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
      timestamp: Date.now() 
    })
  }
})
</script>

<template>
  <div class="chat-view">
    <!-- 智能体信息头部 -->
    <header class="chat-header">
      <div class="agent-info">
        <div class="agent-avatar">{{ activeAssistant.emoji }}</div>
        <div class="agent-details">
          <h2 class="agent-name">{{ activeAssistant.label }}</h2>
          <p class="agent-description">{{ activeAssistant.description }}</p>
        </div>
      </div>
      <div class="header-actions">
        <ElButton size="small" plain @click="clearChat">清空对话</ElButton>
      </div>
    </header>

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
          <div v-if="message.role !== 'user' && message.role !== 'system'" class="message-avatar">
            <img :src="`https://avatars.githubusercontent.com/u/131522266?s=80&v=4`" alt="AI" />
          </div>
          <div class="message-content">
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
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-container">
        <textarea
          v-model="userInput"
          placeholder="输入你的问题，Shift+Enter 换行"
          class="message-input"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift.exact.stop
        ></textarea>
        <ElButton
          type="primary"
          :disabled="isSending || !userInput.trim()"
          :loading="isSending"
          @click="sendMessage"
        >
          发送
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f2f5;
  background: #fafbfc;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.agent-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.agent-details {
  flex: 1;
}

.agent-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
}

.agent-description {
  font-size: 14px;
  color: #606266;
  margin: 0;
}

.suggestions-area {
  padding: 24px;
  background: #fafbfc;
  border-bottom: 1px solid #f0f2f5;
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

.chat-area {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: 
    radial-gradient(900px 240px at 12% 0%, rgba(237,233,254,0.3), transparent 60%),
    radial-gradient(900px 240px at 88% 0%, rgba(243,234,255,0.3), transparent 60%),
    #fff;
}

.message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.message.user {
  justify-content: flex-end;
}

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

.input-area {
  padding: 20px 24px;
  border-top: 1px solid #f0f2f5;
  background: #fafbfc;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  max-width: 100%;
}

.message-input {
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 10px 12px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.4;
  outline: none;
  transition: border-color 0.2s;
}

.message-input:focus {
  border-color: #409eff;
}

.message-input::placeholder {
  color: #c0c4cc;
}
</style>
