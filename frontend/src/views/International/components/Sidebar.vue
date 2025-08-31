<script setup lang="ts">
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = defineProps<{
	currentView?: 'courses' | 'projects'
	routeName?: string
}>()

const emit = defineEmits<{
	viewChange: [view: 'courses' | 'projects']
}>()

const searchQuery = ref('')

function goCourses() { emit('viewChange', 'courses') }
function goProjects() { emit('viewChange', 'projects') }
</script>

<template>
	<aside class="sidebar">
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
			<div class="nav-item courses-item" @click="goCourses">
				<div class="nav-icon"><Icon icon="mdi:book-education" /></div>
				<div class="nav-content">
					<div class="nav-title">国际课程</div>
					<div class="nav-subtitle">高校/平台优质课程</div>
				</div>
				<div class="nav-arrow"><Icon icon="mdi:chevron-right" /></div>
			</div>
			<div class="nav-item projects-item" @click="goProjects">
				<div class="nav-icon"><Icon icon="mdi:earth" /></div>
				<div class="nav-content">
					<div class="nav-title">国际项目</div>
					<div class="nav-subtitle">交流/实习/竞赛/资助</div>
				</div>
				<div class="nav-arrow"><Icon icon="mdi:chevron-right" /></div>
			</div>
		</div>

		<div class="divider"></div>

		<div class="section-block">
			<div class="section-title">我的收藏</div>
			<div class="empty-tip">暂无收藏</div>
		</div>
	</aside>
</template>

<style scoped>
.sidebar { width: 280px; background: white; padding: 16px; display: flex; flex-direction: column; gap: 16px; height: fit-content; max-height: 100%; overflow: hidden; }
.search-section { flex-shrink: 0; }
.custom-search { border-radius: 20px; }
.custom-search :deep(.el-input__wrapper) { border-radius: 20px; background: #fff; border: none; box-shadow: none; padding: 0 16px; height: 44px; }
.custom-search :deep(.el-input__inner) { color: #8e8e93; font-size: 14px; }
.custom-search :deep(.el-input__wrapper:hover) { box-shadow: none; }
.custom-search :deep(.el-input__wrapper.is-focus) { box-shadow: none; }
.navigation-section { flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; background: transparent; padding: 0; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; background: linear-gradient(to right, rgba(224, 242, 254, 0.6), rgba(243, 232, 255, 0.6)); border: none; }
.nav-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.courses-item .nav-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.projects-item .nav-icon { background: linear-gradient(135deg, #34d399 0%, #3b82f6 100%); color: white; }
.nav-content { flex: 1; min-width: 0; }
.nav-title { font-size: 14px; font-weight: 600; color: #1d1d1f; line-height: 1.2; }
.nav-subtitle { font-size: 12px; color: #8e8e93; margin-top: 2px; line-height: 1.2; }
.nav-arrow { color: #c7c7cc; font-size: 16px; flex-shrink: 0; }
.divider { height: 0.5px; background: transparent; border-top: 0.5px dashed #e0e0e0; flex-shrink: 0; }
.section-block { }
.section-title { font-size: 14px; font-weight: 600; color: #303133; margin-bottom: 12px; }
.empty-tip { color: #b0b3b8; font-size: 12px; }
</style>


