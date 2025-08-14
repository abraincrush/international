# 大学国际化教育平台（本地运行指南）

本项目采用前后端分离架构：后端 Flask（Python），前端 Vue 3 + Vite（TypeScript）。下文将详细说明如何在全新环境下拉起项目。

## 技术栈

### 后端 (Backend)

*   **框架**: Flask
*   **语言**: Python
*   **API通信**: RESTful API
*   **依赖管理**: Conda / Pip

### 前端 (Frontend)

*   **框架**: Vue 3 (使用 `<script setup>`)
*   **构建工具**: Vite
*   **语言**: TypeScript
*   **UI 组件库**: Element Plus
*   **状态管理**: Pinia
*   **路由**: Vue Router

---

## 项目结构

```
international/
├── backend/         # 后端 Flask 应用
│   ├── app.py       # Flask 应用主文件
│   └── ...
└── frontend/        # 前端 Vue 应用
    ├── src/
    │   ├── components/  # 自定义组件目录
    │   ├── views/       # 路由页面组件
    │   ├── App.vue    # Vue 应用根组件
    │   └── main.ts    # 前端应用入口文件
    ├── package.json   # 前端依赖配置
    └── vite.config.ts # Vite 配置文件
```

---

## 本地开发指南（从零开始）

你需要同时启动后端和前端两个服务。以下步骤以 Windows/Mac/Linux 通用命令为例。

### 1. 启动后端服务

1) 安装 Python（3.10+）
- Windows 用户可到 `https://www.python.org/downloads/` 安装，勾选 Add Python to PATH。

2) 创建并激活虚拟环境（任选其一）

使用 venv：
```bash
cd path/to/international
python -m venv .venv
# Windows
.\.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

或使用 Conda：
```bash
conda create -n international python=3.10 -y
conda activate international
```

3) 安装依赖并启动服务
```bash
cd backend
pip install -U pip
pip install flask flask-cors
python app.py
```

默认服务地址：`http://127.0.0.1:5000`（已开启 CORS，供前端跨域访问）。

### 2. 启动前端服务

请打开一个新的终端窗口：

```bash
cd path/to/international/frontend

# 推荐使用 Node.js 18+（可在 https://nodejs.org 下载 LTS）
npm install
npm run dev
```

默认地址：`http://localhost:5173`。首次运行 Vite 会提示访问地址，按提示打开即可。

如果 5173 端口被占用，Vite 会自动切换到其它端口，终端会显示实际端口号。

前端请求后端接口地址在页面中直接写为 `http://127.0.0.1:5000`，无需额外代理配置（开发阶段已允许 CORS）。

> 如果你的网络或公司代理限制了 localhost 访问，请确认防火墙允许 5000/5173 端口的本机访问。

---

## 前端开发核心：使用 Element Plus

Element Plus 是一个基于 Vue 3 的企业级 UI 组件库，提供了丰富的组件和完善的设计规范。

### 常用组件

Element Plus 提供了 60+ 个高质量组件，包括：

**基础组件:**
- `el-button` - 按钮
- `el-input` - 输入框  
- `el-select` - 选择器
- `el-checkbox` - 多选框
- `el-radio` - 单选框

**布局组件:**
- `el-container` - 布局容器
- `el-row` / `el-col` - 栅格系统
- `el-card` - 卡片

**数据展示:**
- `el-table` - 表格
- `el-pagination` - 分页
- `el-tag` - 标签
- `el-progress` - 进度条

### 如何使用组件？

由于我们已经全局注册了 Element Plus，你可以直接在任何 `.vue` 文件中使用组件：

**示例:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const form = ref({
  username: '',
  password: ''
})

const handleSubmit = () => {
  ElMessage.success('提交成功！')
}
</script>

<template>
  <el-form :model="form">
    <el-form-item label="用户名">
      <el-input v-model="form.username" :prefix-icon="User" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" :prefix-icon="Lock" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
```

### 图标使用

```vue
<script setup lang="ts">
import { Edit, Delete, Plus } from '@element-plus/icons-vue'
</script>

<template>
  <el-button :icon="Plus">新增</el-button>
  <el-button :icon="Edit">编辑</el-button>
  <el-button :icon="Delete">删除</el-button>
</template>
```

### 主题定制

如需自定义主题，可以在 `src/assets/main.css` 中覆盖 CSS 变量：

```css
:root {
  --el-color-primary: #your-color;
  --el-border-radius-base: 8px;
}
```

更多信息请参考 [Element Plus 官方文档](https://element-plus.org/)

---

## 常见问题（FAQ）

- Q: 前端能打开，但接口报错 CORS？
  - A: 后端已启用 `flask-cors`，确保以 `python app.py` 启动；若仍有问题，检查是否把后端运行在 127.0.0.1 以外的网卡或端口。

- Q: 打开页面但布局被裁切或者出现轻微滚动？
  - A: 项目已做小屏自适应与“隐藏滚动条但必要时可滚”的处理。如果仍不理想，检查浏览器缩放比例是否非 100%，或窗口高度过小。

- Q: Windows PowerShell 运行脚本报执行策略限制？
  - A: 以管理员运行 PowerShell 执行 `Set-ExecutionPolicy RemoteSigned`，然后重新打开终端。

- Q: 端口已被占用？
  - A: 修改运行端口：后端 `set FLASK_RUN_PORT=5001`（或在代码中改 `app.run(port=5001)`）；前端 `npm run dev -- --port 5174`。

---

## 生产构建（可选）

```bash
cd frontend
npm run build
npm run preview  # 本地预览构建产物
```

后端部署可使用任意 WSGI 服务器（如 gunicorn）或平台（如 Render/Heroku/自建服务器）。