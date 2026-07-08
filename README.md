<h1 align="center">AI Learning Cards</h1>

<p align="center">
  <b>AI大模型学习卡片</b> — 碎片化记忆工具，每天5分钟掌握一个AI核心概念
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/platform-Web%20%2F%20PWA-5A0FC8?style=flat-square&logo=google-chrome&logoColor=white" alt="Platform"></a>
  <a href="#"><img src="https://img.shields.io/badge/language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Language"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/keywords-2000%2B-orange?style=flat-square" alt="Keywords"></a>
</p>

<p align="center">
  <a href="#features">功能特色</a> •
  <a href="#philosophy">产品思路</a> •
  <a href="#phase2">二期规划</a> •
  <a href="#quickstart">快速开始</a> •
  <a href="#architecture">项目架构</a> •
  <a href="#data">词库数据</a> •
  <a href="#roadmap">迭代计划</a> •
  <a href="#contribute">参与贡献</a>
</p>

---

## 产品演示

<p align="center">
  <i>每日抽卡 → 左右滑动 → 掌握AI概念</i>
</p>

```
┌─────────────────────────┐
│     今日学习进度 2/5     │
│  ┌───────────────────┐  │
│  │    Transformer    │  │
│  │ /traens'fo:rmer/  │  │
│  │                   │  │
│  │  一种神经网络架构  │  │
│  │ 通过注意力机制...  │  │
│  │                   │  │
│  │ 不记得 ◄   ► 记得 │  │
│  └───────────────────┘  │
│    待复习 12  已学习 48  │
└─────────────────────────┘
```

> 左滑"不记得"进入待复习，右滑"记得"标记已掌握。已学会的卡片短期内不再出现，薄弱概念反复强化。

---

## <a name="philosophy"></a> 产品思路

### 为什么做这个产品？

AI大模型技术以极快的速度迭代，新概念、新论文、新术语几乎每天都在涌现。对于AI从业者、技术转型者以及在校学生来说，建立一个扎实且系统的概念基础变得越来越困难。

市面上的学习工具普遍存在几个问题：

- **知识分散** — 概念散落在论文、博客、视频里，缺乏系统梳理
- **语言门槛** — 英文术语频繁出现但缺少通俗的双语对照解释
- **缺乏反馈** — 传统阅读是单向输入，用户不知道自己真正记住了多少
- **场景不匹配** — 桌面端学习工具无法利用通勤、排队等碎片时间

### 分阶段建设策略

本产品采用一期/二期分阶段建设策略，确保每个阶段交付可用、有价值的产品：

| 维度 | 一期 | 二期 |
|------|------|------|
| **平台** | 单机版自适应离线网页(PWA) | 微信小程序 |
| **产品定位** | 轻量化学习工具，本身不具备大模型能力 | 智能化学习平台，接入大模型能力 |
| **知识来源** | 人工编辑预置（100-1000词） | 人工 + 大模型自动生成（至2000词） |
| **大模型能力** | 无 | 接入智谱GLM-4-Flash / 阿里Qwen |
| **核心升级** | — | 知识自动更新、视频资源匹配、智能翻译 |

### 核心设计理念

**像刷短视频一样学习AI概念。**

我们将复杂的技术概念拆解为一张张卡片，每张卡片包含：英文术语 + 音标（支持发音播放）+ 英文定义 + 中文定义 + 应用案例。用户每天只需花5分钟浏览5张卡片，通过左右滑动标记掌握状态，系统会根据间隔重复算法在合适的时间推送需要复习的内容。

**三大设计原则：**

1. **最小阻力原则** — 打开即用，无需注册，无需选择，每日自动推送
2. **即时反馈原则** — 每一次滑动都立即改变卡片状态，学习进度可视化
3. **双语对照原则** — 所有术语保持英文原文，配合通俗中文解释，降低语言门槛

---

## <a name="features"></a> 功能特色

| 功能 | 描述 | 阶段 |
|------|------|------|
| **每日抽卡** | 每日自动推送5张AI关键词卡片，支持左右滑动手势交互 | 一期 |
| **发音播放** | 音标旁小喇叭图标，点击播放术语英文发音（TTS合成） | 一期 |
| **滑动动效** | 左滑飞出（红色遮罩）/ 右滑飞出（绿色遮罩），弹簧复位动画 | 一期 |
| **双语卡片** | 英文术语 + 英文定义 + 中文定义 + 应用案例，专有名词保持原文 | 一期 |
| **智能复习** | 基于间隔重复算法，左滑"不记得"的卡片自动进入复习队列 | 一期 |
| **词库浏览** | 支持按10个分类筛选、按难度筛选、关键词搜索 | 一期 |
| **学习统计** | 连续学习天数、掌握进度、学习热力图、分类掌握度 | 一期 |
| **离线可用** | 本地缓存20张卡片，无网络时仍可正常学习 | 一期 |
| **自动更新知识点** | 大模型定期从论文/博客提取前沿知识点，经人工审核后入库 | 二期 |
| **视频资源匹配** | 自动匹配B站/抖音/GitHub相关视频，详情页一键跳转延伸学习 | 二期 |
| **知识点翻译** | 大模型实时中英双向翻译，翻译结果一译永存（缓存策略） | 二期 |
| **统一模型管理** | 平台统一配置API，主备双模型自动切换，用户零感知 | 二期 |

---

## <a name="phase2"></a> 二期规划

二期将接入大模型能力（智谱GLM-4-Flash为主、阿里Qwen为备用），实现知识点的自动更新与扩容、视频资源的智能匹配、以及中英双向翻译功能。所有大模型能力对用户完全透明，用户无需自行配置任何API Key，前期采用国内免费开源模型，实现零成本运行。二期目标将词库从1000词扩容至2000词，并搭建轻量级后端服务支撑API调用与数据缓存。

---

## <a name="quickstart"></a> 快速开始

### 环境要求

- 现代浏览器（Chrome / Edge / Safari / Firefox）
- 支持 Service Worker 和 localStorage

### 本地运行

直接双击 `index.html` 文件即可在浏览器中打开。

或使用本地服务器：

```bash
# 克隆项目
git clone https://github.com/yourusername/ai-learning-cards.git
cd ai-learning-cards

# 进入 pwa 目录
cd pwa

# 直接双击 index.html 在浏览器中打开
# 或使用任意本地静态服务器
python -m http.server 8000
```

---

## <a name="architecture"></a> 项目架构

```
ai-learning-cards/
├── README.md                 # 项目说明
├── LICENSE                   # MIT 许可证
├── docs/
│   └── PRD.md               # 产品需求文档（含二期规划）
├── assets/
│   └── ai_keywords_100.json # 100个AI关键词词库
├── pwa/                     # PWA 离线网页源码（一期）
│   ├── index.html           # 主应用（单文件，内嵌CSS+JS+词库数据）
│   └── android/
│       └── BUILD_GUIDE.md   # 安卓APK打包指南
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

### 技术栈

- **基础**：HTML5 + CSS3 + JavaScript
- **存储**：localStorage + Service Worker 缓存
- **动画**：CSS3 Transform + Transition
- **音频**：Web Speech API / HTML5 Audio（TTS发音）
- **离线**：Service Worker + Cache API

---

## <a name="data"></a> 词库数据

首批包含 **100个AI大模型双语关键词**，覆盖10个分类。产品规划分阶段扩容至 **2000+ 词条**：

| 分类 | 数量 | 示例词条 |
|------|------|----------|
| 基础概念 | 10 | LLM, Prompt, Token, Embedding, Attention |
| 模型架构 | 10 | Transformer, GPT, BERT, MoE, Diffusion Model |
| 训练技术 | 10 | Pre-training, SFT, RLHF, LoRA, Gradient Descent |
| 推理优化 | 10 | KV Cache, Speculative Decoding, Quantization |
| 应用落地 | 10 | Chatbot, RAG, Code Generation, AI Agent |
| 评估指标 | 10 | Perplexity, BLEU, ROUGE, MMLU, HumanEval |
| 数据工程 | 10 | Tokenization, Data Cleaning, Synthetic Data |
| 多模态 | 10 | Multimodal LLM, CLIP, Text-to-Image, TTS |
| 安全对齐 | 10 | AI Alignment, Constitutional AI, Red Teaming |
| 行业术语 | 10 | Foundation Model, AGI, Scaling Law |

### 扩容路线

| 阶段 | 目标词数 | 来源 | 状态 |
|------|----------|------|------|
| 一期v1.0 | 100词 | 人工编辑 | 已完成 |
| 一期v1.2 | 500词 | 人工编辑 + 社区贡献 | 规划中 |
| 一期v1.3 | 1000词 | 人工编辑 + 社区贡献 | 规划中 |
| 二期v2.1 | 2000词 | 人工 + 大模型自动生成 | 待开发 |

每个词条包含：英文术语、音标、英文定义、中文定义、应用案例（双语）、分类标签、难度等级。

数据文件：`assets/ai_keywords_100.json`

---

## <a name="roadmap"></a> 迭代计划

### 一期：轻量化学习工具（PWA离线网页，无大模型能力）

- [x] **一期 v1.0 MVP** — PWA离线网页：每日抽卡、滑动交互、卡片详情、待复习/已学习、词库浏览、100词
- [ ] **一期 v1.1** — 学习统计（热力图、雷达图、趋势图）、收藏夹、学习提醒推送
- [ ] **一期 v1.2** — 词库扩展至500词、难度分级筛选、卡片分享（生成图片）
- [ ] **一期 v1.3** — 词库扩展至1000词、微信登录与云同步、智能复习算法（遗忘曲线）

### 二期：接入大模型能力（微信小程序）

- [ ] **二期 v2.0** — 微信小程序：服务端搭建、接入智谱GLM-4-Flash（主模型）+ 阿里Qwen（备用）、统一模型管理模块
- [ ] **二期 v2.1** — 自动更新知识点（大模型 + 人工审核）、翻译功能上线、词库扩容至2000词
- [ ] **二期 v2.2** — 自动匹配B站/抖音/GitHub视频资源、详情页"相关视频"入口、平台导流
- [ ] **二期 v2.3** — 翻译质量优化、视频匹配精准度提升、缓存策略优化、运营后台完善

---

## <a name="contribute"></a> 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 贡献内容

- 新增AI关键词词条（保持双语格式）
- 补充术语发音音频
- 优化滑动交互体验
- 修复 Bug 或改进文档

---

## License

本项目基于 [MIT](LICENSE) 许可证开源。

---

<p align="center">
  Made with curiosity for AI learners
</p>
