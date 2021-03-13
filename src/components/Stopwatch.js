import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useStopwatch } from '../hooks/useStopwatch';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

function Stopwatch ({ toggleStart, resetStopwatch, onTick }) {
    const { tick, time, start, stop, reset } = useStopwatch();
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        if (toggleStart) {
            start();
        } else if (toggleStart === false) {
            stop();
            setSuccess(true);
        }
    }, [toggleStart]);

    useEffect(() => {
        if (resetStopwatch) {
            reset();
            setSuccess(false);
        }
    }, [resetStopwatch]);

    useEffect(() => {
        if (tick !== undefined) {
            onTick(time);
        }
    }, [tick])

    return (
        <div className="rtr-timer--container">
            <span className={classNames({ success: success })}>{ moment.duration(time).format('m:ss:SSS', {trim: false}) }</span>
        </div>
    )
}

export default Stopwatch;