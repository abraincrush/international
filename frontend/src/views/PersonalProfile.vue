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
      <!-- 大头像 -->
      <div class="large-avatar-container">
        <img src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop" alt="大头像" class="large-avatar" />
      </div>
      
      <!-- 用户名和编辑 -->
      <div class="username-edit">
        <span class="large-username">Root_User-#0923</span>
        <Icon icon="mdi:pencil" width="16" class="edit-icon" />
      </div>
      
      <!-- 预览按钮 -->
      <button class="preview-btn">
        <Icon icon="mdi:eye" width="16" />
        预览主页
      </button>
      
      <!-- 描述区域 -->
      <div class="description-section">
        <label class="description-label">描述</label>
        <textarea 
          class="description-textarea" 
          placeholder="提供一段个人介绍以使其地人了解您。"
          v-model="description"
        ></textarea>
      </div>
      
      <!-- 保存按钮 -->
      <button class="save-btn">保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const description = ref('')
const showSubscriptionModal = ref(false)
const showPaymentModal = ref(false)
</script>

<style scoped>
.personal-profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8faff 0%, #f5f7ff 100%);
  display: flex;
  animation: fadeIn 0.3s ease-in-out;
}

/* 左侧导航栏 */
.left-navbar {
  width: 280px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-right: 1px solid #eef1ff;
  min-height: 80vh;
  border-radius: 0 20px 20px 0;
  box-shadow: 0 6px 24px rgba(80, 60, 180, 0.06);
}

.profile-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  margin-top: 20px;
  text-align: left;
}

.user-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid #eef1ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.user-card:hover {
  box-shadow: 0 4px 16px rgba(80, 60, 180, 0.1);
  transform: translateY(-1px);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  object-fit: cover;
  border: 3px solid #e6e9ff;
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.15);
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
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.user-version {
  font-size: 16px;
  color: #7b5be6;
  background: #f5f7ff;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
  width: fit-content;
  border: 1px solid #e6e9ff;
  font-weight: 500;
}

.upgrade-btn {
  background: linear-gradient(135deg, #7b5be6 0%, #5b8def 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.3);
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
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
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
  font-size: 16px;
}

/* 右侧详细内容区域 */
.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  padding: 30px;
  min-height: 100vh;
  padding-top: 100px;
  box-shadow: 0 6px 24px rgba(80, 60, 180, 0.06);
  border-radius: 20px 0 0 20px;
}

.large-avatar-container {
  display: flex;
  justify-content: flex-start;
  margin-top: -30px;
  margin-left: 120px;
}

.large-avatar {
  width: 200px;
  height: 200px;
  border-radius: 28px;
  object-fit: cover;
  border: 4px solid #e6e9ff;
  box-shadow: 0 8px 24px rgba(123, 91, 230, 0.2);
  transition: all 0.3s ease;
}

.large-avatar:hover {
  border-color: #7b5be6;
  box-shadow: 0 12px 32px rgba(123, 91, 230, 0.3);
  transform: scale(1.03);
}

.username-edit {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 40px;
  margin-left: 120px;
}

.large-username {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.edit-icon {
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.edit-icon:hover {
  color: #333;
}

.preview-btn {
  background: #f5f7ff;
  color: #7b5be6;
  border: 1px solid #e6e9ff;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  align-self: center;
  margin-top: -50px;
  margin-left: 850px;
  font-weight: 500;
}

.preview-btn:hover {
  background: #ede9fe;
  border-color: #b5aeea;
  color: #6a4fd8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.2);
}

.description-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  align-items: center;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
  padding: 28px;
  border-radius: 20px;
  border: 2px solid #e6e9ff;
  box-shadow: 0 6px 20px rgba(123, 91, 230, 0.12);
}

.description-label {
  align-self: flex-start;
  width: 80%;
}

.description-label {
  font-size: 18px;
  font-weight: 700;
  color: #5a4fd8;
  margin-bottom: 16px;
  margin-left: 12%;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 0 1px 2px rgba(123, 91, 230, 0.1);
}

.description-label::before {
  content: '';
  width: 6px;
  height: 20px;
  background: linear-gradient(135deg, #7b5be6, #5b8def);
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(123, 91, 230, 0.3);
}

.description-textarea {
  width: 80%;
  min-height: 150px;
  padding: 24px;
  border: 2px solid #d1b3e7;
  border-radius: 16px;
  font-size: 16px;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  background: #f8f9ff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(123, 91, 230, 0.08);
  color: #333;
}

.description-textarea:focus {
  outline: none;
  border-color: #7b5be6;
  box-shadow: 0 0 0 4px rgba(123, 91, 230, 0.15), 0 4px 16px rgba(80, 60, 180, 0.1);
  background: #fff;
  transform: translateY(-1px);
}

.description-textarea::placeholder {
  color: #9ca3af;
  font-style: italic;
  font-size: 15px;
}

.save-btn {
  background: linear-gradient(135deg, #7b5be6 0%, #5b8def 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
  margin-top: 100px;
  box-shadow: 0 4px 12px rgba(123, 91, 230, 0.3);
}

.save-btn:hover {
  background: linear-gradient(135deg, #6a4fd8 0%, #4a7cde 100%);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(123, 91, 230, 0.4);
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
  border-radius: 24px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  max-height: 150vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  font-size: 24px;
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
  gap: 30px;
}

.plan-card {
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 40px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
  min-height: 500px;
}

.plan-card.featured {
  border-color: #d1b3e7;
  box-shadow: 0 8px 25px rgba(209, 179, 231, 0.3);
}

.plan-card h4 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.plan-price {
  font-size: 28px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 20px;
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
  margin: 0 0 24px 0;
}

.plan-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: #666;
  font-size: 16px;
}

.plan-features li .iconify {
  color: #28a745;
}

.subscribe-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 100px;
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
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.payment-header h3 {
  font-size: 24px;
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
  font-size: 32px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 30px;
}

.payment-price .unit {
  font-size: 18px;
  font-weight: 400;
}

.qr-code-container {
  margin: 30px 0;
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
  font-size: 18px;
  color: #666;
  margin: 20px 0;
}

.plan-price .unit {
  font-size: 18px;
  font-weight: 400;
}

.payment-terms {
  font-size: 14px;
  color: #999;
  margin-top: 30px;
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
  .content-body {
    flex-direction: column;
    gap: 24px;
  }
  
  .left-panel {
    width: 100%;
  }
  
  .personal-profile-container {
    padding: 10px;
  }
}
</style>
