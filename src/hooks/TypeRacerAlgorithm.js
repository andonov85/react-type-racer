import { useState, useEffect } from 'react';

function findFirstDiffIndex(a, b, startIndex) {
    for (let i = 0; i < b.length; i++) {
       if (a[startIndex + i] !== b[i]) return startIndex + i;
    }
    return -1;
}

function useTypeRacerAlgorithm(text) {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [errorIndex, setErrorIndex] = useState(-1);
    const [startIndex, setStartIndex] = useState(0);

    const [ chars, setChars ] = useState([]);
    const [ input, setInput ] = useState('');
    const [ isEnded, setIsEnded ] = useState(false);

    useEffect(() => {
        const charArr = text.split('').map((char, i) => {
            let className = 'rtr-text-default';
            let isCorrect = null;

            if (errorIndex === -1 && i <= currentIndex || errorIndex !== -1 && i < errorIndex) {
                className = 'rtr-text-light';
                isCorrect = true;
            }
            
            if (errorIndex !== -1 && i >= errorIndex && i <= currentIndex) {
                className = 'rtr-text-danger';
                isCorrect = false;
            }

            return {
                value: char,
                isCorrect: isCorrect,
                className: className,
            }
        })
        setChars(charArr);
    }, [currentIndex, startIndex, errorIndex]);

    const handleInput = (e) => {
        if (isEnded) return;
        const value = e.target.value;
        const errIndex = findFirstDiffIndex(text, value, startIndex);

        setErrorIndex(errIndex);
        setCurrentIndex(startIndex + value.length - 1);

        if (value[value.length - 1] === ' ' && errIndex === -1) {
            setStartIndex(startIndex + value.length);
            setInput('');
        } else {
            setInput(value);
        }

        if (startIndex + value.length >= text.length && errIndex === -1) {
            setIsEnded(true);
            setInput('');
        }
    }

    return { isEnded, chars, input, handleInput, text }
}

export { useTypeRacerAlgorithm };