<template>
  <div class="personal-profile-container">
    <!-- 左侧导航栏 -->
    <div class="left-navbar">
      <!-- 个人资料标题 -->
      <div class="profile-title">个人资料</div>
      
      <!-- 用户卡片 -->
      <div class="user-card">
        <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop" alt="用户头像" class="user-avatar" />
        <div class="user-info">
          <div class="username">Root_User-#0923</div>
          <div class="user-version">免费版</div>
        </div>
      </div>
      
      <!-- 升级按钮 -->
      <button class="upgrade-btn" @click="showSubscriptionModal = true">
        <Icon icon="mdi:lightning-bolt" width="16" />
        升级订阅版
      </button>
      
      <!-- 订阅弹窗 -->
      <div v-if="showSubscriptionModal && !showPaymentModal" class="subscription-modal-overlay" @click="showSubscriptionModal = false">
        <div class="subscription-modal" @click.stop>
          <div class="modal-header">
            <h3>订阅AI智能体, 解锁更多能力</h3>
            <button class="close-btn" @click="showSubscriptionModal = false">
              <Icon icon="mdi:close" width="20" />
            </button>
          </div>
          
          <div class="modal-content">
            <!-- 免费版 -->
            <div class="plan-card">
              <h4>免费版</h4>
              <div class="plan-price">0 <span class="unit">元/月</span></div>
              <div class="plan-divider"></div>
              <ul class="plan-features">
                <li><Icon icon="mdi:check" width="16" /> 每天赠送100点积分</li>
                <li><Icon icon="mdi:check" width="16" /> 3个私有智能体</li>
              </ul>
            </div>
            
            <!-- 进阶版 -->
            <div class="plan-card featured">
              <h4>进阶版 <Icon icon="mdi:lightning-bolt" width="16" /></h4>
              <div class="plan-price">19.9 <span class="unit">元/月</span></div>
              <div class="plan-divider"></div>
              <ul class="plan-features">
                <li><Icon icon="mdi:check" width="16" /> 每天赠送500点积分</li>
                <li><Icon icon="mdi:check" width="16" /> 3个公开智能体</li>
                <li><Icon icon="mdi:check" width="16" /> 30个私有智能体</li>
              </ul>
              <button class="subscribe-btn" @click="showPaymentModal = true; showSubscriptionModal = false">立即订阅</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 支付弹窗 -->
      <div v-if="showPaymentModal" class="payment-modal-overlay" @click="showPaymentModal = false">
        <div class="payment-modal" @click.stop>
          <div class="payment-header">
            <h3>扫码支付进阶版</h3>
            <button class="close-btn" @click="showPaymentModal = false">
              <Icon icon="mdi:close" width="20" />
            </button>
          </div>
          
          <div class="payment-content">
            <div class="payment-price">19.9 <span class="unit">元/月</span></div>
            <div class="qr-code-container">
              <div class="qr-code-placeholder">
                <Icon icon="mdi:qrcode" width="120" />
                <div class="alipay-logo">
                  <Icon icon="mdi:credit-card" width="40" />
                </div>
              </div>
            </div>
            <div class="payment-instruction">请扫码完成支付</div>
            <div class="payment-terms">
              支付即同意平台<span class="terms-link">《付款协议条款》</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 导航链接 -->
      <div class="nav-links">
        <div class="nav-link">
          <Icon icon="mdi:cog" width="20" />
          <span>设置</span>
          <Icon icon="mdi:chevron-right" width="16" />
        </div>
        <div class="nav-link">
          <Icon icon="mdi:information" width="20" />
          <span>关于我们</span>
          <Icon icon="mdi:chevron-right" width="16" />
        </div>
        <div class="nav-link">
          <Icon icon="mdi:email" width="20" />
          <span>联系我们</span>
          <Icon icon="mdi:chevron-right" width="16" />
        </div>
      </div>
    </div>
    
    <!-- 右侧详细内容区域 -->
    <div class="right-content">
      <!-- 顶部个人信息区域 -->
      <div class="profile-header">
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop" alt="用户头像" class="large-avatar" />
            <div class="avatar-edit-overlay">
              <Icon icon="mdi:camera" width="20" />
            </div>
          </div>
          <div class="user-info-section">
            <div class="username-section">
              <h1 class="large-username">Root_User-#0923</h1>
              <Icon icon="mdi:pencil" width="18" class="edit-icon" @click="handleUsernameEdit" />
            </div>
            <div class="user-status">
              <span class="status-badge">在线</span>
              <span class="join-date">加入时间: 2024年1月</span>
            </div>
            <div class="action-buttons">
              <button class="preview-btn">
                <Icon icon="mdi:eye" width="16" />
                预览主页
              </button>
              <button class="share-btn">
                <Icon icon="mdi:share" width="16" />
                分享
              </button>
            </div>
          </div>
        </div>
        
        <!-- 统计信息卡片 -->
        <div class="stats-section">
          <div class="stat-card">
            <div class="stat-icon">
              <Icon icon="mdi:robot" width="20" />
            </div>
            <div class="stat-content">
              <div class="stat-number">12</div>
              <div class="stat-label">智能体</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <Icon icon="mdi:star" width="20" />
            </div>
            <div class="stat-content">
              <div class="stat-number">156</div>
              <div class="stat-label">获赞数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <Icon icon="mdi:eye" width="20" />
            </div>
            <div class="stat-content">
              <div class="stat-number">2.3k</div>
              <div class="stat-label">浏览量</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <Icon icon="mdi:account-group" width="20" />
            </div>
            <div class="stat-content">
              <div class="stat-number">89</div>
              <div class="stat-label">关注者</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 个人描述 -->
        <div class="content-card description-card">
          <div class="card-header">
            <h3>个人描述</h3>
            <Icon icon="mdi:pencil" width="16" class="edit-icon" />
          </div>
          <div class="card-content">
            <textarea 
              class="description-textarea" 
              placeholder="提供一段个人介绍以使其地人了解您。"
              v-model="description"
              maxlength="200"
            ></textarea>
            <div class="description-footer">
              <span class="char-count">{{ description.length }}/200</span>
              <button class="save-description-btn" @click="handleSaveDescription">
                <Icon icon="mdi:content-save" width="16" />
                保存
              </button>
            </div>
          </div>
        </div>
        
        <!-- 横向信息卡片区域 -->
        <div class="horizontal-cards-section">
          <!-- 联系方式 -->
          <div class="info-card">
            <div class="card-header">
              <h4>联系方式</h4>
              <Icon icon="mdi:pencil" width="16" class="edit-icon" />
            </div>
            <div class="card-content">
              <div class="contact-item">
                <Icon icon="mdi:email" width="18" class="iconify" />
                <span>root@example.com</span>
              </div>
              <div class="contact-item">
                <Icon icon="mdi:phone" width="18" class="iconify" />
                <span>+86 138****8888</span>
              </div>
              <div class="contact-item">
                <Icon icon="mdi:map-marker" width="18" class="iconify" />
                <span>北京市朝阳区</span>
              </div>
            </div>
          </div>
          
          <!-- 技能标签 -->
          <div class="info-card">
            <div class="card-header">
              <h4>技能标签</h4>
              <Icon icon="mdi:plus" width="16" class="edit-icon" />
            </div>
            <div class="card-content">
              <div class="skills-container">
                <span class="skill-tag">AI开发</span>
                <span class="skill-tag">机器学习</span>
                <span class="skill-tag">前端开发</span>
                <span class="skill-tag">数据分析</span>
                <span class="skill-tag">产品设计</span>
              </div>
            </div>
          </div>
          
          <!-- 最近活动 -->
          <div class="info-card">
            <div class="card-header">
              <h4>最近活动</h4>
              <Icon icon="mdi:clock" width="16" class="edit-icon" />
            </div>
            <div class="card-content">
              <div class="activity-item">
                <Icon icon="mdi:robot" width="16" class="activity-icon" />
                <span class="activity-title">创建了智能体'AI助手'</span>
                <span class="activity-time">2小时前</span>
              </div>
              <div class="activity-item">
                <Icon icon="mdi:star" width="16" class="activity-icon" />
                <span class="activity-title">获得了5个赞</span>
                <span class="activity-time">昨天</span>
              </div>
              <div class="activity-item">
                <Icon icon="mdi:account-plus" width="16" class="activity-icon" />
                <span class="activity-title">新增3个关注者</span>
                <span class="activity-time">3天前</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const description = ref('')
const showSubscriptionModal = ref(false)
const showPaymentModal = ref(false)

// 处理用户名编辑
const handleUsernameEdit = () => {
  // TODO: 实现用户名编辑功能
  console.log('编辑用户名')
}

// 处理保存描述
const handleSaveDescription = () => {
  // TODO: 实现保存描述功能
  console.log('保存描述:', description.value)
}
</script>

<style scoped>
.personal-profile-container {
  height: 89vh;
  background: linear-gradient(135deg, #f8faff 0%, #f5f7ff 100%);
  display: flex;
  animation: fadeIn 0.3s ease-in-out;
  overflow: hidden;
}

/* 左侧导航栏 */
.left-navbar {
  width: 260px;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-right: 1px solid #eef1ff;
  height: 100vh;
  border-radius: 0 16px 16px 0;
  box-shadow: 0 4px 16px rgba(80, 60, 180, 0.06);
}

.profile-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
  margin-top: 16px;
  text-align: left;
}

.user-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #eef1ff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.user-card:hover {
  box-shadow: 0 4px 16px rgba(80, 60, 180, 0.1);
  transform: translateY(-1px);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid #e6e9ff;
  box-shadow: 0 3px 8px rgba(123, 91, 230, 0.15);
  transition: all 0.3s ease;
}

.user-avatar:hover {
  border-color: #7b5be6;
  box-shadow: 0 6px 20px rgba(123, 91, 230, 0.25);
  transform: scale(1.02);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.user-version {
  font-size: 14px;
  color: #7b5be6;
  background: #f5f7ff;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;
  border: 1px solid #e6e9ff;
  font-weight: 500;
}

.upgrade-btn {
  background: linear-gradient(135deg, #7b5be6 0%, #5b8def 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: 0 3px 8px rgba(123, 91, 230, 0.3);
}

.upgrade-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
  background: #fafafe;
  border: 1px solid transparent;
}

.nav-link:hover {
  background: #f5f7ff;
  border-color: #e6e9ff;
  color: #7b5be6;
}

.nav-link:hover {
  background: #f8f9fa;
  color: #333;
}

.nav-link span {
  flex: 1;
  font-size: 14px;
}

/* 右侧详细内容区域 */
.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: linear-gradient(135deg, #fafbff 0%, #f5f7ff 100%);
  padding: 16px;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(80, 60, 180, 0.08);
  border-radius: 20px 0 0 20px;
}

/* 顶部个人信息区域 */
.profile-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  border-radius: 20px;
  border: 1px solid #e8ecff;
  box-shadow: 0 6px 24px rgba(123, 91, 230, 0.06);
  backdrop-filter: blur(8px);
}

.avatar-section {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 6px 0;
  position: relative;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.large-avatar {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid #e6e9ff;
  box-shadow: 0 6px 18px rgba(123, 91, 230, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.large-avatar:hover {
  border-color: #7b5be6;
  box-shadow: 0 12px 32px rgba(123, 91, 230, 0.2);
  transform: scale(1.03);
}

.avatar-edit-overlay {
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(123, 91, 230, 0.95);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  box-shadow: 0 3px 8px rgba(123, 91, 230, 0.25);
}

.avatar-edit-overlay:hover {
  background: rgba(123, 91, 230, 1);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.35);
}

.user-info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.username-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.large-username {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  letter-spacing: -0.3px;
}

.edit-icon {
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 4px;
  border-radius: 50%;
}

.edit-icon:hover {
  color: #7b5be6;
  background: rgba(123, 91, 230, 0.1);
}

.user-status {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-badge {
  background: linear-gradient(135deg, #d1fae5, #ecfdf5);
  color: #065f46;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
  border: none;
}

.join-date {
  color: #666;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  position: absolute;
  top: 0;
  right: 0;
}

.preview-btn, .share-btn {
  background: #f5f7ff;
  color: #7b5be6;
  border: 1px solid #e6e9ff;
  border-radius: 14px;
  padding: 8px 14px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.2s ease;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(123, 91, 230, 0.06);
}

.preview-btn:hover, .share-btn:hover {
  background: #ede9fe;
  border-color: #b5aeea;
  color: #6a4fd8;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(123, 91, 230, 0.12);
}

/* 统计信息卡片 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.stat-card {
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  text-align: left;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}

.stat-icon {
  background: #7b5be6;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stat-number {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  line-height: 1;
}

.stat-label {
  font-size: 10px;
  color: #666;
  font-weight: 500;
  line-height: 1;
}

/* 主要内容区域 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.content-card {
  background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
  border-radius: 16px;
  border: 1px solid #e8ecff;
  box-shadow: 0 3px 16px rgba(123, 91, 230, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(123, 91, 230, 0.1);
  border-color: #d1d5f7;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  border-bottom: 1px solid #e8ecff;
}

.card-header h3, .card-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-content {
  padding: 20px;
}

/* 个人描述卡片 */
.description-card .card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.description-textarea {
  width: 100%;
  min-height: 100px;
  padding: 14px;
  border: 2px solid #e8ecff;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;
  background: #fafbff;
  transition: all 0.3s ease;
  color: #333;
}

.description-textarea:focus {
  outline: none;
  border-color: #7b5be6;
  background: white;
  box-shadow: 0 0 0 3px rgba(123, 91, 230, 0.1);
}

.description-textarea::placeholder {
  color: #9ca3af;
  font-style: italic;
}

.description-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-count {
  color: #666;
  font-size: 14px;
}

.save-description-btn {
  background: linear-gradient(135deg, #7b5be6 0%, #5b8def 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.save-description-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.3);
}

/* 横向信息卡片区域 */
.horizontal-cards-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.info-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e8ecff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(123, 91, 230, 0.08);
}

.info-card .card-header {
  padding: 12px 16px;
}

.info-card .card-header h4 {
  font-size: 15px;
}

.info-card .card-content {
  padding: 16px;
}

/* 联系方式 */
.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item .iconify {
  color: #7b5be6;
  flex-shrink: 0;
}

/* 技能标签 */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tag {
  background: linear-gradient(135deg, #7b5be6, #5b8def);
  color: white;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(123, 91, 230, 0.25);
}

/* 最近活动 */
.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  color: #7b5be6;
  flex-shrink: 0;
}

.activity-title {
  flex: 1;
  color: #333;
  font-size: 13px;
}

.activity-time {
  color: #666;
  font-size: 11px;
  font-weight: 500;
}

/* 订阅弹窗样式 */
.subscription-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.subscription-modal {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  flex: 1;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #333;
}

.modal-content {
  display: flex;
  gap: 20px;
}

.plan-card {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 25px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  min-height: 350px;
}

.plan-card.featured {
  border-color: #d1b3e7;
  box-shadow: 0 8px 25px rgba(209, 179, 231, 0.3);
}

.plan-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.plan-price {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 15px;
}

.plan-price .unit {
  font-size: 16px;
  font-weight: 400;
}

.plan-divider {
  height: 2px;
  background: #ced4da;
  margin: 0 0 20px 0;
  width: 100%;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.plan-features li .iconify {
  color: #28a745;
}

.subscribe-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 60px;
}

.subscribe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* 支付弹窗样式 */
.payment-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.payment-modal {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  border-radius: 20px;
  padding: 30px;
  max-width: 450px;
  width: 90%;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

.payment-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: center;
}

.payment-content {
  text-align: center;
}

.payment-price {
  font-size: 28px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 20px;
}

.payment-price .unit {
  font-size: 18px;
  font-weight: 400;
}

.qr-code-container {
  margin: 20px 0;
}

.qr-code-placeholder {
  position: relative;
  display: inline-block;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 40px;
  margin: 0 auto;
}

.alipay-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1677ff;
  color: white;
  border-radius: 50%;
  padding: 8px;
}

.payment-instruction {
  font-size: 16px;
  color: #666;
  margin: 15px 0;
}

.plan-price .unit {
  font-size: 18px;
  font-weight: 400;
}

.payment-terms {
  font-size: 12px;
  color: #999;
  margin-top: 20px;
}

.terms-link {
  color: #667eea;
  cursor: pointer;
  text-decoration: underline;
}

.terms-link:hover {
  color: #5a6fd8;
}

/* 页面进入动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .personal-profile-container {
    flex-direction: column;
    height: auto;
    overflow: auto;
  }
  
  .left-navbar {
    width: 100%;
    height: auto;
    border-radius: 0 0 16px 16px;
  }
  
  .right-content {
    height: auto;
    border-radius: 16px 0 0 0;
  }
  
  .preview-btn {
    margin-left: 0;
    align-self: center;
  }
}
</style>
