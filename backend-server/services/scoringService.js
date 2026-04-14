const fs = require('fs');
const path = require('path');
const { normalizeText } = require('../utils/normalizeText');
const { fuzzyMatch } = require('../utils/fuzzymatch');

// ✅ Load filter words ONCE (cached)
const FILTER_WORDS_PATH = path.join(__dirname, '../data/filter-words.json');

let cachedWords = null;

function getFilterWords() {
  if (!cachedWords) {
    const data = JSON.parse(fs.readFileSync(FILTER_WORDS_PATH, 'utf-8'));
    cachedWords = data.words;
  }
  return cachedWords;
}

// ✅ Precompiled regex (performance boost)
const REGEX = {
  link: /(http|https|www\.)/i,
  urgency: /(now|urgent|limited|hurry|fast|quick|quickly|immediately)/i,
  cta: /(click|join|claim|register|sign up|get now)/i,
  scamCombo: /(free money|win now|dm me|send me).*(http|www|otp|password)/i,
  repeat: /(.)\1{4,}/
};

function scoreMessage(content) {
  const rawText = content;
  const text = normalizeText(content);
  console.log(`Normalized text: "${text}"`);
  const words = getFilterWords();
  console.log(`Loaded ${words.length} filter words`);
  let score = 0;
  let reasons = [];

  // =========================
  // 1. Keyword + Fuzzy (optimized)
  // =========================
  const matchedWord = words.find(word => text.includes(word));

  if (matchedWord) {
    score += 4;
    reasons.push(`Keyword detected: "${matchedWord}"`);
  } else if (isSuspicious(text)) {
    const fuzzy = fuzzyMatch(text, words);

    if (fuzzy) {
      score += 6;
      reasons.push(
        `Fuzzy match: "${fuzzy.match}" (${Math.round(fuzzy.similarity * 100)}%)`
      );
    }
  }

  // =========================
  // 2. Pattern checks
  // =========================
  if (REGEX.link.test(text)) {
    score += 3;
    reasons.push('Contains link');
  }

  if (REGEX.urgency.test(text)) {
    score += 1;
    reasons.push('Urgency language');
  }

  if (REGEX.cta.test(text)) {
    score += 2;
    reasons.push('Call-to-action detected');
  }

  if (REGEX.scamCombo.test(text)) {
    score += 5;
    reasons.push('High-risk scam pattern');
  }

  if (REGEX.repeat.test(rawText)) {
    score += 1;
    reasons.push('Repeated characters');
  }

  // =========================
  // 3. Caps check
  // =========================
  const capsCount = rawText.replace(/[^A-Z]/g, '').length;
  if (capsCount > 10) {
    score += 1;
    reasons.push('Too many capital letters');
  }

  // =========================
  // 4. Social Engineering Signals (NEW)
  // =========================

  const SOCIAL = {
    trust: /(trust me|legit|no scam|vouch|trusted seller)/i,
    payment: /(pay first|send payment|bank transfer|transfer first)/i,
    offPlatform: /(telegram|whatsapp|dm me|pm me)/i,
    selling: /(selling|cheap|offer|deal)/i
  };

  if (SOCIAL.trust.test(text)) {
    score += 2;
    reasons.push('Trust manipulation');
  }

  if (SOCIAL.payment.test(text)) {
    score += 3;
    reasons.push('Payment intent');
  }

  if (SOCIAL.offPlatform.test(text)) {
    score += 2;
    reasons.push('Off-platform / DM attempt');
  }

  if (SOCIAL.selling.test(text)) {
    score += 1;
    reasons.push('Selling pattern');
  }

  return { score, reasons };
}

// =========================
// Helper: Suspicion filter
// =========================
function isSuspicious(text) {
  return (
    REGEX.link.test(text) ||
    REGEX.cta.test(text) ||
    text.length > 20
  );
}

module.exports = { scoreMessage };