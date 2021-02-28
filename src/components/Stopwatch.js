import { useEffect } from 'react';
import classNames from 'classnames';

import { useStopwatch } from '../hooks/useStopwatch';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

function Stopwatch ({ startStopwatch, stopStopwatch, resetStopwatch, onTick }) {
    const { tick, time, start, stop, reset } = useStopwatch();

    useEffect(() => {
        if (startStopwatch) {
            start();
        }
    }, [startStopwatch]);

    useEffect(() => {
        if (stopStopwatch) {
            stop();
        }
    }, [stopStopwatch]);

    useEffect(() => {
        if (resetStopwatch) {
            reset();
        }
    }, [resetStopwatch]);

    useEffect(() => {
        if (tick !== undefined) {
            onTick(time);
        }
    }, [tick])

    return (
        <div className="rtr-timer--container">
            <span className={classNames({ success: stopStopwatch })}>{ moment.duration(time).format('m:ss:SSS', {trim: false}) }</span>
        </div>
    )
}

export default Stopwatch;