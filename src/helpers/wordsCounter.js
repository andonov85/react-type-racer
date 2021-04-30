import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

function calculateAveragePerMinute(count, seconds) {
    return Math.round(count / seconds * 60);
}

function countWordsAndChars(chars) {
    let wordCount = 0;
    const correctChars = chars.filter((char, i, arr) => {
        if (arr[i + 1] && char.isCorrect && arr[i + 1].value === ' ') {
            wordCount++;
        }
        return char.isCorrect === true;
    });
    return {
        words: wordCount,
        chars: correctChars.length
    }
}

function countWordsAndCharacterPerMinute(time, chars) {
    const count = countWordsAndChars(chars);
    const wpm = calculateAveragePerMinute(count.words, moment.duration(time).asSeconds());
    const cpm = calculateAveragePerMinute(count.chars, moment.duration(time).asSeconds());
    return { wpm, cpm }
}

export { countWordsAndCharacterPerMinute };