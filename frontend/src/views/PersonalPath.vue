<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import * as echarts from 'echarts'

type Goal = { title: string; desc: string; due?: string }
const shortTerm = ref<Goal>({ title: '短期目标', desc: '通过数据结构与算法课程，完成 3 个项目练习', due: '90 天内' })
const longTerm = ref<Goal>({ title: '长期目标', desc: '成为能够独立带项目的全栈工程师', due: '2 年内' })
const career = ref<Goal>({ title: '职业目标', desc: '获得海外一线科技公司 SDE Offer', due: '18 个月内' })

type Milestone = {
	id: string
	phase: string
	title: string
	date?: string
	status: 'todo'|'doing'|'done'
	region?: '亚洲'|'欧洲'|'北美'|'大洋洲'|'全球'
	countryCode?: string
	category?: '语言'|'申请'|'签证'|'实习'|'学术'|'奖学金'|'求职'
}
const roadmap = ref<Milestone[]>([
	{ id: 'm1', phase: '语言与资格', title: 'IELTS/TOEFL 模拟考试达到目标分', date: 'Q1', status: 'doing', region: '全球', category: '语言' },
	{ id: 'm2', phase: '交换/项目申请', title: '提交 Erasmus+/瑞士交换材料', date: 'Q1', status: 'todo', region: '欧洲', category: '申请' },
	{ id: 'm3', phase: '签证准备', title: '准备 DS-160/预约面谈', date: 'Q2', status: 'todo', region: '北美', category: '签证' },
	{ id: 'm4', phase: '全球实习', title: '申请 Google STEP/UN 实习', date: 'Q2', status: 'todo', region: '北美', category: '实习' },
	{ id: 'm5', phase: '学术发展', title: '投递 ACL/ECAI Workshop', date: 'Q3', status: 'todo', region: '欧洲', category: '学术' },
	{ id: 'm6', phase: '资助与奖学金', title: '申请校级/国家留学基金委奖学金', date: 'Q3', status: 'todo', region: '亚洲', category: '奖学金' },
	{ id: 'm7', phase: '职业准备', title: '完善英文简历 & 海外远程面试', date: 'Q4', status: 'todo', region: '全球', category: '求职' }
])

type Readiness = { key: string; label: string; status: 'ok'|'pending'|'todo'; note?: string }
const readiness = ref<Readiness[]>([
	{ key: 'passport', label: '护照', status: 'ok', note: '有效期 2031-06' },
	{ key: 'language', label: '语言成绩', status: 'pending', note: 'IELTS 6.5 → 7.0' },
	{ key: 'finance', label: '资金证明', status: 'todo' },
	{ key: 'visa', label: '签证', status: 'todo' },
	{ key: 'insurance', label: '保险', status: 'todo' },
	{ key: 'resume', label: '英文简历', status: 'pending' }
])

const radarRef = ref<HTMLDivElement | null>(null)
let radarChart: any | null = null

const radarIndicators = [
	{ name: '计算机基础', max: 100 },
	{ name: '工程实践', max: 100 },
	{ name: '算法能力', max: 100 },
	{ name: '系统设计', max: 100 },
	{ name: '沟通协作', max: 100 },
	{ name: '学习能力', max: 100 }
]

const radarValues = ref<number[]>([60, 55, 50, 45, 65, 70])

function renderRadar() {
	if (!radarRef.value) return
	if (radarChart) radarChart.dispose()
	radarChart = echarts.init(radarRef.value)
	radarChart.setOption({
		tooltip: {},
		radar: {
			indicator: radarIndicators,
			radius: '65%',
			splitNumber: 4,
			splitLine: { lineStyle: { color: '#eef2ff' } },
			splitArea: { areaStyle: { color: ['#faf5ff', '#f5f3ff'] } },
			axisLine: { lineStyle: { color: '#e5e7eb' } }
		},
		series: [{
			type: 'radar',
			data: [{ value: radarValues.value, areaStyle: { color: 'rgba(124, 58, 237, 0.25)' }, lineStyle: { color: '#7c3aed' }, symbol: 'none' }]
		}]
	})
}

function onResize() { radarChart && radarChart.resize() }

onMounted(() => {
	renderRadar()
	window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', onResize)
	radarChart?.dispose()
})
</script>

<template>
	<div class="ppage">
		<section class="goals">
			<div class="goal-card primary">
				<div class="goal-title">{{ shortTerm.title }}</div>
				<div class="goal-desc">{{ shortTerm.desc }}</div>
				<div class="goal-due">{{ shortTerm.due }}</div>
			</div>
			<div class="goal-card secondary">
				<div class="goal-title">{{ longTerm.title }}</div>
				<div class="goal-desc">{{ longTerm.desc }}</div>
				<div class="goal-due">{{ longTerm.due }}</div>
			</div>
			<div class="goal-card accent">
				<div class="goal-title">{{ career.title }}</div>
				<div class="goal-desc">{{ career.desc }}</div>
				<div class="goal-due">{{ career.due }}</div>
			</div>
		</section>

		<section class="body">
			<div class="roadmap">
				<div class="section-title">道路规划</div>
				<div class="timeline">
					<div v-for="m in roadmap" :key="m.id" class="node" :class="m.status">
						<div class="dot"></div>
						<div class="content">
							<div class="top-row">
								<div class="phase">{{ m.phase }}</div>
								<div class="chips">
									<span v-if="m.region" class="chip">{{ m.region }}</span>
									<span v-if="m.category" class="chip alt">{{ m.category }}</span>
								</div>
							</div>
							<div class="title">{{ m.title }}</div>
							<div class="date">{{ m.date }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="radar">
				<div class="section-title">能力图谱</div>
				<div ref="radarRef" class="radar-box"></div>
				<div class="readiness">
					<div class="readiness-title">出国准备清单</div>
					<div class="readiness-grid">
						<div v-for="r in readiness" :key="r.key" class="ready-item" :class="r.status">
							<div class="r-label">{{ r.label }}</div>
							<div class="r-note" v-if="r.note">{{ r.note }}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.ppage { padding: 16px; display: flex; flex-direction: column; gap: 16px; }

/* 顶部目标区：三张不同渐变卡片 */
.goals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.goal-card { border-radius: 16px; padding: 16px; color: #1d1d1f; background: white; border: 1px solid #f1f5f9; box-shadow: 0 1px 0 rgba(0,0,0,0.02) inset; }
.goal-card .goal-title { font-weight: 700; font-size: 16px; margin-bottom: 8px; }
.goal-card .goal-desc { color: #6b7280; font-size: 13px; line-height: 1.6; }
.goal-card .goal-due { margin-top: 10px; font-size: 12px; color: #7c3aed; font-weight: 600; }
.goal-card.primary { background: linear-gradient(135deg, #eef2ff, #f5f3ff); }
.goal-card.secondary { background: linear-gradient(135deg, #ecfeff, #eff6ff); }
.goal-card.accent { background: linear-gradient(135deg, #fdf2f8, #faf5ff); }

/* 下方：道路规划 + 雷达图 两列布局 */
.body { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12px; align-items: start; }

.section-title { font-weight: 700; color: #111827; margin-bottom: 10px; }

.roadmap { background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 16px; }
.timeline { position: relative; padding-left: 10px; }
.timeline .node { position: relative; padding-left: 18px; margin: 14px 0; }
.timeline .node .dot { position: absolute; left: 0; top: 6px; width: 10px; height: 10px; border-radius: 50%; background: #c4b5fd; }
.timeline .node.doing .dot { background: #7c3aed; }
.timeline .node.done .dot { background: #10b981; }
.timeline .node .content .top-row { display: flex; align-items: center; gap: 8px; }
.timeline .node .content .phase { font-size: 12px; color: #6b7280; margin-bottom: 2px; }
.timeline .node .content .chips { display: flex; gap: 6px; }
.timeline .node .content .chip { font-size: 11px; color: #374151; background: #f3f4f6; padding: 2px 8px; border-radius: 999px; }
.timeline .node .content .chip.alt { background: #ecfeff; color: #0369a1; }
.timeline .node .content .title { font-weight: 600; color: #1f2937; }
.timeline .node .content .date { font-size: 12px; color: #9ca3af; margin-top: 2px; }

.radar { background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 16px; }
.radar-box { width: 100%; height: 340px; }
.readiness { margin-top: 12px; }
.readiness-title { font-weight: 700; margin-bottom: 8px; color: #111827; }
.readiness-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.ready-item { border: 1px dashed #e5e7eb; border-radius: 10px; padding: 8px 10px; background: #fafafa; }
.ready-item.ok { background: #ecfdf5; border-color: #a7f3d0; }
.ready-item.pending { background: #fff7ed; border-color: #fed7aa; }
.ready-item.todo { background: #f9fafb; border-color: #e5e7eb; }
.r-label { font-size: 12px; color: #374151; font-weight: 600; }
.r-note { font-size: 12px; color: #6b7280; margin-top: 2px; }

/* 响应式 */
@media (max-width: 1080px) {
	.goals { grid-template-columns: 1fr; }
	.body { grid-template-columns: 1fr; }
	.radar-box { height: 300px; }
}
</style>



