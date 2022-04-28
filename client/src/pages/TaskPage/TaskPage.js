import "./TaskPage.scss";
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
export default function AddExam() {
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
    // const [uploadFormat, setUploadFormat] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const jobId = useSelector((state) => state.job.id);
    const { userInfo } = useSelector((state) => state.user);

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

        if (!option.length) {
            setOpen(true);
            return;
        }

        console.log(jobId);
        const task = {
            title,
            description,
            deadline: expiryDate,
            JobId: jobId,
            uploadFormat: option.join("-")
        };

        console.log(task);
        //
        const formData = new FormData();
        formData.append("task", selectedFile);
        formData.append("data", JSON.stringify(task));
        console.log(formData);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + " - " + pair[1]);
        // }

        try {
            console.log(userInfo.token);
            const response = await fetch(`http://localhost:5000/createTask`, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "multipart/form-data",
                    // "Content-Type": "application/json",
                    // "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + userInfo.token
                }
            });
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
                    Task Title
                </Typography>
                <TextField
                    id="outlined-static"
                    label="Task Title"
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
                    Task Description
                </Typography>
                <TextField
                    sx={{ marginTop: "10px" }}
                    id="outlined-multiline-static"
                    label="Task Description"
                    multiline
                    rows={6}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>

            <div className="mb black">
                <Typography color="black" variant="h6">
                    Deadline for this Task
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
                    Uploaded File Extension
                </Typography>
                <small style={{ fontSize: 15, color: "#827F7E" }}>
                    <em>
                        Restrict applicants for this job to a certain file
                        upload format.
                    </em>
                </small>
                {/* <TextField
                    sx={{ marginTop: "10px" }}
                    id="outlined-static"
                    label="Uploaded File Extension"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                /> */}
                {/* <Autocomplete
                    sx={{ marginTop: "10px", width: "15rem" }}
                    id="free-solo-demo"
                    freeSolo
                    options={options}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Uploaded File Extension"
                            onChange={(e) => setUploadFormat(e.target.value)}
                        />
                    )}
                /> */}
                <div>
                    <Autocomplete
                        sx={{ marginTop: "10px", width: "15rem" }}
                        value={option}
                        onChange={(event, newValue) => {
                            // console.log(newValue);
                            // console.log(option);
                            setOption(newValue);
                        }}
                        multiple
                        id="tags-filled"
                        options={availableOptions}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Uploaded File Extension"
                                placeholder={
                                    !option.length ? "example: cpp" : ""
                                }
                            />
                        )}
                    />
                </div>
            </Box>

            <div>
                <h4
                    style={{
                        color: "black",
                        display: "inline",
                        marginBottom: "5px"
                    }}
                >
                    Upload Additional Resources{" "}
                </h4>
                <span style={{ fontSize: 20, color: "#827F7E" }}>
                    (Optional)
                </span>
                <small
                    style={{
                        display: "block",
                        fontSize: 15,
                        color: "#827F7E"
                    }}
                >
                    <em>
                        Explain more details about the task through uploading a
                        docx or pdf file.
                    </em>
                </small>
                <div className="mb" style={{ marginTop: "5px" }}>
                    {/* <div>
                        <input
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            accept={".pdf, .docx"}
                        />
                        {isFilePicked ? (
                            <div>
                                <p>Filename: {selectedFile.name}</p>
                                <p>Filetype: {selectedFile.type}</p>
                                <p>Size in bytes: {selectedFile.size}</p>
                                <p>
                                    lastModifiedDate:{" "}
                                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                                </p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )} */}
                    {/* TODO: move the handleSubmission into handleClick */}
                    {/* <div>
                            <button onClick={handleSubmission}>Submit</button>
                        </div>
                        </div> */}
                    <label htmlFor="contained-button-file">
                        <Input
                            accept=".pdf, .docx, .zip, .rar"
                            id="contained-button-file"
                            type="file"
                            onChange={changeHandler}
                        />
                        <Button variant="contained" component="span">
                            Upload file
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
                    Upload Task
                </Button>
            </div>
        </div>
    );
}
