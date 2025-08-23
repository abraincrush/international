<script setup lang="ts">
import { ref, computed } from 'vue'
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

// 从原来的assistantOptions迁移过来的数据
const agents = ref<Agent[]>([
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

const searchQuery = ref('')
const selectedAgentId = ref('')

const filteredAgents = computed(() => {
  if (!searchQuery.value) return agents.value
  return agents.value.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const emit = defineEmits<{
  viewChange: [view: 'explore' | 'create' | 'chat', agentId?: string]
}>()

defineProps<{
  selectedAgentId?: string
}>()

function handleExploreClick() {
  emit('viewChange', 'explore')
}

function handleCreateClick() {
  emit('viewChange', 'create')
}

function handleAgentClick(agentId: string) {
  selectedAgentId.value = agentId
  emit('viewChange', 'chat', agentId)
}
</script>

<template>
  <aside class="sidebar">
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
      </div>
    </div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <!-- 智能体列表 -->
    <div class="agents-section">
      <div class="section-title">我的智能体</div>
      <div class="agents-list">
        <div
          v-for="agent in filteredAgents"
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
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background: transparent;
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
</style>
