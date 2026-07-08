const allKeywords = require('../assets/ai_keywords_100.json');

// 导出前20个关键词
const keywords = allKeywords.slice(0, 20);

module.exports = {
  keywords,
  allKeywords
};
