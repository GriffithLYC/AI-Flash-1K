*Product Requirements Document*

# AI大模型学习卡片

微信小程序产品需求文档 —— 面向AI从业者的碎片化知识记忆工具，通过每日抽卡与滑动交互，帮助用户系统掌握大模型核心概念。

**文档版本** v1.0 | **创建日期** 2026-07-07 | **产品阶段** MVP | **平台** 微信小程序

### 目录

- [1. 需求背景](#background)
- [2. 目标用户与场景](#users)
- [3. 功能需求](#features)
- [4. 数据模型](#data)
- [5. 数据指标](#metrics)
- [6. 迭代计划](#iteration)
- [7. 词库附录（100词）](#keywords)

## 1. 需求背景

AI大模型技术以极快的速度迭代，新概念、新论文、新术语几乎每天都在涌现。对于AI从业者、技术转型者以及在校学生来说，建立一个扎实且系统的概念基础变得越来越困难。

当前市面上的学习工具普遍存在几个问题：

- **知识分散**：概念散落在论文、博客、视频里，缺乏系统梳理
- **语言门槛**：英文术语频繁出现但缺少通俗的双语对照解释
- **缺乏反馈**：传统阅读是单向输入，用户不知道自己真正记住了多少
- **场景不匹配**：桌面端学习工具无法利用通勤、排队等碎片时间

> **产品定位**：一款微信小程序形态的AI大模型概念记忆工具。核心机制是"每日抽卡 + 左滑不记得 / 右滑记得"，让学习像刷短视频一样轻松，同时通过重复出现机制确保薄弱概念得到强化。

## 2. 目标用户与场景

### 2.1 用户画像

| 用户类型 | 描述 | 核心痛点 | 使用频率 |
|---|---|---|---|
| AI转型开发者 | 有编程基础，正在转向AI领域的工程师 | 术语众多，概念边界模糊，面试前突击 | 中频（每周3-5次） |
| 在校研究生 | 计算机/AI相关专业学生 | 论文阅读中遇到大量生僻术语，需要快速建立知识图谱 | 高频（每日1-2次） |
| 产品经理 | 负责AI产品或非技术背景想了解AI的人 | 与算法团队沟通时听不懂技术术语 | 低频（每周1-2次） |
| 技术爱好者 | 对AI感兴趣，保持技术敏感度的普通用户 | 想系统了解AI但不知从何入手 | 中频（每周2-3次） |

### 2.2 核心场景

**场景一：晨间通勤（高频）** —— 用户在地铁上打开小程序，每日抽卡推送3-5个新概念，快速浏览英文术语、中文解释和应用案例。遇到熟悉的右滑标记"已学习"，不熟悉的左滑标记"待复习"。

**场景二：面试前突击（中频）** —— 用户进入"待复习"列表，集中回顾所有左滑过的概念。系统根据遗忘曲线在合适的时间重新推送这些卡片。

**场景三：主动探索（中频）** —— 用户在词库页按分类浏览全部关键词，搜索特定概念，查看详细解释和案例。

## 3. 功能需求

### 3.1 功能总览

| # | 模块 | 功能描述 | 优先级 |
|---|---|---|---|
| 1 | 每日抽卡 | 每日向用户推送5张随机AI关键词卡片，用户通过左右滑动标记掌握状态。左滑"不记得"进入待复习池，右滑"记得"进入已学习池。已学习的卡片短期内不再出现。 | P0 |
| 2 | 卡片详情 | 点击卡片进入详情页，展示英文术语、音标、英文定义、中文定义、应用案例。支持收藏和分享。 | P0 |
| 3 | 发音播放 | 卡片和详情页音标右侧显示小喇叭图标，点击播放术语英文发音。音频为预置TTS合成MP3，播放时图标显示脉冲动画。 | P0 |
| 4 | 待复习 | 汇总所有左滑"不记得"的卡片，支持按分类筛选，支持手动触发重新学习。系统按遗忘曲线算法在每日抽卡中穿插推送。 | P0 |
| 5 | 已学习 | 展示所有右滑"记得"的卡片，支持搜索和分类筛选。用户可随时将已学习卡片移回待复习。 | P0 |
| 6 | 词库浏览 | 展示全部关键词列表，支持按10个分类筛选、按难度筛选、关键词搜索。点击可预览卡片详情。 | P1 |
| 7 | 学习统计 | 展示累计学习天数、已掌握词数、待复习词数、学习热力图、分类掌握度雷达图。 | P1 |
| 8 | 个人中心 | 设置每日抽卡数量、难度偏好、学习提醒时间、清除学习记录、关于与反馈。 | P2 |
| 9 | 收藏夹 | 用户可收藏任意卡片到独立列表，方便快速回顾重点概念。 | P2 |

### 3.2 核心模块详解

#### 3.2.1 每日抽卡页（首页）

**【微信小程序首页 — 每日抽卡】**
界面包含元素：今日学习进度、2 / 5、Transformer、/traens'fo:rmer/、一种神经网络架构，通过注意力机制一次性处理整句文本，是现代大语言模型的基础设计。、← 不记得、记得 →、待复习 12、已学习 48
> 注：此为界面原型示意，实际开发以UI设计稿为准。

**业务逻辑**：

- 每日零点重置抽卡计数，从"未学习"和"待复习"池中按算法抽取5张卡片
- 抽卡算法优先级：待复习（按遗忘曲线权重）> 未学习（随机）
- 若用户完成当日5张卡片，显示"今日任务完成"并提示明日再来
- 若词库中所有卡片均处于"已学习"状态，提示用户"已通关全部词库"并引导重新学习

**交互逻辑**：

- **左右滑动**：手指在卡片上水平滑动超过60px时触发状态变更，释放后卡片向对应方向飞出。滑动过程中卡片跟随手指位移，超出屏幕边界后触发下一张卡片从底部滑入。
- **滑动动效**：
  - 左滑（不记得）：卡片向左飞出屏幕，飞出角度约15度，同时显示红色"不记得"遮罩层（透明度从0到0.3渐变）。飞出耗时300ms，缓动曲线ease-out。下一张卡片从底部以translateY(100%)滑入至translateY(0)，耗时400ms。
  - 右滑（记得）：卡片向右飞出屏幕，飞出角度约-15度，同时显示绿色"记得"遮罩层（透明度从0到0.3渐变）。飞出耗时300ms，缓动曲线ease-out。下一张卡片滑入动画与左滑一致。
  - 滑动中但未触发阈值（< 60px）：释放后卡片以弹簧动画（spring, damping=15）复位至中心位置，耗时400ms。
- **发音播放**：音标右侧显示小喇叭图标（同字号，主题色）。点击后调用微信小程序InnerAudioContext播放对应术语的英文发音音频。播放期间图标显示脉冲动画（scale 1.0→1.2→1.0，循环）。音频来源：预置TTS合成音频文件（本地缓存），格式MP3，单条音频控制在3秒内。
- **点击卡片**：跳转详情页查看完整解释和案例
- **下滑**：刷新当前卡片（仅对未标记卡片有效，每日限3次）

**边界情况**：

- 网络异常：本地缓存最近抽到的20张卡片，无网络时仍可正常学习
- 卡片耗尽：当日卡片全部完成后，首页显示完成状态并提供"去词库探索"入口
- 新用户首次进入：展示3页引导页，说明左滑/右滑/点击查看的含义

#### 3.2.2 卡片详情页

**【卡片详情页】**
界面包含元素：← 返回、Transformer、模型架构、英文解释、A neural network architecture that processes entire sentences at once using attention mechanisms.、中文解释、一种通过注意力机制一次性处理整句文本的神经网络架构，是现代LLM的基础。、应用案例、Google Translate使用Transformer后翻译质量大幅提升，ChatGPT也基于此架构构建。、☆ 收藏、↪ 分享
> 注：此为界面原型示意，实际开发以UI设计稿为准。

**业务逻辑**：

- 详情页从首页点击卡片进入，展示该词条的完整信息
- 收藏状态持久化到本地存储，同步到云端（登录用户）
- 分享功能生成带有词条名称和一句话解释的卡片图片，支持保存到相册或分享给微信好友
- 底部提供"标记为已学习"和"标记为待复习"的快捷按钮

#### 3.2.3 词库浏览页

**业务逻辑**：

- 以网格或列表形式展示全部关键词，每个词条显示术语名称、分类标签、掌握状态（未学习/待复习/已学习）
- 顶部提供分类筛选栏（10个分类标签）和搜索框
- 支持按难度筛选（入门/进阶/专家）
- 点击词条进入详情页
- 列表支持无限滚动加载，每页加载20条

#### 3.2.4 学习统计页

| 指标 | 数值 |
|------|------|
| 连续学习天数 | 12 |
| 已掌握词汇 | 48 |
| 待复习词汇 | 15 |
| 未学习词汇 | 37 |

**业务逻辑**：

- 展示用户的学习数据，包括累计学习天数、已掌握/待复习/未学习的数量
- 学习热力图：以日历形式展示最近30天的学习记录，有学习的天数标记颜色深浅
- 分类掌握度：雷达图展示10个分类中每个分类的掌握比例
- 学习趋势：折线图展示最近7天每日学习卡片数量

## 4. 数据模型

### 4.1 核心实体

```
// 关键词词条
Keyword {
  id: string           // 唯一标识
  term: string         // 英文术语（专有名词保持英文原文，如Transformer）
  phonetic: string     // 音标，如 /traens'fo:rmer/
  audio_url: string    // 发音音频文件路径（MP3格式，本地预置）
  en_definition: string   // 英文解释
  cn_definition: string   // 中文解释
  example: string      // 应用案例（双语）
  category: string     // 分类标签
  difficulty: number   // 难度等级 1-3
}

// 用户学习记录
LearningRecord {
  user_id: string
  keyword_id: string
  status: enum        // unlearned / reviewing / learned
  swipe_count: number // 左滑次数（用于计算遗忘权重）
  last_swiped_at: timestamp
  created_at: timestamp
}

// 用户每日抽卡记录
DailyDraw {
  user_id: string
  date: string        // YYYY-MM-DD
  drawn_keywords: array<keyword_id>
  completed: boolean
}

// 用户设置
UserSettings {
  user_id: string
  daily_count: number     // 每日抽卡数量，默认5
  difficulty_filter: array // 难度偏好筛选
  reminder_time: string    // 每日提醒时间，默认09:00
  reminder_enabled: boolean
}
```

### 4.2 状态流转

> **状态流转规则**：
> 未学习（unlearned） --右滑--> 已学习（learned）
> 未学习（unlearned） --左滑--> 待复习（reviewing）
> 待复习（reviewing） --右滑--> 已学习（learned）
> 待复习（reviewing） --左滑--> 待复习（reviewing，swipe_count + 1）
> 已学习（learned） --手动操作--> 待复习（reviewing）

## 5. 数据指标

### 5.1 核心指标

| 指标类型 | 指标名称 | 定义 | 目标值 |
|---|---|---|---|
| 留存 | 7日留存率 | 注册后第7天仍打开小程序的用户占比 | > 35% |
| 留存 | 30日留存率 | 注册后第30天仍打开小程序的用户占比 | > 15% |
| 活跃 | DAU/MAU | 日活跃占月活跃比例 | > 20% |
| 功能 | 每日抽卡完成率 | 完成当日全部抽卡的用户占比 | > 60% |
| 功能 | 卡片详情点击率 | 点击卡片进入详情的次数 / 总展示次数 | > 30% |
| 内容 | 平均掌握词汇数 | 用户"已学习"状态的平均词条数 | > 50个（30天后） |

### 5.2 埋点事件

| 事件名 | 触发时机 | 用途 |
|---|---|---|
| card_swipe_left | 用户左滑标记"不记得" | 分析用户难以掌握的概念分布 |
| card_swipe_right | 用户右滑标记"记得" | 分析用户已掌握的概念分布 |
| card_detail_view | 用户点击卡片进入详情 | 评估卡片封面信息是否足够 |
| daily_draw_complete | 用户完成当日全部抽卡 | 衡量核心功能完成度 |
| keyword_search | 用户在词库页搜索 | 发现用户主动学习的兴趣点 |
| share_card | 用户分享卡片 | 评估社交传播潜力 |

## 6. 迭代计划

### 6.1 MVP 阶段（v1.0）

| 模块 | 功能点 | 状态 |
|---|---|---|
| 每日抽卡 | 每日5张随机卡片、左右滑动手势、状态标记 | 规划中 |
| 卡片详情 | 双语解释、案例展示 | 规划中 |
| 待复习/已学习 | 列表展示、分类筛选 | 规划中 |
| 词库浏览 | 全部词条列表、分类筛选、搜索 | 规划中 |
| 词库内容 | 首批100个关键词词条 | 已完成 |

### 6.2 后续迭代（v1.1 - v1.3）

- **v1.1**：学习统计页（热力图、雷达图、趋势图）、收藏夹功能、学习提醒推送
- **v1.2**：词库扩展至500词、增加难度分级筛选、卡片分享生成图片
- **v1.3**：词库扩展至1000词、用户登录与云同步、基于遗忘曲线的智能复习算法

## 7. 词库附录（100词）

首批100个关键词已按10个分类整理完成，涵盖从基础概念到前沿技术的完整知识链路。每个词条均包含英文术语、双语解释和应用案例。

> **词库文件**：完整的100词条JSON数据已整理为独立文件，可直接用于小程序数据初始化。
> 文件路径：`assets/ai_keywords_100.json`

### 7.1 分类分布

| 分类 | 词条数量 | 难度分布 | 示例词条 |
|---|---|---|---|
| 基础概念 | 10 | 入门为主 | LLM, Prompt, Token, Embedding, Attention |
| 模型架构 | 10 | 入门-进阶 | Transformer, GPT, BERT, MoE, Diffusion Model |
| 训练技术 | 10 | 进阶为主 | Pre-training, SFT, RLHF, LoRA, Gradient Descent |
| 推理优化 | 10 | 进阶-专家 | KV Cache, Speculative Decoding, Quantization |
| 应用落地 | 10 | 入门-进阶 | Chatbot, RAG, Code Generation, AI Agent |
| 评估指标 | 10 | 进阶为主 | Perplexity, BLEU, ROUGE, MMLU, HumanEval |
| 数据工程 | 10 | 进阶为主 | Tokenization, Data Cleaning, Synthetic Data |
| 多模态 | 10 | 进阶为主 | Multimodal LLM, CLIP, Text-to-Image, TTS |
| 安全对齐 | 10 | 进阶-专家 | AI Alignment, Constitutional AI, Red Teaming |
| 行业术语 | 10 | 入门-进阶 | Foundation Model, AGI, Scaling Law |

### 7.2 难度分层

| 难度 | 数量 | 描述 |
|---|---|---|
| 入门（Level 1） | 35 | AI从业者日常接触的基础概念，如LLM、Prompt、Token、Chatbot等 |
| 进阶（Level 2） | 45 | 需要一定技术背景理解的概念，如RLHF、LoRA、RAG、Quantization等 |
| 专家（Level 3） | 20 | 深入研究或论文中常见的高级概念，如MoE、Speculative Decoding、State Space Model等 |

### 7.3 词条示例

**Large Language Model (LLM)**

**分类**：基础概念 | **难度**：入门

**英文解释**：A type of AI model trained on massive amounts of text data to understand and generate human language. It can write essays, answer questions, and assist with coding by predicting the most likely next word in a sentence.

**中文解释**：一种在海量文本数据上训练的人工智能模型，能够理解和生成人类语言。它可以通过预测句子中最可能的下一个词来撰写文章、回答问题或辅助编程。

**案例**：When you ask ChatGPT to write a birthday poem, it uses an LLM to generate creative and coherent text based on patterns learned from billions of sentences. / 当你让ChatGPT写一首生日诗时，它利用大语言模型基于从数十亿句子中学到的模式生成有创意且连贯的文本。

**RLHF (Reinforcement Learning from Human Feedback)**

**分类**：训练技术 | **难度**：进阶

**英文解释**：A technique where human preferences are used to train a reward model, which then guides the AI to produce more helpful and harmless responses through reinforcement learning.

**中文解释**：一种利用人类偏好训练奖励模型的技术，然后通过强化学习引导AI生成更有用、更无害的回复。

**案例**：Humans rank multiple AI responses from best to worst; this feedback trains the model to prefer polite, accurate answers over rude or incorrect ones. / 人类将多个AI回复从最好到最差排序；这种反馈训练模型更倾向于礼貌准确的回答，而非粗鲁或错误的回答。

**Mixture of Experts (MoE)**

**分类**：模型架构 | **难度**：专家

**英文解释**：An architecture where a large model is divided into many specialized sub-models called 'experts,' and a gating network routes each input to only a few relevant experts. This allows massive scale without proportional compute cost.

**中文解释**：一种将大模型拆分为多个称为"专家"的专门子模型的架构，门控网络将每个输入仅路由给少数相关专家。这使得模型能在计算成本不成比例增长的情况下实现大规模扩展。

**案例**：Mixtral 8x7B uses 8 expert networks but only activates 2 per token, achieving performance comparable to a 70B model with much faster inference. / Mixtral 8x7B使用8个专家网络但每个token只激活2个，在推理速度快得多的情况下达到接近700亿参数模型的性能。

---

本文档为AI大模型学习卡片微信小程序的产品需求文档 v1.0

词库数据见 `assets/ai_keywords_100.json`