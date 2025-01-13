import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useStopwatch } from '../hooks/useStopwatch';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

function Stopwatch ({ toggleStart, resetStopwatch, onTick }) {
    const { time, start, stop, reset } = useStopwatch(onTick);
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        if (toggleStart) {
            start();
        } else if (toggleStart === false) {
            stop();
            setSuccess(true);
        }
    }, [toggleStart, stop]);

    useEffect(() => {
        if (resetStopwatch) {
            reset();
            setSuccess(false);
        }
    }, [resetStopwatch]);

    return (
        <div className="rtr-timer--container">
            <span className={classNames({ success: success })}>{ moment.duration(time).format('m:ss:SSS', {trim: false}) }</span>
        </div>
    )
}

export default Stopwatch;