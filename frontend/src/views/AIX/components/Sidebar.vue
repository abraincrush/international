<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElInput } from 'element-plus'
import { Search, Plus, Compass } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

interface Agent {
  id: string
  name: string
  icon: string
  description: string
  category: string
}

// 我的智能体（自有）
const myAgents = ref<Agent[]>([
  {
    id: 'startup-coach',
    name: '创业助手',
    icon: 'mdi:rocket-launch',
    description: '从想法→商业模型→路演材料，全流程辅导',
    category: '商业'
  },
  {
    id: 'study-planner',
    name: '学习规划助手',
    icon: 'mdi:book-open-page-variant',
    description: '制定阶段目标、学习路径与每日清单',
    category: '学习'
  },
  {
    id: 'career-mentor',
    name: '职业规划助手',
    icon: 'mdi:target',
    description: '胜任力画像、目标岗位差距与补全路径',
    category: '职业'
  },
  {
    id: 'resume-coach',
    name: '简历辅导助手',
    icon: 'mdi:file-document-edit',
    description: '量化成果、STAR法则与要点优化',
    category: '职业'
  }
])

// 引入的别人的智能体（示例数据）
const importedAgents = ref<Agent[]>([
  {
    id: 'photo-style-ai',
    name: '写真风格滤镜',
    icon: 'mdi:camera-iris',
    description: '一键生成不同风格写真效果',
    category: '图像'
  },
  {
    id: 'prompt-polisher',
    name: '提示词润色器',
    icon: 'mdi:feather',
    description: '改写并提升提示词质量',
    category: '写作'
  }
])

const searchQuery = ref('')
const selectedAgentId = ref('')

const allAgents = computed(() => [...myAgents.value, ...importedAgents.value])

function filterAgents(list: Agent[]) {
  if (!searchQuery.value) return list
  const q = searchQuery.value.toLowerCase()
  return list.filter(agent =>
    agent.name.toLowerCase().includes(q) ||
    agent.description.toLowerCase().includes(q)
  )
}

const filteredMyAgents = computed(() => filterAgents(myAgents.value))
const filteredAllAgents = computed(() => filterAgents(allAgents.value))

const emit = defineEmits<{
  viewChange: [view: 'explore' | 'create' | 'chat', agentId?: string]
}>()

const props = defineProps<{
  selectedAgentId?: string
  currentView?: 'explore' | 'create' | 'chat'
}>()

function handleExploreClick() {
  emit('viewChange', 'explore')
}

function handleCreateClick() {
  emit('viewChange', 'create')
}

function handleAgentClick(agentId: string) {
  selectedAgentId.value = agentId
  if (props.currentView === 'create') emit('viewChange', 'create', agentId)
  else emit('viewChange', 'chat', agentId)
}

// 同步父组件传入的选中状态，避免按钮状态不一致
watch(() => props.selectedAgentId, (val) => {
  if (val !== undefined) selectedAgentId.value = val
}, { immediate: true })
</script>

<template>
  <aside class="sidebar">
    <!-- 非创作模式：原探索/创建入口 + 搜索 + 我的智能体列表 -->
    <template v-if="props.currentView !== 'create'">
      <!-- 搜索栏 -->
      <div class="search-section">
        <ElInput
          v-model="searchQuery"
          placeholder="在当前列表里搜索"
          :prefix-icon="Search"
          clearable
          class="custom-search"
        />
      </div>

      <!-- 导航链接 -->
      <div class="navigation-section">
        <div class="nav-item explore-item" @click="handleExploreClick">
          <div class="nav-icon">
            <Icon icon="mdi:compass" />
          </div>
          <div class="nav-content">
            <div class="nav-title">探索</div>
            <div class="nav-subtitle">找到更多智能体</div>
          </div>
          <div class="nav-arrow">
            <Icon icon="mdi:chevron-right" />
          </div>
        </div>
        <div class="nav-item create-item" @click="handleCreateClick">
          <div class="nav-icon">
            <Icon icon="mdi:plus" />
          </div>
          <div class="nav-content">
            <div class="nav-title">创建自己的智能体</div>
          </div>
          <div class="nav-arrow">
            <Icon icon="mdi:chevron-right" />
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 智能体列表（探索/未进入创作）：合并“我的+引入的”列表 -->
      <div class="agents-section">
        <div class="section-title">智能体列表</div>
        <div class="agents-list">
          <div
            v-for="agent in filteredAllAgents"
            :key="agent.id"
            class="agent-item"
            :class="{ active: selectedAgentId === agent.id }"
            @click="handleAgentClick(agent.id)"
          >
            <div class="agent-avatar">
              <Icon :icon="agent.icon" />
            </div>
            <div class="agent-info">
              <div class="agent-name">{{ agent.name }}</div>
              <div class="agent-description">{{ agent.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 创作模式：创作标题 + 搜索 + 组件广场按钮 + 我的智能体 + 组件列表 -->
    <template v-else>
      <div class="create-header">创作</div>

      <div class="search-section">
        <ElInput
          v-model="searchQuery"
          placeholder="在当前列表里搜索"
          :prefix-icon="Search"
          clearable
          class="custom-search"
        />
      </div>

      <div class="navigation-section">
        <div class="nav-item explore-item" @click="handleExploreClick">
          <div class="nav-icon">
            <Icon icon="mdi:view-grid-plus-outline" />
          </div>
          <div class="nav-content">
            <div class="nav-title">组件广场</div>
            <div class="nav-subtitle">发现/添加常用组件</div>
          </div>
          <div class="nav-arrow">
            <Icon icon="mdi:chevron-right" />
          </div>
        </div>
        <div class="create-action-row">
          <button class="create-agent-btn" :class="{ active: props.currentView === 'create' && !selectedAgentId }" @click="handleCreateClick">
            <span class="plus">+</span>
            <span>创建智能体</span>
          </button>
        </div>
      </div>

      <div class="section-block">
        <div class="section-title">我的智能体</div>
        <div class="dashed-divider"></div>
        <div class="empty-tip" v-if="filteredMyAgents.length === 0">暂无我的智能体</div>
        <div class="agents-list" v-else>
          <div
            v-for="agent in filteredMyAgents"
            :key="agent.id"
            class="agent-item"
            :class="{ active: selectedAgentId === agent.id }"
            @click="handleAgentClick(agent.id)"
          >
            <div class="agent-avatar">
              <Icon :icon="agent.icon" />
            </div>
            <div class="agent-info">
              <div class="agent-name">{{ agent.name }}</div>
              <div class="agent-description">{{ agent.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section-block">
        <div class="section-title">组件</div>
        <div class="dashed-divider"></div>
        <div class="empty-tip">暂无添加组件</div>
      </div>
    </template>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: fit-content;
  max-height: 100%;
  overflow: hidden;
}

.search-section {
  flex-shrink: 0;
}

.custom-search {
  border-radius: 20px;
}

.custom-search :deep(.el-input__wrapper) {
  border-radius: 20px;
  background: #fff;
  border: none;
  box-shadow: none;
  padding: 0 16px;
  height: 44px;
}

.custom-search :deep(.el-input__inner) {
  color: #8e8e93;
  font-size: 14px;
}

.custom-search :deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

.custom-search :deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

.navigation-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  background: linear-gradient(to right, rgba(224, 242, 254, 0.6), rgba(243, 232, 255, 0.6));
  border: none;
}

.nav-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.explore-item .nav-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.create-item .nav-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.nav-content {
  flex: 1;
  min-width: 0;
}

.nav-title {
  font-size: 14px;
  font-weight: 600;
  color: #1d1d1f;
  line-height: 1.2;
}

.nav-subtitle {
  font-size: 12px;
  color: #8e8e93;
  margin-top: 2px;
  line-height: 1.2;
}

.nav-arrow {
  color: #c7c7cc;
  font-size: 16px;
  flex-shrink: 0;
}

.divider {
  height: 0.5px;
  background: transparent;
  border-top: 0.5px dashed #e0e0e0;
  flex-shrink: 0;
}

.dashed-divider {
  height: 0.5px;
  background: transparent;
  border-top: 0.5px dashed #e5e7eb;
  margin: 6px 0 10px 0;
}

.agents-section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.agents-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agent-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  background: transparent;
  position: relative;
  border: none;
}

.agent-item:hover {
  background: #f7faff;
}

.agent-item.active {
  background: transparent;
}

.agent-item.active::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 12px;
  bottom: 12px;
  width: 3px;
  background: linear-gradient(180deg, #5b8def, #7b5be6);
  border-radius: 3px;
}

.agent-avatar {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #606266;
  flex-shrink: 0;
}

.agent-info {
  flex: 1;
  min-width: 0;
}

.agent-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.agent-item.active .agent-name {
  color: #222;
  font-weight: 600;
}

.agent-description {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.create-header {
  font-size: 16px;
  font-weight: 700;
  color: #1d1d1f;
}

.section-block { margin-top: 8px; }
.empty-tip { color: #b0b3b8; font-size: 12px; }

/* 创建智能体按钮样式 */
.create-action-row { padding: 4px 0 0 0; }
.create-agent-btn { width: 100%; border: none; background: #6c2cf0; color: #fff; border-radius: 999px; height: 40px; cursor: pointer; transition: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; }
.create-agent-btn:hover { box-shadow: none; }
.create-agent-btn.active { background: #ede9fe; color: #fff; }
.create-agent-btn .plus { font-weight: 700; font-size: 16px; margin-right: 2px; }
</style>
