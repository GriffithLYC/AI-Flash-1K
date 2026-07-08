const storage = require('../../utils/storage');
const draw = require('../../utils/draw');
const { allKeywords } = require('../../data/keywords');

Page({
  data: {
    stats: null,
    progress: null,
    streakDays: 0,
    todayProgress: null,
    weeklyData: []
  },

  onLoad() {
    this.loadStats();
  },

  onShow() {
    this.loadStats();
  },

  loadStats() {
    const stats = storage.getStudyStats();
    const progress = draw.getProgressStats(allKeywords);
    const streakDays = storage.get('streakDays') || 0;
    const todayProgress = storage.getTodayProgress();
    const weeklyData = this.getWeeklyData(stats);

    this.setData({
      stats,
      progress,
      streakDays,
      todayProgress,
      weeklyData
    });
  },

  getWeeklyData(stats) {
    const days = [];
    const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayData = stats.dailyStats[dateStr] || { learned: 0, reviewed: 0 };
      days.push({
        day: dayNames[d.getDay()],
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        learned: dayData.learned,
        total: dayData.learned + dayData.reviewed
      });
    }
    return days;
  },

  onTapClear() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有学习记录吗？此操作不可恢复。',
      confirmColor: '#f87171',
      success: (res) => {
        if (res.confirm) {
          storage.set('learnedCards', []);
          storage.set('reviewCards', []);
          storage.set('cardRecords', {});
          storage.set('studyStats', {
            totalLearned: 0,
            totalReviewed: 0,
            dailyStats: {},
            masteredCount: 0,
            forgetCount: 0
          });
          storage.set('streakDays', 0);
          this.loadStats();
          wx.showToast({ title: '已清除', icon: 'success' });
        }
      }
    });
  }
});
