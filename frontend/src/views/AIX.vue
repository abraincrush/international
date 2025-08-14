<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

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

// Productized assistants (not专业模型名)
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

const selectedAssistantId = ref<string>(assistantOptions[0].id)
const activeAssistant = computed(() => assistantOptions.find(a => a.id === selectedAssistantId.value)!)

const conversations = ref<{ id: string; title: string }[]>([])
const activeConvId = ref<string>('')

const messages = ref<ChatMessage[]>([])
const userInput = ref<string>('')
const isSending = ref<boolean>(false)
const chatBottomEl = ref<HTMLElement | null>(null)

function createConversation() {
  const id = `c_${Date.now()}`
  conversations.value.unshift({ id, title: activeAssistant.value.label })
  activeConvId.value = id
  messages.value = []
}

function renameConversation(id: string, title: string) {
  const target = conversations.value.find(c => c.id === id)
  if (target) target.title = title
}

function deleteConversation(id: string) {
  const idx = conversations.value.findIndex(c => c.id === id)
  if (idx >= 0) conversations.value.splice(idx, 1)
  if (activeConvId.value === id) {
    if (conversations.value[0]) {
      activeConvId.value = conversations.value[0].id
    } else {
      activeConvId.value = ''
      messages.value = []
    }
  }
}

function scrollToBottom() {
  nextTick(() => {
    chatBottomEl.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

async function sendMessage() {
  const content = userInput.value.trim()
  if (!content) return
  if (!activeConvId.value) createConversation()

  // Inject system behavior at conversation start
  if (messages.value.length === 0) {
    messages.value.push({ id: `m_${Date.now()-1}`, role: 'system', content: activeAssistant.value.system, timestamp: Date.now() })
  }
  messages.value.push({ id: `m_${Date.now()}`, role: 'user', content, timestamp: Date.now() })
  userInput.value = ''
  scrollToBottom()

  isSending.value = true
  try {
    // Placeholder: simulate streaming response
    const replyId = `m_${Date.now() + 1}`
    messages.value.push({ id: replyId, role: 'assistant', content: '', timestamp: Date.now() })

    const fakeChunks = [
      `${activeAssistant.value.label}已收到：`,
      '我会给出结构化、可执行的建议。',
      '如需更换助手，请点击上方助手切换。'
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

onMounted(() => {
  // bootstrap one conversation
  createConversation()
  // preload demo messages
  messages.value.push({ id: `m_demo_sys`, role: 'system', content: activeAssistant.value.system, timestamp: Date.now() })
  messages.value.push({ id: `m_demo_u`, role: 'user', content: '我想把校园二手交易做成一个小程序，怎么验证有没有人需要？', timestamp: Date.now() })
  messages.value.push({ id: `m_demo_a`, role: 'assistant', content: '建议：\n1) 明确目标用户（买家/卖家）\n2) 设计最小可行功能（发布/搜索/私聊）\n3) 用表单+海报在3天内收集50位意向用户\n4) 组织一次线下/群内“试卖”活动验证成交率', timestamp: Date.now() })
})
</script>

<template>
  <div class="studio-layout">
    <!-- Left: conversations list -->
    <aside class="aside">
      <div class="aside-header">
        <span>会话</span>
        <button class="primary" @click="createConversation">新建</button>
      </div>
      <div class="conv-list">
        <div
          v-for="c in conversations"
          :key="c.id"
          class="conv-item"
          :class="{ active: c.id === activeConvId }"
          @click="activeConvId = c.id"
        >
          <div class="conv-meta">
            <div class="conv-avatar">💬</div>
            <input class="conv-title" v-model="c.title" />
          </div>
          <button class="ghost small" @click.stop="deleteConversation(c.id)">删除</button>
        </div>
      </div>
    </aside>

    <!-- Center: chat -->
    <main class="main">
      <div class="toolbar">
        <div class="assistant-switcher">
          <div
            v-for="a in assistantOptions"
            :key="a.id"
            class="assistant-chip"
            :class="{ active: a.id === selectedAssistantId }"
            @click="selectedAssistantId = a.id"
            title="点击切换助手"
          >
            <span class="emoji">{{ a.emoji }}</span>
            <span class="label">{{ a.label }}</span>
          </div>
        </div>
        <div class="assistant-desc">{{ activeAssistant.description }}</div>
        <div class="suggestions">
          <button v-for="s in activeAssistant.suggestions" :key="s" class="ghost" @click="userInput = s">{{ s }}</button>
        </div>
      </div>

      <div class="chat-panel">
        <div class="message" :class="m.role" v-for="m in messages" :key="m.id">
          <img v-if="m.role!== 'user'" class="avatar" src="https://avatars.githubusercontent.com/u/131522266?s=80&v=4" alt="ai" />
          <div class="bubble">
            <div class="bubble-head">
              <span class="role" v-if="m.role === 'assistant'">{{ activeAssistant.label }}</span>
              <span class="role" v-else-if="m.role === 'system'">系统</span>
              <span class="role" v-else>我</span>
            </div>
            <div class="content">{{ m.content }}</div>
          </div>
        </div>
        <div ref="chatBottomEl"></div>
      </div>

      <div class="composer">
        <textarea v-model="userInput" placeholder="输入你的问题，Shift+Enter 换行" @keydown.enter.exact.prevent="sendMessage" @keydown.enter.shift.exact.stop />
        <button class="primary" :disabled="isSending || !userInput.trim()" @click="sendMessage">发送</button>
      </div>
    </main>

    <!-- Right column removed as requested -->
  </div>
</template>

<style scoped>
.studio-layout {
  display: grid;
  grid-template-columns: 236px 1fr;
  gap: 12px;
  height: 100%;
  min-height: 0;
  padding: 8px 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.aside { background: #fff; border: 1px solid #eef1ff; border-radius: 12px; box-shadow: 0 6px 24px rgba(80,60,180,0.06); padding: 10px; display: flex; flex-direction: column; }
.aside.right { background: #fff; }
.aside-header { display:flex; align-items:center; justify-content:space-between; margin-bottom: 8px; font-weight: 700; }
.conv-list { overflow: hidden; }
.conv-item { display:flex; align-items:center; gap:8px; padding:8px; border-radius:10px; cursor:pointer; border:1px solid transparent; }
.conv-item.active { background: #f5f7ff; }
.conv-meta { display:flex; align-items:center; gap:8px; flex:1; }
.conv-avatar { width:28px; height:28px; border-radius: 8px; background:#ede9fe; display:flex; align-items:center; justify-content:center; }
.conv-title { flex:1; border: 1px solid #e6e9ff; border-radius: 8px; padding: 6px 8px; }

.main {
  background: #fff;
  border: 1px solid #eef1ff;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(80,60,180,0.08);
  display: grid;
  grid-template-rows: auto 1fr auto; /* toolbar, chat, composer */
  overflow: hidden;
  min-height: 0;
}
.toolbar {
  padding: 8px 12px 6px 12px;
  border-bottom: none;
  background: transparent;
}
.assistant-switcher { display:flex; gap:8px; flex-wrap: wrap; margin-bottom: 8px; }
.assistant-chip { display:flex; align-items:center; gap:6px; padding: 6px 12px; border:1px solid #e6e9ff; border-radius: 999px; cursor:pointer; color:#4b3fbf; background:#fafafe; }
.assistant-chip.active { background:#ede9fe; border-color:#b5aeea; color:#7b5be6; }
.assistant-chip .emoji { font-size: 16px; }
.assistant-chip .label { font-weight: 600; }
.assistant-desc { color:#4a4a68; margin-bottom: 6px; }
.suggestions { display:flex; gap:8px; flex-wrap: wrap; }

.chat-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* place messages from top; remove extra blank space above first line */
  overflow-y: auto;
  padding: 12px 14px 10px 14px;
  background:
    radial-gradient(900px 240px at 12% 0%, rgba(237,233,254,0.45), transparent 60%),
    radial-gradient(900px 240px at 88% 0%, rgba(243,234,255,0.45), transparent 60%),
    #fff;
  gap: 8px;
}
.message { display:flex; align-items: flex-start; gap: 10px; }
.message.user { justify-content: flex-end; }
.avatar { width: 28px; height: 28px; border-radius: 50%; margin-top: 2px; }
.bubble {
  max-width: 62%;
  border-radius: 14px;
  padding:10px 12px;
  box-shadow: 0 8px 26px rgba(123,91,230,0.08);
  border: 1px solid rgba(200, 205, 255, 0.55);
}
.message.user .bubble { background: linear-gradient(135deg, #eef5ff, #ffffff); border-color:#dbe8ff; }
.message.assistant .bubble { background: linear-gradient(135deg, #f1ecff, #ffffff); border-color:#e6defe; }
.message.user .avatar { display:none; }
.bubble-head { display:flex; align-items:center; gap:6px; margin-bottom: 4px; }
.bubble .role { font-size: 11px; color: #7b5be6; margin-right: 6px; }
.bubble .content {
  white-space: pre-wrap;
  word-break: break-word;
  color:#222;
  display: -webkit-box;
  -webkit-line-clamp: 6; /* clamp to keep within viewport */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.composer { display:flex; gap:8px; border-top: 1px solid #f0f2ff; padding: 10px 12px; background:#fafafe; }
.composer textarea { flex:1; height: 40px; border:1px solid #e6e9ff; border-radius: 12px; padding: 10px 12px; resize: vertical; line-height: 1.3; }
.composer .primary { white-space: nowrap; height: 40px; align-self: center; }

.primary { background: #7b5be6; color:#fff; border:none; border-radius: 10px; padding: 8px 16px; cursor:pointer; }
.primary:disabled { opacity: .6; cursor: not-allowed; }
.ghost { background:#fff; border:1px solid #e6e9ff; border-radius: 8px; padding: 4px 10px; cursor:pointer; }
.small { padding: 2px 8px; font-size: 12px; }

</style>
