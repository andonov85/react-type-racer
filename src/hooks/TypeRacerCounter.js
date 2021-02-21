import { useState, useEffect } from 'react';

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

function useTypeRacerCounter(options) {
    const [ wpm, setWpm ] = useState(0);
    const [ cpm, setCpm ] = useState(0);

    useEffect(() => {
        const count = countWordsAndChars(options.chars);
        const wpm = calculateAveragePerMinute(count.words, moment.duration(options.time).asSeconds());
        const cpm = calculateAveragePerMinute(count.chars, moment.duration(options.time).asSeconds());
        setWpm(wpm);
        setCpm(cpm);
    }, [options.seconds]);

    return { wpm, cpm }
}

export { useTypeRacerCounter }