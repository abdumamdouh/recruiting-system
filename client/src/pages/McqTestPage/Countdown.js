import React from "react";
import { useState, useEffect } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

const Countdown = (props) => {
    const [time, setTime] = useState();
    const [duration, setDuration] = useState();

    useEffect(() => {
        setTime(props.time);
        setDuration(props.duration);
    }, []);

    const onTimerUpdate = ({ time, duration }) => {
        setTime(time);
        setDuration(duration);
    };

    return (
        <div>
            <Timer active duration={duration} onTimeUpdate={onTimerUpdate} />
            <Timecode time={duration - time} />
        </div>
    );
};

export default Countdown;
