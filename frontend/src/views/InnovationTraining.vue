<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute, RouterView } from 'vue-router'

type TrainingItem = {
  id: string
  title: string
  description: string
  coverUrl: string
  avatarUrl: string
  tag?: string
}

const router = useRouter()
const route = useRoute()
const activeTab = ref<'scenes' | 'contests'>('scenes')

// 同步路由 query 中的 tab 到本地状态，避免从首页带参跳转时不生效
function syncTabFromRoute() {
  const tab = String(route.query.tab || '')
  activeTab.value = tab === 'contests' ? 'contests' : 'scenes'
}
syncTabFromRoute()
watch(() => route.query.tab, () => syncTabFromRoute())

// 反向同步：在本页切换标签时，更新 URL 的 query，便于分享/刷新保持状态
watch(activeTab, (val) => {
  router.replace({ path: '/innovation', query: { tab: val } })
})

const microSceneTrainings = ref<TrainingItem[]>([
  {
    id: 'ms-1',
    title: '跨文化沟通·产品宣讲',
    description: '面向国际用户的新品宣讲脚本与演示模拟',
    coverUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop',
    tag: '沟通'
  },
  {
    id: 'ms-2',
    title: '国际路演·电梯演讲',
    description: '60秒电梯演讲，快速传达价值主张',
    coverUrl: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop',
    tag: '演讲'
  },
  {
    id: 'ms-3',
    title: '跨时区远程协作',
    description: '异步协作节奏、日报机制与工具选择',
    coverUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop',
    tag: '协作'
  },
  {
    id: 'ms-4',
    title: '国际化设计·语言与在地化',
    description: '多语言信息架构、文化敏感点与本地化细节',
    coverUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop',
    tag: '设计'
  },
  {
    id: 'ms-5',
    title: '数据合规·隐私保护',
    description: 'GDPR 基础要点与数据收集最小化原则',
    coverUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    tag: '合规'
  },
  {
    id: 'ms-6',
    title: '跨文化用户研究',
    description: '国际目标用户访谈、问卷与洞察提炼',
    coverUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop',
    tag: '研究'
  }
])

const contestSimulations = ref<TrainingItem[]>([
  {
    id: 'ct-1',
    title: '国际AI 创新挑战',
    description: '赛题解析·评分维度·提交规范与时间规划',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
    tag: 'AI'
  },
  {
    id: 'ct-2',
    title: '全球创业路演赛·模拟',
    description: '商业模型、财务测算与国际评委问答',
    coverUrl: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    tag: '创业'
  },
  {
    id: 'ct-3',
    title: '人机协同编程赛',
    description: '代码可读性、自动化测试与工程质量基线',
    coverUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop',
    tag: '工程'
  },
  {
    id: 'ct-4',
    title: 'UX 国际设计赛·评审要点',
    description: '从可用性到美学一致性：高分作品拆解',
    coverUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
    tag: 'UX'
  },
  {
    id: 'ct-5',
    title: '国际数据分析赛·Baseline',
    description: '数据清洗、特征工程与可解释性报告',
    coverUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop',
    tag: '数据'
  },
  {
    id: 'ct-6',
    title: '海外市场营销赛·Campaign',
    description: '市场洞察、渠道策略与内容本地化',
    coverUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    tag: '营销'
  }
])

function viewDetail(item: TrainingItem) {
  // 预留跳转逻辑，后续可接入具体子路由
  // router.push(`/innovation/${item.id}`)
}
</script>

<template>
  <div class="training-layout">
    <!-- 页头：与首页风格一致的渐变卡片标题区 -->
    <section class="section-card page-hero">
      <div class="page-hero-left">
        <h2 class="page-title">创新训练中心</h2>
        <p class="page-subtitle">Innovation Training · 国际化微场景 · 竞赛模拟</p>
      </div>
    </section>

    <!-- 标签切换，两类训练便于扩展 -->
    <el-tabs v-model="activeTab" class="tabs" stretch>
      <el-tab-pane label="国际化微场景训练" name="scenes">
        <div class="section-header-row">
          <span class="section-header-title">微场景训练 Micro-scenarios</span>
          <span class="section-header-arrow">&gt;</span>
        </div>
        <div class="grid-row">
          <div class="training-card" v-for="item in microSceneTrainings" :key="item.id">
            <img class="training-cover" :src="item.coverUrl" alt="cover" />
            <div class="training-info-row">
              <img class="training-avatar" :src="item.avatarUrl" alt="avatar" />
              <div class="training-info-text">
                <span class="training-title">{{ item.title }}</span>
                <span class="training-desc">{{ item.description }}</span>
              </div>
              <button class="training-btn" @click="viewDetail(item)">查看</button>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="国际化创新竞赛模拟" name="contests">
        <div class="section-header-row">
          <span class="section-header-title">竞赛模拟 Contest Simulation</span>
          <span class="section-header-arrow">&gt;</span>
        </div>
        <div class="grid-row">
          <div class="training-card" v-for="item in contestSimulations" :key="item.id">
            <img class="training-cover" :src="item.coverUrl" alt="cover" />
            <div class="training-info-row">
              <img class="training-avatar" :src="item.avatarUrl" alt="avatar" />
              <div class="training-info-text">
                <span class="training-title">{{ item.title }}</span>
                <span class="training-desc">{{ item.description }}</span>
              </div>
              <button class="training-btn" @click="viewDetail(item)">查看</button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 预留子路由渲染区（未来可扩展详细页） -->
    <RouterView />
  </div>
  
</template>

<style scoped>
.training-layout {
  padding: 10px 8px;
}
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
.page-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(237,233,254,0.85) 0%, rgba(245,243,255,0.85) 100%);
  border-radius: 20px;
  padding: 16px 24px;
}
.page-title {
  font-size: 1.4em;
  font-weight: 800;
  letter-spacing: 0.01em;
  margin: 0 0 6px 0;
  background: linear-gradient(90deg,#1f2937,#4b3fbf,#7b5be6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.page-subtitle { color: #333; margin: 0; }
.atlas-view-btn {
  background: #fff;
  border: 1px solid #b5aeea;
  color: #444;
  border-radius: 6px;
  font-size: 0.98em;
  padding: 4px 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.atlas-view-btn:hover { background: #f5faff; }

.tabs { max-width: 96%; margin: 0 auto; }

.section-header-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 6px 0 8px;
  gap: 8px;
}
.section-header-title {
  font-size: 1em;
  color: #222;
  font-weight: 600;
  letter-spacing: 0.01em;
  margin-left: 8px;
}
.section-header-arrow { font-size: 1.1em; color: #b5aeea; margin-left: -4px; }

.grid-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
@media (max-width: 1200px) {
  .grid-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .grid-row { grid-template-columns: 1fr; }
}

.training-card {
  background: transparent;
  border-radius: 16px;
  padding: 0 0 0px 8px;
  text-align: left;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
.training-cover {
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 10px;
}
.training-card:hover .training-cover { filter: saturate(1.05) brightness(1.02); }

.training-info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding: 0;
}
.training-avatar {
  width: 54px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.training-info-text { flex: 1 1 auto; display: flex; flex-direction: column; min-width: 0; }
.training-title { font-weight: 700; font-size: 1.02em; color: #222; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.training-desc { color: #888; font-size: 0.94em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.training-btn {
  margin-left: 8px;
  border-radius: 16px;
  font-size: 0.98em;
  padding: 2px 16px;
  border: 1px solid #b5aeea;
  color: #7b5be6;
  background: rgba(245,243,255,0.5);
  cursor: pointer;
  transition: background 0.2s;
}
.training-btn:hover { background: #ede9fe; box-shadow: 0 6px 16px rgba(123,91,230,0.18); }
</style>
