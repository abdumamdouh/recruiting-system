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
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
    const [McqTaken, setMcqTaken] = useState(false);
    const [Mcq, setMcq] = useState([]);

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const getQuestion = async () => {
            console.log(userInfo.token);
            try {
                //TODO: check API call to fetch
                const response = await fetch(
                    `http://localhost:5000/getMCQ/${ID}`,
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
            } catch (error) {
                console.log(error);
            }
        };
        getQuestion();
    }, []);

    let McqAnswers = {};
    //ID of the job
    const { ID } = useParams();
    let margin = MCQ.questions.length > 17 ? 55 * 4 : 40 * 5;
    margin = MCQ.questions.length > 25 ? 65 * 3.4 : margin;
    margin = MCQ.questions.length > 35 ? 75 * 3 : margin;

    const stackMargin = `${margin * MCQ.questions.length}px`;

    const handleMcqChange = (event, id) => {
        McqAnswers = { ...McqAnswers, [id]: event.target.value };
        console.log(McqAnswers);
    };

    const handleSubmit = () => {
        console.log("alo");
        alert("submitted successfully!");
        //TODO: API Call to submit
        setMcqTaken(true);
    };
    return (
        <>
            {McqTaken ? (
                <h1>you have already take the MCQ exam before</h1>
            ) : (
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
                            <FormControl key={index}>
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    {`${index + 1} - ${question.question}`}
                                </FormLabel>
                                <RadioGroup
                                    column
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
                                    {question.choices.map((choice, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={choice}
                                            control={<Radio />}
                                            label={choice}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        ))}
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default McqTestPage;
