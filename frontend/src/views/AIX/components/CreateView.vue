<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import { ElInput, ElSwitch, ElMessage } from 'element-plus'
import { Icon } from '@iconify/vue'

const props = defineProps<{ agentId?: string }>()

const name = ref('')
const description = ref('')
const mode = ref<'basic' | 'dev'>('basic')
const publicPrompt = ref(false)
const publicAgent = ref(false)

const avatarUrl = ref<string>('')
const fileInputRef = ref<HTMLInputElement | null>(null)

function onChooseAvatar() {
  fileInputRef.value?.click()
}

function onAvatarChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return
  const file = files[0]
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片不能超过 5M')
    return
  }
  const typeOk = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
  if (!typeOk) {
    ElMessage.error('仅支持 JPG/PNG')
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    avatarUrl.value = String(reader.result || '')
  }
  reader.readAsDataURL(file)
}

function save() {
  ElMessage.success('已保存（示例）')
}

const isChatTab = computed(() => mode.value === 'basic')
const isSettingsTab = computed(() => mode.value === 'dev')

// ===== 复制 ChatView 逻辑（不复用组件）=====
type Role = 'user' | 'assistant' | 'system'
interface ChatMessage { id: string; role: Role; content: string; timestamp: number; images?: string[] }
interface SquarePost { id: string; authorName: string; authorAvatar: string; image: string; likes: number; liked?: boolean }
interface AssistantOption { id: string; label: string; emoji: string; description: string; system: string; suggestions: string[] }

const cPageMode = ref<'chat' | 'square'>('chat')
const cAssistantOptions: AssistantOption[] = [
  { id: 'startup-coach', label: '创业助手', emoji: '🚀', description: '从想法→商业模型→路演材料，全流程辅导', system: '你是创业助手。用简单明确的步骤给出可执行建议，偏向精益创业、MVP、客户验证。输出结构化列表与简短模板。', suggestions: ['帮我把这个想法转成商业画布', '生成一页路演PPT大纲', '如何进行10位用户早测？'] },
  { id: 'study-planner', label: '学习规划助手', emoji: '📚', description: '制定阶段目标、学习路径与每日清单', system: '你是学习规划助手。先询问目标与时间，再给阶段拆分、里程碑和每日任务清单，附关键资源链接占位符。', suggestions: ['帮我做三个月的英语口语计划', '为机器学习入门列出里程碑', '生成本周学习清单'] },
  { id: 'career-mentor', label: '职业规划助手', emoji: '🎯', description: '胜任力画像、目标岗位差距与补全路径', system: '你是职业规划助手。根据目标岗位，生成能力矩阵、差距与补全建议，给出课程/项目建议占位。', suggestions: ['分析我与前端工程师岗位的差距', '给出三个月转岗路线', '生成面试准备清单'] },
  { id: 'resume-coach', label: '简历辅导助手', emoji: '📝', description: '量化成果、STAR法则与要点优化', system: '你是简历辅导助手。以成果量化和STAR法优化要点，用中英文要点各3条。', suggestions: ['优化我这段项目经历', '把这段实习改写为要点', '生成英文简历要点'] }
]
const cActiveAssistant = computed(() => cAssistantOptions.find(a => a.id === (props.agentId || '')) || cAssistantOptions[0])
const cMessages = ref<ChatMessage[]>([])
const cUserInput = ref('')
const cIsSending = ref(false)
const cChatBottomEl = ref<HTMLElement | null>(null)
const cInputEl = ref<HTMLTextAreaElement | null>(null)
const cMaxInputHeight = 160

function cScrollToBottom() { nextTick(() => cChatBottomEl.value?.scrollIntoView({ behavior: 'smooth' })) }
function cAutoResize() {
  if (!cInputEl.value) return
  const el = cInputEl.value
  el.style.height = 'auto'
  const newHeight = Math.min(el.scrollHeight, cMaxInputHeight)
  el.style.height = newHeight + 'px'
  el.style.overflowY = el.scrollHeight > cMaxInputHeight ? 'auto' : 'hidden'
}
function cUseSuggestion(s: string) { cUserInput.value = s }
async function cSendMessage() {
  const content = cUserInput.value.trim(); if (!content) return
  if (cMessages.value.length === 0) {
    cMessages.value.push({ id: `m_${Date.now()-1}`, role: 'system', content: cActiveAssistant.value.system, timestamp: Date.now() })
  }
  cMessages.value.push({ id: `m_${Date.now()}`, role: 'user', content, timestamp: Date.now() })
  cUserInput.value = ''
  nextTick(() => cAutoResize()); cScrollToBottom()
  cIsSending.value = true
  try {
    const replyId = `m_${Date.now()+1}`
    cMessages.value.push({ id: replyId, role: 'assistant', content: '', timestamp: Date.now(), images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80'] })
    const chunks = [`作为${cActiveAssistant.value.label}，我已收到您的问题。`, '\n\n让我为您提供专业的建议：', '\n\n1. 首先分析您的需求...', '\n2. 然后制定具体方案...', '\n3. 最后给出执行步骤...', '\n\n如需更详细的指导，请继续提问。']
    for (const ch of chunks) { await new Promise(r=>setTimeout(r,300)); const msg=cMessages.value.find(m=>m.id===replyId); if (msg) msg.content+=ch; cScrollToBottom() }
  } catch(e) { console.error(e); ElMessage.error('发送失败，请稍后重试') } finally { cIsSending.value=false }
}
watch(() => props.agentId, () => { cMessages.value = [] }, { immediate: true })
onMounted(() => { nextTick(() => cAutoResize()) })

// 广场示例数据与点赞
const cSquarePosts = ref<SquarePost[]>([
  { id: 'p1', authorName: 'Jenny', authorAvatar: 'https://i.pravatar.cc/100?img=1', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', likes: 123 },
  { id: 'p2', authorName: 'Jenny', authorAvatar: 'https://i.pravatar.cc/100?img=2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', likes: 222 },
  { id: 'p3', authorName: 'Jenny', authorAvatar: 'https://i.pravatar.cc/100?img=3', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', likes: 88 },
  { id: 'p4', authorName: 'Jenny', authorAvatar: 'https://i.pravatar.cc/100?img=4', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80', likes: 156 }
])
function cToggleLike(post: SquarePost) { post.liked = !post.liked; post.likes += post.liked ? 1 : -1 }
</script>

<template>
  <div class="create-view">
    <div v-if="!props.agentId">
      <div class="topbar"><div class="title">创建智能体</div></div>
      <div class="gray-divider"></div>
    </div>

    <template v-if="!props.agentId">
      <div class="create-layout">
      <!-- 左侧大区 -->
      <section class="left-panel">
        <div class="section-title">基础资料</div>

        <div class="field">
          <div class="label">头像</div>
          <div class="avatar-upload" @click="onChooseAvatar">
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
            <div v-else class="avatar-placeholder">
              <span class="avatar-icon">🙂</span>
            </div>
            <input ref="fileInputRef" type="file" accept="image/png,image/jpeg" class="file-input" @change="onAvatarChange" />
          </div>
          <div class="hint">支持的文件类型：JPG、PNG。最大大小：5M</div>
        </div>

        <div class="field">
          <div class="label">名称</div>
          <ElInput v-model="name" placeholder="请输入智能体名称" />
        </div>

        <div class="field">
          <div class="label">描述</div>
          <ElInput v-model="description" type="textarea" :rows="5" placeholder="智能体的简单描述。这将展示让其他人了解智能体的方式。" />
        </div>

        <div class="section-title with-top-gap">选择一种模式完成其他智能体设置</div>
        <div class="mode-toggle">
          <div class="custom-radio-group">
            <div class="custom-radio-item" :class="{ active: mode === 'basic' }" @click="mode = 'basic'">基础模式</div>
            <div class="custom-radio-item" :class="{ active: mode === 'dev' }" @click="mode = 'dev'">开发模式</div>
          </div>
        </div>
      </section>

      <!-- 右侧预览 -->
      <aside class="right-panel">
        <div class="preview-card">
          <div class="preview-avatar">
            <img v-if="avatarUrl" :src="avatarUrl" alt="preview" />
            <div v-else class="preview-avatar-ph">🙂</div>
          </div>
          <div class="preview-name">{{ name || '名称' }}</div>
          <div class="preview-desc">{{ description || '描述描述描述描述描述描述描述' }}</div>
          <div class="preview-arrow">></div>
        </div>
      </aside>
      </div>

      <!-- 底部固定设置 -->
      <div class="bottom-settings">
        <div class="switches">
          <div class="switch-item">
            <span>公开Prompt</span>
            <ElSwitch v-model="publicPrompt" />
          </div>
          <div class="switch-item">
            <span>公开智能体</span>
            <ElSwitch v-model="publicAgent" />
          </div>
        </div>
        <button class="save-btn" @click="save">保存</button>
      </div>
        </template>
        
    <!-- 当 Sidebar 在创建页点击了我的智能体时：右侧主体复制 ChatView 布局，但底部替换为固定设置 -->
    <template v-else>
    <div class="copied-chat-view">
      <div class="main-container">
        <div class="mode-selector">
          <div class="custom-radio-group">
            <div class="custom-radio-item" :class="{ active: cPageMode === 'chat' }" @click="cPageMode = 'chat'">对话</div>
            <div class="custom-radio-item" :class="{ active: cPageMode === 'square' }" @click="cPageMode = 'square'">设置</div>
          </div>
        </div>
        <div v-if="cPageMode === 'chat'" class="chat-mode-content">
          <div v-if="cMessages.length === 0" class="suggestions-area">
            <div class="suggestions-title">试试这些问题：</div>
            <div class="suggestions-list">
              <div v-for="s in cActiveAssistant.suggestions" :key="s" class="suggestion-item" @click="cUseSuggestion(s)">{{ s }}</div>
            </div>
          </div>
          <div class="chat-area">
            <div class="messages-container">
              <div v-for="message in cMessages" :key="message.id" class="message" :class="message.role">
                <template v-if="message.role === 'assistant'">
                  <div class="msg-left"><div class="assistant-avatar">{{ cActiveAssistant.emoji }}</div></div>
                  <div class="msg-middle"><div class="msg-middle-inner"><div class="assistant-title-group"><div class="assistant-title">{{ cActiveAssistant.label }}</div></div><div class="assistant-card-text">{{ message.content }}</div><div v-if="message.images && message.images.length" class="assistant-image-grid"><img v-for="(img, idx) in message.images" :key="idx" :src="img" alt="image" /></div></div></div>
                  <div class="msg-right"><button class="square-action"><Icon icon="mdi:thumb-up-outline" width="16" /></button><button class="square-action"><Icon icon="mdi:thumb-down-outline" width="16" /></button><button class="square-action"><Icon icon="mdi:content-copy" width="16" /></button><button class="square-action"><Icon icon="mdi:dots-vertical" width="16" /></button></div>
                </template>
                <template v-else-if="message.role === 'user'">
                  <div class="msg-right"><button class="square-action"><Icon icon="mdi:content-copy" width="16" /></button><button class="square-action"><Icon icon="mdi:dots-vertical" width="16" /></button></div>
                  <div class="msg-middle"><div class="msg-middle-inner"><div class="assistant-card-text">{{ message.content }}</div><div v-if="message.images && message.images.length" class="assistant-image-grid"><img v-for="(img, idx) in message.images" :key="idx" :src="img" alt="image" /></div></div></div>
                </template>
                <div v-else class="message-content">
                  <div v-if="message.role !== 'system'" class="message-header"><span class="message-role">{{ message.role === 'assistant' ? cActiveAssistant.label : '我' }}</span><span class="message-time">{{ new Date(message.timestamp).toLocaleTimeString() }}</span></div>
                  <div class="message-text">{{ message.content }}</div>
                </div>
              </div>
              <div ref="cChatBottomEl"></div>
            </div>
            <div class="fixed-input-area">
              <div class="input-container">
                <div class="logo-circle"><Icon icon="mdi:brush" width="16" /></div>
                <div class="input-wrapper">
                  <textarea ref="cInputEl" v-model="cUserInput" placeholder="当前不可用，请稍作上面设可继续" class="message-input textarea-input" @input="cAutoResize" @keydown.enter.exact.prevent="cSendMessage" rows="1" />
                  <div class="input-right-icons">
                    <div class="input-icon"><Icon icon="mdi:plus-circle-outline" width="20" /></div>
                    <div class="input-icon"><Icon icon="mdi:microphone-outline" width="20" /></div>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="chat-mode-content">
          <!-- 设置页：直接复制创建表单布局 -->
          <div class="create-layout">
            <section class="left-panel">
              <div class="section-title">基础资料</div>
              <div class="field">
                <div class="label">头像</div>
                <div class="avatar-upload" @click="onChooseAvatar">
                  <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
                  <div v-else class="avatar-placeholder"><span class="avatar-icon">🙂</span></div>
                  <input ref="fileInputRef" type="file" accept="image/png,image/jpeg" class="file-input" @change="onAvatarChange" />
                </div>
                <div class="hint">支持的文件类型：JPG、PNG。最大大小：5M</div>
              </div>
              <div class="field"><div class="label">名称</div><ElInput v-model="name" placeholder="请输入智能体名称" /></div>
              <div class="field"><div class="label">描述</div><ElInput v-model="description" type="textarea" :rows="5" placeholder="智能体的简单描述。这将展示让其他人了解智能体的方式。" /></div>
              <div class="section-title with-top-gap">选择一种模式完成其他智能体设置</div>
              <div class="mode-toggle"><div class="custom-radio-group"><div class="custom-radio-item" :class="{ active: isChatTab }">基础模式</div><div class="custom-radio-item" :class="{ active: isSettingsTab }">开发模式</div></div></div>
            </section>
            <aside class="right-panel">
              <div class="preview-card"><div class="preview-avatar"><img v-if="avatarUrl" :src="avatarUrl" alt="preview" /><div v-else class="preview-avatar-ph">🙂</div></div><div class="preview-name">{{ name || '名称' }}</div><div class="preview-desc">{{ description || '描述描述描述描述描述描述描述' }}</div><div class="preview-arrow">></div></div>
            </aside>
          </div>
        </div>
            </div>

      <!-- 替换 ChatView 的智能体信息卡为底部固定设置 -->
      <div class="bottom-settings">
        <div class="switches">
          <div class="switch-item"><span>公开Prompt</span><ElSwitch v-model="publicPrompt" /></div>
          <div class="switch-item"><span>公开智能体</span><ElSwitch v-model="publicAgent" /></div>
        </div>
        <button class="save-btn" @click="save">保存</button>
      </div>
    </div>
    </template>
  </div>
</template>

<style scoped>
.create-view { height: 100%; display: flex; flex-direction: column; background: #f8fafc; overflow: auto; }
.topbar { padding: 16px 16px 8px 16px; }
.title { font-size: 18px; font-weight: 700; color: #1f2937; }
.gray-divider { height: 1px; background: #e5e7eb; margin: 0 16px 8px 16px; }

.create-layout { flex: 1; display: flex; gap: 16px; padding: 0; }
.left-panel { flex: 1; background: #fff; border-radius: 12px; padding: 16px; }
.right-panel { width: 300px; flex-shrink: 0; }

.section-title { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 12px; }
.section-title.with-top-gap { margin-top: 6px; }

.field { margin-bottom: 16px; }
.label { font-size: 13px; color: #374151; margin-bottom: 8px; }
.hint { font-size: 12px; color: #9ca3af; margin-top: 8px; }

.avatar-upload { width: 96px; height: 96px; border-radius: 12px; overflow: hidden; background: #f3f4f6; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.avatar-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 28px; }
.avatar-upload img { width: 100%; height: 100%; object-fit: cover; display: block; }
.avatar-icon { font-size: 28px; }
.file-input { display: none; }

.mode-toggle { margin-top: 8px; }
.custom-radio-group { display: inline-flex; background: #f0f2f5; border-radius: 20px; padding: 4px; gap: 2px; }
.custom-radio-item { padding: 6px 16px; border-radius: 14px; font-size: 13px; font-weight: 500; cursor: pointer; color: #606266; background: transparent; min-width: 74px; text-align: center; }
.custom-radio-item.active { background: #8b5cf6; color: #fff; font-weight: 600; box-shadow: 0 2px 4px rgba(139, 92, 246, 0.3); }

.preview-card { background: #fff; border-radius: 12px; padding: 12px; border: 1px solid #eef0f5; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.preview-avatar { width: 96px; height: 96px; border-radius: 12px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.preview-avatar img { width: 100%; height: 100%; object-fit: cover; }
.preview-avatar-ph { color: #9ca3af; font-size: 28px; }
.preview-name { font-size: 14px; font-weight: 600; color: #111827; }
.preview-desc { font-size: 12px; color: #6b7280; text-align: center; line-height: 1.2; }
.preview-arrow { margin-top: 6px; width: 46px; height: 64px; background: #efeff6; border-radius: 8px; color: #9ca3af; display: flex; align-items: center; justify-content: center; }

.bottom-settings { position: sticky; bottom: 0; margin: 0; background: linear-gradient(to right, rgba(224,242,254,0.25), rgba(243,232,255,0.25)); border: none; border-top: 1px solid #eef0f5; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; box-shadow: none; }
.switches { display: flex; align-items: center; gap: 24px; }
.switch-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; }
.save-btn { background: linear-gradient(135deg, #7b5be6, #5b8def); color: #fff; border: none; border-radius: 10px; padding: 10px 16px; cursor: pointer; font-size: 14px; }
.save-btn:hover { opacity: 0.95; }

/* 复用 ChatView 的顶部选择器样式 */
.mode-selector.top { padding: 12px 16px 8px 16px; background: transparent; text-align: center; }
.chat-proxy { padding: 0 16px; }
.chat-only { background: transparent; }

/* ===== 复制 ChatView 样式，作用于 copied-chat-view 范围 ===== */
.copied-chat-view { display: flex; flex-direction: column; height: 100%; background: transparent; }
.copied-chat-view .main-container { flex: 1; background: transparent; display: flex; flex-direction: column; overflow: hidden; min-height: 0; }
.copied-chat-view .mode-selector { padding: 20px 24px 16px; background: #fff; text-align: center; }
.copied-chat-view .custom-radio-group { display: inline-flex; background: #f0f2f5; border-radius: 20px; padding: 4px; gap: 2px; }
.copied-chat-view .custom-radio-item { padding: 6px 16px; border-radius: 14px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all .2s; color: #606266; background: transparent; min-width: 50px; text-align: center; }
.copied-chat-view .custom-radio-item.active { background: #8b5cf6; color: #fff; font-weight: 600; box-shadow: 0 2px 4px rgba(139,92,246,.3); }
.copied-chat-view .chat-mode-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-height: 0; }
.copied-chat-view .suggestions-area { padding: 24px; background: #fff; }
.copied-chat-view .suggestions-title { font-size: 16px; font-weight: 600; color: #303133; margin-bottom: 16px; }
.copied-chat-view .suggestions-list { display: flex; flex-wrap: wrap; gap: 12px; }
.copied-chat-view .suggestion-item { padding: 8px 16px; background: #fff; border: 1px solid #e4e7ed; border-radius: 20px; cursor: pointer; transition: all .2s; font-size: 14px; color: #606266; }
.copied-chat-view .suggestion-item:hover { border-color: #409eff; color: #409eff; background: #ecf5ff; }
.copied-chat-view .chat-area { flex: 1; position: relative; display: flex; flex-direction: column; background: #fff; min-height: 0; }
.copied-chat-view .messages-container { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 24px 24px 12px 24px; background: transparent; }
.copied-chat-view .message { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 20px; }
.copied-chat-view .message.user { justify-content: flex-end; align-items: center; }
.copied-chat-view .message.user .msg-right { order: 1; align-self: center; }
.copied-chat-view .message.user .msg-middle { order: 2; flex: 0 0 auto; }
.copied-chat-view .message.user { max-width: 820px; margin-left: auto; }
.copied-chat-view .message.user .msg-middle-inner { display: inline-block; width: auto; max-width: 680px; padding: 8px 10px; vertical-align: middle; }
.copied-chat-view .message.system { display: none; }
.copied-chat-view .assistant-avatar { width: 32px; height: 32px; border-radius: 10px; background: #f6f7fb; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.copied-chat-view .msg-left { flex-shrink: 0; display: flex; align-items: flex-start; }
.copied-chat-view .msg-middle { flex: 1; padding-left: 6px; }
.copied-chat-view .msg-right { flex-shrink: 0; display: flex; gap: 6px; }
.copied-chat-view .msg-middle-inner { background: #f6f7fb; border: 1px solid #eef0f5; border-radius: 12px; padding: 10px; }
.copied-chat-view .assistant-card-text { color: #303133; line-height: 1.7; margin-top: 6px; white-space: normal; word-break: break-word; }
.copied-chat-view .assistant-image-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 8px; margin-top: 10px; }
.copied-chat-view .assistant-image-grid img { width: 100%; height: auto; border-radius: 10px; display: block; }
.copied-chat-view .square-action { width: 30px; height: 30px; border-radius: 8px; border: none; background: #f2f3f7; color: #4b5563; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.copied-chat-view .fixed-input-area { padding: 12px 24px; background: transparent; border-top: none; margin-bottom: 0; flex-shrink: 0; }
.copied-chat-view .input-container { display: flex; align-items: center; gap: 16px; max-width: 100%; }
.copied-chat-view .logo-circle { width: 32px; height: 32px; border-radius: 50%; background: #f0f2f5; display: flex; align-items: center; justify-content: center; color: #606266; flex-shrink: 0; border: 1px solid #e4e7ed; }
.copied-chat-view .input-wrapper { flex: 1; display: flex; align-items: center; background: #fff; border-radius: 20px; padding: 8px 12px; gap: 10px; border: 1px solid #e5e5e5; transition: all .2s; min-height: 36px; }
.copied-chat-view .message-input { flex: 1; min-height: 20px; max-height: 160px; padding: 0; border: none; font-family: inherit; font-size: 13px; line-height: 20px; outline: none; background: transparent; vertical-align: middle; resize: none; }
.copied-chat-view .textarea-input { width: 100%; overflow: hidden; }
.copied-chat-view .input-right-icons { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.copied-chat-view .input-icon { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; color: #909399; cursor: pointer; transition: all .2s; }
.copied-chat-view .input-icon:hover { background: #f0f0f0; color: #606266; }
.copied-chat-view .square-mode-content { flex: 1; display: flex; align-items: center; justify-content: center; background: #fff; }
.copied-chat-view .square-placeholder { text-align: center; color: #909399; }
.copied-chat-view .square-icon { font-size: 48px; margin-bottom: 16px; }
.copied-chat-view .agent-info-section { padding: 0; margin-top: 12px; background: transparent; flex-shrink: 0; }
.copied-chat-view .agent-info-card { background: linear-gradient(to right, rgba(224,242,254,.6), rgba(243,232,255,.6)); border-radius: 12px; padding: 12px 16px; border: none; }
.copied-chat-view .agent-row { display: flex; align-items: center; gap: 12px; }
.copied-chat-view .agent-avatar { width: 36px; height: 36px; border-radius: 8px; background: transparent; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.copied-chat-view .agent-meta { flex: 1; min-width: 0; }
.copied-chat-view .agent-name { font-size: 15px; font-weight: 600; color: #303133; margin: 0 0 1px 0; }
.copied-chat-view .agent-author { font-size: 12px; color: #8e8e93; line-height: 1.2; }
.copied-chat-view .agent-arrow { color: #c7c7cc; font-size: 16px; flex-shrink: 0; }
/* 调整输入框圆角与占位符字号（仅作用于本页） */
.left-panel :deep(.el-input__wrapper) { border-radius: 16px; }
.left-panel :deep(.el-input__inner::placeholder) { font-size: 12px; }
.left-panel :deep(.el-textarea__inner) { border-radius: 16px; }
.left-panel :deep(.el-textarea__inner::placeholder) { font-size: 12px; }
</style>
