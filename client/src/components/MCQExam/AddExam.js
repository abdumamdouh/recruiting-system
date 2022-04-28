import "./AddExam.scss";
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
import Accordion from "@mui/material/Accordion";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import Message from "../modal/Message";
export default function AddExam() {
    const [title, setTitle] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const csvData = [
        [
            "question",
            "choice1",
            "choice2",
            "choice3",
            "answer",
            "topic",
            "subtopic",
            "difficulty"
        ],
        [
            "Which of the following module is not a built-in node module?",
            "fsread",
            "zlib",
            "https",
            "fsread",
            "Software engineering",
            "Backend",
            "Easy"
        ],
        [
            "The Node.js modules can be exposed using:",
            "expose",
            "module",
            "exports",
            "exports",
            "Software engineering",
            "Backend",
            "Medium"
        ],
        [
            "What is Callback?",
            "The callback is a technique in which a method calls back the caller method.",
            "The callback is an asynchronous equivalent for a function.",
            "Both of the above.",
            "The callback is an asynchronous equivalent for a function.",
            "Software engineering",
            "Backend",
            "Hard"
        ]
    ];
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleCheckBox = () => {
        setChecked(!checked);
        setIsPrivate(checked);
    };

    const dispatch = useDispatch();
    const jobId = useSelector((state) => state.job.id);
    const handleOnDrop = (data) => {
        console.log(data);

        let arr = [];
        data.filter((d) => d.data.length !== 1).map((d) => arr.push(d.data));
        const array = [...arr];
        const length = array[0].length;
        // arr = arr.slice(0, arr.length - 1);
        console.log("data length", array[0].length);
        if (
            array[0].length === 5 ||
            array[0].length === 6 ||
            array[0].length === 7
        ) {
            let questions = arr.map((a, index) => ({
                question: a[0],
                options: a.slice(1, length - 1),
                answer: a[length - 1]
            }));
            console.log("arr", questions);
            setQuestions(questions);
        } else {
            let questions = arr.map((a, index) => ({
                question: a[0],
                options: a.slice(1, length - 4),
                answer: a[length - 4],
                topic: a[length - 3],
                subtopic: a[length - 2],
                difficulty: a[length - 1]
            }));

            console.log("arr", questions);
            setQuestions(questions);
        }
    };

    const handleOnError = (err) => {
        console.log(err);
    };

    const handleOnRemoveFile = (data) => {
        console.log(data);
    };
    const handleClick = () => {
        dispatch(
            createExamAction(
                jobId,
                title,
                questions,
                isPrivate,

                showSuccessMessage
            )
        );
    };
    const showSuccessMessage = () => {
        setModalOpen(true);
    };
    return (
        <div className="upload">
            <div className="container">
                {modalOpen && (
                    <Message
                        setOpenModal={setModalOpen}
                        message="uploaded successfully!"
                    />
                )}
                <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{
                            backgroundColor: "#a3c2c2"
                        }}
                    >
                        <Typography
                            style={{ fontWeight: 600 }}
                            sx={{ width: "33%", flexShrink: 0 }}
                        >
                            Uploading Exam instructions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            backgroundColor: "#eff5f5"
                        }}
                    >
                        <Typography
                            style={{ fontWeight: 500, fontSize: "15px" }}
                        >
                            Add your questions in the form: question, choice1,
                            choice2, choice3, answer.
                        </Typography>
                        <Typography
                            style={{ fontWeight: 500, fontSize: "15px" }}
                        >
                            You can add any number of choices between 3 and 5,
                            but the first field MUST be question and the last
                            field MUST be the correct answer.
                        </Typography>
                        <Typography
                            style={{ fontWeight: 500, fontSize: "15px" }}
                        >
                            Three Additional fields could be added as: question,
                            choice1, choice2, choice3, answer, topic, subtopic,
                            difficulty.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" }
                }}
                noValidate
                autoComplete="off"
            >
                <Typography className="black" variant="h6">
                    Exam Title
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Exam title"
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <h4 style={{ color: "black", marginBottom: "20px" }}>
                Upload MCQ Exam
            </h4>
            <div className="mb">
                <CSVReader
                    accept=".csv"
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    addRemoveButton
                    config={{
                        header: false
                    }}
                    onRemoveFile={handleOnRemoveFile}
                >
                    <span className="black">
                        Drop CSV file here or click to upload.
                    </span>
                </CSVReader>
            </div>
            <div className="mb">
                <Typography
                    style={{ color: "black" }}
                    variant="h6"
                    color="black"
                >
                    Do you agree to use your exams as open source?
                </Typography>
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleCheckBox}
                    />
                    <span className="black ml"> I Agree</span>
                </label>
            </div>

            <div className="mb">
                <CSVLink data={csvData} filename={"exam_template"}>
                    Download MCQ Exam Template
                </CSVLink>
            </div>
            <div className="mb">
                <Button
                    style={{ marginBottom: "10px" }}
                    variant="contained"
                    onClick={handleClick}
                >
                    Upload MCQ Exam
                </Button>
            </div>
        </div>
    );
}
