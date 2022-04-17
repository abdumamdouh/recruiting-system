import "./TaskPage.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Button, Autocomplete, Chip } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Message from "../../components/modal/Message";

export default function AddExam() {
    const availableOptions = [
        "c",
        "h",
        "cpp",
        "hpp",
        "py",
        "java",
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
    const [option, setOption] = useState([]);
    const [topic, setTopic] = useState("");
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

    const handleClick = async () => {
        /*
        {
            "topic":"Some topic",
            "description":"Some discription",
            "deadline":"2022-03-20 01:21:00",
            "JobId":1,
            "uploadFormat":"pdf"
        } 
        */

        const task = {
            topic,
            description,
            deadline: expiryDate,
            JobId: jobId,
            uploadFormat: option.join("-")
        };

        console.log(task);
        //
        const formData = new FormData();
        formData.append("task", selectedFile);
        formData.append("data", task);
        console.log(formData);

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + " - " + pair[1]);
        // }

        try {
            const response = await fetch(`localhost:5000/createTask`, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    // "Content-Type": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
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
                <h4 style={{ color: "black", marginBottom: "20px" }}>
                    Upload Additional Resources
                </h4>
                <div className="mb">
                    <div>
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
                        )}
                        {/* TODO: move the handleSubmission into handleClick */}
                        {/* <div>
                            <button onClick={handleSubmission}>Submit</button>
                        </div> */}
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
