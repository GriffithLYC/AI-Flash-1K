const storage = require('../../utils/storage');
const { allKeywords } = require('../../data/keywords');

Page({
  data: {
    cards: [],
    count: 0
  },

  onLoad() {
    this.loadReviewCards();
  },

  onShow() {
    this.loadReviewCards();
  },

  loadReviewCards() {
    const reviewIds = storage.getReviewCards();
    const cards = reviewIds
      .map(id => allKeywords.find(k => k.id === id))
      .filter(Boolean);

    this.setData({
      cards,
      count: cards.length
    });
  },

  onTapCard(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  onTapRemove(e) {
    const { id } = e.currentTarget.dataset;
    storage.removeReviewCard(id);
    this.loadReviewCards();
    wx.showToast({ title: '已移出复习列表', icon: 'success' });
  },

  onTapStudy() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
