const levenshtein = require('fast-levenshtein');

function getSimilarity(a, b) {
  const distance = levenshtein.get(a, b);
  return 1 - distance / Math.max(a.length, b.length);
}

// 🔥 Sliding window matching (important for phrases like "free money")
function fuzzyMatch(text, words, threshold = 0.8) {
  const tokens = text.split(' ');

  for (const word of words) {
    const wordTokens = word.split(' ');

    // Slide across text
    for (let i = 0; i <= tokens.length - wordTokens.length; i++) {
      const slice = tokens.slice(i, i + wordTokens.length).join(' ');

      const similarity = getSimilarity(slice, word);

      if (similarity >= threshold) {
        return {
          match: word,
          similarity
        };
      }
    }
  }

  return null;
}

module.exports = { fuzzyMatch };