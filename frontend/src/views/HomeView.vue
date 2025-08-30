<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <el-container class="main-layout">
    <!-- 侧边栏 -->
    <el-aside width="100px" class="sidebar">
        <div class="sidebar-menu">
          <div class="sidebar-ring" @click="router.push('/')"></div>
        <div class="sidebar-item" :class="{ active: route.path.startsWith('/innovation') }" @click="router.push('/innovation')">
          <Icon icon="mdi:earth" width="24" />
          <span>创新训练</span>
        </div>
        <div class="sidebar-item" :class="{ active: route.path.startsWith('/ai-x') }" @click="router.push('/ai-x')">
          <Icon icon="mdi:robot-outline" width="28" />
          <span>AI+X</span>
        </div>
        <div class="sidebar-item" :class="{ active: route.path.startsWith('/international') }" @click="router.push('/international')">
          <Icon icon="mdi:book-open-variant" width="28" />
          <span>国际资源</span>
        </div>
        <div class="sidebar-item" :class="{ active: route.path.startsWith('/personal') }" @click="router.push('/personal')">
          <Icon icon="mdi:atom-variant" width="28" />
          <span>个人路径</span>
        </div>
        <div class="sidebar-item" :class="{ active: route.path.startsWith('/community') }" @click="router.push('/community')">
          <Icon icon="mdi:forum-outline" width="28" />
          <span>开放交流</span>
        </div>
      </div>
      
      <div class="sidebar-bottom">
        <div class="sidebar-bottom-item" :class="{ active: route.path === '/profile' }" @click="router.push('/profile')">
          <Icon icon="mdi:account-circle-outline" width="28" />
          <span>个人资料</span>
        </div>
      </div>
    </el-aside>
    <el-container style="height: 100vh;">
      <el-header class="topbar">
        <div class="topbar-left">
          <!-- 移除头像图片 -->
          <span class="platform-title">数智融创A</span>
        </div>
        <div class="topbar-right">
          <el-button size="small" type="text" class="lang-switch">中文 | English</el-button>
        </div>
      </el-header>
      <el-main class="main-content no-scrollbar">
        <router-view />
        <template v-if="route.path === '/'">
            <!-- 大标题、副标题 -->
            <section class="section-card section-hero">
              <h1 class="hero-title">Empowering Global Innovation with AI</h1>
              <div class="hero-subtitle-row">
                <span class="hero-subtitle">空整AI时代的核心竞争力</span>
                <span class="hero-subtitle">获得国际视野与文化能力</span>
                <span class="hero-subtitle">成为不可替代的创新工程师</span>
              </div>
            </section>
            <!-- 探索区块 -->
            <section class="explore-section">
              <div class="section-header-row">
                <span class="section-header-title">创新体验</span>
                <span class="section-header-arrow">&gt;</span>
              </div>
              <div class="explore-row">
                <!-- 微场景训练 · 1 -->
                <div class="explore-card">
                  <img src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop" class="explore-cover" />
                  <div class="explore-info-row">
                    <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop" class="explore-avatar" />
                    <div class="explore-info-text">
                      <span class="explore-title">跨文化沟通·产品宣讲</span>
                      <span class="explore-desc">面向国际用户的新品宣讲脚本与演示模拟</span>
                    </div>
                    <button class="explore-btn">体验</button>
                  </div>
                </div>
                <!-- 微场景训练 · 2 -->
                <div class="explore-card">
                  <img src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1600&auto=format&fit=crop" class="explore-cover" />
                  <div class="explore-info-row">
                    <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop" class="explore-avatar" />
                    <div class="explore-info-text">
                      <span class="explore-title">国际路演·电梯演讲</span>
                      <span class="explore-desc">60秒电梯演讲，快速传达价值主张</span>
                    </div>
                    <button class="explore-btn">体验</button>
                  </div>
                </div>
                <!-- 竞赛模拟 · 1 -->
                <div class="explore-card">
                  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop" class="explore-cover" />
                  <div class="explore-info-row">
                    <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop" class="explore-avatar" />
                    <div class="explore-info-text">
                      <span class="explore-title">国际AI 创新挑战</span>
                      <span class="explore-desc">赛题解析·评分维度·提交规范与时间规划</span>
                    </div>
                    <button class="explore-btn">体验</button>
                  </div>
                </div>
                <!-- 竞赛模拟 · 2 -->
                <div class="explore-card">
                  <img src="https://images.unsplash.com/photo-1532619187608-e5375cab36aa?q=80&w=1600&auto=format&fit=crop" class="explore-cover" />
                  <div class="explore-info-row">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" class="explore-avatar" />
                    <div class="explore-info-text">
                      <span class="explore-title">全球创业路演赛·模拟</span>
                      <span class="explore-desc">商业模型、财务测算与国际评委问答</span>
                    </div>
                    <button class="explore-btn">体验</button>
                  </div>
                </div>
              </div>
            </section>
            <!-- 能力图谱区块（无图片，列表风格） -->
            <section class="atlas-gradient-bg">
              <div class="atlas-header">
                <span class="atlas-header-icon">📊</span>
                <span class="atlas-header-title">我的能力图谱</span>
              </div>
              <button class="atlas-view-btn" @click="router.push('/atlas')">查看</button>
            </section>
            <!-- 热门项目区块（保留原样） -->
            <section class="popular-section">
              <div class="section-header-row">
                <span class="section-header-title">热门项目</span>
                <span class="section-header-arrow">&gt;</span>
              </div>
              <div class="popular-row" style="margin-bottom: 16px;">
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">智能体名称智能体名称</span>
                    <span class="popular-desc">智能体描述通过智能体描述</span>
                    <span class="popular-user">@sheap</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">本周挑战：硅谷路演模拟</span>
                  </div>
                  <button class="popular-btn">参与</button>
                </div>
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">XX项目更新</span>
                    <span class="popular-user">@sheap</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">新功能：IoT专属AI助手上线</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
              </div>
              <div class="popular-row">
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">XX竞赛报名倒计时</span>
                    <span class="popular-desc">3天!生成式AI海报作品</span>
                    <span class="popular-user">@sheap</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">智能体名称智能体名称</span>
                    <span class="popular-desc">智能体描述通过智能体描述</span>
                    <span class="popular-user">@sheap</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">XX项目更新</span>
                    <span class="popular-user">@sheap</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
                <div class="popular-card popular-horizontal">
                  <img src="https://tse3-mm.cn.bing.net/th/id/OIP-C.1qWfsJnPH57svPqlGzzehwHaEE?w=184&h=101&c=7&r=0&o=5&cb=thfc1&dpr=2&pid=1.7" class="popular-thumb" />
                  <div class="popular-info-text">
                    <span class="popular-title">智能体名称智能体名称</span>
                    <span class="popular-desc">智能体描述通过智能体描述</span>
                    <span class="popular-user">@sheap</span>
                  </div>
                  <button class="popular-btn">体验</button>
                </div>
              </div>
            </section>
        </template>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;
  margin-left: 100px;
  height: 100vh;
  overflow: hidden;
}
.sidebar {
  background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  width: 100px;
  z-index: 100;
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
  width: 100%;
  flex: 1 1 auto;
}
.sidebar-ring {
  width: 38px;
  height: 38px;
  border: 3px solid #111;
  border-radius: 50%;
  margin-bottom: 18px;
  box-sizing: border-box;
  cursor: pointer;
}
.sidebar-bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: 18px;
}
.sidebar-bottom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 10px 0;
  cursor: pointer;
  font-size: 14px;
  color: #444;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 8px;
  background: transparent;
  position: relative;
  transition: all 0.2s ease;
  font-weight: 600;
}
.sidebar-bottom-item .iconify {
  font-size: 28px;
  margin-bottom: 6px;
}

.sidebar-bottom-item:hover {
  background: #f7faff;
}

.sidebar-bottom-item.active {
  background: #eef5ff;
  color: #222;
}

.sidebar-bottom-item.active::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 12px;
  bottom: 12px;
  width: 3px;
  background: linear-gradient(180deg, #5b8def, #7b5be6);
  border-radius: 3px;
}
.sidebar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 10px 0;
  cursor: pointer;
  font-size: 14px;
  color: #444;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 8px;
  background: transparent;
  position: relative;
  transition: all 0.2s ease;
  font-weight: 600;
}
.sidebar-item:hover { 
  background: #f7faff; 
}
.sidebar-item.active {
  background: #eef5ff;
  color: #222;
}
.sidebar-item.active::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 12px;
  bottom: 12px;
  width: 3px;
  background: linear-gradient(180deg, #5b8def, #7b5be6);
  border-radius: 3px;
}
.sidebar-item .el-icon {
  font-size: 28px;
  margin-bottom: 8px;
}
.sidebar-divider {
  width: 60%;
  height: 1px;
  background: #e0e0e0;
  margin: 0 auto;
}
.sidebar-logo {
  margin-bottom: 30px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 10px 30px 0 30px;
  margin-bottom: 0;
  height: 56px;
}
.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.topbar-left {
  display: flex;
  align-items: flex-start;
  /* 让文字向上对齐 */
  height: 40px;
}
.platform-title {
  font-size: 1.3em;
  font-weight: bold;
  color: #333;
  margin-top: 2px;
}
.lang-switch {
  color: #111 !important;
}
.main-content {
  padding: 14px 10px;
  background: 
    linear-gradient(135deg, rgba(180,210,255,0.55) 0%, #fff 55%, rgba(243,234,255,0.55) 100%),
    linear-gradient(45deg, #fff 0%, rgba(255,255,255,0.7) 60%, rgba(243,234,255,0.3) 100%);
  background-blend-mode: lighten;
  height: calc(100vh - 56px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 14px;
}
/* 去除末尾额外外边距，避免“能放下但还轻微可滚”的情况 */
.main-content > *:last-child { margin-bottom: 0 !important; }
/* 隐藏滚动条，但允许滚动，避免小屏溢出内容被遮挡 */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; overscroll-behavior: contain; }

/* 高度较小时的自适应压缩，尽量减少溢出 */
@media (max-height: 820px) {
  .hero-title { font-size: 2.6em; margin-bottom: 20px; }
  .hero-subtitle-row { gap: 64px; margin-top: 10px; }
  .explore-row, .popular-row { gap: 24px; }
  .atlas-gradient-bg { padding: 8px 12px; }
}

/* 当内容没有溢出时，锁定滚动（避免轻微滚动） */
@supports (height: 100dvh) {
  .main-layout { height: 100dvh; }
}
.main-layout { overscroll-behavior: none; }
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
/* 移除光晕伪元素 */
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
.section-link {
  color: #bbb;
  font-size: 1.1em;
  cursor: pointer;
}
.explore-card, .project-card {
  background: #f8faff;
  border-radius: 8px;
  padding: 8px 4px;
  text-align: center;
  margin-bottom: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.01);
  
}
.explore-img, .project-img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 6px;
}
.explore-title, .project-title {
  font-weight: bold;
  font-size: 0.98em;
  margin-bottom: 2px;
  display: block;
}
.explore-desc, .project-desc {
  color: #888;
  font-size: 0.92em;
  margin-bottom: 2px;
  display: block;
}
/* 能力图谱列表样式 */
.atlas-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.atlas-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.atlas-dot {
  width: 8px;
  height: 8px;
  background: #409eff;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}
.atlas-title {
  font-weight: bold;
  margin-right: 6px;
  font-size: 0.96em;
}
.atlas-desc {
  color: #888;
  font-size: 0.92em;
}
.main-title {
  text-align: center;
  margin-bottom: 30px;
}
.main-title h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #3a3a3a;
}
.main-title p {
  color: #666;
  font-size: 1.2em;
}
/* 探索区块无背景、无圆角、无阴影 */
.explore-section {
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 12px;
  padding: 0;
  max-width: 96%;
  margin-left: auto;
  margin-right: auto;
}
.explore-card {
  text-align: center;
  border-radius: 10px;
}
.explore-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
.explore-card:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(80,60,180,0.08); }
.clickable { cursor: pointer; }
.explore-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}
.explore-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.explore-title {
  font-weight: bold;
}
.atlas-section {
  margin-bottom: 30px;
}
.atlas-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
.atlas-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}
.project-section {
  margin-left: 8px;
  margin-right: 0;
  margin-bottom: 18px;
}
.project-card {
  text-align: center;
  border-radius: 10px;
}
.project-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}
.project-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project-title {
  font-weight: bold;
}
.connection-card {
  margin-top: 30px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}
.backend-message {
  font-size: 1.1em;
  margin: 20px 0;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 6px;
  border-left: 4px solid #409eff;
}
/* 探索区块卡片横向排列样式 */
.explore-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 10px;
}
.explore-card {
  flex: 1 1 0;
  max-width: 25%;
  background: transparent;
  border-radius: 16px;
  padding: 0 0 0px 8px;
  text-align: left;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 0;
}
.explore-cover {
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
  border-radius: 16px 16px 16px 16px;
  margin-bottom: 10px;
}
.explore-card:hover .explore-cover { filter: saturate(1.05) brightness(1.02); }
.explore-info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding: 0;
}
.explore-avatar {
  width: 54px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.explore-info-text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.explore-title {
  font-weight: bold;
  font-size: 1.08em;
  margin-bottom: 2px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.explore-desc {
  color: #888;
  font-size: 0.96em;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.explore-btn {
  margin-left: 8px;
  border-radius: 16px;
  font-size: 0.98em;
  padding: 2px 16px;
  border: 1px solid #b5aeea;
  color: #7b5be6;
  background: rgba(245,243,255,0.5);
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.explore-btn:hover { background: #ede9fe; box-shadow: 0 6px 16px rgba(123,91,230,0.18); }
/* 能力图谱区块渐变背景 */
.atlas-gradient-bg {
  background: #eaf4ff;
  border-radius: 12px;
  padding: 10px 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 32px;
  margin-right: 0;
  max-width: 96%;
  padding:15px 30px 15px 30px;
}
.atlas-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.atlas-header-icon {
  font-size: 1.3em;
  color: #5b8def;
  margin-right: 4px;
}
.atlas-header-title {
  font-size: 1.08em;
  font-weight: 700;
  color: #222;
}
.atlas-header-en {
  font-size: 1em;
  font-weight: 500;
  color: #444;
  margin-left: 4px;
}
.atlas-view-btn {
  background: #fff;
  border: 1px solid #b5aeea;
  color: #444;
  border-radius: 6px;
  font-size: 0.98em;
  padding: 2px 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.atlas-view-btn:hover {
  background: #f5faff;
}
/* ========== popular（热门项目）区块样式，内容与 explore 一致 ========== */
.popular-section {
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  margin-bottom: 12px;
  padding: 0;
  max-width: 96%;
  margin-left: auto;
  margin-right: auto;
}
.popular-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  margin-bottom: 8px;
  margin-top: 10px;
}
.popular-card {
  flex: 1 1 0;
  max-width: 25%;
  background: transparent;
  border-radius: 16px;
  padding: 0 0 0px 8px;
  text-align: left;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-width: 0;
}
.popular-cover {
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
  border-radius: 16px 16px 16px 16px;
  margin-bottom: 10px;
}
.popular-info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
  padding: 0;
}
.popular-avatar {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.popular-info-text {
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.popular-title,
.popular-desc,
.popular-user {
  height: 16px;
  line-height: 16px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.popular-btn {
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
.popular-btn:hover {
  background: #ede9fe;
}
/* 横向卡片样式 */
.popular-card.popular-horizontal {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 60px;
  padding: 6px 10px;
  gap: 8px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(80,60,180,0.04);
  border: 1px solid #eef1ff;
  transition: box-shadow 0.18s ease, transform 0.18s ease;
}
.popular-card.popular-horizontal:hover { box-shadow: 0 8px 24px rgba(80,60,180,0.10); transform: translateY(-1px); }
.popular-thumb {
  width: 54px;
  height: 44px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}
.popular-title {
  fontX-size: 1em;
  font-weight: 600;
  color: #222;
  margin-bottom: 0;
  line-height: 1.15;
}
.popular-desc {
  color: #aaa;
  font-size: 0.85em;
  line-height: 1.1;
  margin-bottom: 0;
}
.popular-user {
  color: #7b5be6;
  font-size: 0.92em;
  margin-top: 0;
}
.popular-btn {
  font-size: 0.92em;
  padding: 0 10px;
  border-radius: 12px;
  height: 24px;
  line-height: 22px;
}
.popular-card.popular-horizontal .popular-btn { background:#fff; border:1px solid #b5aeea; color:#7b5be6; }
.popular-card.popular-horizontal .popular-btn:hover { background:#ede9fe; box-shadow: 0 4px 12px rgba(123,91,230,0.18); }
.popular-info-text {
  flex: 1 1 auto;
  min-width: 0;
  height: auto;
  display: grid;
  /* row1, spacer1, row2, spacer2, row3 */
  grid-template-rows: 14px 6px 12px 2px 12px;
  row-gap: 0;
  align-content: center;
}
.popular-title { grid-row: 1; margin: 0; height: auto; font-size: 13px; line-height: 14px; }
.popular-desc { grid-row: 3; margin: 0; height: auto; font-size: 11px; line-height: 11px; }
.popular-user { grid-row: 5; margin: 0; height: auto; font-size: 11px; line-height: 11px; }
.popular-user {
  color: #7b5be6;
  font-size: 11px;
  margin-top: 0;
}
.popular-title,
.popular-desc,
.popular-user {
  display: block;
  height: auto;
}


</style>