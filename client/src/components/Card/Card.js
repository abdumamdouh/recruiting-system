import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Typography } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { pickExamAction } from "../../redux/actions/exam";
import CardPopup from "./CardPopup";
import "./Card.scss";
const Card = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const jobId = useSelector((state) => state.job.id);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [duration, setDuration] = useState(0);
    const [choosed, setChoosed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    //redirect to questions' page
    const handleClick = () => {
        history.push(`/dashboard/exam/${props.id}`);
    };
    const handleChooseExam = () => {
        setChoosed(true);
    };
    const handleDate = (date) => {
        setSelectedDate(date);
        setExpiryDate(date);
    };
    const handleSubmit = () => {
        const MCQId = props.id;
        dispatch(pickExamAction(jobId, MCQId, expiryDate, duration));
    };
    console.log(props.number);
    return (
        <div className="container">
            {modalOpen && (
                <CardPopup
                    setOpenModal={setModalOpen}
                    id={props.id}
                    jobId={jobId}
                    message="uploaded successfully!"
                />
            )}
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="inline-group">
                        <span className="card-title">Exam {props.number} </span>
                        {/* <span className='ml-4 black p-2  bg-success text-whites'>{props.owned? 'Owned Exam': 'Public Exam'}</span> */}
                        {props.owned ? (
                            <span className="ml-4 black p-2  bg-light  text-dark bg-opacity-25">
                                {" "}
                                By me <CheckOutlinedIcon />{" "}
                            </span>
                        ) : (
                            <span className="ml-4 black p-2  bg-light text-whites">
                                Public Exam{" "}
                            </span>
                        )}
                    </div>
                    <h6 className="card-subtitle mb-2 mt-2 text-muted">
                        Exam title: {props.title}
                    </h6>
                    <p className="card-text">
                        Number of questions: {props.questions.length}{" "}
                    </p>
                    <button
                        className="btn btn-primary mb-2"
                        onClick={handleClick}
                    >
                        View MCQ Exam
                    </button>
                    {/* <button className="btn btn-primary" onClick={handleChooseExam}>Choose MCQ Exam</button> */}
                    <button
                        className="btn btn-primary"
                        onClick={() => setModalOpen(true)}
                    >
                        Choose MCQ Exam
                    </button>
                    {choosed && (
                        <div>
                            <div className="mb black">
                                <Typography color="black" variant="h6">
                                    Expiration Date
                                </Typography>
                                <div style={{ marginTop: "10px" }}>
                                    {/* <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDate}
                                        dateFormat="dd/MM/yyyy"
                                    /> */}
                                </div>
                            </div>
                            <div className="black mb">
                                <Typography color="black" variant="h6">
                                    Exam Duration (in minutes)
                                </Typography>
                            </div>
                            <div className="mb">
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
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit MCQ Exam
                            </button>
                        </div>
                    )}
                    {/* <button onClick={()=>setModalOpen(true)}> cccccccc</button> */}
                </div>
            </div>
        </div>
    );
};

export default Card;
