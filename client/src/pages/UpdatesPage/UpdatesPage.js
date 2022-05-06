import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdatePage.scss";

const UPDATES = [
    {
        examTopic: "JS",
        recruiter: "Jack",
        jobTitile: "Backend",
        img: "https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
    }
];

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

const UpdatesPage = (props) => {
    const history = useHistory();
    //slice of state for udpates
    const [updates, setUpdates] = useState([]);
    //modal state
    const [modalData, setModalData] = useState({});

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUpdates = async () => {
            console.log("alo");
            try {
                const response = await fetch(
                    `http://localhost:5000/assessments`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + userInfo.token
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
                setUpdates(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (userInfo.hasOwnProperty("hasAssessments")) fetchUpdates();
    }, []);

    const handleRedirection = (data) => {
        console.log(data);
        // console.log("redii");
        localStorage.setItem("jobId", data.jobId);
        if (data.MCQId) {
            history.push(`/job/exam/${data.MCQId}`);
        } else if (data.codingProblemId) {
            history.push(`/job/codingproblem/${data.codingProblemId}`);
        }
    };

    const handleModalOpen = (obj) => {
        console.log(obj);
        setModalData(obj);
        handleOpen();
    };
    const handleTask = (TaskID) => {
        console.log(TaskID);
        history.push(`/job/task/${TaskID}`);
    };
    return (
        <div className="c">
            {!userInfo.hasOwnProperty("hasAssessments") ? (
                <>
                    <h3 className="hh3">You don't have any Assessment yet.</h3>
                </>
            ) : (
                <>
                    <h3 className="hh3">Your Assessments</h3>
                    <div className="updates">
                        {updates.map((update, index) => {
                            const avatar =
                                update.avatar !== null ? update.avatar : null;
                            const base64String =
                                update.avatar !== null
                                    ? btoa(
                                          String.fromCharCode(
                                              ...new Uint8Array(avatar.data)
                                          )
                                      )
                                    : "";
                            return (
                                <div className="update">
                                    {base64String === "" ? null : (
                                        <img
                                            // make img dynamic
                                            src={`data:image/jpeg;base64,${base64String}`}
                                            alt="logo"
                                            className="immg"
                                        />
                                    )}
                                    <p>
                                        <div className="mcq">
                                            <p>
                                                <strong>Title:</strong>
                                            </p>{" "}
                                            <p>{update.jobTitle}</p>
                                            <p>
                                                <strong>Company:</strong>
                                            </p>{" "}
                                            <p>{update.company}</p>
                                            <p>
                                                <strong>Description:</strong>
                                            </p>{" "}
                                            <p>{update.description}</p>
                                            <p>
                                                <strong>
                                                    {(update.MCQ
                                                        ? update.MCQ.length
                                                        : 0) +
                                                        (update.task
                                                            ? update.task.length
                                                            : 0) +
                                                        (update.codingProblem
                                                            ? update
                                                                  .codingProblem
                                                                  .length
                                                            : 0) >
                                                    1
                                                        ? "Assessments"
                                                        : "Assessment"}
                                                    :
                                                </strong>
                                            </p>
                                            <ul class="nav">
                                                <div className="assessment">
                                                    {update.MCQ &&
                                                        update.MCQ.map(
                                                            (obj) => (
                                                                <>
                                                                    <div>
                                                                        <OverlayTrigger
                                                                            key={
                                                                                obj.title
                                                                            }
                                                                            placement="auto-start"
                                                                            delay={{
                                                                                show: 250,
                                                                                hide: 400
                                                                            }}
                                                                            overlay={
                                                                                <Popover
                                                                                    id={
                                                                                        obj.title
                                                                                    }
                                                                                >
                                                                                    <Popover.Header as="h3">
                                                                                        MCQ
                                                                                    </Popover.Header>
                                                                                    <Popover.Body>
                                                                                        <strong>
                                                                                            Deadline:
                                                                                        </strong>{" "}
                                                                                        {moment
                                                                                            .parseZone(
                                                                                                obj.expiryDate
                                                                                            )
                                                                                            .utc(
                                                                                                "-02:00"
                                                                                            )
                                                                                            .format(
                                                                                                "DD-MM-YYYY [at] hh:mm a"
                                                                                            )}
                                                                                        <br></br>
                                                                                        <strong>
                                                                                            Duration:
                                                                                        </strong>{" "}
                                                                                        {
                                                                                            obj.duration
                                                                                        }{" "}
                                                                                        minutes
                                                                                        <br></br>
                                                                                    </Popover.Body>
                                                                                </Popover>
                                                                            }
                                                                        >
                                                                            <li
                                                                                key={
                                                                                    obj.title
                                                                                }
                                                                                class="nav-item"
                                                                            >
                                                                                {/*redirect*/}
                                                                                <span
                                                                                    onClick={() =>
                                                                                        handleModalOpen(
                                                                                            {
                                                                                                ...obj,
                                                                                                jobId: update.jobId
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    className="redirect"
                                                                                >
                                                                                    {
                                                                                        obj.title
                                                                                    }
                                                                                </span>
                                                                            </li>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                    {update.task &&
                                                        update.task.map(
                                                            (obj) => (
                                                                <>
                                                                    <div>
                                                                        <OverlayTrigger
                                                                            key={
                                                                                obj.title
                                                                            }
                                                                            placement="auto-start"
                                                                            delay={{
                                                                                show: 250,
                                                                                hide: 400
                                                                            }}
                                                                            overlay={
                                                                                <Popover
                                                                                    id={
                                                                                        obj.title
                                                                                    }
                                                                                >
                                                                                    <Popover.Header as="h3">
                                                                                        Task
                                                                                    </Popover.Header>
                                                                                    <Popover.Body>
                                                                                        <strong>
                                                                                            Deadline:
                                                                                        </strong>{" "}
                                                                                        {moment
                                                                                            .parseZone(
                                                                                                obj.deadline
                                                                                            )
                                                                                            .utc(
                                                                                                "-02:00"
                                                                                            )
                                                                                            .format(
                                                                                                "DD-MM-YYYY [at] hh:mm a"
                                                                                            )}
                                                                                        <br></br>
                                                                                        {/* <strong>
                                                                                    Duration:
                                                                                </strong>{" "}
                                                                                {
                                                                                    obj.duration
                                                                                }{" "}
                                                                                minutes
                                                                                <br></br> */}
                                                                                    </Popover.Body>
                                                                                </Popover>
                                                                            }
                                                                        >
                                                                            <li
                                                                                key={
                                                                                    obj.title
                                                                                }
                                                                                class="nav-item"
                                                                            >
                                                                                {/*redirect*/}
                                                                                <span
                                                                                    onClick={() =>
                                                                                        handleTask(
                                                                                            obj.taskId
                                                                                        )
                                                                                    }
                                                                                    className="redirect"
                                                                                >
                                                                                    {
                                                                                        obj.title
                                                                                    }
                                                                                </span>
                                                                            </li>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                    {update.codingProblem &&
                                                        update.codingProblem.map(
                                                            (obj) => (
                                                                <>
                                                                    <div>
                                                                        <OverlayTrigger
                                                                            key={
                                                                                obj.title
                                                                            }
                                                                            placement="auto-start"
                                                                            delay={{
                                                                                show: 250,
                                                                                hide: 400
                                                                            }}
                                                                            overlay={
                                                                                <Popover
                                                                                    id={
                                                                                        obj.title
                                                                                    }
                                                                                >
                                                                                    <Popover.Header as="h3">
                                                                                        Coding
                                                                                        Problem
                                                                                    </Popover.Header>
                                                                                    <Popover.Body>
                                                                                        <strong>
                                                                                            Deadline:
                                                                                        </strong>{" "}
                                                                                        {moment
                                                                                            .parseZone(
                                                                                                obj.deadline
                                                                                            )
                                                                                            .utc(
                                                                                                "-02:00"
                                                                                            )
                                                                                            .format(
                                                                                                "DD-MM-YYYY [at] hh:mm a"
                                                                                            )}
                                                                                        <br></br>
                                                                                        <strong>
                                                                                            Duration:
                                                                                        </strong>{" "}
                                                                                        {
                                                                                            obj.duration
                                                                                        }{" "}
                                                                                        minutes
                                                                                        <br></br>
                                                                                    </Popover.Body>
                                                                                </Popover>
                                                                            }
                                                                        >
                                                                            <li
                                                                                key={
                                                                                    obj.title
                                                                                }
                                                                                class="nav-item"
                                                                            >
                                                                                {/*redirect*/}
                                                                                <span
                                                                                    onClick={() =>
                                                                                        handleModalOpen(
                                                                                            {
                                                                                                ...obj,
                                                                                                jobId: update.jobId
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    className="redirect"
                                                                                >
                                                                                    Coding
                                                                                    Problem
                                                                                </span>
                                                                            </li>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </>
                                                            )
                                                        )}
                                                </div>
                                            </ul>
                                        </div>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={modalStyle}
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{
                                    color: "black",
                                    fontWeight: 600,
                                    fontSize: "1.75rem"
                                }}
                            >
                                {modalData.MCQId
                                    ? "MCQ Test"
                                    : "Coding Problem"}
                            </Typography>

                            {modalData.hasOwnProperty("title") && (
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                    style={{ textAlign: "center" }}
                                >
                                    Now you will be redirected to{" "}
                                    {modalData.MCQId
                                        ? "MCQ Test"
                                        : "Coding Problem"}{" "}
                                    with title{" "}
                                    <strong>{modalData.title}</strong> and its
                                    duration is{" "}
                                    <strong>{modalData.duration}</strong>{" "}
                                    minutes.
                                </Typography>
                            )}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleRedirection(modalData);
                                    }}
                                    style={{
                                        marginTop: "15px",
                                        marginRight: "15px"
                                    }}
                                >
                                    Take Assessment NOW
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleClose}
                                    style={{ marginTop: "15px" }}
                                >
                                    Exit
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default UpdatesPage;
