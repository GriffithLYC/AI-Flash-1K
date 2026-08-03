# 技术架构

## 项目结构

```
ai-learning-cards/
├── README.md                 # 项目说明
├── LICENSE                   # MIT 许可证
├── docs/
│   ├── PRD.md               # 产品需求文档（含二期规划）
│   └── exception-handling.md # 异常处理记录
├── assets/
│   └── ai_keywords_100.json # 100个AI关键词词库
├── pwa/                     # PWA 离线网页源码（一期）
│   ├── index.html           # 主应用（单文件，内嵌CSS+JS+词库数据）
│   └── android/             # Capacitor Android 项目
│       ├── app/
│       │   ├── src/main/
│       │   │   ├── AndroidManifest.xml
│       │   │   ├── java/.../MainActivity.java
│       │   │   └── res/...
│       │   └── build.gradle
│       ├── build.gradle
│       ├── capacitor.settings.gradle
│       └── gradle/...
└── miniprogram/             # 微信小程序源码（二期）
    ├── app.js / app.json / app.wxss
    ├── components/
    │   └── flash-card/
    ├── pages/
    │   ├── index/           # 每日抽卡首页
    │   ├── detail/          # 卡片详情
    │   ├── review/          # 待复习列表
    │   ├── learned/         # 已学习列表
    │   ├── library/         # 词库浏览
    │   ├── stats/           # 学习统计
    │   └── profile/         # 个人中心
    ├── utils/
    │   ├── storage.js
    │   └── draw.js
    └── data/
        └── keywords.js
```

---

## 技术栈

### 一期（PWA 离线网页）

| 层级 | 技术 | 说明 |
|------|------|------|
| **基础** | HTML5 + CSS3 + JavaScript | 单文件应用，无框架依赖 |
| **存储** | localStorage + Service Worker | 离线数据持久化 + 资源缓存 |
| **动画** | CSS3 Transform + Transition | 卡片滑动、飞入飞出动效 |
| **音频** | Web Speech API / HTML5 Audio | TTS发音播放 |
| **离线** | Service Worker + Cache API | 支持离线访问 |
| **打包** | Capacitor | PWA 转 Android APK |

### 二期（微信小程序）

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端** | 微信小程序原生框架 | WXML + WXSS + JS |
| **后端** | Node.js / Python | 轻量级服务端 |
| **大模型** | 智谱 GLM-4-Flash + 阿里 Qwen | 主备双模型 |
| **API 格式** | OpenAI 兼容格式 | 统一接口标准 |
| **部署** | 腾讯云 Serverless / Vercel | 低成本托管 |

---

## 核心交互架构

### 卡片滑动系统

```
用户手势
    |
    v
touchstart → 记录 X0
    |
    v
touchmove → 计算 deltaX = currentX - X0
    |
    |-- deltaX < 60px --> 卡片跟随 + 渐变遮罩
    |
    v
touchend
    |
    |-- deltaX > 60px --> 右滑成功（绿色飞出）
    |-- deltaX < -60px --> 左滑成功（红色飞出）
    |-- |deltaX| < 60px --> 弹簧复位
```

### 数据持久化

```
浏览器 localStorage
    |
    ├── learning_records    # 用户学习状态（unlearned / reviewing / learned）
    ├── daily_draw          # 每日抽卡记录
    ├── user_settings       # 用户偏好设置
    └── favorites           # 收藏列表
```

### 状态流转

```
未学习(unlearned) --右滑--> 已学习(learned)
未学习(unlearned) --左滑--> 待复习(reviewing)
待复习(reviewing) --右滑--> 已学习(learned)
待复习(reviewing) --左滑--> 待复习(reviewing) [swipe_count + 1]
已学习(learned) --手动操作--> 待复习(reviewing)
```

---

## 二期服务端架构

```
网页前端 / 微信小程序
    |
    | HTTPS 请求
    v
服务端（Node.js / Python）
    |
    ├── 翻译接口 /api/v1/translate
    │       ├── 查询 TranslationCache
    │       ├── 缓存命中 → 直接返回
    │       └── 缓存未命中 → 调用大模型API
    │
    ├── 知识点更新 /api/v1/admin/knowledge/update
    │       ├── 定时任务触发（每周一）
    │       ├── 大模型提取新概念
    │       ├── 自动去重（相似度 > 0.85）
    │       └── 人工审核后入库
    │
    ├── 视频匹配 /api/v1/admin/video/match
    │       ├── B站搜索API
    │       ├── GitHub Search API
    │       ├── 大模型相关性排序
    │       └── 写入 VideoResource 表
    │
    └── 统一模型管理
            ├── 主力：智谱 GLM-4-Flash
            ├── 备用：阿里 Qwen-Max-Flash
            └── 故障自动切换
```

---

## 部署架构

### 一期（纯静态）

- **托管方式**：任意静态文件服务器 / GitHub Pages / CDN
- **无需后端**：所有数据存储在客户端 localStorage
- **APK 打包**：Capacitor 将 PWA 封装为 Android 应用

### 二期（需服务端）

- **服务端**：轻量级 Node.js / Python 服务
- **部署平台**：腾讯云云函数 / Vercel / Railway（免费额度内）
- **数据库**：SQLite / PostgreSQL（根据规模选择）
- **缓存层**：翻译结果永久缓存，视频链接定期检测
