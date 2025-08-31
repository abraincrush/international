<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

type Chip = { label: string, value: string }

const search = ref('')

// 顶部筛选
const usageChips: Chip[] = [
  { label: '全部', value: 'all' },
  { label: '工具', value: 'tool' },
  { label: '提示词', value: 'prompt' },
  { label: '声音TTS', value: 'tts' },
  { label: '图像处理', value: 'imgproc' },
  { label: '图像生成', value: 'imggen' },
  { label: '视频生成', value: 'videogen' },
  { label: '音乐生成', value: 'music' },
  { label: '代码运行器', value: 'runner' }
]
const inputChips: Chip[] = [
  { label: '文本', value: 'text' },
  { label: '图片', value: 'image' },
  { label: '音频', value: 'audio' },
  { label: '视频', value: 'video' }
]
const outputChips: Chip[] = [
  { label: '文本', value: 'text' },
  { label: '图片', value: 'image' },
  { label: '音频', value: 'audio' },
  { label: 'GIF', value: 'gif' },
  { label: '视频', value: 'video' }
]

const activeUsage = ref('all')
const activeInput = ref('')
const activeOutput = ref('')

// 组件数据（占位）
type CompItem = { id: string, title: string, desc: string, tag: string, avatar: string }
function makeItems(prefix: string, n = 6): CompItem[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: `${prefix}-${i+1}`,
    title: '组件名称组件名称',
    desc: '组件详细描述组件描述组件描述',
    tag: '官方出品',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?size=64&seed=' + (i+1)
  }))
}

const sections = [
  { title: '热门工具组件', items: makeItems('tool', 6) },
  { title: '热门TTS组件', items: makeItems('tts', 6) },
  { title: '热门多模态组件', items: makeItems('multimodal', 9) }
]
</script>

<template>
  <div class="components-market">
    <div class="market-header">
      <div class="title">组件广场</div>
      <div class="search-box">
        <Icon icon="mdi:magnify" width="18" />
        <input v-model="search" placeholder="搜索组件" />
      </div>
    </div>

    <div class="filters">
      <div class="filter-row">
        <div class="filter-label">用途：</div>
        <div class="chips">
          <div v-for="c in usageChips" :key="c.value" class="chip" :class="{ active: activeUsage===c.value }" @click="activeUsage=c.value">{{ c.label }}</div>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-label">输入：</div>
        <div class="chips">
          <div v-for="c in inputChips" :key="c.value" class="chip" :class="{ active: activeInput===c.value }" @click="activeInput=c.value">{{ c.label }}</div>
        </div>
      </div>
      <div class="filter-row">
        <div class="filter-label">输出：</div>
        <div class="chips">
          <div v-for="c in outputChips" :key="c.value" class="chip" :class="{ active: activeOutput===c.value }" @click="activeOutput=c.value">{{ c.label }}</div>
        </div>
      </div>
    </div>

    <div class="market-body">
      <section class="market-section" v-for="sec in sections" :key="sec.title">
        <div class="section-title">{{ sec.title }}</div>
        <div class="cards-grid">
          <div class="comp-item" v-for="item in sec.items" :key="item.id">
            <img :src="item.avatar" class="avatar" />
            <div class="info">
              <div class="name">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
              <div class="tag">@{{ item.tag }}</div>
            </div>
            <button class="add-btn">添加</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.components-market { height: 100%; overflow: auto; background: #fff; }
.market-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px 6px 16px; }
.title { font-size: 18px; font-weight: 700; color: #111827; }
.search-box { display: flex; align-items: center; gap: 6px; border: 1px solid #e5e7eb; border-radius: 18px; padding: 6px 10px; width: 260px; }
.search-box input { border: none; outline: none; width: 100%; font-size: 13px; }

.filters { padding: 4px 16px 8px 16px; }
.filter-row { display: flex; align-items: center; margin-top: 8px; gap: 8px; }
.filter-label { color: #6b7280; font-size: 13px; width: 48px; flex-shrink: 0; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { padding: 6px 12px; border-radius: 14px; background: #f3f4f6; color: #4b5563; font-size: 12px; cursor: pointer; user-select: none; }
.chip.active { background: #8b5cf6; color: #fff; }

.market-body { padding: 0 16px 16px 16px; }
.section-title { font-size: 14px; font-weight: 600; color: #111827; margin: 12px 0 10px 0; }
.cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.comp-item { display: flex; align-items: center; gap: 10px; padding: 10px; background: #fff; border: 1px solid #eef0f5; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.02); }
.comp-item:hover { box-shadow: 0 6px 18px rgba(123,91,230,0.10); }
.avatar { width: 54px; height: 54px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.info { flex: 1; min-width: 0; }
.name { font-weight: 600; color: #111827; margin-bottom: 2px; }
.desc { font-size: 12px; color: #6b7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tag { font-size: 12px; color: #7b5be6; margin-top: 2px; }
.add-btn { border: 1px solid #b5aeea; color: #7b5be6; background: #fff; border-radius: 10px; padding: 4px 10px; cursor: pointer; font-size: 12px; }

@media (max-width: 900px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } .search-box { width: 200px; } }
@media (max-width: 600px) { .cards-grid { grid-template-columns: 1fr; } .market-header { flex-direction: column; align-items: stretch; gap: 8px; } }
</style>


