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

import Countdown from "./Countdown";
import MyTimer from "./MyTimer";
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
                const response = await fetch(`http://localhost:5000/getMCQ/1`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    }
                });
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
            console.log(JSON.stringify(McqAnswers));
            console.log(userInfo.token);
            //TODO: replace the hardcoded job id with the id of the job
            const rawResponse = await fetch(
                `http://localhost:5000/submit/${ID}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify({ McqAnswers })
                }
            );
            const data = await rawResponse;
            console.log(data);
            if (data.status === 202) {
                setMcqTaken(true);
                setModalOpen(true);
            }
        } catch (error) {
            console.log(error.message);
        }
        // setMcqTaken(true);
    };

    //TODO: replace the hardcoded value with the duration from the API
    const time = new Date();
    time.setSeconds(time.getSeconds() + Mcq.duration * 60); // 10 minutes timer

    return (
        <>
            {modalOpen && (
                <Message
                    setOpenModal={setModalOpen}
                    message="Submitted Successfully!"
                />
            )}
            {McqTaken ? (
                <h1>You have submitted the MCQ exam successfully.</h1>
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
                            color: "#696969",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            overflow: "auto"
                        }}
                        component="div"
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "spaceBetween",
                                alignSelf: "center"
                            }}
                        >
                            <Typography
                                color="black"
                                variant="h5"
                                style={{
                                    textAlign: "right",
                                    fontWeight: "800",
                                    fontSize: "3rem"
                                }}
                            >
                                {Mcq.topic}
                            </Typography>
                            {Mcq.duration && <MyTimer expiryTimestamp={time} handleOnExpire={() => console.log("alooo")} />}
                        </div>

                        <Divider style={{ margin: "20px 0" }} />
                        {/* {JSON.stringify(Mcq)} */}
                        {Mcq.questions &&
                            Mcq.questions.map((question, index) => (
                                <FormControl key={index}>
                                    <FormLabel
                                        id="demo-row-radio-buttons-group-label"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "auto auto",
                                            justifyContent: "start",
                                            gridGap: "8px"
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            color="black"
                                            style={{
                                                fontWeight: "600",
                                                fontSize: "25px",
                                                // overflowWrap: "break-word",
                                                display: "inline"
                                                // justifyItems: "start"
                                            }}
                                        >{`${index + 1}-`}</Typography>
                                        <Typography
                                            variant="h6"
                                            color="black"
                                            style={{
                                                fontWeight: "600",
                                                fontSize: "25px",
                                                wordWrap: "break-word",
                                                wordBreak: "break-all",
                                                display: "inline"
                                            }}
                                        >
                                            {`${question.question}${
                                                question.question[
                                                    question.question.length - 1
                                                ] === "."
                                                    ? ""
                                                    : "."
                                            }`}
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
                                                    labelPlacement="top"
                                                    sx={{
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                            "auto auto",
                                                        justifyContent: "start",
                                                        alignContent: "start"
                                                    }}
                                                    key={index}
                                                    value={choice}
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                alignSelf:
                                                                    "start"
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Typography
                                                            style={{
                                                                fontFamily:
                                                                    "calibri",
                                                                fontSize:
                                                                    "19px",
                                                                wordWrap:
                                                                    "break-word",
                                                                wordBreak:
                                                                    "break-all",
                                                                display:
                                                                    "inline"
                                                            }}
                                                        >
                                                            {`${choice}${
                                                                choice[
                                                                    choice.length -
                                                                        1
                                                                ] === "."
                                                                    ? ""
                                                                    : "."
                                                            }`}
                                                        </Typography>
                                                    }
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
