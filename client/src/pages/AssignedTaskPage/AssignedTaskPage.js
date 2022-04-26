import "./AssignedTaskPage.scss";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import styled from "@emotion/styled";

//Hooks
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "../../components/modal/Message";

export default function AddExam() {
    //ID of the task
    const { ID } = useParams();

    const Input = styled("input")({ display: "none" });

    // const [uploadFormat, setUploadFormat] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const jobId = useSelector((state) => state.job.id);
    const { userInfo } = useSelector((state) => state.user);

    const handleOnError = (err) => {
        console.log(err);
    };

    const handleClick = async () => {
        // console.log(jobId);

        // const task = {
        //     title,
        //     description,
        //     deadline: expiryDate,
        //     JobId: jobId,
        //     uploadFormat: option.join("-")
        // };

        // console.log(task);
        //
        // const formData = new FormData();
        // formData.append("task", selectedFile);
        // formData.append("data", JSON.stringify(task));
        // console.log(formData);


        try {
            console.log(userInfo.token);
            const response = await fetch(`http://localhost:5000/${3}/${1}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                }
            });
            const data = await response;
            console.log(data.body);
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
                    variant="h6"
                    sx={{ marginBottom: "10px" }}
                >
                    Task Title
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
                    variant="h6"
                    sx={{ marginBottom: "10px" }}
                >
                    Task Description
                </Typography>
            </Box>

            <div className="mb black">
                <Typography color="black" variant="h6">
                    Deadline for this Task
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
