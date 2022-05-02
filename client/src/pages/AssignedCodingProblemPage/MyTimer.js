import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp, handleOnExpire, mode }) {
    const { seconds, minutes, hours } = useTimer({
        expiryTimestamp,
        onExpire: handleOnExpire
    });
    return (
        <div
            style={{
                textAlign: "center",
                // position: "fixed",
                // right: "0%",
                // bottom: "0%",
                margin: "0.4rem",
                marginLeft: "0.6rem",
                zIndex: 200,
                color: mode ? "#afabab" : "#212529" /*"#afabab"*/
            }}
        >
            <small style={{ whiteSpace: "nowrap" }}>Remaining Time</small>
            <div
                style={{
                    border: `2px solid ${mode ? "#afabab" : "#8a9198"}`,
                    padding: "0.2rem",
                    fontSize: "1.2rem"
                }}
            >
                <div style={{ color: minutes < 10 && "#ff2626" }}>
                    <span>{String(hours).padStart(2, "0")}</span>:
                    <span>{String(minutes).padStart(2, "0")}</span>:
                    <span>{String(seconds).padStart(2, "0")}</span>
                </div>
            </div>
        </div>
    );
}

export default MyTimer;
