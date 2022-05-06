import "./AssignedTaskPage.scss";
import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import { Button, Snackbar, Modal } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import moment from "moment";
import MuiAlert from "@mui/material/Alert";

//Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Message from "../../components/modal/Message";
import MyTimer from "./MyTimer";

export default function Task() {
    const history = useHistory();
    //ID of the task
    const { TaskID } = useParams();
    const Input = styled("input")({ display: "none" });

    // const [uploadFormat, setUploadFormat] = useState("");

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [modalOpen, setModalOpen] = useState(false);
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [task, setTask] = useState();
    const [open, setOpen] = useState(false);
    const jobId = useSelector((state) => state.job.id);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                console.log(userInfo.token);
                const response = await fetch(
                    //TODO: make it dynamic
                    `http://localhost:5000/${jobId}/${TaskID}`,
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
                setTask(data);
                //TODO: condition for success
                // showModal();
            } catch (error) {
                console.error("Error:", error);
                handleOnError(error);
            }
        };
        fetchTask();
    }, []);

    const handleOnError = (err) => {
        console.log(err);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleClick = async () => {
        console.log(jobId);
        setModalOpen(false);
        if (!isFilePicked) {
            setOpen(true);
            return;
        }
        const formData = new FormData();
        formData.append("task", selectedFile);
        console.log(formData);

        for (let pair of formData.entries()) {
            console.log(pair[0] + " - " + pair[1]);
        }

        try {
            console.log(userInfo.token);
            const response = await fetch(
                //TODO make it dynamic
                // /uploadTask/:TaskId/:JobId

                `http://localhost:5000/uploadTask/${jobId}/${TaskID}`,

                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "multipart/form-data",
                        // "Content-Type": "application/json",
                        // "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + userInfo.token
                    }
                }
            );
            const data = await response;

            if (data.status === 201) {
                localStorage.setItem(
                    "message",
                    "The task is submitted successfully."
                );
                history.push("/feed");
            }
        } catch (error) {
            console.error("Error:", error);
            handleOnError(error);
        }
    };

    const showModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);
    //upload file

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        console.log(event.target.files[0]);
    };
    const download = (event) => {
        const a = event.target;
        const array = new Uint8Array(task.data.additionalFile.data);
        const blob = new Blob([array], { type: task.data.type.mime });
        const url = window.URL.createObjectURL(blob);
        a.setAttribute("href", url);
        a.setAttribute("download", `helper.${task?.data.type.ext}`);
        // a.click();
        // URL.revokeObjectURL(url);
    };
    const t = new Date(task?.deadline);
    t.setHours(t.getHours() - 2);
    t.setSeconds(0);
    // console.log(t);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "2.5rem",
                width: "100%"
            }}
        >
            {!isFilePicked && (
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        sx={{ width: "100%" }}
                    >
                        No File is uploaded!
                    </Alert>
                </Snackbar>
            )}
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4
                        }}
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
                            Are you sure you want to submit?
                        </Typography>

                        <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                            style={{ textAlign: "center" }}
                        >
                            (No turning back after clicking Submit)
                        </Typography>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleClick}
                                style={{
                                    marginTop: "15px",
                                    marginRight: "15px"
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleCloseModal}
                                style={{ marginTop: "15px" }}
                            >
                                Exit
                            </Button>
                        </div>
                    </Box>
                </Modal>
            )}
            <div
                style={{
                    width: "60%",
                    // justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                {/* {JSON.stringify(task)} */}
                {/* <div className="container"></div> */}

                <Box
                    component="form"
                    sx={{ marginBottom: "25px" }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography
                        className="black"
                        variant="h3"
                        sx={{ marginBottom: "10px", fontWeight: 800 }}
                    >
                        {task?.data.title}
                    </Typography>
                </Box>

                <Box
                    component="form"
                    sx={{ marginBottom: "25px" }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography
                        className="black"
                        // variant="h6"
                        sx={{ marginBottom: "10px" }}
                    >
                        {task?.data.description}
                    </Typography>
                </Box>

                <div className="mb black">
                    <span
                        style={{
                            fontSize: "1.25rem"
                        }}
                    >
                        <strong>Deadline: </strong>
                    </span>
                    <span
                        style={{
                            fontSize: "1.25rem"
                        }}
                    >
                        {moment
                            .parseZone(task?.deadline)
                            .utc("-02:00")
                            .format("dddd, Do [of] MMMM YYYY [at] h:mm a")}
                    </span>
                </div>
                <div className="mb black">
                    {task?.deadline && <MyTimer expiryTimestamp={t} />}
                </div>
                {task?.data.additionalFile && (
                    <div className="mb">
                        <a href="#" onClick={download}>
                            Download helper files
                        </a>
                    </div>
                )}
                <div className="mb">
                    <h4
                        style={{
                            color: "black",
                            // display: "inline",
                            marginBottom: "20px"
                        }}
                    >
                        Your Submission{" "}
                    </h4>
                    <div className="mb">
                        <label htmlFor="contained-button-file">
                            <Input
                                accept={`.${task?.data.uploadFormat
                                    .split("-")
                                    .join(", .")}`}
                                id="contained-button-file"
                                type="file"
                                onChange={changeHandler}
                            />
                            <Button
                                variant="contained"
                                component="span"
                                sx={{ width: 135 }}
                            >
                                Upload task
                            </Button>
                        </label>
                        {isFilePicked ? (
                            <span style={{ marginLeft: 10, color: "#827F7E" }}>
                                {selectedFile.name}
                            </span>
                        ) : (
                            ""
                        )}
                        <small style={{ display: "block", color: "#827F7E" }}>
                            <strong>Allowed format:</strong>{" "}
                            {`.${task?.data.uploadFormat
                                .split("-")
                                .join(", .")}`}
                        </small>
                    </div>
                </div>

                <div className="mb">
                    <Button
                        // sx={{ width: 135 }}
                        variant="contained"
                        onClick={showModal}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
