<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElSelect, ElOption, ElInput, ElTag, ElButton } from 'element-plus'

interface CourseItem {
	id: string
	title: string
	provider: string
	level: '入门' | '进阶' | '专业'
	language: string
	badge?: string
	cover?: string
	url?: string
	category: string
}

const allCourses = ref<CourseItem[]>([
	{ id: 'cs50', title: 'CS50 计算机科学导论', provider: 'Harvard', level: '入门', language: '英文', badge: '热门', cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=640&auto=format&fit=crop', url: '', category: '计算机基础' },
	{ id: 'ml-stanford', title: 'Machine Learning', provider: 'Stanford', level: '进阶', language: '英文', badge: 'Coursera', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=640&auto=format&fit=crop', url: '', category: '机器学习' },
	{ id: 'dl', title: 'Deep Learning Specialization', provider: 'DeepLearning.AI', level: '专业', language: '英文', badge: '专项', cover: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=640&auto=format&fit=crop', url: '', category: '深度学习' },
	{ id: 'nlp', title: 'Natural Language Processing', provider: 'University of Michigan', level: '进阶', language: '英文', cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=640&auto=format&fit=crop', url: '', category: 'NLP' },
	{ id: 'ai4e', title: 'AI for Everyone', provider: 'DeepLearning.AI', level: '入门', language: '英文', cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=640&auto=format&fit=crop', url: '', category: '人工智能通识' },
])

const keyword = ref('')
const level = ref<string>('')
const provider = ref<string>('')
const activeCategory = ref<string>('全部')

const providers = computed(() => Array.from(new Set(allCourses.value.map(c => c.provider))))
const categories = computed(() => ['全部', ...Array.from(new Set(allCourses.value.map(c => c.category)))])

const filtered = computed(() => {
	return allCourses.value.filter(c => {
		const k = keyword.value.trim().toLowerCase()
		const hit = !k || c.title.toLowerCase().includes(k) || c.provider.toLowerCase().includes(k)
		const levelOk = !level.value || c.level === (level.value as any)
		const providerOk = !provider.value || c.provider === provider.value
		const categoryOk = activeCategory.value === '全部' || c.category === activeCategory.value
		return hit && levelOk && providerOk && categoryOk
	})
})

function open(_item: CourseItem) { /* 展示用途，暂不跳转 */ }
function toggleCategory(cat: string) {
	activeCategory.value = (activeCategory.value === cat ? '全部' : cat)
}
function onCoverError(e: Event) {
	const img = e.target as HTMLImageElement
	img.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=640&auto=format&fit=crop'
}
</script>

<template>
	<div class="list-page">
		<div class="tag-bar">
			<button
				v-for="cat in categories"
				:key="cat"
				type="button"
				class="cat-pill"
				:class="{ active: activeCategory === cat }"
				@click="toggleCategory(cat)"
			>{{ cat }}</button>
		</div>
		<div class="filters">
			<ElInput v-model="keyword" placeholder="搜索课程/提供方" clearable class="kw" />
			<ElSelect v-model="level" placeholder="难度" clearable class="sel">
				<ElOption label="入门" value="入门" />
				<ElOption label="进阶" value="进阶" />
				<ElOption label="专业" value="专业" />
			</ElSelect>
			<ElSelect v-model="provider" placeholder="提供方" clearable class="sel">
				<ElOption v-for="p in providers" :key="p" :label="p" :value="p" />
			</ElSelect>
		</div>

		<div class="cards">
			<div v-for="c in filtered" :key="c.id" class="card">
				<div class="cover">
					<img class="cover-img" :src="c.cover" alt="course cover" loading="lazy" @error="onCoverError" />
				</div>
				<div class="meta">
					<div class="title">{{ c.title }}</div>
					<div class="sub">{{ c.provider }} · {{ c.language }}</div>
					<div class="tags">
						<ElTag type="info" round size="small">{{ c.level }}</ElTag>
						<ElTag v-if="c.badge" round size="small">{{ c.badge }}</ElTag>
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
.cat-pill { border: 1px solid #e5e7eb; background: #fff; color: #374151; border-radius: 999px; padding: 6px 12px; font-size: 12px; cursor: pointer; }
.cat-pill.active { border-color: transparent; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; }
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


