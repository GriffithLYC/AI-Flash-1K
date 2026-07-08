App({
  globalData: {
    userInfo: null,
    todayLearned: 0,
    todayReviewed: 0,
    streakDays: 0,
    lastStudyDate: '',
    dailyGoal: 10
  },

  onLaunch() {
    this.initStorage();
    this.checkDailyReset();
    this.updateStreak();
  },

  initStorage() {
    const keys = ['learnedCards', 'reviewCards', 'cardRecords', 'studyStats', 'settings'];
    keys.forEach(key => {
      try {
        wx.getStorageSync(key);
      } catch (e) {
        wx.setStorageSync(key, key === 'settings' ? { dailyGoal: 10, reminder: true } : []);
      }
    });
  },

  checkDailyReset() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = wx.getStorageSync('lastStudyDate') || '';
    if (lastDate !== today) {
      wx.setStorageSync('todayLearned', 0);
      wx.setStorageSync('todayReviewed', 0);
      wx.setStorageSync('lastStudyDate', today);
    }
  },

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = wx.getStorageSync('lastStudyDate') || '';
    const streak = wx.getStorageSync('streakDays') || 0;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastDate === yesterday) {
      // streak continues
    } else if (lastDate !== today) {
      wx.setStorageSync('streakDays', 0);
    }
    this.globalData.streakDays = wx.getStorageSync('streakDays') || 0;
  },

  onShow() {
    this.checkDailyReset();
  }
});
