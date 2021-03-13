import { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';

function getLastElement(arr) {
    return arr[arr.length - 1];
}

function getRandomWords(count) {
    return randomWords(count).join(' ');
}

function findFirstDiffIndex(a, b, startIndex) {
    for (let i = 0; i < b.length; i++) {
       if (a[startIndex + i] !== b[i]) return startIndex + i;
    }
    return -1;
}

function makeCheckedCharsArray(charsArr, currentIndex, errorIndex) {
    return charsArr.map((char, i) => {
        let isCorrect = null;
        if (errorIndex === -1 && i <= currentIndex || errorIndex !== -1 && i < errorIndex) isCorrect = true;
        if (errorIndex !== -1 && i >= errorIndex && i <= currentIndex) isCorrect = false;

        return {
            value: char,
            isCorrect: isCorrect,
            isCurrent: currentIndex === i
        }
    });
}

function makeViewTextArray(text, currentIndex, errorIndex) {
    const view = [];
            
    if (errorIndex !== -1) {
        view.push({
            value: text.slice(0, errorIndex),
            className: 'rtr-text-light'
        });

        view.push({
            value: text.slice(errorIndex, currentIndex + 1),
            className: 'rtr-text-danger'
        });
    } else {
        view.push({
            value: text.slice(0, currentIndex + 1),
            className: 'rtr-text-light'
        });
    }

    view.push({
        value: text.slice(currentIndex + 1),
        className: 'rtr-text-default'
    });

    return view;
}

function useTypeRacer({ wordsCount }) {
    const text = useRef('');
    const splitedText = useRef([]);
    const currentIndex = useRef(-1);
    const errorIndex = useRef(-1);
    const startIndex = useRef(0);
    
    const [ chars, setChars ] = useState([]);
    const [ viewText, setViewText ] = useState([]);
    const [ input, setInput ] = useState('');

    const handleInput = (e) => {
        if (getLastElement(chars).isCorrect) return;

        const value = e.target.value;
        errorIndex.current = findFirstDiffIndex(text.current, value, startIndex.current);
        currentIndex.current = startIndex.current + value.length - 1;
        const charsArr = makeCheckedCharsArray(splitedText.current, currentIndex.current, errorIndex.current);
        const viewTextArr = makeViewTextArray(text.current, currentIndex.current, errorIndex.current);

        if (getLastElement(value) === ' ' && errorIndex.current === -1) {
            startIndex.current += value.length;
            setInput('');
        } else if (getLastElement(charsArr).isCorrect) {
            setInput('');
        } else {
            setInput(value);
        }

        setChars(charsArr);
        setViewText(viewTextArr);
    }

    const initTypeRacer = () => {
        text.current = getRandomWords(wordsCount);
        splitedText.current = text.current.split('');

        currentIndex.current = -1;
        errorIndex.current = -1;
        startIndex.current = 0;

        setViewText(makeViewTextArray(text.current, currentIndex.current, errorIndex.current));
        setChars(makeCheckedCharsArray(splitedText.current, currentIndex.current, errorIndex.current));
    }

    const resetTypeRacer = () => {
        initTypeRacer();
    }

    useEffect(() => {
        initTypeRacer();
    }, [ wordsCount ]);

    return { input, handleInput, chars, viewText, resetTypeRacer }
}

export { useTypeRacer };