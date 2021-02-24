import { useState, useEffect, useRef } from 'react';

import ls from 'local-storage';
import classNames from 'classnames';
import randomWords from 'random-words';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { useTypeRacer } from '../hooks/useTypeRacer';
import { countWordsAndCharacterPerMinute } from '../helpers/wordsCounter';
import Stopwatch from './Stopwatch';

momentDurationFormatSetup(moment);

function getRandomWords(count) {
    return randomWords(count).join(' ');
}

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

function TypeRacer({ randomWordsCount }) {
    const [ count, setCount ] = useState({ wpm: 0, cpm: 0 });
    const [ startStopwatch, setStartStopwatch ] = useState(false);
    const [ resetStopwatch, setResetStopwatch ] = useState(false);
    const [ text, setText ] = useState(getRandomWords(randomWordsCount));
    const reloadButtonRef = useRef(null);
    const { isEnded, input, chars, handleInput, resetState } = useTypeRacer(text);
    const [ placeholder, setPlaceholder ] = useState('Start typing here...');

    const handleFocus = (e) => {
        if (isEnded) return;
        setPlaceholder('');
        setStartStopwatch(true);
    }

    const handleReload = (e) => {
        resetState();
        setResetStopwatch(true);
        setText(getRandomWords(randomWordsCount));
        setPlaceholder('Start typing here...');
    }

    const onTick = (time) => {
        setCount(countWordsAndCharacterPerMinute(time, chars));
    }

    useEffect(() => {
        if (isEnded) {
            setStartStopwatch(false);
            saveResultToLocalStorage({
                wpm: count.wpm,
                cpm: count.cpm,
                date: (new Date()).toISOString()
            });
        }
        if (reloadButtonRef.current) {
            setPlaceholder('Done!');
        }
    }, [isEnded])

    return (
        <>
            <Stopwatch startStopwatch={startStopwatch} stopStopwatch={isEnded} resetStopwatch={resetStopwatch} onTick={onTick}/>
            <div className="rtr-text--container">
                <p>
                    {
                        chars.map((char, index) => {
                            const { value, className } = char;
                            return (
                                <span className={classNames(className)} key={value + index}>{value}</span>
                            )
                        })
                    }
                </p>
                { isEnded && <button className={classNames('rtr-button', { success: isEnded })} ref={reloadButtonRef} onClick={handleReload}>Try Again?</button> }
            </div>
            <div className="rtr-input--container">
                <input type="text" value={input} placeholder={placeholder} onInput={handleInput} onFocus={handleFocus}></input>
            </div>
            <div className={classNames('rtr-result--container', { 'text-bold': isEnded })}>
                <span>WPM: { count.wpm }</span>
                <span>CPM: { count.cpm }</span>
            </div>
        </>
    );
}

export default TypeRacer;