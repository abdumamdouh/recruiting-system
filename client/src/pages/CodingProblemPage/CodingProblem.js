import "./CodingProblem.scss";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Button, Autocomplete, Chip } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Message from "../../components/modal/Message";
import styled from "@emotion/styled";

export default function AddProblem() {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const Input = styled("input")({ display: "none" });
    const availableOptions = [
        "c",
        "h",
        "cpp",
        "hpp",
        "py",
        "java",
        "jar",
        "js",
        "txt",
        "docx",
        "pdf",
        "xslx",
        "zip",
        "rar",
        "png",
        "jpg",
        "jpeg"
    ];
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [memoryConstraint, setMemoryConstraint] = useState(0);

    const [timeConstraint, setTimeConstraint] = useState("");

    const [duration, setDuration] = useState("");

    // const [uploadFormat, setUploadFormat] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const jobId = useSelector((state) => state.job.id);
    const { userInfo } = useSelector((state) => state.user);

    const [testCases, setTestCases] = useState([{}]);

    const AddTestCase = () => {
        setTestCases(testCases.concat([{}]));
        // console.log(testCases)
    };
    const handleTestCaseInput = (event) => {
        testCases[event.target.id].inputs = JSON.parse(event.target.value);
    };
    const handleTestCaseOutput = (event) => {
        testCases[event.target.id].outputs = JSON.parse(event.target.value);
    };
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
        const codingProblem = {
            title,
            description,
            memoryConstraint: Number(memoryConstraint),
            timeConstraint: Number(timeConstraint),
            duration: Number(duration),
            testcases: testCases,
            jobId,
            deadline: expiryDate,
            isPrivate: 0
        };
        // console.log(codingProblem)
        //console.log()
        /*
        {
            "title":"Some title",
            "description":"Some discription",
            "deadline":"2022-03-20 01:21:00",
            "JobId":1,
            "uploadFormat":"pdf"
        } 
        */
        //Check if selected options are in the avaialble options or not

        // if (!option.length) {
        //     setOpen(true);
        //     return;
        // }

        // console.log(jobId);
        // const task = {
        //     title,
        //     description,
        //     deadline: expiryDate,
        //     JobId: jobId,
        //     uploadFormat: option.join("-")
        // };

        // console.log(task);
        // //
        // const formData = new FormData();
        // formData.append("task", selectedFile);
        // formData.append("data", JSON.stringify(task));
        // console.log(formData);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + " - " + pair[1]);
        // }

        try {
            // console.log(codingProblem)
            //console.log(userInfo.token);
            const response = await fetch(
                `http://localhost:5000/SubmitCodingProblem`,
                {
                    method: "POST",
                    headers: {
                        Accept: "multipart/form-data",
                        "Content-Type": "application/json",
                        // "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify(codingProblem)
                }
            );
            const data = await response;
            //console.log(data);
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
            {!option.length && (
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
                        Invalid extension!
                    </Alert>
                </Snackbar>
            )}
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
                    Coding problem Title
                </Typography>
                <TextField
                    id="outlined-static"
                    label="Coding Problem Title"
                    variant="outlined"
                    sx={{ marginTop: "10px" }}
                    onChange={(e) => setTitle(e.target.value)}
                />
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
                    Coding problem Description
                </Typography>
                <TextField
                    sx={{ marginTop: "10px" }}
                    id="outlined-multiline-static"
                    label="Coding problem Description"
                    multiline
                    rows={6}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>

            <div className="mb black">
                <Typography color="black" variant="h6">
                    Deadline for this Coding problem
                </Typography>
                <div style={{ marginTop: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
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

                <Typography color="black" variant="h6">
                    Duration of Coding problem
                </Typography>
                <div style={{ marginTop: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            renderInput={(props) => <TextField {...props} />}
                            label="Duration"
                            onChange={(event) =>
                                setDuration(event.target.value)
                            }
                        />
                    </LocalizationProvider>
                </div>
            </div>

            <div className="mb black">
                <Typography color="black" variant="h6">
                    Time Constraints
                    <span style={{ color: "#827F7E" }}> (in seconds)</span>
                </Typography>
                <div style={{ marginTop: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            renderInput={(props) => <TextField {...props} />}
                            label="Time Constraints"
                            onChange={(event) =>
                                setTimeConstraint(event.target.value)
                            }
                        />
                    </LocalizationProvider>
                </div>
                <Typography color="black" variant="h6">
                    Memory Constraints
                    <span style={{ color: "#827F7E" }}> (in MB)</span>
                </Typography>
                <div style={{ marginTop: "10px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            renderInput={(props) => <TextField {...props} />}
                            label="Memory Constraints"
                            onChange={(event) =>
                                setMemoryConstraint(event.target.value)
                            }
                        />
                    </LocalizationProvider>
                </div>
            </div>

            {
                //testcases
            }

            {testCases.map((testcase, index) => {
                return (
                    <div key={index}>
                        <Typography key={index} color="black" variant="h6">
                            Testcase {index + 1}
                        </Typography>

                        <div
                            key={`input${index}`}
                            style={{
                                display: "inline-block",
                                marginBottom: "10px",
                                marginRight: "10px"
                            }}
                        >
                            <Typography
                                key={`input${index}`}
                                color="black"
                                variant="h6"
                            >
                                Inputs array
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TextField
                                    id={index}
                                    renderInput={(props) => (
                                        <TextField
                                            key={`input${index}`}
                                            {...props}
                                        />
                                    )}
                                    label="Example: ['input1','input2']"
                                    onChange={handleTestCaseInput}
                                />
                            </LocalizationProvider>
                        </div>

                        <div
                            key={`h${index}`}
                            style={{
                                display: "inline-block",
                                marginBottom: "10px",
                                marginRight: "10px"
                            }}
                        >
                            <Typography key={index} color="black" variant="h6">
                                Outputs array
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TextField
                                    id={index}
                                    renderInput={(props) => (
                                        <TextField
                                            key={`outputs${index}`}
                                            {...props}
                                        />
                                    )}
                                    label="Example: ['ex1','ex2']"
                                    onChange={handleTestCaseOutput}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                );
            })}
            <div className="mb">
                <Button
                    style={{ marginBottom: "10px" }}
                    variant="contained"
                    onClick={AddTestCase}
                >
                    Add testCase
                </Button>
            </div>

            <div className="mb">
                <Button
                    style={{ marginBottom: "10px" }}
                    variant="contained"
                    onClick={handleClick}
                >
                    Upload Coding problem
                </Button>
            </div>
        </div>
    );
}
