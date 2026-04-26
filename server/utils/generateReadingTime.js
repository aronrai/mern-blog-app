const generateReadingTime = (content) => {
  const wordsPerMinute = 225;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

module.exports = generateReadingTime;
