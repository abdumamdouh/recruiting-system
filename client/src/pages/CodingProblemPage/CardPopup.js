import React, { useState } from "react";
import "./popup.scss";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

import Message from "../../components/modal/Message";
import { pickExamAction } from "../../redux/actions/exam";
function CardPopup({ setOpenModal, message, id, jobId }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [duration, setDuration] = useState(0);
    const [value, setValue] = useState(new Date());
    const [dateValue, setDateValue] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    
    const showSuccessMessage = () => {
        history.push(`/dashboard/uploadedexams`);
    };
    const handleSubmit = () => {
        console.log(id);
        const MCQId = id;
        dispatch(
            pickExamAction(
                jobId,
                MCQId,
                startDate,
                expiryDate,
                duration,
                showSuccessMessage
            )
        );
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
                        {modalOpen && (
                            <Message
                                setOpenModal={setModalOpen}
                                message="choosed successfully!"
                            />
                        )}
                        <div className="mb black">
                            <Typography color="black" variant="h6">
                                Start Date
                            </Typography>
                            <div style={{ marginTop: "10px" }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DateTimePicker
                                        renderInput={props => (
                                            <TextField {...props} />
                                        )}
                                        label="DateTimePicker"
                                        value={dateValue}
                                        onChange={newValue => {
                                            setDateValue(newValue);
                                            setStartDate(newValue);
                                            console.log(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                       
                    </div>
                    <div className="body">
                    <div className="mb black">
                            <Typography color="black" variant="h6">
                                End Date
                            </Typography>
                            <div style={{ marginTop: "10px" }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DateTimePicker
                                        renderInput={props => (
                                            <TextField {...props} />
                                        )}
                                        label="DateTimePicker"
                                        value={value}
                                        onChange={newValue => {
                                            setValue(newValue);
                                            setExpiryDate(value);
                                            console.log(value);
                                        }}
                                    />
                                </LocalizationProvider>
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
                                onChange={e => {
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardPopup;
