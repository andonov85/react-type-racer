import { useState, useEffect } from 'react';
import classNames from 'classnames';
import ls from 'local-storage';

import { countWordsAndCharacterPerMinute } from '../helpers/wordsCounter';

function saveResultToLocalStorage(result) {
    const rtrResults = ls.get('rtr-results');
    if (rtrResults) {
        rtrResults.push(result);
        ls.set('rtr-results', rtrResults);
    } else {
        ls.set('rtr-results', [result]);
    }
    return ls.get('rtr-results');
}

function WordsCounter({ time, chars, resetState, toggleStart }) {
    const [ count, setCount ] = useState({ wpm: 0, cpm: 0 });
    const [ textBold, setTextBold ] = useState(false);

    useEffect(() => {
        if (time && toggleStart) {
            setCount(countWordsAndCharacterPerMinute(time, chars));
        }
    }, [time, chars, toggleStart]);

    useEffect(() => {
        if (resetState) {
            setCount({ wpm: 0, cpm: 0 });
            setTextBold(false);
        }
    }, [resetState]);

    useEffect(() => {
        if (toggleStart === false) {
            saveResultToLocalStorage({
                wpm: count.wpm,
                cpm: count.cpm,
                date: (new Date()).toISOString()
            });
            setTextBold(true);
        }
    }, [toggleStart]);

    return (
        <div className={classNames('rtr-result--container', { 'text-bold': textBold })}>
            <span>WPM: { count.wpm }</span>
            <span>CPM: { count.cpm }</span>
        </div>
    );
}

export default WordsCounter;