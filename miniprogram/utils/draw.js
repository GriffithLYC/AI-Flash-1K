const storage = require('./storage');

/**
 * 每日抽卡算法
 * 1. 优先抽取待复习卡片
 * 2. 其次抽取未学习的新卡片
 * 3. 最后随机抽取已学习但非今日学习的卡片
 */
function drawDailyCards(allKeywords, count = 10) {
  const reviewIds = storage.getReviewCards();
  const learnedIds = storage.getLearnedCards();
  const cardRecords = storage.getCardRecords();

  const today = new Date().toISOString().split('T')[0];

  // 分类卡片
  const reviewCards = allKeywords.filter(k => reviewIds.includes(k.id));
  const newCards = allKeywords.filter(k => !learnedIds.includes(k.id));
  const learnedCards = allKeywords.filter(k => {
    if (!learnedIds.includes(k.id)) return false;
    const record = cardRecords[k.id];
    if (!record) return true;
    const lastDate = record.updatedAt ? new Date(record.updatedAt).toISOString().split('T')[0] : '';
    return lastDate !== today;
  });

  const result = [];

  // 第一步：加入待复习卡片
  result.push(...shuffleArray([...reviewCards]));

  // 第二步：补充新卡片
  if (result.length < count) {
    const needed = count - result.length;
    const shuffledNew = shuffleArray([...newCards]);
    result.push(...shuffledNew.slice(0, needed));
  }

  // 第三步：补充已学习卡片
  if (result.length < count) {
    const needed = count - result.length;
    const shuffledLearned = shuffleArray([...learnedCards]);
    result.push(...shuffledLearned.slice(0, needed));
  }

  return result.slice(0, count);
}

/**
 * 随机抽卡（词库浏览用）
 */
function drawRandomCards(allKeywords, count = 1, excludeIds = []) {
  const available = allKeywords.filter(k => !excludeIds.includes(k.id));
  const shuffled = shuffleArray([...available]);
  return shuffled.slice(0, count);
}

/**
 * 根据掌握程度计算下次复习时间
 */
function calculateNextReview(cardId, isRemembered) {
  const record = storage.getCardRecord(cardId) || { level: 0 };
  let newLevel = isRemembered ? (record.level || 0) + 1 : 0;

  // 间隔重复算法（简化版 SM-2）
  const intervals = [1, 3, 7, 14, 30, 60, 90];
  const days = intervals[Math.min(newLevel, intervals.length - 1)];

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + days);

  return {
    level: newLevel,
    nextReview: nextReview.toISOString().split('T')[0],
    isRemembered
  };
}

/**
 * Fisher-Yates 洗牌算法
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * 获取学习进度统计
 */
function getProgressStats(allKeywords) {
  const learnedIds = storage.getLearnedCards();
  const reviewIds = storage.getReviewCards();
  const stats = storage.getStudyStats();
  const todayProgress = storage.getTodayProgress();

  return {
    total: allKeywords.length,
    learned: learnedIds.length,
    reviewing: reviewIds.length,
    unlearned: allKeywords.length - learnedIds.length,
    mastered: stats.masteredCount,
    todayLearned: todayProgress.learned,
    todayGoal: todayProgress.goal,
    progressPercent: Math.round((learnedIds.length / allKeywords.length) * 100) || 0
  };
}

module.exports = {
  drawDailyCards,
  drawRandomCards,
  calculateNextReview,
  shuffleArray,
  getProgressStats
};
