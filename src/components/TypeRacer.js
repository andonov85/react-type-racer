import { useState, useEffect, useRef } from 'react';

import { useStopwatch } from '../hooks/Stopwatch';
import { useTypeRacerAlgorithm } from '../hooks/TypeRacerAlgorithm';
import { useTypeRacerCounter } from '../hooks/TypeRacerCounter';

import ls from 'local-storage';
import classNames from 'classnames';
import randomWords from 'random-words';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

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
    const [ text, setText ] = useState(getRandomWords(randomWordsCount));
    const reloadButtonRef = useRef(null);
    const { isEnded, input, chars, handleInput, resetState } = useTypeRacerAlgorithm(text);
    const { tick, time, start, stop, reset } = useStopwatch();
    const { wpm, cpm } = useTypeRacerCounter(tick, { time, chars });
    const [ placeholder, setPlaceholder ] = useState('Start typing here...');

    const handleFocus = (e) => {
        if (isEnded) return;
        setPlaceholder('');
        start();
    }

    const handleReload = (e) => {
        resetState();
        reset();
        setText(getRandomWords(randomWordsCount));
        setPlaceholder('Start typing here...');
    }

    useEffect(() => {
        stop();
        if (reloadButtonRef.current) {
            setPlaceholder('Done!');
            saveResultToLocalStorage({
                wpm: wpm,
                cpm: cpm,
                date: (new Date()).toISOString()
            });
        }
    }, [isEnded])

    return (
        <>
            <div className="rtr-timer--container">
                <span className={classNames({ success: isEnded })}>{ moment.duration(time).format('m:ss:SSS', {trim: false}) }</span>
            </div>
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
                <span>WPM: {wpm || 0}</span>
                <span>CPM: {cpm || 0}</span>
            </div>
        </>
    );
}

export default TypeRacer;