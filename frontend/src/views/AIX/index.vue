<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import ExploreView from './components/ExploreView.vue'
import CreateView from './components/CreateView.vue'
import ChatView from './components/ChatView.vue'

type ViewType = 'explore' | 'create' | 'chat'

const currentView = ref<ViewType>('explore')
const selectedAgentId = ref<string>('')

function handleViewChange(view: ViewType, agentId?: string) {
  currentView.value = view
  if (agentId) {
    selectedAgentId.value = agentId
  }
}
</script>

<template>
  <div class="aix-container">
    <Sidebar 
      @view-change="handleViewChange"
      :selected-agent-id="selectedAgentId"
    />
    
    <main class="main-content">
      <ExploreView v-if="currentView === 'explore'" @select-agent="handleViewChange('chat', $event)" />
      <CreateView v-else-if="currentView === 'create'" />
      <ChatView v-else-if="currentView === 'chat'" :agent-id="selectedAgentId" />
    </main>
  </div>
</template>

<style scoped>
.aix-container {
  display: flex;
  height: 100%;
  gap: 16px;
  padding: 16px;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  background: #fff;
  overflow: hidden;
}
</style>
