import React, { useState } from "react";
import "./CustomizeExamPopup.scss";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { pickExamAction } from "../../redux/actions/exam";
function CustomizeExamPopup({
    setOpenExam,
    message,
    id,
    questions,
    setSuccess
}) {
    const state = useSelector((state) => state);
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [duration, setDuration] = useState(0);
    const [value, setValue] = useState(new Date());
    const jobId = useSelector((state) => state.job.id);

    const handleCheckBox = () => {
        setChecked(!checked);
        setIsPrivate(checked);
        console.log("dddd", isPrivate);
        console.log(checked);
        console.log("jj", jobId);
    };
    const handleSubmit = () => {
        console.log("exam", expiryDate);
        // const MCQId = id;
        // dispatch(pickExamAction(jobId, MCQId, expiryDate, duration));
    };
    const handleCreate = async () => {
        try {
            let mcq = {
                jobId: jobId,
                title: title,
                questions: questions,
                isPrivate: isPrivate,
                expiryDate: expiryDate,
                duration: duration
            };
            const rawResponse = await fetch(
                `http://localhost:5000/createExam`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + state.user.userInfo.token
                    },
                    body: JSON.stringify(mcq)
                }
            );
            const data = await rawResponse;
            setSuccess(true);
            setOpenExam(false);
            console.log(mcq);
            //   if(data.status===200){
            //       setModalOpen(true)
            //       setApplyFor(true)
            //   }
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="customize-exam-overlay">
            <div className="customize-exam-popupBackground">
                <div className="customize-exam-popupContainer">
                    <div className="customize-exam-titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenExam(false);
                            }}
                        >
                            x
                        </button>
                    </div>
                    <div className="body">
                        <Box
                            component="form"
                            sx={{
                                "& > :not(style)": { m: 1, width: "25ch" }
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div className="row">
                                <div className="column">
                                    <Typography className="black" variant="h6">
                                        Exam Title
                                    </Typography>
                                </div>

                                <div className="column">
                                    {" "}
                                    <TextField
                                        id="outlined-basic"
                                        label="Exam title"
                                        variant="outlined"
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </Box>
                    </div>
                    {/* <div className="body">
                        <div className="mb black row">
                            <div className="column">
                                <Typography color="black" variant="h6">
                                    Expiration Date
                                </Typography>
                            </div>
                            <div
                                style={{ marginTop: "10px" }}
                                className="column"
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DateTimePicker
                                        className="DatePicker"
                                        renderInput={(props) => (
                                            <TextField {...props} />
                                        )}
                                        label="DateTimePicker"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                            setExpiryDate(value);
                                            console.log(value);
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div> */}
                    <div className="body">
                        <div className="mb row">
                            <div className="column">
                                <Typography
                                    style={{ color: "black" }}
                                    variant="h6"
                                    color="black"
                                >
                                    Do you agree to use your exams as open
                                    source?
                                </Typography>
                            </div>
                            <div className="column">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleCheckBox}
                                    />
                                    <span
                                        className="black ml"
                                        style={{ "font-size": "20px" }}
                                    >
                                        {" "}
                                        I Agree
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* <div className="body">
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
                    </div> */}

                    <div className="footer">
                        <button id="submitBtn" onClick={handleCreate}>
                            Create Exam
                        </button>

                        <button
                            onClick={() => {
                                setOpenExam(false);
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

export default CustomizeExamPopup;
