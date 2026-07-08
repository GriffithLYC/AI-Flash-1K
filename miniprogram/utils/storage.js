const PREFIX = 'ailc_';

const storage = {
  set(key, value) {
    try {
      wx.setStorageSync(PREFIX + key, value);
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  get(key, defaultValue = null) {
    try {
      return wx.getStorageSync(PREFIX + key) ?? defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },

  remove(key) {
    try {
      wx.removeStorageSync(PREFIX + key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },

  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (e) {
      console.error('Storage clear error:', e);
      return false;
    }
  },

  // 学习记录相关
  getCardRecords() {
    return this.get('cardRecords', {});
  },

  setCardRecord(cardId, record) {
    const records = this.getCardRecords();
    records[cardId] = { ...records[cardId], ...record, updatedAt: Date.now() };
    this.set('cardRecords', records);
  },

  getCardRecord(cardId) {
    return this.getCardRecords()[cardId] || null;
  },

  // 已学习列表
  getLearnedCards() {
    return this.get('learnedCards', []);
  },

  addLearnedCard(cardId) {
    const list = this.getLearnedCards();
    if (!list.includes(cardId)) {
      list.push(cardId);
      this.set('learnedCards', list);
    }
  },

  removeLearnedCard(cardId) {
    const list = this.getLearnedCards().filter(id => id !== cardId);
    this.set('learnedCards', list);
  },

  // 待复习列表
  getReviewCards() {
    return this.get('reviewCards', []);
  },

  addReviewCard(cardId) {
    const list = this.getReviewCards();
    if (!list.includes(cardId)) {
      list.push(cardId);
      this.set('reviewCards', list);
    }
  },

  removeReviewCard(cardId) {
    const list = this.getReviewCards().filter(id => id !== cardId);
    this.set('reviewCards', list);
  },

  // 学习统计
  getStudyStats() {
    return this.get('studyStats', {
      totalLearned: 0,
      totalReviewed: 0,
      dailyStats: {},
      masteredCount: 0,
      forgetCount: 0
    });
  },

  updateStudyStats(type) {
    const stats = this.getStudyStats();
    const today = new Date().toISOString().split('T')[0];

    if (!stats.dailyStats[today]) {
      stats.dailyStats[today] = { learned: 0, reviewed: 0 };
    }

    if (type === 'learn') {
      stats.totalLearned++;
      stats.dailyStats[today].learned++;
    } else if (type === 'review') {
      stats.totalReviewed++;
      stats.dailyStats[today].reviewed++;
    } else if (type === 'master') {
      stats.masteredCount++;
    } else if (type === 'forget') {
      stats.forgetCount++;
    }

    this.set('studyStats', stats);
    return stats;
  },

  // 设置
  getSettings() {
    return this.get('settings', { dailyGoal: 10, reminder: true, sound: true });
  },

  setSettings(settings) {
    const current = this.getSettings();
    this.set('settings', { ...current, ...settings });
  },

  // 每日数据
  getTodayProgress() {
    const today = new Date().toISOString().split('T')[0];
    const stats = this.getStudyStats();
    const daily = stats.dailyStats[today] || { learned: 0, reviewed: 0 };
    const settings = this.getSettings();
    return {
      learned: daily.learned,
      reviewed: daily.reviewed,
      goal: settings.dailyGoal,
      progress: Math.min(100, Math.round((daily.learned / settings.dailyGoal) * 100))
    };
  }
};

module.exports = storage;
