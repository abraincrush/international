<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import Sidebar from './International/components/Sidebar.vue'

const router = useRouter()
const route = useRoute()

const currentView = ref<'courses' | 'projects'>('courses')

function syncFromRoute() {
	if (route.name === 'international-projects') currentView.value = 'projects'
	else currentView.value = 'courses'
}

watch(() => route.fullPath, () => syncFromRoute(), { immediate: true })

function handleViewChange(view: 'courses' | 'projects') {
	if (view === 'projects') router.push({ name: 'international-projects' })
	else router.push({ name: 'international-courses' })
}
</script>

<template>
	<div class="intl-page">
		<Sidebar :current-view="currentView" :route-name="(route.name as any)" @view-change="handleViewChange" />
		<main class="intl-main">
			<RouterView />
		</main>
	</div>
</template>

<style scoped>
.intl-page { display: flex; height: 100%; gap: 16px; padding: 16px; box-sizing: border-box; }
.intl-main { flex: 1; overflow: hidden; }
</style>



