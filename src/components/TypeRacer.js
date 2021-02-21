import { useState, useEffect, useRef } from 'react';

import { useStopwatch } from '../hooks/Stopwatch';
import { useTypeRacerAlgorithm } from '../hooks/TypeRacerAlgorithm';
import { useTypeRacerCounter } from '../hooks/TypeRacerCounter';

import classNames from 'classnames';
import randomWords from 'random-words';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

function getRandomWords(count) {
    return randomWords(count).join(' ');
}

function TypeRacer() {
    const initialText = useRef(getRandomWords(2));
    const reloadButtonRef = useRef(null);
    const { isEnded, input, chars, handleInput } = useTypeRacerAlgorithm(initialText.current);
    const { seconds, time, start, stop } = useStopwatch();
    const { wpm, cpm } = useTypeRacerCounter({ seconds, time, chars });
    const [ placeholder, setPlaceholder ] = useState('Start typing here...');

    const handleFocus = (e) => {
        if (isEnded) return;
        setPlaceholder('');
        start();
    }

    const handleClick = (e) => {
        e.target.focus();
        window.location.reload(false);
    }

    useEffect(() => {
        stop();
        if (reloadButtonRef.current) {
            reloadButtonRef.current.focus();
        }
    }, [isEnded])

    return (
        <div className="rtr--container">
            <div className="rtr-timer--container">
                <span>{ moment.duration(time).format('m:ss:SSS', {trim: false}) }</span>
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
                { isEnded && <button ref={reloadButtonRef} onClick={handleClick}>Try Again?</button> }
            </div>
            <div className="rtr-input--container">
                <input type="text" value={input} placeholder={placeholder} onInput={handleInput} onFocus={handleFocus}></input>
            </div>
            <div className="rtr-result--container">
                <span>WPM:{wpm || 0}</span>
                <span>CPM:{cpm || 0}</span>
            </div>
        </div>
    );
}

export default TypeRacer;