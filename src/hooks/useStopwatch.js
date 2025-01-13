import { useState, useEffect, useRef, useCallback } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
 
momentDurationFormatSetup(moment);

function useStopwatch(onTickCallback) {
    const id = useRef();
    const startTime = useRef();
    const [ time, setTime ] = useState({
        milliseconds: '000',
        seconds: '00',
        minutes: '0',
        time: 0
    });

    useEffect(() => {
        return () => {
            cancelAnimationFrame(id.current);
        }
    }, []);

    const animate = useCallback((duration) => {
        // console.log(duration);
        const now = moment();
        const diff = moment(now.diff(startTime.current));
        const milliseconds = diff.millisecond();
        const seconds = diff.seconds();
        const minutes = diff.minutes();
        const currentTime = {
            milliseconds: milliseconds,
            seconds: seconds,
            minutes: minutes,
            time: diff
        };
        setTime(currentTime);
        if (time.seconds !== currentTime.seconds) onTickCallback(currentTime);
        id.current = requestAnimationFrame(animate);
    }, []);

    const start = useCallback(() => {
        startTime.current = moment();
        id.current = requestAnimationFrame(animate);
    }, []);

    const stop = useCallback(() => {
        console.log(id.current);
        cancelAnimationFrame(id.current);
    }, []);

    const reset = useCallback(() => {
        setTime({
            milliseconds: '000',
            seconds: '00',
            minutes: '0',
            time: 0
        });
    }, []);

    return {
        ...time,
        start,
        stop,
        reset
    }
}

export { useStopwatch };