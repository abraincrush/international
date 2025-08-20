
<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Icon } from '@iconify/vue'

interface Topic {
	id: number
	title: string
	author: string
	content: string
	tags: string[]
	replies: number
	views: number
	time: string
	avatar: string
}

interface Comment {
	id: number
	author: string
	avatar: string
	content: string
	time: string
	likes: number
	replies: number
}

const topics = ref<Topic[]>([
	{
		id: 1,
		title: '如何在国际项目中运用AI技术？',
		author: '@AI探索者',
		content: '最近参与了一个跨文化AI项目，想和大家分享一些经验和思考。在这个项目中，我们遇到了很多跨文化沟通的挑战，同时也发现了AI技术在促进国际协作方面的巨大潜力。想和大家讨论一下，你们在国际项目中是如何运用AI技术的？有什么好的经验和建议可以分享吗？',
		tags: ['AI技术', '国际项目', '跨文化'],
		replies: 23,
		views: 156,
		time: '2小时前',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7'
	},
	{
		id: 2,
		title: '硅谷路演经验分享',
		author: '@创业先锋',
		content: '刚参加完硅谷的创业路演，想和大家聊聊国际创业环境。这次路演让我深刻体会到了硅谷创业生态的独特之处，从投资人到创业者，每个人都在追求创新和突破。想和大家分享一些具体的经验和感受，也希望能听到更多人的故事。',
		tags: ['创业', '硅谷', '路演'],
		replies: 18,
		views: 89,
		time: '5小时前',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7'
	},
	{
		id: 3,
		title: '跨文化团队协作的最佳实践',
		author: '@文化使者',
		content: '在多元文化团队中工作，如何更好地促进协作和创新？这是一个我一直关注的话题。通过多年的实践，我发现跨文化团队协作不仅需要语言能力，更需要文化敏感性和包容性。想和大家分享一些具体的实践方法，也希望能听到更多人的经验。',
		tags: ['团队协作', '跨文化', '创新'],
		replies: 31,
		views: 203,
		time: '1天前',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7'
	}
])

const internationalResources = ref([
	{ name: '国际竞赛平台', icon: 'mdi:trophy', desc: '全球创新竞赛' },
	{ name: '学术写作助手', icon: 'mdi:pen', desc: '国际论文写作' },
	{ name: '技术训练营', icon: 'mdi:school', desc: '前沿技术培训' },
	{ name: '合作课程', icon: 'mdi:book-open', desc: '国际课程合作' }
])

const currentTopic = ref<Topic | null>(null)
const newComment = ref('')
const comments = ref<Comment[]>([
	{
		id: 1,
		author: '@AI探索者',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7',
		content: '这是一个很好的观点！我在国际项目中也遇到过类似的问题。我觉得关键是要建立有效的沟通机制，定期进行文化敏感性培训。',
		time: '1小时前',
		likes: 5,
		replies: 2
	},
	{
		id: 2,
		author: '@创业先锋',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7',
		content: '完全同意！跨文化团队协作确实需要更多的沟通技巧。我在硅谷工作期间，发现成功的团队都有很强的文化包容性。',
		time: '30分钟前',
		likes: 3,
		replies: 0
	}
])

// 发新话题（表单）
const newTopicTitle = ref('')
const newTopicContent = ref('')
const newTopicTags = ref('')

// 搜索筛选
const searchQuery = ref('')
const selectedTags = ref<string[]>([])
const showSearchResults = ref(false)
const showTagsFilter = ref(false)

const allTags = computed(() => {
	const tags = new Set<string>()
	topics.value.forEach(t => t.tags.forEach(tag => tags.add(tag)))
	return Array.from(tags)
})

const filteredTopics = computed(() => {
	let results = topics.value
	if (selectedTags.value.length > 0) {
		results = results.filter(topic => selectedTags.value.some(tag => topic.tags.includes(tag)))
	}
	if (searchQuery.value.trim()) {
		const q = searchQuery.value.toLowerCase()
		results = results.filter(topic =>
			topic.title.toLowerCase().includes(q) ||
			topic.content.toLowerCase().includes(q) ||
			topic.author.toLowerCase().includes(q) ||
			topic.tags.some(tag => tag.toLowerCase().includes(q))
		)
	}
	return results
})

const toggleTag = (tag: string) => {
	const i = selectedTags.value.indexOf(tag)
	if (i > -1) selectedTags.value.splice(i, 1)
	else selectedTags.value.push(tag)
}

const clearSearch = () => {
	searchQuery.value = ''
	selectedTags.value = []
	showSearchResults.value = false
}

const highlightText = (text: string, query: string) => {
	if (!query.trim()) return text
	const regex = new RegExp(`(${query})`, 'gi')
	return text.replace(regex, '<mark class="search-highlight">$1</mark>')
}

// 能力图谱 / AI 助手
const showAtlasSelector = ref(false)
const showAIAssistant = ref(false)
const selectedSkills = ref<string[]>([])

const userAtlas = ref({
	name: '@当前用户',
	avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7',
	skills: [
		{ name: '跨文化交流', level: 85, category: '沟通能力' },
		{ name: '项目管理', level: 78, category: '领导能力' },
		{ name: '数据分析', level: 72, category: '技术能力' },
		{ name: '创新思维', level: 88, category: '思维能力' },
		{ name: '团队协作', level: 82, category: '协作能力' },
		{ name: '语言能力', level: 90, category: '国际能力' },
		{ name: '技术开发', level: 68, category: '技术能力' },
		{ name: '战略规划', level: 75, category: '领导能力' }
	],
	categories: ['沟通能力', '领导能力', '技术能力', '思维能力', '协作能力', '国际能力']
})

const aiFeatures = ref({
	suggestions: [
		'💡 建议：可以分享具体的跨文化经历',
		'🌍 国际化：考虑多语言表达',
		'🎯 聚焦：突出核心观点和收获',
		'📚 引用：可以引用相关理论或案例'
	],
	translations: [
		{ from: '中文', to: 'English', text: '跨文化交流经验分享' },
		{ from: '中文', to: '日本語', text: '異文化コミュニケーション体験の共有' }
	],
	contentOptimization: [
		'优化标题：更具吸引力和国际化',
		'结构化内容：使用清晰的段落和要点',
		'增加互动：鼓励读者参与讨论'
	]
})

const toggleAtlasSelector = () => {
	showAtlasSelector.value = !showAtlasSelector.value
	if (showAtlasSelector.value) showAIAssistant.value = false
}
const toggleAIAssistant = () => {
	showAIAssistant.value = !showAIAssistant.value
	if (showAIAssistant.value) showAtlasSelector.value = false
}

const selectSkill = (skillName: string) => {
	const i = selectedSkills.value.indexOf(skillName)
	if (i > -1) selectedSkills.value.splice(i, 1)
	else selectedSkills.value.push(skillName)
}

const toggleCategory = (category: string) => {
	const categorySkills = userAtlas.value.skills
		.filter(s => s.category === category)
		.map(s => s.name)
	const allSelected = categorySkills.every(s => selectedSkills.value.includes(s))
	if (allSelected) {
		selectedSkills.value = selectedSkills.value.filter(s => !categorySkills.includes(s))
	} else {
		categorySkills.forEach(s => {
			if (!selectedSkills.value.includes(s)) selectedSkills.value.push(s)
		})
	}
}
const clearAllSkills = () => { selectedSkills.value = [] }

const getCategoryIcon = (category: string) => {
	const iconMap: Record<string, string> = {
		'沟通能力': '💬', '领导能力': '👑', '技术能力': '⚡',
		'思维能力': '🧠', '协作能力': '🤝', '国际能力': '🌍'
	}
	return iconMap[category] || '📚'
}
const getSkillIcon = (name: string) => {
	const iconMap: Record<string, string> = {
		'跨文化交流': '🌐','项目管理': '📋','数据分析': '📊','创新思维': '💡',
		'团队协作': '👥','语言能力': '🗣️','技术开发': '💻','战略规划': '🎯'
	}
	return iconMap[name] || '⭐'
}
const getSkillLevelClass = (level: number) => level >= 80 ? 'expert' : level >= 60 ? 'advanced' : level >= 40 ? 'intermediate' : 'beginner'
const getSkillLevelText = (level: number) => level >= 80 ? '专家级' : level >= 60 ? '高级' : level >= 40 ? '中级' : '初级'

const insertAtlasToComment = () => {
	if (selectedSkills.value.length === 0) return ElMessage.warning('请先选择要展示的技能')
	const atlasText = `\n\n[能力图谱展示]\n${selectedSkills.value.map(s => `• ${s}`).join('\n')}`
	newComment.value += atlasText
	ElMessage.success('能力图谱已插入到评论中！')
}
const insertAtlasToNewTopic = () => {
	if (selectedSkills.value.length === 0) return ElMessage.warning('请先选择要展示的技能')
	const atlasText = `\n\n[能力图谱展示]\n${selectedSkills.value.map(s => `• ${s}`).join('\n')}`
	newTopicContent.value += atlasText
	ElMessage.success('能力图谱已插入到话题内容！')
}

const getAISuggestions = (content: string) => {
	const suggestions: string[] = []
	if (content.length < 50) suggestions.push('💡 内容可以更丰富一些，建议增加具体细节')
	if (!content.includes('？') && !content.includes('!')) suggestions.push('🎯 可以增加一些思考性问题，提高互动性')
	const meCount = (content.match(/我/g) || []).length
	if (meCount > 3) suggestions.push('🌍 建议使用更国际化的表达方式')
	return suggestions.length > 0 ? suggestions : ['✨ 内容很棒！继续保持！']
}
const applyAISuggestion = (suggestion: string) => {
	if (suggestion.includes('内容可以更丰富')) newComment.value += '\n\n具体来说，我想分享的是...'
	else if (suggestion.includes('思考性问题')) newComment.value += '\n\n大家觉得呢？有什么想法？'
	else if (suggestion.includes('国际化表达')) newComment.value = newComment.value.replace(/我/g, '我们')
	ElMessage.success('AI建议已应用！')
}

// 列表/详情切换
const viewTopicDetail = (topic: Topic) => { currentTopic.value = topic }
const backToTopics = () => { currentTopic.value = null }

// 发布新话题
const publishNewTopic = () => {
	const title = newTopicTitle.value.trim()
	const content = newTopicContent.value.trim()
	if (!title || !content) return ElMessage.warning('请填写完整的标题与内容')
	const tags = newTopicTags.value.split(',').map(t => t.trim()).filter(Boolean)
	const newTopic: Topic = {
		id: Date.now(),
		title,
		author: '@当前用户',
		content,
		tags: tags.length ? tags : ['新话题'],
		replies: 0,
		views: 0,
		time: '刚刚',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7'
	}
	topics.value.unshift(newTopic)
	newTopicTitle.value = ''
	newTopicContent.value = ''
	newTopicTags.value = ''
	selectedSkills.value = []
	ElMessage.success('发布成功！')
}

// 发表评论
const addComment = () => {
	if (!newComment.value.trim()) return
	const comment: Comment = {
		id: Date.now(),
		author: '@当前用户',
		avatar: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7',
		content: newComment.value,
		time: '刚刚',
		likes: 0,
		replies: 0
	}
	comments.value.unshift(comment)
	newComment.value = ''
	ElMessage.success('评论发布成功！')
}
</script>

<template>
	<!-- 列表页（currentTopic 为空） -->
	<div v-if="!currentTopic">
		<section class="section-card section-hero">
			<h1 class="hero-title">开放交流 Open Exchange</h1>
			<div class="hero-subtitle-row">
				<span class="hero-subtitle">自由创设场景</span>
				<span class="hero-subtitle">展开话题讨论</span>
				<span class="hero-subtitle">连接全球创新者</span>
			</div>
		</section>

		<section class="search-section">
			<div class="search-container">
				<div class="search-input-wrapper">
					<Icon icon="mdi:magnify" class="search-icon" />
					<input
						v-model="searchQuery"
						type="text"
						class="search-input"
						placeholder="搜索话题、作者或标签..."
						@input="showSearchResults = true"
					/>
					<button
						v-if="searchQuery || selectedTags.length > 0"
						class="clear-search-btn"
						@click="clearSearch"
						title="清除搜索"
					>✕</button>
				</div>

				<div class="tags-filter">
					<div class="tags-filter-header">
						<span class="tags-filter-label">标签筛选</span>
						<button class="tags-toggle-btn" @click="showTagsFilter = !showTagsFilter" :class="{ active: showTagsFilter }">
							{{ showTagsFilter ? '收起' : '展开' }}
							<Icon :icon="showTagsFilter ? 'mdi:chevron-up' : 'mdi:chevron-down'" width="16" />
						</button>
					</div>

					<div v-if="selectedTags.length > 0" class="selected-tags-display">
						<span class="selected-tags-label">已选标签：</span>
						<div class="selected-tags-list">
							<span v-for="tag in selectedTags" :key="tag" class="selected-tag-chip">
								{{ tag }}
								<button class="remove-tag-btn" @click="toggleTag(tag)" title="移除标签">×</button>
							</span>
						</div>
					</div>

					<div v-show="showTagsFilter" class="tags-filter-list">
						<button
							v-for="tag in allTags"
							:key="tag"
							class="tag-filter-btn"
							:class="{ active: selectedTags.includes(tag) }"
							@click="toggleTag(tag)"
						>{{ tag }}</button>
					</div>
				</div>

				<div v-if="searchQuery || selectedTags.length > 0" class="search-stats">
					<span class="search-results-count">找到 {{ filteredTopics.length }} 个话题</span>
					<button class="clear-all-btn" @click="clearSearch">清除所有筛选</button>
				</div>
			</div>
		</section>

		<section class="topics-section">
			<div class="section-header-row">
				<span class="section-header-title">{{ searchQuery || selectedTags.length > 0 ? '搜索结果' : '热门话题' }}</span>
				<span class="section-header-arrow">&gt;</span>
			</div>
			<div class="topics-grid">
				<div
					v-for="topic in filteredTopics"
					:key="topic.id"
					class="topic-card-compact"
					@click="viewTopicDetail(topic)"
				>
					<div class="topic-header-compact">
						<img :src="topic.avatar" class="topic-avatar-compact" />
						<div class="topic-meta-compact">
							<span class="topic-author-compact" v-html="highlightText(topic.author, searchQuery)"></span>
							<span class="topic-time-compact">{{ topic.time }}</span>
						</div>
						<div class="topic-stats-compact">
							<span class="topic-replies-compact">💬 {{ topic.replies }}</span>
							<span class="topic-views-compact">👁️ {{ topic.views }}</span>
						</div>
					</div>
					<div class="topic-content-compact">
						<h3 class="topic-title-compact" v-html="highlightText(topic.title, searchQuery)"></h3>
						<p class="topic-text-compact" v-html="highlightText(topic.content, searchQuery)"></p>
						<div class="topic-tags-compact">
							<span
								v-for="tag in topic.tags"
								:key="tag"
								class="topic-tag-compact"
								v-html="highlightText(tag, searchQuery)"
							></span>
						</div>
					</div>
					<div class="topic-actions-compact">
						<button class="topic-action-btn-compact" @click.stop="viewTopicDetail(topic)">💬 查看详情</button>
						<button class="topic-action-btn-compact">📤 分享</button>
						<button class="topic-action-btn-compact">⭐ 收藏</button>
					</div>
				</div>

				<div v-if="filteredTopics.length === 0 && (searchQuery || selectedTags.length > 0)" class="no-results">
					<div class="no-results-content">
						<Icon icon="mdi:magnify" class="no-results-icon" />
						<h3 class="no-results-title">未找到相关话题</h3>
						<p class="no-results-desc">尝试调整搜索关键词或标签筛选条件</p>
						<button class="no-results-btn" @click="clearSearch">清除搜索条件</button>
					</div>
				</div>
			</div>
		</section>

		<section class="resources-section">
			<div class="section-header-row">
				<span class="section-header-title">国际资源</span>
				<span class="section-header-arrow">&gt;</span>
			</div>
			<div class="resources-grid-compact">
				<div class="resource-card-compact" v-for="resource in internationalResources" :key="resource.name">
					<div class="resource-icon-compact"><Icon :icon="resource.icon" width="24" /></div>
					<div class="resource-content-compact">
						<h3 class="resource-title-compact">{{ resource.name }}</h3>
						<p class="resource-desc-compact">{{ resource.desc }}</p>
					</div>
					<button class="resource-btn-compact">访问</button>
				</div>
			</div>
		</section>

		<section class="new-topic-section">
			<div class="section-header-row">
				<span class="section-header-title">发布新话题</span>
				<span class="section-header-arrow">&gt;</span>
			</div>
			<div class="new-topic-form-compact">
				<input v-model="newTopicTitle" type="text" class="topic-title-input-compact" placeholder="输入话题标题..." />
				<textarea v-model="newTopicContent" class="topic-content-input-compact" placeholder="分享你的想法、经验或问题..."></textarea>

				<div class="editor-toolbar">
					<div class="toolbar-left">
						<button class="toolbar-btn atlas-btn" @click="toggleAtlasSelector" :class="{ active: showAtlasSelector }" title="插入能力图谱">🗺️ 能力图谱</button>
						<button class="toolbar-btn ai-btn" @click="toggleAIAssistant" :class="{ active: showAIAssistant }" title="AI助手帮助">🤖 AI助手</button>
					</div>
					<div v-if="selectedSkills.length > 0" class="selected-skills">
						<span class="selected-skills-label">已选技能：</span>
						<span v-for="skill in selectedSkills" :key="skill" class="selected-skill-tag">{{ skill }}</span>
					</div>
				</div>

				<div class="topic-form-actions-compact">
					<div class="topic-tags-input-compact">
						<span class="tags-label-compact">标签：</span>
						<input v-model="newTopicTags" type="text" placeholder="添加标签，用逗号分隔" class="tags-input-compact" />
					</div>
					<button class="publish-btn-compact" @click="publishNewTopic">📝 发布话题</button>
				</div>
			</div>
		</section>

		<!-- 能力图谱选择器（列表页） -->
		<div v-if="showAtlasSelector" class="atlas-selector">
			<div class="atlas-selector-header">
				<h4>🌟 能力图谱 - 技能展示</h4>
				<button class="close-btn" @click="showAtlasSelector = false">✕</button>
			</div>

			<div class="user-profile-card">
				<div class="profile-avatar"><img :src="userAtlas.avatar" alt="用户头像" /></div>
				<div class="profile-info">
					<h3 class="profile-name">{{ userAtlas.name }}</h3>
					<p class="profile-desc">展示您的核心技能与专长</p>
				</div>
			</div>

			<div class="category-filter">
				<span class="filter-label">筛选类别：</span>
				<div class="category-buttons">
					<button class="category-btn all-btn" :class="{ active: selectedSkills.length === 0 }" @click="clearAllSkills">🌟 全部技能</button>
					<button
						v-for="category in userAtlas.categories"
						:key="category"
						class="category-btn"
						:class="{ active: selectedSkills.some(s => userAtlas.skills.find(x => x.name === s)?.category === category) }"
						@click="toggleCategory(category)"
					>{{ getCategoryIcon(category) }} {{ category }}</button>
				</div>
			</div>

			<div class="skills-grid">
				<div
					v-for="skill in userAtlas.skills"
					:key="skill.name"
					class="skill-card"
					:class="{ selected: selectedSkills.includes(skill.name), [getSkillLevelClass(skill.level)]: true }"
					@click="selectSkill(skill.name)"
				>
					<div class="skill-icon">{{ getSkillIcon(skill.name) }}</div>
					<div class="skill-content">
						<h4 class="skill-name">{{ skill.name }}</h4>
						<p class="skill-category">{{ skill.category }}</p>
						<div class="skill-progress">
							<div class="progress-bar"><div class="progress-fill" :style="{ width: skill.level + '%' }"></div></div>
							<span class="progress-text">{{ skill.level }}%</span>
						</div>
						<div class="skill-level-badge">{{ getSkillLevelText(skill.level) }}</div>
					</div>
					<div class="selection-indicator"><div class="checkmark">✓</div></div>
				</div>
			</div>

			<div class="atlas-selector-actions">
				<button class="insert-atlas-btn" @click="insertAtlasToNewTopic">🚀 插入到内容</button>
			</div>
		</div>

		<!-- AI助手（列表页） -->
		<div v-if="showAIAssistant" class="ai-assistant">
			<div class="ai-assistant-header">
				<h4>🤖 AI智能助手</h4>
				<button class="close-btn" @click="showAIAssistant = false">✕</button>
			</div>
			<div class="ai-assistant-content">
				<div class="ai-suggestions">
					<h5>💡 智能建议</h5>
					<div class="suggestion-list">
						<div v-for="suggestion in getAISuggestions(newTopicContent)" :key="suggestion" class="suggestion-item">
							<span class="suggestion-text">{{ suggestion }}</span>
						</div>
					</div>
				</div>

				<div class="ai-translations">
					<h5>🌍 多语言翻译</h5>
					<div class="translation-list">
						<div v-for="translation in aiFeatures.translations" :key="translation.from + translation.to" class="translation-item">
							<div class="translation-header">
								<span class="translation-from">{{ translation.from }}</span>
								<span class="translation-arrow">→</span>
								<span class="translation-to">{{ translation.to }}</span>
								<button class="copy-translation-btn" title="复制翻译">📋</button>
							</div>
							<div class="translation-text">{{ translation.text }}</div>
						</div>
					</div>
				</div>

				<div class="ai-optimization">
					<h5>📝 内容优化</h5>
					<div class="optimization-list">
						<div v-for="tip in aiFeatures.contentOptimization" :key="tip" class="optimization-item">{{ tip }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 详情页（currentTopic 不为空） -->
	<div v-else class="topic-detail-page">
		<section class="section-card section-hero topic-detail-hero">
			<div class="topic-detail-hero-content">
				<h1 class="topic-detail-hero-title">{{ currentTopic!.title }}</h1>
				<div class="topic-detail-hero-meta">
					<span class="topic-detail-hero-author">作者：{{ currentTopic!.author }}</span>
					<span class="topic-detail-hero-time">{{ currentTopic!.time }}</span>
					<span class="topic-detail-hero-stats">💬 {{ currentTopic!.replies }} 回复 | 👁️ {{ currentTopic!.views }} 浏览</span>
				</div>
			</div>
		</section>

		<div class="breadcrumb-container">
			<span class="breadcrumb-item" @click="backToTopics">开放交流</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item" @click="backToTopics">热门话题</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item active">{{ currentTopic!.title }}</span>
		</div>

		<div class="back-button-container">
			<button class="back-btn" @click="backToTopics"><Icon icon="mdi:arrow-left" width="20" />返回话题列表</button>
		</div>

		<section class="topic-detail-section">
			<div class="topic-detail-content">
				<p class="topic-detail-text">{{ currentTopic!.content }}</p>
				<div class="topic-detail-tags">
					<span class="topic-detail-tag" v-for="tag in currentTopic!.tags" :key="tag">{{ tag }}</span>
				</div>
			</div>
		</section>

		<section class="comments-section">
			<div class="section-header-row">
				<span class="section-header-title">评论 ({{ comments.length }})</span>
				<span class="section-header-arrow">&gt;</span>
			</div>

			<div class="comment-form">
				<div class="comment-input-container">
					<img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="comment-avatar" />
					<div class="comment-input-wrapper">
						<textarea v-model="newComment" class="comment-input" placeholder="写下你的评论..." rows="3"></textarea>
						<div class="comment-actions">
							<button class="comment-action-btn atlas-btn" @click="toggleAtlasSelector" :class="{ active: showAtlasSelector }" title="插入能力图谱">📊 能力图谱</button>
							<button class="comment-action-btn ai-btn" @click="toggleAIAssistant" :class="{ active: showAIAssistant }" title="AI助手帮助">🤖 AI助手</button>
							<button class="comment-submit-btn" @click="addComment" :disabled="!newComment.trim()">发表评论</button>
						</div>
					</div>
				</div>
			</div>

			<div class="comments-list">
				<div class="comment-item" v-for="comment in comments" :key="comment.id">
					<img :src="comment.avatar" class="comment-avatar" />
					<div class="comment-content">
						<div class="comment-header">
							<span class="comment-author">{{ comment.author }}</span>
							<span class="comment-time">{{ comment.time }}</span>
						</div>
						<p class="comment-text">{{ comment.content }}</p>
						<div class="comment-footer">
							<button class="comment-like-btn">👍 {{ comment.likes }}</button>
							<button class="comment-reply-btn">💬 回复</button>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- 能力图谱选择器（详情页） -->
		<div v-if="showAtlasSelector" class="atlas-selector topic-detail-atlas">
			<div class="atlas-selector-header">
				<h4>🌟 能力图谱 - 技能展示</h4>
				<button class="close-btn" @click="showAtlasSelector = false">✕</button>
			</div>
			<div class="user-profile-card">
				<div class="profile-avatar"><img :src="userAtlas.avatar" alt="用户头像" /></div>
				<div class="profile-info">
					<h3 class="profile-name">{{ userAtlas.name }}</h3>
					<p class="profile-desc">展示您的核心技能与专长</p>
				</div>
			</div>
			<div class="category-filter">
				<span class="filter-label">筛选类别：</span>
				<div class="category-buttons">
					<button class="category-btn all-btn" :class="{ active: selectedSkills.length === 0 }" @click="clearAllSkills">🌟 全部技能</button>
					<button
						v-for="category in userAtlas.categories"
						:key="category"
						class="category-btn"
						:class="{ active: selectedSkills.some(s => userAtlas.skills.find(x => x.name === s)?.category === category) }"
						@click="toggleCategory(category)"
					>{{ getCategoryIcon(category) }} {{ category }}</button>
				</div>
			</div>
			<div class="skills-grid">
				<div
					v-for="skill in userAtlas.skills"
					:key="skill.name"
					class="skill-card"
					:class="{ selected: selectedSkills.includes(skill.name), [getSkillLevelClass(skill.level)]: true }"
					@click="selectSkill(skill.name)"
				>
					<div class="skill-icon">{{ getSkillIcon(skill.name) }}</div>
					<div class="skill-content">
						<h4 class="skill-name">{{ skill.name }}</h4>
						<p class="skill-category">{{ skill.category }}</p>
						<div class="skill-progress">
							<div class="progress-bar"><div class="progress-fill" :style="{ width: skill.level + '%' }"></div></div>
							<span class="progress-text">{{ skill.level }}%</span>
						</div>
						<div class="skill-level-badge">{{ getSkillLevelText(skill.level) }}</div>
					</div>
					<div class="selection-indicator"><div class="checkmark">✓</div></div>
				</div>
			</div>
			<div class="atlas-selector-actions">
				<button class="insert-atlas-btn" @click="insertAtlasToComment">🚀 插入到评论</button>
			</div>
		</div>

		<!-- AI助手（详情页） -->
		<div v-if="showAIAssistant" class="ai-assistant topic-detail-ai">
			<div class="ai-assistant-header">
				<h4>🤖 AI智能助手</h4>
				<button class="close-btn" @click="showAIAssistant = false">✕</button>
			</div>
			<div class="ai-assistant-content">
				<div class="ai-suggestions">
					<h5>💡 智能建议</h5>
					<div class="suggestion-list">
						<div v-for="suggestion in getAISuggestions(newComment)" :key="suggestion" class="suggestion-item">
							<span class="suggestion-text">{{ suggestion }}</span>
							<button class="apply-suggestion-btn" @click="applyAISuggestion(suggestion)">应用</button>
						</div>
					</div>
				</div>

				<div class="ai-translations">
					<h5>🌍 多语言翻译</h5>
					<div class="translation-list">
						<div v-for="translation in aiFeatures.translations" :key="translation.from + translation.to" class="translation-item">
							<div class="translation-header">
								<span class="translation-from">{{ translation.from }}</span>
								<span class="translation-arrow">→</span>
								<span class="translation-to">{{ translation.to }}</span>
								<button class="copy-translation-btn" title="复制翻译">📋</button>
							</div>
							<div class="translation-text">{{ translation.text }}</div>
						</div>
					</div>
				</div>

				<div class="ai-optimization">
					<h5>📝 内容优化</h5>
					<div class="optimization-list">
						<div v-for="tip in aiFeatures.contentOptimization" :key="tip" class="optimization-item">{{ tip }}</div>
					</div>
				</div>

				<div class="ai-analysis">
					<h5>🔍 智能分析</h5>
					<div class="analysis-content">
						<div class="analysis-item">
							<span class="analysis-label">内容质量：</span>
							<div class="quality-score">
								<div class="score-bar"><div class="score-fill" style="width: 85%"></div></div>
								<span class="score-text">85/100</span>
							</div>
						</div>
						<div class="analysis-item">
							<span class="analysis-label">国际化程度：</span>
							<div class="quality-score">
								<div class="score-bar"><div class="score-fill" style="width: 72%"></div></div>
								<span class="score-text">72/100</span>
							</div>
						</div>
						<div class="analysis-item">
							<span class="analysis-label">互动性：</span>
							<div class="quality-score">
								<div class="score-bar"><div class="score-fill" style="width: 90%"></div></div>
								<span class="score-text">90/100</span>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<style scoped>
/* 英雄区 */
.section-card {
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 6px 24px rgba(80,60,180,0.06);
	border: 1px solid #eef1ff;
	margin-bottom: 12px;
	padding: 14px 10px;
	max-width: 96%;
	margin-left: auto;
	margin-right: auto;
}
.section-hero {
	min-height: 240px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, rgba(237,233,254,0.85) 0%, rgba(245,243,255,0.85) 100%);
	border-radius: 20px;
	box-shadow: 0 4px 24px 0 rgba(80, 60, 180, 0.06);
	margin-bottom: 0px;
	padding: 20px 48px 12px 48px;
	position: relative;
	overflow: hidden;
	max-width: 96%;
	margin-left: auto;
	margin-right: auto;
}
.hero-title {
	font-size: 3.2em;
	font-weight: 900;
	letter-spacing: 0.02em;
	margin-bottom: 36px;
	z-index: 1;
	background: linear-gradient(90deg,#1f2937,#4b3fbf,#7b5be6);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
}
.hero-subtitle-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 130px;
	margin-bottom: 0;
	z-index: 1;
	margin-top: 25px;
}
.hero-subtitle {
	background: rgba(255,255,255,0.7);
	border-radius: 10px;
	padding: 8px 32px;
	font-size: 1.08em;
	box-shadow: 0 1px 4px rgba(80, 60, 180, 0.04);
	margin-bottom: 0;
}
.section-header-row {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 8px;
	gap: 8px;
}
.section-header-title {
	font-size: 1em;
	color: #222;
	font-weight: 600;
	letter-spacing: 0.01em;
	margin-left: 8px;
	margin-top: 10px;
	margin-bottom: 0px;
	display: inline-block;
}
.section-header-arrow {
	font-size: 1.1em;
	color: #b5aeea;
	margin-left: -4px;
	margin-top: 10px;
}

/* 搜索 */
.search-section { margin-bottom: 16px; max-width: 96%; margin-left: auto; margin-right: auto; }
.search-container { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eef1ff; padding: 16px; }
.search-input-wrapper { position: relative; margin-bottom: 12px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #999; font-size: 20px; z-index: 1; }
.search-input { width: 100%; padding: 10px 16px 10px 44px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 1em; color: #333; background: #f9f9f9; transition: all 0.2s ease; }
.search-input:focus { border-color: #7b5be6; outline: none; background: #fff; box-shadow: 0 0 0 3px rgba(123,91,230,0.1); }
.clear-search-btn { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #f0f0f0; border: none; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; font-size: 12px; transition: all 0.2s ease; }
.clear-search-btn:hover { background: #e0e0e0; color: #333; }

.tags-filter { margin-bottom: 12px; }
.tags-filter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.tags-filter-label { font-weight: 500; color: #666; font-size: 0.9em; }
.tags-toggle-btn { display: flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid #e0e0e0; border-radius: 6px; background: #f5f5f5; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.85em; }
.tags-toggle-btn:hover { background: #e0e0e0; border-color: #ccc; color: #333; }
.tags-toggle-btn.active { background: #7b5be6; border-color: #7b5be6; color: #fff; }

.selected-tags-display { margin-bottom: 8px; padding: 6px 10px; background: #f8f9ff; border-radius: 6px; border: 1px solid #e0e8ff; }
.selected-tags-label { display: block; font-size: 0.85em; color: #666; margin-bottom: 6px; }
.selected-tags-list { display: flex; flex-wrap: wrap; gap: 6px; }
.selected-tag-chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #7b5be6; color: #fff; border-radius: 16px; font-size: 0.8em; font-weight: 500; }
.remove-tag-btn { background: none; border: none; color: #fff; cursor: pointer; font-size: 14px; font-weight: bold; padding: 0; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s ease; }
.remove-tag-btn:hover { background: rgba(255, 255, 255, 0.2); }

.tags-filter-list { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px; background: #f8f9ff; border-radius: 8px; border: 1px solid #e0e8ff; }
.tag-filter-btn { padding: 5px 10px; border: 1px solid #e0e0e0; border-radius: 6px; background: #f5f5f5; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.85em; }
.tag-filter-btn:hover { background: #e0e0e0; border-color: #ccc; }
.tag-filter-btn.active { background: #7b5be6; border-color: #7b5be6; color: #fff; }

.search-stats { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid #f0f0f0; }
.search-results-count { color: #666; font-size: 0.9em; }
.clear-all-btn { padding: 6px 12px; border: 1px solid #e0e0e0; border-radius: 6px; background: #f5f5f5; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.85em; }
.clear-all-btn:hover { background: #e0e0e0; border-color: #ccc; }

/* 话题卡 */
.topics-section { margin-bottom: 12px; padding: 0; max-width: 96%; margin-left: auto; margin-right: auto; }
.topics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 10px; }
.topic-card-compact { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eef1ff; padding: 16px; transition: all 0.2s ease; cursor: pointer; position: relative; }
.topic-card-compact::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px; background: linear-gradient(135deg, rgba(123,91,230,0.02) 0%, rgba(91,141,239,0.02) 100%); opacity: 0; transition: opacity 0.2s ease; }
.topic-card-compact:hover::before { opacity: 1; }
.topic-card-compact:hover { box-shadow: 0 4px 16px rgba(80,60,180,0.12); transform: translateY(-2px); }

.topic-header-compact { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.topic-avatar-compact { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.topic-meta-compact { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.topic-author-compact { font-weight: 600; color: #333; font-size: 0.9em; }
.topic-time-compact { font-size: 0.8em; color: #888; }
.topic-stats-compact { display: flex; gap: 12px; font-size: 0.8em; color: #666; }

.topic-content-compact { margin-bottom: 12px; }
.topic-title-compact { font-size: 1.1em; font-weight: 600; color: #222; margin-bottom: 8px; line-height: 1.3; }
.topic-text-compact { color: #666; line-height: 1.4; margin-bottom: 10px; font-size: 0.9em; }

.topic-tags-compact { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.topic-tag-compact { background: #f0f7ff; border-radius: 6px; padding: 4px 8px; border: 1px solid #e0f0ff; font-size: 0.8em; color: #7b5be6; transition: all 0.2s ease; cursor: pointer; }
.topic-tag-compact:hover { background: #e0f0ff; border-color: #7b5be6; transform: translateY(-1px); }

.topic-actions-compact { display: flex; gap: 8px; }
.topic-action-btn-compact { flex: 1; border-radius: 8px; font-size: 0.85em; padding: 6px 12px; border: 1px solid #e0f0ff; color: #7b5be6; background: #f0f7ff; cursor: pointer; transition: all 0.2s ease; }
.topic-action-btn-compact:hover { background: #e0f0ff; border-color: #7b5be6; transform: translateY(-1px); }

/* 无搜索结果 */
.no-results { grid-column: 1 / -1; text-align: center; padding: 40px 20px; }
.no-results-content { max-width: 400px; margin: 0 auto; }
.no-results-icon { font-size: 48px; color: #ccc; margin-bottom: 16px; }
.no-results-title { font-size: 1.2em; color: #666; margin-bottom: 8px; font-weight: 600; }
.no-results-desc { color: #999; margin-bottom: 20px; line-height: 1.5; }
.no-results-btn { padding: 8px 16px; border: 1px solid #7b5be6; border-radius: 6px; background: #7b5be6; color: #fff; cursor: pointer; transition: all 0.2s ease; font-size: 0.9em; }
.no-results-btn:hover { background: #6a4fd8; border-color: #6a4fd8; transform: translateY(-1px); }

/* 资源 */
.resources-section { margin-bottom: 12px; padding: 0; max-width: 96%; margin-left: auto; margin-right: auto; }
.resources-grid-compact { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; margin-top: 10px; }
.resource-card-compact { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: #f8faff; border-radius: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eef1ff; transition: all 0.2s ease; cursor: pointer; }
.resource-card-compact:hover { background: #f0f7ff; box-shadow: 0 4px 16px rgba(123,91,230,0.1); transform: translateY(-2px); border-color: #b5aeea; }
.resource-icon-compact { font-size: 24px; color: #7b5be6; flex-shrink: 0; }
.resource-content-compact { flex: 1; min-width: 0; }
.resource-title-compact { font-size: 1em; font-weight: 600; color: #222; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.resource-desc-compact { font-size: 0.85em; color: #666; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.resource-btn-compact { border-radius: 8px; font-size: 0.85em; padding: 4px 12px; border: 1px solid #b5aeea; color: #7b5be6; background: rgba(245,243,255,0.8); cursor: pointer; transition: all 0.2s ease; flex-shrink: 0; }
.resource-btn-compact:hover { background: #ede9fe; transform: translateY(-1px); }

/* 发帖 */
.new-topic-section { margin-bottom: 12px; padding: 0; max-width: 96%; margin-left: auto; margin-right: auto; }
.new-topic-form-compact { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eef1ff; }
.topic-title-input-compact { padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 1em; color: #333; background: #f9f9f9; transition: all 0.2s ease; }
.topic-title-input-compact:focus { border-color: #7b5be6; outline: none; background: #fff; box-shadow: 0 0 0 3px rgba(123,91,230,0.1); }
.topic-content-input-compact { padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 0.95em; color: #333; background: #f9f9f9; transition: all 0.2s ease; min-height: 80px; resize: vertical; font-family: inherit; }
.topic-content-input-compact:focus { border-color: #7b5be6; outline: none; background: #fff; box-shadow: 0 0 0 3px rgba(123,91,230,0.1); }
.topic-form-actions-compact { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.topic-tags-input-compact { display: flex; align-items: center; gap: 8px; flex: 1; }
.tags-label-compact { font-weight: 500; color: #666; font-size: 0.9em; white-space: nowrap; }
.tags-input-compact { flex: 1; padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 0.9em; color: #333; background: #f9f9f9; transition: all 0.2s ease; }
.tags-input-compact:focus { border-color: #7b5be6; outline: none; background: #fff; }
.publish-btn-compact { border-radius: 8px; font-size: 0.95em; padding: 8px 20px; border: 1px solid #b5aeea; color: #7b5be6; background: #f5faff; cursor: pointer; transition: all 0.2s ease; font-weight: 500; }

/* 编辑器工具栏 */
.editor-toolbar { display: flex; justify-content: space-between; align-items: center; margin: 16px 0; padding: 12px 16px; background: #f8f9ff; border-radius: 8px; border: 1px solid #e0e8ff; }
.toolbar-left { display: flex; gap: 8px; }
.toolbar-btn { padding: 8px 16px; border: 1px solid #d0d7ff; border-radius: 6px; background: #fff; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.9em; display: flex; align-items: center; gap: 6px; }
.toolbar-btn:hover { background: #f0f4ff; border-color: #7b5be6; color: #7b5be6; }
.toolbar-btn.active { background: #7b5be6; border-color: #7b5be6; color: #fff; }
.selected-skills { display: flex; align-items: center; gap: 8px; }
.selected-skills-label { font-size: 0.85em; color: #666; }
.selected-skill-tag { padding: 4px 8px; background: #e8f5e8; color: #2d5a2d; border-radius: 4px; font-size: 0.8em; border: 1px solid #c8e6c8; }

/* 能力图谱（通用） */
.atlas-selector { background: #fff; border: 1px solid #e0e8ff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); margin: 16px 0; overflow: hidden; }
.user-profile-card { display: flex; align-items: center; gap: 16px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; margin: 20px; color: #fff; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3); }
.profile-avatar img { width: 60px; height: 60px; border-radius: 50%; border: 3px solid rgba(255, 255, 255, 0.3); object-fit: cover; }
.profile-info h3 { margin: 0 0 4px 0; font-size: 1.2em; font-weight: 600; }
.profile-desc { margin: 0; opacity: 0.9; font-size: 0.9em; }
.category-filter { padding: 0 20px 20px; }
.filter-label { display: block; font-weight: 500; color: #666; margin-bottom: 12px; font-size: 0.9em; }
.category-buttons { display: flex; flex-wrap: wrap; gap: 8px; }
.category-btn { padding: 8px 16px; border: 2px solid #e0e8ff; border-radius: 25px; background: #fff; color: #666; cursor: pointer; transition: all 0.3s ease; font-size: 0.85em; font-weight: 500; }
.category-btn:hover { border-color: #7b5be6; color: #7b5be6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(123, 91, 230, 0.2); }
.category-btn.active { background: #7b5be6; border-color: #7b5be6; color: #fff; box-shadow: 0 4px 16px rgba(123, 91, 230, 0.4); }
.all-btn.active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-color: transparent; }

.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; padding: 0 20px 20px; }
.skill-card { background: #fff; border-radius: 16px; padding: 20px; border: 2px solid #f0f4ff; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; }
.skill-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); transform: scaleX(0); transition: transform 0.3s ease; }
.skill-card:hover::before { transform: scaleX(1); }
.skill-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1); border-color: #7b5be6; }
.skill-card.selected { border-color: #7b5be6; background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%); box-shadow: 0 8px 24px rgba(123, 91, 230, 0.2); }
.skill-card.selected::before { transform: scaleX(1); }
.skill-icon { font-size: 2.5em; margin-bottom: 16px; text-align: center; }
.skill-content h4 { margin: 0 0 8px 0; color: #333; font-size: 1.1em; font-weight: 600; }
.skill-category { margin: 0 0 16px 0; color: #666; font-size: 0.9em; }
.skill-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.progress-bar { flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 4px; transition: width 0.6s ease; }
.progress-text { font-size: 0.9em; font-weight: 600; color: #7b5be6; min-width: 40px; }
.skill-level-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 0.8em; font-weight: 500; text-align: center; }
.skill-card.beginner .skill-level-badge { background: #e8f5e8; color: #2d5a2d; }
.skill-card.intermediate .skill-level-badge { background: #fff3cd; color: #856404; }
.skill-card.advanced .skill-level-badge { background: #d1ecf1; color: #0c5460; }
.skill-card.expert .skill-level-badge { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
.selection-indicator { position: absolute; top: 16px; right: 16px; width: 24px; height: 24px; border-radius: 50%; background: #7b5be6; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: bold; opacity: 0; transform: scale(0); transition: all 0.3s ease; }
.skill-card.selected .selection-indicator { opacity: 1; transform: scale(1); }
.atlas-selector-actions { padding: 16px 20px; background: #f8f9ff; border-top: 1px solid #e0e8ff; text-align: center; }
.insert-atlas-btn { padding: 10px 24px; background: #7b5be6; color: #fff; border: none; border-radius: 8px; font-size: 0.95em; font-weight: 500; cursor: pointer; transition: all 0.2s ease; }
.insert-atlas-btn:hover { background: #6a4fd8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(123,91,230,0.3); }

/* AI助手（通用） */
.ai-assistant { background: #fff; border: 1px solid #e0e8ff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); margin: 16px 0; overflow: hidden; }
.ai-assistant-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%); border-bottom: 1px solid #fecaca; }
.ai-assistant-header h4 { margin: 0; color: #333; font-size: 1.1em; font-weight: 600; }
.ai-assistant-content { padding: 20px; max-height: 400px; overflow-y: auto; }
.ai-suggestions, .ai-translations, .ai-optimization { margin-bottom: 24px; }
.ai-suggestions h5, .ai-translations h5, .ai-optimization h5 { margin: 0 0 12px 0; color: #dc2626; font-size: 1em; font-weight: 600; padding-bottom: 6px; border-bottom: 2px solid #fecaca; }
.suggestion-list, .translation-list, .optimization-list { display: flex; flex-direction: column; gap: 8px; }
.suggestion-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; }
.suggestion-text { flex: 1; color: #666; font-size: 0.9em; line-height: 1.4; }
.apply-suggestion-btn { padding: 6px 12px; background: #dc2626; color: #fff; border: none; border-radius: 6px; font-size: 0.8em; cursor: pointer; transition: all 0.2s ease; }
.apply-suggestion-btn:hover { background: #b91c1c; transform: translateY(-1px); }
.translation-item { padding: 12px 16px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; }
.translation-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.translation-from, .translation-to { font-size: 0.8em; color: #0369a1; font-weight: 500; }
.translation-arrow { color: #666; font-size: 0.8em; }
.copy-translation-btn { background: #0369a1; color: #fff; border: none; border-radius: 4px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; transition: all 0.2s ease; }
.copy-translation-btn:hover { background: #075985; transform: scale(1.1); }
.translation-text { color: #666; font-size: 0.9em; line-height: 1.4; }
.optimization-item { padding: 12px 16px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; color: #666; font-size: 0.9em; line-height: 1.4; }

/* 帖子详情 */
.topic-detail-page { max-width: 96%; margin-left: auto; margin-right: auto; animation: fadeIn 0.3s ease-in-out; }
.topic-detail-hero { background: linear-gradient(135deg, rgba(237,233,254,0.9) 0%, rgba(245,243,255,0.9) 100%); border-radius: 20px; box-shadow: 0 4px 24px 0 rgba(80, 60, 180, 0.08); margin-bottom: 20px; padding: 24px 32px; text-align: center; }
.topic-detail-hero-content { max-width: 800px; margin: 0 auto; }
.topic-detail-hero-title { font-size: 2.2em; font-weight: 800; color: #222; margin-bottom: 16px; line-height: 1.3; background: linear-gradient(90deg,#1f2937,#4b3fbf,#7b5be6); -webkit-background-clip: text; background-clip: text; color: transparent; }
.topic-detail-hero-meta { display: flex; flex-direction: column; gap: 8px; align-items: center; color: #666; font-size: 0.95em; }
.topic-detail-hero-author { font-weight: 600; color: #7b5be6; }
.topic-detail-hero-time { color: #888; }
.topic-detail-hero-stats { color: #666; font-weight: 500; }

.breadcrumb-container { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; max-width: 96%; margin-left: auto; margin-right: auto; padding: 12px 0; font-size: 0.9em; }
.breadcrumb-item { color: #666; cursor: pointer; transition: color 0.2s ease; }
.breadcrumb-item:hover { color: #7b5be6; }
.breadcrumb-item.active { color: #7b5be6; font-weight: 600; cursor: default; }
.breadcrumb-separator { color: #ccc; font-weight: 300; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.back-button-container { margin-bottom: 16px; max-width: 96%; margin-left: auto; margin-right: auto; }
.back-btn { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fff; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.9em; }
.back-btn:hover { background: #f5f5f5; border-color: #ccc; transform: translateX(-2px); }

.topic-detail-section { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eef1ff; margin-bottom: 16px; padding: 24px; max-width: 96%; margin-left: auto; margin-right: auto; }
.topic-detail-content { line-height: 1.6; }
.topic-detail-text { font-size: 1.05em; color: #444; margin-bottom: 20px; line-height: 1.7; }
.topic-detail-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.topic-detail-tag { background: #f0f7ff; border-radius: 6px; padding: 6px 12px; border: 1px solid #e0f0ff; font-size: 0.9em; color: #7b5be6; font-weight: 500; }

/* 评论区 */
.comments-section { margin-bottom: 16px; max-width: 96%; margin-left: auto; margin-right: auto; }
.comment-form { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); border: 1px solid #eef1ff; padding: 20px; margin-bottom: 20px; }
.comment-input-container { display: flex; gap: 16px; }
.comment-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.comment-input-wrapper { flex: 1; }
.comment-input { width: 100%; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 0.95em; color: #333; background: #f9f9f9; transition: all 0.2s ease; resize: vertical; font-family: inherit; margin-bottom: 12px; }
.comment-input:focus { border-color: #7b5be6; outline: none; background: #fff; box-shadow: 0 0 0 3px rgba(123,91,230,0.1); }
.comment-actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.comment-action-btn { padding: 6px 12px; border: 1px solid #e0e0e0; border-radius: 6px; background: #f5f5f5; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.85em; position: relative; }
.comment-action-btn:hover { background: #e0e0e0; border-color: #ccc; }
.comment-action-btn.atlas-btn.active, .comment-action-btn.ai-btn.active { background: #7b5be6; border-color: #7b5be6; color: #fff; }
.comment-submit-btn { padding: 8px 20px; border: 1px solid #7b5be6; border-radius: 8px; background: #7b5be6; color: #fff; cursor: pointer; transition: all 0.2s ease; font-size: 0.9em; font-weight: 500; }
.comment-submit-btn:hover:not(:disabled) { background: #6a4fd8; border-color: #6a4fd8; transform: translateY(-1px); }
.comment-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.comments-list { display: flex; flex-direction: column; gap: 16px; }
.comment-item { display: flex; gap: 16px; background: #fff; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); border: 1px solid #eef1ff; padding: 16px; }
.comment-content { flex: 1; }
.comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.comment-author { font-weight: 600; color: #333; font-size: 0.95em; }
.comment-time { color: #888; font-size: 0.8em; }
.comment-text { color: #444; line-height: 1.5; margin-bottom: 12px; font-size: 0.95em; }
.comment-footer { display: flex; gap: 12px; }
.comment-like-btn, .comment-reply-btn { padding: 4px 8px; border: 1px solid #e0e0e0; border-radius: 6px; background: #f5f5f5; color: #666; cursor: pointer; transition: all 0.2s ease; font-size: 0.8em; }

/* 响应式（部分） */
@media (max-width: 768px) {
	.topics-grid { grid-template-columns: 1fr; gap: 12px; }
	.resources-grid-compact { grid-template-columns: 1fr; gap: 12px; }
	.topic-card-compact { padding: 12px; }
	.topic-header-compact { flex-wrap: wrap; gap: 8px; }
	.topic-stats-compact { width: 100%; justify-content: space-between; }
	.topic-actions-compact { flex-wrap: wrap; gap: 6px; }
	.topic-action-btn-compact { flex: 1; min-width: 80px; }
	.topic-form-actions-compact { flex-direction: column; align-items: stretch; gap: 8px; }
	.topic-tags-input-compact { flex-direction: column; align-items: stretch; }

	.topic-detail-section { padding: 16px; }
	.comment-input-container { flex-direction: column; gap: 12px; }
	.comment-actions { flex-direction: column; align-items: stretch; gap: 8px; }
	.comment-action-btn { text-align: center; }

	.breadcrumb-container { flex-wrap: wrap; gap: 6px; }
	.topic-detail-hero { padding: 20px 24px; }
	.topic-detail-hero-title { font-size: 1.8em; }
	.topic-detail-hero-meta { flex-direction: column; gap: 6px; }

	.search-container { padding: 16px; }
	.tags-filter-list { gap: 6px; }
	.tag-filter-btn { padding: 5px 10px; font-size: 0.8em; }
	.search-stats { flex-direction: column; gap: 12px; align-items: stretch; }
}
@media (max-width: 480px) {
	.hero-subtitle-row { flex-direction: column; gap: 16px; }
	.resource-card-compact { padding: 10px 12px; }
	.topic-card-compact { padding: 10px; }
	.new-topic-form-compact { padding: 12px; }
	.topic-title-input-compact, .topic-content-input-compact { padding: 10px 12px; }
	.topic-detail-section { padding: 12px; }
	.comment-form { padding: 16px; }
	.comment-item { padding: 12px; }
}
</style>
