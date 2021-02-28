import { useState, useEffect, useRef } from 'react';

import ls from 'local-storage';
import classNames from 'classnames';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { useTypeRacer } from '../hooks/useTypeRacer';
import { countWordsAndCharacterPerMinute } from '../helpers/wordsCounter';
import Stopwatch from './Stopwatch';

momentDurationFormatSetup(moment);

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

function TypeRacer({ wordsCount }) {
    const reloadButtonRef = useRef(null);
    const [ count, setCount ] = useState({ wpm: 0, cpm: 0 });
    const [ startStopwatch, setStartStopwatch ] = useState(false);
    const [ resetStopwatch, setResetStopwatch ] = useState(false);
    const { isEnded, input, chars, handleInput, viewText, resetTypeRacer } = useTypeRacer({ wordsCount: wordsCount });
    const [ placeholder, setPlaceholder ] = useState('Start typing here...');

    const handleFocus = (e) => {
        if (isEnded) return;
        setPlaceholder('');
        setStartStopwatch(true);
    }

    const handleReload = (e) => {
        resetTypeRacer();
        setCount({ wpm: 0, cpm: 0 });
        setResetStopwatch(true);
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
    }, [isEnded]);

    return (
        <>
            <Stopwatch startStopwatch={startStopwatch} stopStopwatch={isEnded} resetStopwatch={resetStopwatch} onTick={onTick}/>
            <div className="rtr-text--container">
                <p>
                    {
                        viewText.map((text, index) => {
                            const { value, className } = text;
                            return (
                                <span className={classNames(className)} key={className + index}>{ value }</span>
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