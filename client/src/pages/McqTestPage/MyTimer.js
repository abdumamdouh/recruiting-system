import React from "react";
import { useTimer } from "react-timer-hook";
import "./MyTimer.scss";

function MyTimer({ expiryTimestamp }) {
    const { seconds, minutes, hours } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called")
    });

    return (
        <div
            style={{
                textAlign: "center",
                position: "fixed",
                right: "0%",
                bottom: "0%",
                margin: "10px"
            }}
        >
            <small>Remaining Time</small>
            <div
                style={{
                    border: "2px solid",
                    padding: "0.2rem",
                    fontSize: "20px"
                }}
            >
                <div className={minutes < 10 && "blink"}>
                    <span>{String(hours).padStart(2, "0")}</span>:
                    <span>{String(minutes).padStart(2, "0")}</span>:
                    <span>{String(seconds).padStart(2, "0")}</span>
                </div>
            </div>
        </div>
    );
}

export default MyTimer;
