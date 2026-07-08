const storage = require('../../utils/storage');
const draw = require('../../utils/draw');
const { keywords } = require('../../data/keywords');

Page({
  data: {
    dailyCards: [],
    currentIndex: 0,
    currentCard: null,
    todayProgress: { learned: 0, goal: 10, progress: 0 },
    isFinished: false,
    streakDays: 0
  },

  onLoad() {
    this.loadDailyCards();
    this.loadProgress();
  },

  onShow() {
    this.loadProgress();
  },

  loadDailyCards() {
    const dailyCards = draw.drawDailyCards(keywords, 10);
    this.setData({
      dailyCards,
      currentIndex: 0,
      currentCard: dailyCards.length > 0 ? dailyCards[0] : null,
      isFinished: dailyCards.length === 0
    });
  },

  loadProgress() {
    const progress = storage.getTodayProgress();
    const streakDays = storage.get('streakDays') || 0;
    this.setData({
      todayProgress: progress,
      streakDays
    });
  },

  onCardSwipe(e) {
    const { direction, card } = e.detail;
    const isRemembered = direction === 'right';

    // 更新学习记录
    const reviewInfo = draw.calculateNextReview(card.id, isRemembered);
    storage.setCardRecord(card.id, reviewInfo);

    if (isRemembered) {
      storage.addLearnedCard(card.id);
      storage.removeReviewCard(card.id);
      storage.updateStudyStats('learn');
      storage.updateStudyStats('master');
      wx.showToast({ title: '已掌握', icon: 'success' });
    } else {
      storage.addReviewCard(card.id);
      storage.removeLearnedCard(card.id);
      storage.updateStudyStats('forget');
      wx.showToast({ title: '加入复习', icon: 'none' });
    }

    this.nextCard();
  },

  nextCard() {
    const nextIndex = this.data.currentIndex + 1;
    if (nextIndex >= this.data.dailyCards.length) {
      this.setData({ isFinished: true });
      this.updateStreak();
      return;
    }

    this.setData({
      currentIndex: nextIndex,
      currentCard: this.data.dailyCards[nextIndex]
    });
    this.loadProgress();
  },

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = storage.get('lastStudyDate');
    if (lastDate !== today) {
      const streak = storage.get('streakDays') || 0;
      storage.set('streakDays', streak + 1);
      storage.set('lastStudyDate', today);
      this.setData({ streakDays: streak + 1 });
    }
  },

  onCardDetail(e) {
    const { card } = e.detail;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${card.id}`
    });
  },

  onCardAudio(e) {
    const { card } = e.detail;
    console.log('Play audio for:', card.term);
  },

  onTapRemember() {
    // 模拟右滑
    if (this.data.currentCard) {
      this.onCardSwipe({ detail: { direction: 'right', card: this.data.currentCard } });
    }
  },

  onTapForget() {
    // 模拟左滑
    if (this.data.currentCard) {
      this.onCardSwipe({ detail: { direction: 'left', card: this.data.currentCard } });
    }
  },

  onTapRestart() {
    this.loadDailyCards();
  },

  onTapReview() {
    wx.switchTab({ url: '/pages/review/review' });
  },

  onPullDownRefresh() {
    this.loadDailyCards();
    this.loadProgress();
    wx.stopPullDownRefresh();
  }
});
