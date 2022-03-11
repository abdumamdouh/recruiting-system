import "./AddExam.scss";
import { CSVReader } from "react-papaparse";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
import { CSVLink, CSVDownload } from "react-csv";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Message from '../modal/Message'
export default function AddExam() {
    const [topic, setTopic] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [privatee, setPrivatee] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [duration, setDuration] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const csvData = [
        ["Which of the following module is not a built-in node module?","fsread", "zlib", "https", "fsread"],
        ["The Node.js modules can be exposed using:", "expose", "module", "exports", "exports"],
        ["What is Callback?", "The callback is a technique in which a method calls back the caller method.", "The callback is an asynchronous equivalent for a function.","Both of the above.", "The callback is an asynchronous equivalent for a function."],     
      ];
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleCheckBox = () => {
        setChecked(!checked);
        setPrivatee(checked);
        console.log("dddd", privatee);
        console.log(checked);
    };
    const handleDate = date => {
        setSelectedDate(date);
        setExpiryDate(date);
        console.log(expiryDate);
    };
    const dispatch = useDispatch();
    const jobId = useSelector(state => state.job.id);
    const handleOnDrop = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
        let arr = [];
        data.filter(d => d.data.length !== 1).map(d => arr.push(d.data));
        const array = [...arr];
        const length = array[0].length;
        // arr = arr.slice(0, arr.length - 1);
        let questions = arr.map((a, index) => ({
            question: a[0],
            options: a.slice(1, length - 1),
            answer: a[length - 1]
        }));

        console.log("arr", questions);
        setQuestions(questions);
    };

    const handleOnError = err => {
        console.log(err);
    };

    const handleOnRemoveFile = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
    };
    const handleClick = () => {
        dispatch(
            createExamAction(
                jobId,
                topic,
                questions,
                privatee,
                expiryDate,
                duration
            )
        );
        setModalOpen(true)
    };
    return (
        <div>
            <div className="container">
            {modalOpen && <Message setOpenModal={setModalOpen} message='uploaded successfully!' />}
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
                            style={{ fontWeight: 500, fontSize: "20px" }}
                        >
                            Add your questions in the form:
                            question,choice1,choice2,choice3,answer
                        </Typography>
                        <Typography
                            style={{ fontWeight: 500, fontSize: "20px" }}
                        >
                            you can add any number of choices between 3 and 5,
                            but the first field MUST be question and the last
                            field MUST be the correct answer
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
                    Exam Topic
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Exam topic"
                    variant="outlined"
                    onChange={e => setTopic(e.target.value)}
                />
            </Box>
            <h4 style={{ color: "black", marginBottom: "20px" }}>
                Upload MCQ Exam
            </h4>
            <div className="mb">
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
            <div className="mb black">
                <Typography color="black" variant="h6">
                    Expiration Date for this exam
                </Typography>
                <div style={{ marginTop: "10px" }}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDate}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>
            <div className="black mb">
                <Typography color="black" variant="h6">
                    Exam Duration (in minutes)
                </Typography>
            </div>
            <div className="mb">
                <TextField
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 100,
                            min: 0
                        }
                    }}
                    label="duration"
                    size="md"
                    value={duration}
                    onChange={e => {
                        setDuration(e.target.value);
                    }}
                />
            </div>
            <div className="mb">
 
<CSVLink data={csvData} filename={"CSV_EXAM_TEMPLATE"}>Download MCQ Exam Template</CSVLink>
            </div>

            <Button variant="contained" onClick={handleClick}>
                Upload MCQ Exam
            </Button>
        </div>
    );
}
