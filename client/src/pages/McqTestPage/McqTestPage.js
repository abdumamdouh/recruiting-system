import React from "react";
import { useParams } from "react-router-dom";

// import "react-notifications/lib/notifications.css";
// import Notification from "../../components/Notification";
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

import Message from "../../components/modal/Message";


import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

let MCQQ = {
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
    //TODO: check if it's taken or not from BE on componentDidMount
    const [McqTaken, setMcqTaken] = useState(false);
    const [Mcq, setMcq] = useState([]);
    //pop up message state
    const [modalOpen, setModalOpen] = useState(false);

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const getQuestion = async () => {
            console.log(userInfo.token);
            try {
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
                //TODO: check taken flag and update the state based on it
                console.log("alo");
                console.log(data);
                console.log(data.questions);
                setMcq(data);
                // MCQ = data;
                setMcqTaken(false);
            } catch (error) {
                console.log(error);
            }
        };
        getQuestion();
    }, []);

    let McqAnswers = {};
    //ID of the job
    const { ID } = useParams();
    let margin = Mcq.questions?.length > 17 ? 55 * 4 : 40 * 5;
    margin = Mcq.questions?.length > 25 ? 65 * 3.4 : margin;
    margin = Mcq.questions?.length > 35 ? 75 * 3 : margin;

    const stackMargin = `${margin * Mcq.questions?.length}px`;

    const handleMcqChange = (event, id) => {
        McqAnswers = { ...McqAnswers, [id]: event.target.value };
        console.log(McqAnswers);
    };

    const handleSubmit = async () => {
        // console.log("alo");
        // alert("submitted successfully!");
        // setMcqTaken(true);
        // setModalOpen(true)

        try {
            console.log(McqAnswers);
            //TODO: replace the hardcoded job id with the id of the job
            const rawResponse = await fetch(`http://localhost:5000/submit/${ID}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userInfo.token
                },
                body: JSON.stringify(McqAnswers)
            });
            const data = await rawResponse;
            console.log(data);
            if(data.status===200){
                setMcqTaken(true);
                setModalOpen(true);
            }
        } catch (error) {
            console.log(error);
        }
        // setMcqTaken(true);
    };
    return (
        <>
            {modalOpen && <Message setOpenModal={setModalOpen} message='Submitted Successfully!' />}
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
                            {Mcq.topic}
                        </Typography>

                        <Divider style={{ margin: "20px 0" }} />
                        {/* {JSON.stringify(Mcq)} */}
                        {Mcq.questions &&
                            Mcq.questions.map((question, index) => (
                                <FormControl key={index}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        <Typography variant="h6" color='black'>
                                            {`${index + 1} - ${question.question}`}
                                        </Typography>
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
                                        {question.choices.map(
                                            (choice, index) => (
                                                <FormControlLabel
                                                    key={index}
                                                    value={choice}
                                                    control={<Radio />}
                                                    label={choice}
                                                />
                                            )
                                        )}
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
                        {/* <Notification /> */}
                    </Box>
                </Container>
            )}
        </>
    );
};

export default McqTestPage;
