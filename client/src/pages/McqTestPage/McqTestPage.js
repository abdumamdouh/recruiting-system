import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const MCQ = {
    jobId: 1,
    topic: "ana ba7b rouby",
    questions: [
        {
            question: "sdasjjkvdasdad",
            choices: [
                "ssdsavdvdvdd",
                "jfhjdadjhsad",
                "ghsdhsdagh",
                "utruhfreife"
            ],
            id: 1
        },
        {
            question: "dsanvkddsaffdk",
            choices: [
                "skdfksd",
                "jjdsfhksfdhksdh",
                "jdfhjbfdbvk",
                "kfdjkjgdflgkdlf"
            ],
            id: 2
        },
        {
            question: "to be or not to be",
            choices: ["be", "not to be", "be be", "el7"],
            id: 3
        },
        {
            question: "1+1",
            choices: ["2", "11", "'2'", "3"],
            id: 4
        },
        {
            question: "arza3",
            choices: ["arza3", "arza3", "arza3", "arza3"],
            id: 5
        },
        {
            question: "el7",
            choices: ["el7", "el7", "el7", "el7"],
            id: 6
        },
        {
            question: "alllllllo",
            choices: [
                "aloooooooooo",
                "aloooooooooo",
                "aloooooooooo",
                "aloooooooooo"
            ],
            id: 7
        },
        {
            question: "to be or not to be",
            choices: ["be", "not to be", "be be", "el7"],
            id: 3
        },
        {
            question: "1+1",
            choices: ["2", "11", "'2'", "3"],
            id: 4
        },
        {
            question: "arza3",
            choices: ["arza3", "arza3", "arza3", "arza3"],
            id: 5
        },
        {
            question: "el7",
            choices: ["el7", "el7", "el7", "el7"],
            id: 6
        }
    ]
};

const McqTestPage = (props) => {
    let McqAnswers = {};
    //ID of the job
    const { ID } = useParams();
    let margin = MCQ.questions.length > 17 ? 55 : 40;
    margin = MCQ.questions.length > 25 ? 65 : margin;
    margin = MCQ.questions.length > 35 ? 75 : margin;

    const stackMargin = `${margin * MCQ.questions.length}px`;

    const handleMcqChange = (event, id) => {
        McqAnswers = { ...McqAnswers, [id]: event.target.value };
        console.log(McqAnswers);
    };
    return (
        <Container
            component="main"
            maxWidth="md"
            style={{
                border: "1px solid",
                borderRadius: "15px",
                marginTop: stackMargin,
                overflowY: "none"
            }}
            sx={{ overflow: "auto" }}
        >
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    overflow: "auto"
                }}
                component="div"
            >
                <Typography
                    color="black"
                    variant="h5"
                    style={{ textAlign: "center" }}
                >
                    {MCQ.topic}
                </Typography>

                <Divider style={{ margin: "20px 0" }} />

                {MCQ.questions.map((question, index) => (
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            {`${index + 1} - ${question.question}`}
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            style={{
                                display: "flex",
                                justifyContent: "space-around"
                            }}
                            onChange={(event) =>
                                handleMcqChange(event, question.id)
                            }
                        >
                            {question.choices.map((choice) => (
                                <FormControlLabel
                                    value={choice}
                                    control={<Radio />}
                                    label={choice}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                ))}
            </Box>
        </Container>
    );
};

export default McqTestPage;
