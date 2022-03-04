import "./AddExam.scss";
import { CSVReader } from "react-papaparse";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { createExamAction } from "../../redux/actions/exam";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AddExam() {
    const [topic, setTopic] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState(false);
    const [privatee, setPrivatee] = useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleCheckBox = () => {
        setChecked(!checked);
        setPrivatee(checked)
        console.log( 'dddd',privatee)
        console.log(checked)
      };
    const dispatch = useDispatch();
    const jobId = useSelector(state => state.job.id);
    const handleOnDrop = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
        let arr = [];
        data.filter(d=>d.data.length!==1).map(d => arr.push(d.data));
        const array = [...arr];
        const length = array[0].length;
      // arr = arr.slice(0, arr.length - 1);
        let questions = arr.map((a, index) => ({
            question: a[0],
            options: a.slice(1, length - 1),
            answer: a[length - 1]
        }));

        console.log("arr", questions);

        dispatch(createExamAction(jobId, topic, questions,privatee));
    };

    const handleOnError = err => {
        console.log(err);
    };

    const handleOnRemoveFile = data => {
        console.log("---------------------------");
        console.log(data);
        console.log("---------------------------");
    };
    return (
        <div>
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
                     style={{ fontWeight: 500, fontSize: '20px'}}>
                        Add your questions in the form:
                        question,choice1,choice2,choice3,answer
                    </Typography>
                    <Typography  style={{ fontWeight: 500, fontSize: '20px'}}>
                        you can add any number of choices between 3 and 5, but
                        the first field MUST be question and the last field MUST
                        be the correct answer
                    </Typography>
                    <Typography  style={{ fontWeight: 500, fontSize: '20px'}}>
                        Example: Which of the following acts as the input of a
                        class-based component,Class,Props,Render,Props
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": { m: 1, width: "25ch" }
                }}
                noValidate
                autoComplete="off"
            >
                <Typography color="black" variant="h6">
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
            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                config={{
                    header: false
                }}
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>

             <Typography color="black" variant="h6">
                    Do you agree to make your exams as open source?
                </Typography>
                <label>
        <input type="checkbox"     checked={checked}
          onChange={handleCheckBox}/>
        Agree
      </label>
        </div>
    );
}
