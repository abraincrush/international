<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import Sidebar from './AIX/components/Sidebar.vue'
import { ref, watch } from 'vue'

const router = useRouter()
const route = useRoute()

const currentView = ref<'explore' | 'create' | 'chat'>('explore')
const selectedAgentId = ref<string>('')

function syncFromRoute() {
  if (route.name === 'ai-x-create' || route.name === 'ai-x-create-component') currentView.value = 'create'
  else if (route.name === 'ai-x-chat') currentView.value = 'chat'
  else currentView.value = 'explore'
  if (route.params.agentId && typeof route.params.agentId === 'string') {
    selectedAgentId.value = route.params.agentId
  } else if (route.name === 'ai-x-create' || route.name === 'ai-x-create-component') {
    // 进入创建页且未带 agentId 时，清空选中，激活“创建智能体”按钮淡紫态
    selectedAgentId.value = ''
  }
}

watch(() => route.fullPath, () => syncFromRoute(), { immediate: true })

// 在 AI+X 子路由内统一处理浏览器返回：无论当前是 create/chat，返回都跳转到 explore
// 移除统一返回至 explore 的行为，遵循浏览器默认历史记录

function handleViewChange(view: 'explore' | 'create' | 'chat', agentId?: string) {
  if (view === 'create') {
    if (agentId === 'component') {
      selectedAgentId.value = ''
      router.push({ name: 'ai-x-create-component' })
    } else if (agentId) {
      selectedAgentId.value = agentId
      router.push({ name: 'ai-x-create', params: { agentId } })
    } else {
      selectedAgentId.value = ''
      router.push({ name: 'ai-x-create' })
    }
  } else if (view === 'chat') {
    router.push({ name: 'ai-x-chat', params: { agentId: agentId || selectedAgentId.value || '' } })
  } else {
    if (agentId === 'component') router.push({ name: 'ai-x-create-component' })
    else router.push({ name: 'ai-x-explore' })
  }
}
</script>

<template>
  <div class="aix-page">
    <Sidebar :current-view="currentView" :selected-agent-id="selectedAgentId" :route-name="(route.name as any)" @view-change="handleViewChange" />
    <main class="aix-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.aix-page { display: flex; height: 100%; gap: 16px; padding: 16px; box-sizing: border-box; }
.aix-main { flex: 1; overflow: hidden; }
</style>
