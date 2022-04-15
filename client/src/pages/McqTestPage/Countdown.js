import React, { Component } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
function Countdown({ time, duration }) {
    function onTimerUpdate({ time, duration }) {
        this.setState({
            time,
            duration
        });
    }
    const { time, duration } = this.state;

    return (
        <div>
            <Timer active duration={duration} onTimeUpdate={onTimerUpdate} />
            <Timecode time={duration - time} />
        </div>
    );
}

export default Countdown;
