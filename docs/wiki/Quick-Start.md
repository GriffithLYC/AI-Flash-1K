# 快速开始

## 环境要求

- 现代浏览器（Chrome / Edge / Safari / Firefox）
- 支持 Service Worker 和 localStorage
- 如需构建 APK：JDK 21 + Android SDK

---

## 本地运行

### 方式一：直接打开（最简单）

```bash
# 克隆项目
git clone https://github.com/GriffithLYC/AI-Flash-1K.git
cd AI-Flash-1K

# 直接双击 pwa/index.html 在浏览器中打开
# 或使用任意本地静态服务器
```

### 方式二：使用本地服务器

```bash
cd pwa

# Python 3
python -m http.server 8000

# 或 Node.js
npx serve .

# 然后访问 http://localhost:8000
```

---

## 开发指南

### 目录说明

| 目录 | 内容 | 修改场景 |
|------|------|----------|
| `pwa/index.html` | 主应用（单文件） | 修改UI、交互逻辑 |
| `assets/ai_keywords_100.json` | 100个AI关键词 | 扩充词库 |
| `pwa/android/` | Capacitor Android项目 | 构建APK |
| `miniprogram/` | 微信小程序源码 | 二期开发 |

### 词库格式

```json
{
  "id": "kw_001",
  "term": "Transformer",
  "phonetic": "/traens'fo:rmer/",
  "en_definition": "A neural network architecture...",
  "cn_definition": "一种神经网络架构...",
  "example": "Google Translate uses Transformer...",
  "category": "模型架构",
  "difficulty": 2
}
```

---

## 构建 APK

### 前置要求

1. 安装 JDK 21
2. 安装 Android SDK（命令行工具 + platform-tools + build-tools 34.0.0 + platforms android-34）
3. 设置环境变量 `JAVA_HOME`

### 构建步骤

```bash
# 进入 PWA 目录
cd pwa

# 确保 index.html 存在
# 使用 Capacitor 构建
npx cap sync android

# 进入 Android 项目
cd android

# 构建 Debug APK
.\gradlew assembleDebug

# 输出路径
# pwa/android/app/build/outputs/apk/debug/app-debug.apk
```

### 常见问题

| 问题 | 解决方案 |
|------|----------|
| `JAVA_COMPILER` 错误 | 安装 JDK（非JRE），设置 JAVA_HOME |
| `invalid source release: 21` | 切换至 JDK 21 |
| AAPT 数据无效 | 将项目复制到纯英文路径（无中文/空格） |
| Gradle BOM 解析错误 | 使用无 BOM 的 UTF-8 编码重新保存 gradle 文件 |

> 详见 [Exception-Handling](Exception-Handling) 页面

---

## 贡献代码

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交改动：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 打开 Pull Request

### 可贡献内容

- 新增AI关键词词条（保持双语格式）
- 补充术语发音音频
- 优化滑动交互体验
- 修复 Bug 或改进文档
