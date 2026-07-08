<h1 align="center">AI Learning Cards</h1>

<p align="center">
  <b>AI大模型学习卡片</b> — 碎片化记忆工具，每天5分钟掌握一个AI核心概念
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/platform-WeChat%20Mini%20Program-07C160?style=flat-square&logo=wechat&logoColor=white" alt="Platform"></a>
  <a href="#"><img src="https://img.shields.io/badge/language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Language"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/keywords-100%2B-orange?style=flat-square" alt="Keywords"></a>
</p>

<p align="center">
  <a href="#features">功能特色</a> •
  <a href="#philosophy">产品思路</a> •
  <a href="#quickstart">快速开始</a> •
  <a href="#architecture">项目架构</a> •
  <a href="#data">词库数据</a> •
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

### 核心设计理念

**像刷短视频一样学习AI概念。**

我们将复杂的技术概念拆解为一张张卡片，每张卡片包含：英文术语 + 音标（支持发音播放）+ 英文定义 + 中文定义 + 应用案例。用户每天只需花5分钟浏览5张卡片，通过左右滑动标记掌握状态，系统会根据间隔重复算法在合适的时间推送需要复习的内容。

**三大设计原则：**

1. **最小阻力原则** — 打开即用，无需注册，无需选择，每日自动推送
2. **即时反馈原则** — 每一次滑动都立即改变卡片状态，学习进度可视化
3. **双语对照原则** — 所有术语保持英文原文，配合通俗中文解释，降低语言门槛

---

## <a name="features"></a> 功能特色

| 功能 | 描述 |
|------|------|
| **每日抽卡** | 每日自动推送5张AI关键词卡片，支持左右滑动手势交互 |
| **发音播放** | 音标旁小喇叭图标，点击播放术语英文发音（TTS合成） |
| **滑动动效** | 左滑飞出（红色遮罩）/ 右滑飞出（绿色遮罩），弹簧复位动画 |
| **双语卡片** | 英文术语 + 英文定义 + 中文定义 + 应用案例，专有名词保持原文 |
| **智能复习** | 基于间隔重复算法，左滑"不记得"的卡片自动进入复习队列 |
| **词库浏览** | 支持按10个分类筛选、按难度筛选、关键词搜索 |
| **学习统计** | 连续学习天数、掌握进度、学习热力图、分类掌握度 |
| **离线可用** | 本地缓存20张卡片，无网络时仍可正常学习 |

---

## <a name="quickstart"></a> 快速开始

### 环境要求

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) v1.06+
- 微信小程序 AppID（测试可用测试号）

### 本地运行

```bash
# 克隆项目
git clone https://github.com/yourusername/ai-learning-cards.git
cd ai-learning-cards

# 使用微信开发者工具打开 miniprogram 目录
# 或直接导入项目
```

在微信开发者工具中：

1. 点击「导入项目」
2. 选择 `ai-learning-cards/miniprogram` 目录
3. 填入你的 AppID（或选择测试号）
4. 点击「确定」，编译预览

---

## <a name="architecture"></a> 项目架构

```
ai-learning-cards/
├── README.md                 # 项目说明
├── LICENSE                   # MIT 许可证
├── docs/
│   └── PRD.md               # 产品需求文档
├── assets/
│   └── ai_keywords_100.json # 100个AI关键词词库
└── miniprogram/             # 微信小程序源码
    ├── app.js               # 小程序入口
    ├── app.json             # 全局配置
    ├── app.wxss             # 全局样式（深色主题）
    ├── components/
    │   └── flash-card/      # 可滑动卡片组件
    ├── pages/
    │   ├── index/           # 每日抽卡首页
    │   ├── detail/          # 卡片详情
    │   ├── review/          # 待复习列表
    │   ├── learned/         # 已学习列表
    │   ├── library/         # 词库浏览
    │   ├── stats/           # 学习统计
    │   └── profile/         # 个人中心
    ├── utils/
    │   ├── storage.js       # 本地存储封装
    │   └── draw.js          # 抽卡算法
    └── data/
        └── keywords.js      # 关键词数据导入
```

### 技术栈

- **框架**：微信小程序原生框架
- **语言**：JavaScript + WXML + WXSS
- **存储**：微信本地缓存（Storage）
- **动画**：CSS3 Transform + Transition
- **音频**：InnerAudioContext（TTS发音）

---

## <a name="data"></a> 词库数据

首批包含 **100个AI大模型双语关键词**，覆盖10个分类：

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

每个词条包含：英文术语、音标、英文定义、中文定义、应用案例（双语）、分类标签、难度等级。

数据文件：`assets/ai_keywords_100.json`

---

## <a name="roadmap"></a> 迭代计划

- [x] **v1.0 MVP** — 每日抽卡、滑动交互、卡片详情、待复习/已学习、词库浏览
- [ ] **v1.1** — 学习统计（热力图、雷达图）、收藏夹、学习提醒推送
- [ ] **v1.2** — 词库扩展至500词、难度分级筛选、卡片分享
- [ ] **v1.3** — 词库扩展至1000词、用户登录与云同步、智能复习算法

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
