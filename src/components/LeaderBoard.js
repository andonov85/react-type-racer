import { useState } from 'react';
import moment from 'moment';
import ls from 'local-storage';

function LeaderBoard () {
    const [ results ] = useState(ls.get('rtr-results') || []);

    return (
        <div className="rtr-leaderboard--container">
            <p>Your games:</p>
            <ul>
                {
                    results.sort((a, b) => new Date(b.date) - new Date(a.date)).map( ({ wpm, cpm, date }) => {
                        return (
                            <li key={date}>
                                <span>WPM: { wpm }</span>
                                <span>CPM: { cpm }</span>
                                <span>{ moment(date).format('Do MMMM YYYY; mm:ss:SS') }</span>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default LeaderBoard;