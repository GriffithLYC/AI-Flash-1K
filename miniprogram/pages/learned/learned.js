const storage = require('../../utils/storage');
const { allKeywords } = require('../../data/keywords');

Page({
  data: {
    cards: [],
    count: 0
  },

  onLoad() {
    this.loadLearnedCards();
  },

  onShow() {
    this.loadLearnedCards();
  },

  loadLearnedCards() {
    const learnedIds = storage.getLearnedCards();
    const cards = learnedIds
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
    storage.removeLearnedCard(id);
    this.loadLearnedCards();
    wx.showToast({ title: '已移出已学习', icon: 'success' });
  },

  onTapStudy() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});
