<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElCard, ElMessage } from 'element-plus'

interface AgentForm {
  name: string
  emoji: string
  description: string
  category: string
  systemPrompt: string
  suggestions: string[]
  tags: string[]
}

const formRef = ref()
const form = reactive<AgentForm>({
  name: '',
  emoji: '🤖',
  description: '',
  category: '',
  systemPrompt: '',
  suggestions: ['', '', ''],
  tags: []
})

const categories = ['写作', '编程', '数据', '语言', '设计', '健康', '商业', '学习', '娱乐', '其他']
const commonEmojis = ['🤖', '🚀', '📚', '🎯', '📝', '✍️', '🔍', '📊', '🌍', '🎨', '🏥', '💡', '🎵', '🍳', '🏃']

const newTag = ref('')
const isCreating = ref(false)

const rules = {
  name: [
    { required: true, message: '请输入智能体名称', trigger: 'blur' },
    { min: 2, max: 20, message: '名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入智能体描述', trigger: 'blur' },
    { min: 10, max: 100, message: '描述长度在 10 到 100 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  systemPrompt: [
    { required: true, message: '请输入系统提示词', trigger: 'blur' },
    { min: 20, max: 500, message: '提示词长度在 20 到 500 个字符', trigger: 'blur' }
  ]
}

function addTag() {
  if (newTag.value && !form.tags.includes(newTag.value)) {
    form.tags.push(newTag.value)
    newTag.value = ''
  }
}

function removeTag(index: number) {
  form.tags.splice(index, 1)
}

function addSuggestion() {
  if (form.suggestions.length < 5) {
    form.suggestions.push('')
  }
}

function removeSuggestion(index: number) {
  if (form.suggestions.length > 1) {
    form.suggestions.splice(index, 1)
  }
}

async function handleCreate() {
  try {
    await formRef.value?.validate()
    isCreating.value = true
    
    // 模拟创建过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('智能体创建成功！')
    
    // 重置表单
    formRef.value?.resetFields()
    form.tags = []
    form.suggestions = ['', '', '']
    
  } catch (error) {
    console.error('验证失败:', error)
  } finally {
    isCreating.value = false
  }
}

function handlePreview() {
  ElMessage.info('预览功能开发中...')
}
</script>

<template>
  <div class="create-view">
    <header class="create-header">
      <h1>创建智能体</h1>
      <p>设计你专属的AI助手</p>
    </header>

    <div class="create-content">
      <ElCard class="form-card">
        <template #header>
          <span>基本信息</span>
        </template>
        
        <ElForm
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="left"
        >
          <ElFormItem label="名称" prop="name">
            <ElInput
              v-model="form.name"
              placeholder="为你的智能体起个名字"
              maxlength="20"
              show-word-limit
            />
          </ElFormItem>

          <ElFormItem label="头像">
            <div class="emoji-selector">
              <div class="current-emoji">{{ form.emoji }}</div>
              <div class="emoji-options">
                <span
                  v-for="emoji in commonEmojis"
                  :key="emoji"
                  class="emoji-option"
                  :class="{ active: form.emoji === emoji }"
                  @click="form.emoji = emoji"
                >
                  {{ emoji }}
                </span>
              </div>
            </div>
          </ElFormItem>

          <ElFormItem label="分类" prop="category">
            <ElSelect v-model="form.category" placeholder="选择分类" style="width: 100%">
              <ElOption
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="描述" prop="description">
            <ElInput
              v-model="form.description"
              type="textarea"
              placeholder="简单描述这个智能体的功能和特点"
              :rows="3"
              maxlength="100"
              show-word-limit
            />
          </ElFormItem>

          <ElFormItem label="标签">
            <div class="tags-input">
              <div class="tags-list">
                <el-tag
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  closable
                  @close="removeTag(index)"
                >
                  {{ tag }}
                </el-tag>
              </div>
              <div class="add-tag">
                <ElInput
                  v-model="newTag"
                  placeholder="添加标签"
                  size="small"
                  style="width: 120px"
                  @keyup.enter="addTag"
                />
                <ElButton size="small" @click="addTag">添加</ElButton>
              </div>
            </div>
          </ElFormItem>
        </ElForm>
      </ElCard>

      <ElCard class="form-card">
        <template #header>
          <span>AI 配置</span>
        </template>
        
        <ElForm
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="left"
        >
          <ElFormItem label="系统提示词" prop="systemPrompt">
            <ElInput
              v-model="form.systemPrompt"
              type="textarea"
              placeholder="描述智能体的角色、专长和回答风格。例如：你是一个专业的写作助手，擅长帮助用户改进文章结构和表达..."
              :rows="6"
              maxlength="500"
              show-word-limit
            />
          </ElFormItem>

          <ElFormItem label="建议问题">
            <div class="suggestions-list">
              <div
                v-for="(suggestion, index) in form.suggestions"
                :key="index"
                class="suggestion-item"
              >
                <ElInput
                  v-model="form.suggestions[index]"
                  :placeholder="`建议问题 ${index + 1}`"
                  maxlength="50"
                />
                <ElButton
                  v-if="form.suggestions.length > 1"
                  type="danger"
                  size="small"
                  plain
                  @click="removeSuggestion(index)"
                >
                  删除
                </ElButton>
              </div>
              <ElButton
                v-if="form.suggestions.length < 5"
                type="primary"
                plain
                size="small"
                @click="addSuggestion"
              >
                + 添加建议问题
              </ElButton>
            </div>
          </ElFormItem>
        </ElForm>
      </ElCard>

      <div class="action-buttons">
        <ElButton size="large" @click="handlePreview">预览</ElButton>
        <ElButton
          type="primary"
          size="large"
          :loading="isCreating"
          @click="handleCreate"
        >
          {{ isCreating ? '创建中...' : '创建智能体' }}
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-view {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.create-header {
  margin-bottom: 32px;
}

.create-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
}

.create-header p {
  font-size: 16px;
  color: #606266;
  margin: 0;
}

.create-content {
  max-width: 800px;
  margin: 0 auto;
}

.form-card {
  margin-bottom: 24px;
}

.emoji-selector {
  display: flex;
  align-items: center;
  gap: 16px;
}

.current-emoji {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e4e7ed;
  border-radius: 8px;
}

.emoji-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.emoji-option {
  font-size: 24px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.emoji-option:hover {
  border-color: #409eff;
  background: #ecf5ff;
}

.emoji-option.active {
  border-color: #409eff;
  background: #409eff;
}

.tags-input {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.add-tag {
  display: flex;
  align-items: center;
  gap: 8px;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}
</style>
