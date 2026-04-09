function normalizeText(text) {
    let normalized = text.toLowerCase();

    const replacements = {
        '0': 'o',
        '1': 'i',
        '3': 'e',
        '4': 'a',
        '5': 's',
        '7': 't',
        '@': 'a',
        '$': 's',
        '!': 'i',
        '(': 'c',
        ')': 'c',
        '|': 'l',
        '€': 'e',
        '£': 'l',
        '¥': 'y',
        '¢': 'c',
        '§': 's',
        '±': 't',
        'æ': 'ae',
        'œ': 'oe',
    };

    normalized = normalized
    .split('')
    .map(char => replacements[char] || char)
    .join('');

    normalized = normalized.replace(/[^a-z0-9\s]/g, '');

    normalized = normalized.replace(/(.)\1{2,}/g, '$1');

    normalized = normalized.replace(/\s+/g, ' ').trim();


    console.log (`Normalized text: ${normalized}`);
    return normalized;
}

module.exports = { normalizeText };