const { allKeywords } = require('../../data/keywords');
const storage = require('../../utils/storage');

Page({
  data: {
    keywords: [],
    filteredKeywords: [],
    categories: [],
    activeCategory: '全部',
    searchQuery: '',
    learnedIds: [],
    reviewIds: []
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const categories = ['全部', ...new Set(allKeywords.map(k => k.category))];
    const learnedIds = storage.getLearnedCards();
    const reviewIds = storage.getReviewCards();

    this.setData({
      keywords: allKeywords,
      filteredKeywords: allKeywords,
      categories,
      learnedIds,
      reviewIds
    });
  },

  onSearchInput(e) {
    const searchQuery = e.detail.value;
    this.setData({ searchQuery });
    this.filterKeywords();
  },

  onTapCategory(e) {
    const activeCategory = e.currentTarget.dataset.category;
    this.setData({ activeCategory });
    this.filterKeywords();
  },

  filterKeywords() {
    const { keywords, activeCategory, searchQuery } = this.data;
    let filtered = [...keywords];

    if (activeCategory !== '全部') {
      filtered = filtered.filter(k => k.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(k =>
        k.term.toLowerCase().includes(query) ||
        k.translation.includes(query) ||
        k.abbr.toLowerCase().includes(query)
      );
    }

    this.setData({ filteredKeywords: filtered });
  },

  onTapCard(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});
