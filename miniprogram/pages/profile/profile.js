const storage = require('../../utils/storage');
const draw = require('../../utils/draw');
const { allKeywords } = require('../../data/keywords');

Page({
  data: {
    userInfo: null,
    settings: null,
    progress: null,
    streakDays: 0
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const settings = storage.getSettings();
    const progress = draw.getProgressStats(allKeywords);
    const streakDays = storage.get('streakDays') || 0;

    this.setData({
      settings,
      progress,
      streakDays
    });
  },

  onTapGetUserInfo() {
    wx.getUserProfile({
      desc: '用于展示头像和昵称',
      success: (res) => {
        this.setData({ userInfo: res.userInfo });
        wx.showToast({ title: '登录成功', icon: 'success' });
      },
      fail: () => {
        wx.showToast({ title: '授权失败', icon: 'none' });
      }
    });
  },

  onTapSetting(e) {
    const { type } = e.currentTarget.dataset;
    const settings = storage.getSettings();

    if (type === 'goal') {
      wx.showActionSheet({
        itemList: ['5张/天', '10张/天', '15张/天', '20张/天'],
        success: (res) => {
          const goals = [5, 10, 15, 20];
          settings.dailyGoal = goals[res.tapIndex];
          storage.setSettings(settings);
          this.setData({ settings });
          wx.showToast({ title: '设置已保存', icon: 'success' });
        }
      });
    } else if (type === 'reminder') {
      settings.reminder = !settings.reminder;
      storage.setSettings(settings);
      this.setData({ settings });
      wx.showToast({ title: settings.reminder ? '已开启提醒' : '已关闭提醒', icon: 'none' });
    } else if (type === 'sound') {
      settings.sound = !settings.sound;
      storage.setSettings(settings);
      this.setData({ settings });
      wx.showToast({ title: settings.sound ? '已开启音效' : '已关闭音效', icon: 'none' });
    }
  },

  onTapLearned() {
    wx.navigateTo({ url: '/pages/learned/learned' });
  },

  onTapReview() {
    wx.switchTab({ url: '/pages/review/review' });
  },

  onTapAbout() {
    wx.showModal({
      title: '关于 AI学习卡片',
      content: 'AI学习卡片是一款帮助用户学习AI大模型专业术语的微信小程序。通过每日抽卡、间隔重复等科学学习方法，让学习更高效。',
      showCancel: false
    });
  },

  onShareAppMessage() {
    return {
      title: 'AI学习卡片 - 每天学习AI术语',
      path: '/pages/index/index'
    };
  }
});
