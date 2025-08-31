<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElSelect, ElOption, ElInput, ElTag, ElCheckTag, ElButton } from 'element-plus'

interface ProjectItem {
	id: string
	title: string
	org: string
	type: '交流' | '实习' | '竞赛' | '资助'
	region: string
	language: string
	deadline?: string
	cover?: string
	url?: string
}

const allProjects = ref<ProjectItem[]>([
	{ id: 'mit-exchange', title: 'MIT Exchange Program', org: 'MIT', type: '交流', region: '北美', language: '英文', deadline: '12/01', cover: 'https://images.unsplash.com/photo-1537202108838-e7072bad1927?q=80&w=640&auto=format&fit=crop', url: '' },
	{ id: 'unicef-intern', title: 'UNICEF Internship', org: 'UNICEF', type: '实习', region: '全球', language: '英文', deadline: 'Rolling', cover: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=640&auto=format&fit=crop', url: '' },
	{ id: 'icpc', title: 'ICPC World Finals', org: 'ICPC', type: '竞赛', region: '全球', language: '英文', cover: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=640&auto=format&fit=crop', url: '' },
	{ id: 'erasmus', title: 'Erasmus+ Scholarship', org: 'EU', type: '资助', region: '欧洲', language: '英文', cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=640&auto=format&fit=crop', url: '' },
])

const keyword = ref('')
const type = ref<string>('')
const region = ref<string>('')
const activeType = ref<string>('全部')

const regions = computed(() => Array.from(new Set(allProjects.value.map(p => p.region))))
const types = computed(() => ['全部', '交流', '实习', '竞赛', '资助'])

const filtered = computed(() => {
	return allProjects.value.filter(p => {
		const k = keyword.value.trim().toLowerCase()
		const hit = !k || p.title.toLowerCase().includes(k) || p.org.toLowerCase().includes(k)
		const typeOk = !type.value || p.type === (type.value as any)
		const regionOk = !region.value || p.region === region.value
		const tagOk = activeType.value === '全部' || p.type === activeType.value
		return hit && typeOk && regionOk && tagOk
	})
})

function open(_item: ProjectItem) { /* 展示用途，暂不跳转 */ }
function onCoverError(e: Event) {
	const img = e.target as HTMLImageElement
	img.src = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=640&auto=format&fit=crop'
}
</script>

<template>
	<div class="list-page">
		<div class="tag-bar">
			<ElCheckTag
				v-for="t in types"
				:key="t"
				:checked="activeType === t"
				class="tag"
				@change="() => activeType = (activeType === t ? '全部' : t)"
			>{{ t }}</ElCheckTag>
		</div>
		<div class="filters">
			<ElInput v-model="keyword" placeholder="搜索项目/机构" clearable class="kw" />
			<ElSelect v-model="type" placeholder="类型" clearable class="sel">
				<ElOption label="交流" value="交流" />
				<ElOption label="实习" value="实习" />
				<ElOption label="竞赛" value="竞赛" />
				<ElOption label="资助" value="资助" />
			</ElSelect>
			<ElSelect v-model="region" placeholder="地区" clearable class="sel">
				<ElOption v-for="r in regions" :key="r" :label="r" :value="r" />
			</ElSelect>
		</div>

		<div class="cards">
			<div v-for="p in filtered" :key="p.id" class="card">
				<div class="cover">
					<img class="cover-img" :src="p.cover" alt="project cover" loading="lazy" @error="onCoverError" />
				</div>
				<div class="meta">
					<div class="title">{{ p.title }}</div>
					<div class="sub">{{ p.org }} · {{ p.region }} · {{ p.language }}</div>
					<div class="tags">
						<ElTag type="success" round size="small">{{ p.type }}</ElTag>
						<ElTag v-if="p.deadline" round size="small">截止 {{ p.deadline }}</ElTag>
					</div>
					<div class="actions">
						<ElButton size="small" round>详情</ElButton>
						<ElButton size="small" type="primary" plain round>收藏</ElButton>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.list-page { padding-right: 8px; height: 100%; display: flex; flex-direction: column; }
.filters { display: flex; gap: 8px; margin-bottom: 12px; }
.tag-bar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.tag :deep(.el-check-tag) { border-radius: 999px; }
.kw { flex: 1; }
.sel { width: 140px; }
.cards { flex: 1; overflow: auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; align-content: start; align-items: start; }
.card { background: white; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; border: 1px solid #f1f5f9; transition: transform .12s ease; }
.card:hover { transform: translateY(-2px); }
.cover { width: 100%; height: 160px; border-radius: 10px; overflow: hidden; }
.cover-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.meta { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.title { font-size: 15px; font-weight: 700; color: #1f2937; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sub { font-size: 12px; color: #6b7280; }
.tags { display: flex; gap: 6px; }
.actions { display: flex; gap: 8px; margin-top: 4px; }
</style>


