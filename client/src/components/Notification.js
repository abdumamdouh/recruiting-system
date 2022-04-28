import React from "react";
import {
    NotificationContainer,
    NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Example extends React.Component {
    createNotification = (type) => {
        return () => {
            switch (type) {
                case "info":
                    NotificationManager.info("Info message");
                    break;
                case "success":
                    NotificationManager.success("Successed");
                    break;
                case "warning":
                    NotificationManager.warning(
                        "Warning message",
                        "Close after 3000ms",
                        3000
                    );
                    break;
                case "error":
                    NotificationManager.error(
                        "Error message",
                        "Click me!",
                        5000,
                        () => {
                            alert("callback");
                        }
                    );
                    break;
            }
        };
    };

    render() {
        return (
            <div>
                <button
                    className="btn btn-success"
                    onClick={this.createNotification("success")}
                >
                    Success
                </button>

                <NotificationContainer />
            </div>
        );
    }
}

export default Example;
