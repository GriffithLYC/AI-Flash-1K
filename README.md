<h1 align="center">AI Learning Cards</h1>

<p align="center">
  <b>AI大模型学习卡片</b> — 碎片化记忆工具，每天5分钟掌握一个AI核心概念
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/platform-Web%20%2F%20PWA-5A0FC8?style=flat-square&logo=google-chrome&logoColor=white" alt="Platform"></a>
  <a href="#"><img src="https://img.shields.io/badge/language-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Language"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/keywords-2000%2B-orange?style=flat-square" alt="Keywords"></a></p>

<p align="center">
  <a href="#features">功能特色</a> •
  <a href="#philosophy">产品思路</a> •
  <a href="#phase2">二期规划</a> •
  <a href="#quickstart">快速开始</a> •
  <a href="#architecture">项目架构</a> •
  <a href="#data">词库数据</a> •
  <a href="#roadmap">迭代计划</a> •  <a href="#contribute">参与贡献</a>
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
    │   └── flash-card/    ├── pages/
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
        └── keywords.js```

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

