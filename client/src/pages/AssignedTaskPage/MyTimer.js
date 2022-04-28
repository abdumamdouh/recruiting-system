import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { useTimer } from "react-timer-hook";
// import "./MyTimer.scss";

function MyTimer({ expiryTimestamp, handleOnExpire }) {
    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp
        // onExpire: handleOnExpire
    });

    return (
        <div
            style={{
                fontSize: "1.25rem"
            }}
        >
            <span>
                <strong>Remaining Time: </strong>
            </span>
            {days > 0 ? (
                <span>
                    {days} {days > 1 ? "days" : "day"},{" "}
                </span>
            ) : (
                ""
            )}
            {hours > 0 || days > 0 ? (
                <span>
                    {hours} {hours > 1 ? "hours" : "hour"},{" "}
                </span>
            ) : (
                ""
            )}
            {minutes > 0 || hours > 0 || days > 0 ? (
                <span
                    style={{
                        color:
                            days === 0 && hours === 0 && minutes < 60 && "red"
                    }}
                >
                    {minutes} {minutes > 1 ? "minutes" : "minute"}
                </span>
            ) : (
                ""
            )}
        </div>
    );
}

export default MyTimer;
