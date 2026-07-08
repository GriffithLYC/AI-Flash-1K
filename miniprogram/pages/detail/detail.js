const { allKeywords } = require('../../data/keywords');
const storage = require('../../utils/storage');

Page({
  data: {
    card: null,
    isLearned: false,
    isReviewing: false,
    record: null
  },

  onLoad(options) {
    const { id } = options;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'error' });
      wx.navigateBack();
      return;
    }

    const card = allKeywords.find(k => k.id === id);
    if (!card) {
      wx.showToast({ title: '卡片不存在', icon: 'error' });
      wx.navigateBack();
      return;
    }

    const learnedIds = storage.getLearnedCards();
    const reviewIds = storage.getReviewCards();
    const record = storage.getCardRecord(id);

    this.setData({
      card,
      isLearned: learnedIds.includes(id),
      isReviewing: reviewIds.includes(id),
      record
    });
  },

  onTapMarkLearned() {
    const { card, isLearned } = this.data;
    if (isLearned) {
      storage.removeLearnedCard(card.id);
      this.setData({ isLearned: false });
      wx.showToast({ title: '取消已学习', icon: 'none' });
    } else {
      storage.addLearnedCard(card.id);
      storage.removeReviewCard(card.id);
      storage.setCardRecord(card.id, { level: 1, isRemembered: true });
      this.setData({ isLearned: true, isReviewing: false });
      wx.showToast({ title: '标记为已学习', icon: 'success' });
    }
  },

  onTapAddReview() {
    const { card, isReviewing } = this.data;
    if (isReviewing) {
      storage.removeReviewCard(card.id);
      this.setData({ isReviewing: false });
      wx.showToast({ title: '移出复习', icon: 'none' });
    } else {
      storage.addReviewCard(card.id);
      storage.removeLearnedCard(card.id);
      this.setData({ isReviewing: true, isLearned: false });
      wx.showToast({ title: '加入复习列表', icon: 'success' });
    }
  },

  onTapAudio() {
    const { card } = this.data;
    wx.showToast({ title: '朗读: ' + card.term, icon: 'none' });
  },

  onShareAppMessage() {
    const { card } = this.data;
    return {
      title: `AI学习卡片：${card.translation} (${card.term})`,
      path: `/pages/detail/detail?id=${card.id}`
    };
  }
});
