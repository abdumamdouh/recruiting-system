import React, { useState } from "react";
import "./popup.scss";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { pickExamAction } from "../../redux/actions/exam";
function CardPopup({ setOpenModal, message, id, jobId }) {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [duration, setDuration] = useState(0);
    const handleDate = (date) => {
        setSelectedDate(date);
        setExpiryDate(date);
    };
    const handleSubmit = () => {
        console.log(id);
        const MCQId = id;
        dispatch(pickExamAction(jobId, MCQId, expiryDate, duration));
    };
    return (
        <div className="overlay">
            <div className="popupBackground">
                <div className="popupContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            x
                        </button>
                    </div>

                    <div className="body">
                        <div className="mb black">
                            <Typography color="black" variant="h6">
                                Add Expiration Date
                            </Typography>
                            <div style={{ marginTop: "10px" }}>
                                <DatePicker
                                    className="DatePicker"
                                    selected={selectedDate}
                                    onChange={handleDate}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="black mb">
                            <Typography color="black" variant="h6">
                                Exam Duration
                            </Typography>
                            <Typography color="gray" variant="h6">
                                (in minutes)
                            </Typography>
                        </div>
                        <div className="mb" style={{ marginLeft: "20px" }}>
                            <TextField
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        max: 100,
                                        min: 0
                                    }
                                }}
                                label="duration"
                                size="md"
                                value={duration}
                                onChange={(e) => {
                                    setDuration(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="footer">
                        <button id="submitBtn" onClick={handleSubmit}>
                            Choose Exam
                        </button>

                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                            id="cancelBtn"
                        >
                            Close
                        </button>
                        {/* <button>Continue</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPopup;
