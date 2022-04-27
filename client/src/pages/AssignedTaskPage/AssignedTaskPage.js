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
import Message from "../../components/modal/Message";

export default function Task() {
    //ID of the task
    const { ID } = useParams();

    const Input = styled("input")({ display: "none" });

    // const [uploadFormat, setUploadFormat] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [task, setTask] = useState();

    const jobId = useSelector((state) => state.job.id);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchTask = async () => {
            console.log("zepy");
            try {
                console.log(userInfo.token);
                const response = await fetch(
                    //TODO: make it dynamic
                    `http://localhost:5000/${1}/${1}`,
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

    const handleOnError = (err) => {
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
                `http://localhost:5000/uploadTask/${1}/${1}`,
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
            console.log(data);
            //TODO: condition for success
            showSuccessMessage();
        } catch (error) {
            console.error("Error:", error);
            handleOnError(error);
        }
    };

    const showSuccessMessage = () => {
        setModalOpen(true);
    };

    //upload file

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        console.log(event.target.files[0]);
    };

    //TODO: move handleSubmission to handleClick
    const handleSubmission = async () => {
        // const formData = new FormData();
        // formData.append("File", selectedFile);
        // console.log(formData);
        // try {
        //     const response = await fetch(`http://localhost:5000/getMCQ/1`, {
        //         method: "POST",
        //         body: formData,
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //             Authorization: "Bearer " + userInfo.token
        //         }
        //     });
        //     const data = await response.json();
        //     console.log(data);
        //     //TODO: condition for success
        //     showSuccessMessage();
        // } catch (error) {
        //     console.error("Error:", error);
        //     handleOnError(error);
        // }
    };

    return (
        <div>
            {JSON.stringify(task)}
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
                    Task
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
                <Typography color="black" variant="h6">
                    {moment(task?.deadline).format("MMMM Do YYYY, h:mm:ss a")}
                </Typography>
            </div>

            <div>
                <a href="#">Download helper files</a>
            </div>
            <div>
                <h4
                    style={{
                        color: "black",
                        display: "inline",
                        marginBottom: "5px"
                    }}
                >
                    Your submissions{" "}
                </h4>
                <div className="mb" style={{ marginTop: "5px" }}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept=".pdf, .docx, .zip, .rar"
                            id="contained-button-file"
                            type="file"
                            onChange={changeHandler}
                        />
                        <Button variant="contained" component="span">
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
                </div>
            </div>

            <div className="mb">
                <Button
                    style={{ marginBottom: "10px" }}
                    variant="contained"
                    onClick={handleClick}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
