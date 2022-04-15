import React from "react";
import { useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

const Countdown = ({ time, duration }) => {
    const [timer, setTimer] = useState();
    const [duration, setDuration] = useState();

    const onTimerUpdate = ({ time, duration }) => {
        this.setState({
            time,
            duration
        });
    }

    return (
        <div>
            <Timer active duration={duration} onTimeUpdate={onTimerUpdate} />
            <Timecode time={duration - time} />
        </div>
    );
}

export default Countdown;
