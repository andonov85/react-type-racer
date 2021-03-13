import { useState, useEffect } from 'react';

import classNames from 'classnames';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

import { useTypeRacer } from '../hooks/useTypeRacer';
import Stopwatch from './Stopwatch';
import WordsCounter from './WordsCounter';

momentDurationFormatSetup(moment);

function getLastElement(arr) {
    return arr[arr.length - 1];
}

function isTyperEnded(charsArr) {
    return getLastElement(charsArr) && getLastElement(charsArr).isCorrect;
}

function TypeRacer({ wordsCount }) {
    const [ start, setStart ] = useState();
    const [ reset, setReset ] = useState(false);
    const [ time, setTime ] = useState();
    const [ placeholder, setPlaceholder ] = useState('Start typing here...');

    const { input, handleInput, chars, viewText, resetTypeRacer } = useTypeRacer({ wordsCount: wordsCount });

    const handleFocus = (e) => {
        if (isTyperEnded(chars)) return;
        setStart(true);
        setReset(false);
        setPlaceholder('');
    }

    const handleReset = (e) => {
        setReset(true);
        resetTypeRacer();
        setPlaceholder('Start typing here...');
    }

    const onTick = (time) => {
        setTime(time);
    }

    useEffect(() => {
        if (isTyperEnded(chars)) {
            setStart(false);
            setPlaceholder('Done!');
        }
    }, [chars]);

    return (
        <>
            <Stopwatch toggleStart={start} resetStopwatch={reset} onTick={onTick} />
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
                { isTyperEnded(chars) && <button className={classNames('rtr-button', { success: isTyperEnded(chars) })} onClick={handleReset}>Try Again?</button> }
            </div>
            <div className="rtr-input--container">
                <input type="text" value={input} placeholder={placeholder} onInput={handleInput} onFocus={handleFocus}></input>
            </div>
            <WordsCounter time={time} chars={chars} resetState={reset} toggleStart={start} />
        </>
    );
}

export default TypeRacer;