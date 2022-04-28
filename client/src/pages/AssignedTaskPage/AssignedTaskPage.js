import "./AssignedTaskPage.scss";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";
import moment from "moment";

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

    const [modalOpen, setModalOpen] = useState(false);
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [task, setTask] = useState();

    const jobId = useSelector(state => state.job.id);
    const { userInfo } = useSelector(state => state.user);

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
                // showSuccessMessage();
            } catch (error) {
                console.error("Error:", error);
                handleOnError(error);
            }
        };
        fetchTask();
    }, []);

    const handleOnError = err => {
        console.log(err);
    };

    const handleClick = async () => {
        console.log(jobId);

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
                showSuccessMessage();
                setTimeout(() => {
                    history.push("/");
                }, 3000);
            }
        } catch (error) {
            console.error("Error:", error);
            handleOnError(error);
        }
    };

    const showSuccessMessage = () => {
        setModalOpen(true);
    };

    //upload file

    const changeHandler = event => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        console.log(event.target.files[0]);
    };
    const download = event => {
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
            <div
                style={{
                    width: "60%",
                    // justifyContent: "flex-end",
                    flexDirection: "column"
                }}
            >
                {/* {JSON.stringify(task)} */}
                <div className="container">
                    {modalOpen && (
                        <Message
                            setOpenModal={setModalOpen}
                            message="uploaded successfully!"
                        />
                    )}
                </div>

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
                        onClick={handleClick}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}
