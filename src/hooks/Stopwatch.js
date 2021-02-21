import { useState, useRef } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
 
momentDurationFormatSetup(moment);

function useStopwatch() {
    const [ id, setId ] = useState();
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
        // moment.duration(diff).format('mm:ss:S', {trim: false});
        const milliseconds = diff.millisecond();
        const seconds = diff.seconds();
        const minutes = diff.minutes();
        setTime({
            milliseconds: milliseconds,
            seconds: seconds,
            minutes: minutes,
            time: diff
        });
        setId(requestAnimationFrame(animate));
    }

    const start = () => {
        if (isRunning) return;
        startTime.current = moment();
        setIsRunning(true);
        setId(requestAnimationFrame(animate));
    }

    const stop = () => {
        setIsRunning(false);
        cancelAnimationFrame(id);
    }

    return {
        ...time,
        isRunning,
        start,
        stop,
    }
}

export { useStopwatch };