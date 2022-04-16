import "./TaskPage.scss";
import { CSVReader } from "react-papaparse";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { useState } from "react";
import { createExamAction } from "../../redux/actions/exam";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Button, Autocomplete } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Message from "../../components/modal/Message";

export default function AddExam() {
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    //file
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const dispatch = useDispatch();
    const jobId = useSelector((state) => state.job.id);
    const { userInfo } = useSelector((state) => state.user);

    const handleOnError = (err) => {
        console.log(err);
    };

    const handleClick = () => {
        dispatch(
            createExamAction(
                jobId,
                topic,
                questions,
                expiryDate,
                showSuccessMessage
            )
        );
    };

    const showSuccessMessage = () => {
        setModalOpen(true);
    };

    //upload file

    const changeHandler = (event) => {
        console.log("alo");
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append("File", selectedFile);
        try {
            const response = await fetch(`http://localhost:5000/getMCQ/1`, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                }
            });
            const data = await response.json();
            console.log(data);
            //TODO: condition for success
            showSuccessMessage();
        } catch (error) {
            console.error("Error:", error);
            handleOnError(error);
        }
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
                // sx={{
                //     "& > :not(style)": { m: 1, width: "25ch" }
                // }}
                sx={{ marginBottom: "25px" }}
                noValidate
                autoComplete="off"
            >
                <Typography
                    className="black"
                    variant="h6"
                    sx={{ marginBottom: "10px" }}
                >
                    Task Topic
                </Typography>
                <TextField
                    id="outlined-static"
                    label="Task Topic"
                    variant="outlined"
                    sx={{ marginTop: "10px" }}
                    onChange={(e) => setTopic(e.target.value)}
                />
            </Box>

            <Box
                component="form"
                // sx={{
                //     "& > :not(style)": { m: 1, width: "25ch" }
                // }}
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
                    // sx={{ width: "550px" }}
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Box>

            <div className="mb black">
                <Typography color="black" variant="h6">
                    Expiration Date for this Task
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
                // sx={{
                //     "& > :not(style)": { m: 1, width: "25ch" }
                // }}
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
                {/* <TextField
                    sx={{ marginTop: "10px" }}
                    id="outlined-static"
                    label="Uploaded File Extension"
                    variant="outlined"
                    onChange={(e) => setTopic(e.target.value)}
                /> */}
                <Autocomplete
                    sx={{ marginTop: "10px", width: "15rem" }}
                    id="free-solo-demo"
                    freeSolo
                    options={["cpp", "js"]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Uploaded File Extension"
                        />
                    )}
                />
            </Box>

            <div>
                <h4 style={{ color: "black", marginBottom: "20px" }}>
                    Upload Additional Resources
                </h4>
                <div className="mb">
                    {/*
                    <CSVReader
                        onDrop={handleOnDrop}
                        onError={handleOnError}
                        addRemoveButton
                        config={{
                            header: false
                        }}
                        onRemoveFile={handleOnRemoveFile}
                    >
                        <span className="black">
                            Drop Task file here or click to upload.
                        </span>
                    </CSVReader>
                    */}
                    <div>
                        <input
                            type="file"
                            name="file"
                            onChange={changeHandler}
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
                        )}
                        <div>
                            <button onClick={handleSubmission}>Submit</button>
                        </div>
                    </div>
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
