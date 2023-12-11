/**
 * Wrap single line of text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 */
const wrapLine = (text, limit) => {
  if (text.length <= limit) {
    // Short text, no need to wrap.
    return text;
  }
  // Split the text into words.
  const words = text.trim().split(/\s+/);
  // Set limit to be the length of the largest word.
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > limit) {
      limit = words[i].length;
    }
  }

  let lastScore;
  let score = -Infinity;
  let lastText;
  let lineCount = 1;
  do {
    lastScore = score;
    lastText = text;
    // Create a list of booleans representing if a space (false) or
    // a break (true) appears after each word.
    let wordBreaks = [];
    // Seed the list with evenly spaced linebreaks.
    const steps = words.length / lineCount;
    let insertedBreaks = 1;
    for (let i = 0; i < words.length - 1; i++) {
      if (insertedBreaks < (i + 1.5) / steps) {
        insertedBreaks++;
        wordBreaks[i] = true;
      } else {
        wordBreaks[i] = false;
      }
    }
    wordBreaks = wrapMutate(words, wordBreaks, limit);
    score = wrapScore(words, wordBreaks, limit);
    text = wrapToText(words, wordBreaks);
    lineCount++;
  } while (score > lastScore);
  return lastText;
};

/**
 * Compute a score for how good the wrapping is.
 * @param {!Array<string>} words Array of each word.
 * @param {!Array<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {number} Larger the better.
 */
const wrapScore = (words, wordBreaks, limit) => {
  // If this function becomes a performance liability, add caching.
  // Compute the length of each line.
  const lineLengths = [0];
  const linePunctuation = [];
  for (let i = 0; i < words.length; i++) {
    lineLengths[lineLengths.length - 1] += words[i].length;
    if (wordBreaks[i] === true) {
      lineLengths.push(0);
      linePunctuation.push(words[i].charAt(words[i].length - 1));
    } else if (wordBreaks[i] === false) {
      lineLengths[lineLengths.length - 1]++;
    }
  }
  const maxLength = Math.max.apply(Math, lineLengths);

  let score = 0;
  for (let i = 0; i < lineLengths.length; i++) {
    // Optimize for width.
    // -2 points per char over limit (scaled to the power of 1.5).
    score -= Math.pow(Math.abs(limit - lineLengths[i]), 1.5) * 2;
    // Optimize for even lines.
    // -1 point per char smaller than max (scaled to the power of 1.5).
    score -= Math.pow(maxLength - lineLengths[i], 1.5);
    // Optimize for structure.
    // Add score to line endings after punctuation.
    if ('.?!'.indexOf(linePunctuation[i]) !== -1) {
      score += limit / 3;
    } else if (',;)]}'.indexOf(linePunctuation[i]) !== -1) {
      score += limit / 4;
    }
  }
  // All else being equal, the last line should not be longer than the
  // previous line.  For example, this looks wrong:
  // aaa bbb
  // ccc ddd eee
  if (lineLengths.length > 1 && lineLengths[lineLengths.length - 1] <= lineLengths[lineLengths.length - 2]) {
    score += 0.5;
  }
  return score;
};

/**
 * Mutate the array of line break locations until an optimal solution is found.
 * No line breaks are added or deleted, they are simply moved around.
 * @param {!Array<string>} words Array of each word.
 * @param {!Array<boolean>} wordBreaks Array of line breaks.
 * @param {number} limit Width to wrap each line.
 * @return {!Array<boolean>} New array of optimal line breaks.
 */
const wrapMutate = (words, wordBreaks, limit) => {
  let bestScore = wrapScore(words, wordBreaks, limit);
  let bestBreaks;
  // Try shifting every line break forward or backward.
  for (let i = 0; i < wordBreaks.length - 1; i++) {
    if (wordBreaks[i] === wordBreaks[i + 1]) {
      continue;
    }
    const mutatedWordBreaks = [].concat(wordBreaks);
    mutatedWordBreaks[i] = !mutatedWordBreaks[i];
    mutatedWordBreaks[i + 1] = !mutatedWordBreaks[i + 1];
    const mutatedScore = wrapScore(words, mutatedWordBreaks, limit);
    if (mutatedScore > bestScore) {
      bestScore = mutatedScore;
      bestBreaks = mutatedWordBreaks;
    }
  }
  if (bestBreaks) {
    // Found an improvement.  See if it may be improved further.
    return wrapMutate(words, bestBreaks, limit);
  }
  // No improvements found.  Done.
  return wordBreaks;
};

/**
 * Reassemble the array of words into text, with the specified line breaks.
 * @param {!Array<string>} words Array of each word.
 * @param {!Array<boolean>} wordBreaks Array of line breaks.
 * @return {string} Plain text.
 */
const wrapToText = function (words, wordBreaks) {
  const text = [];
  for (let i = 0; i < words.length; i++) {
    text.push(words[i]);
    if (wordBreaks[i] !== undefined) {
      text.push(wordBreaks[i] ? '\n' : ' ');
    }
  }
  return text.join('');
};

/**
 * Wrap text to the specified width.
 * @param {string} text Text to wrap.
 * @param {number} limit Width to wrap each line.
 * @return {string} Wrapped text.
 */
export const wrap = (text, limit) => {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    lines[i] = wrapLine(lines[i], limit);
  }
  return lines.join('\n');
};

/**
 * Is the given string a number (includes negative and decimals).
 * @param {string} str Input string.
 * @return {boolean} True if number, false otherwise.
 */
export const isNumber = (str) => /^\s*-?\d+(\.\d+)?\s*$/.test(str);
