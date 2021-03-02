import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
 
momentDurationFormatSetup(moment);

function useStopwatch() {
    const id = useRef();
    const startTime = useRef();
    const [ time, setTime ] = useState({
        milliseconds: '000',
        seconds: '00',
        minutes: '0',
        time: 0
    });
    const [ isRunning, setIsRunning ] = useState(0);

    const animate = () => {
        const now = moment();
        const diff = moment(now.diff(startTime.current));
        const milliseconds = diff.millisecond();
        const seconds = diff.seconds();
        const minutes = diff.minutes();
        setTime({
            tick: seconds,
            milliseconds: milliseconds,
            seconds: seconds,
            minutes: minutes,
            time: diff
        });
        id.current = requestAnimationFrame(animate);
    }

    const start = () => {
        if (isRunning) return;
        startTime.current = moment();
        setIsRunning(true);
        id.current = requestAnimationFrame(animate);
    }

    const stop = () => {
        setIsRunning(false);
        cancelAnimationFrame(id.current);
    }

    const reset = () => {
        setTime({
            milliseconds: '000',
            seconds: '00',
            minutes: '0',
            time: 0
        });
    }

    useEffect(() => {
        return () => {
            cancelAnimationFrame(id.current);
        }
    }, []);

    return {
        ...time,
        isRunning,
        start,
        stop,
        reset
    }
}

export { useStopwatch };