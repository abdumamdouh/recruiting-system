import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { basicSetup } from "@codemirror/basic-setup";
import { cpp, cppLanguage } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { EditorState, EditorStateConfig, Extension } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Completion, autocompletion } from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";
import {
    Button,
    TextField,
    MenuItem,
    Switch,
    Stack,
    Skeleton,
    Modal,
    Box,
    Typography
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyTimer from "./MyTimer";
import "./AssignedCodingProblemPage.scss";
import { display, margin } from "@mui/system";
export default function CodingProblem() {
    const programmingLanguages = [
        {
            languague: "C",
            code: `#include <stdio.h>
int main() {
    // Write your code here
    
    return 0;
}`,
            view: cpp(),
            server: "c"
        },
        {
            languague: "C++",
            code: `#include <iostream>
using namespace std;
int main() {
    // Write your code here
    
    return 0;
}`,
            view: cpp(),
            server: "cpp"
        },
        {
            languague: "Java",
            code: `class Problem {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`,
            view: java(),
            server: "java"
        },
        {
            languague: "JavaScript",
            code: `// Write your code here
`,
            view: javascript(),
            server: "javascript"
        },
        {
            languague: "Python",
            code: `# Write your code here
`,
            view: python(),
            server: "python"
        }
    ];
    const history = useHistory();
    const { codingProblemId } = useParams();
    const [mode, setMode] = useState(true);
    const [programmingLanguage, setProgrammingLanguage] = useState(
        programmingLanguages[0].languague
    );
    const [codingProblem, setCodingProblem] = useState();
    const [index, setIndex] = useState(0);
    const [codingProblemSolution, setCodingProblemSolution] = useState(
        programmingLanguages[0].code
    );
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        const fetchCodingProblem = async () => {
            try {
                console.log(userInfo.token);
                const response = await fetch(
                    //TODO: make it dynamic
                    `http://localhost:5000/getCodingProblem/${codingProblemId}`,
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
                setCodingProblem(data);
                //TODO: condition for success
                // showModal();
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchCodingProblem();
    }, []);
    const handleSubmit = async () => {
        // console.log(codingProblemSolution);
        //remove time from loccal storage
        localStorage.removeItem("time");
        try {
            const jobId = localStorage.getItem("jobId");
            const rawResponse = await fetch(
                `http://localhost:5000/submitSolution`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + userInfo.token
                    },
                    body: JSON.stringify({
                        jobId: Number(jobId),
                        codingProblemId: Number(codingProblemId),
                        language: programmingLanguages[index].server,
                        code: codingProblemSolution
                    })
                }
            );
            const data = await rawResponse;
            console.log(data);
            if (data.status === 200) {
                localStorage.removeItem("jobId");
                localStorage.setItem(
                    "message",
                    "The coding problem is submitted successfully."
                );
                history.push("/feed");
                // setIsSubmitted(true);
                // setModalOpen(true);
            }
        } catch (error) {
            console.log(error.message);
        }
        // setMcqTaken(true);
    };
    const handleCloseModal = () => setModalOpen(false);
    const theme = createTheme({
        palette: { mode: mode ? "dark" : "light" },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        height: "4vh",
                        width: "15ch",
                        // marginTop: "5px",
                        marginLeft: "0.6rem",
                        // color: mode ? "#FFFFFF" : "#212529",
                        paddingBottom: "2px"
                    }
                    // Default State
                    // notchedOutline: {
                    //     borderColor: "yellow"
                    // }
                }
            }
        }
    });

    if (codingProblem?.duration !== undefined) {
        let time = new Date();
        time.setSeconds(time.getSeconds() + codingProblem.duration * 60);
        console.log(time);
        if (localStorage.getItem("time") !== null) {
            console.log(localStorage.getItem("time"));
            time = new Date(localStorage.getItem("time"));
        }
        if (localStorage.getItem("time") === null) {
            localStorage.setItem("time", time);
        }
        // const globalCppCompletions = cppLanguage.data.of({
        //     autocomplete: completeFromGlobalScope
        // });
        // let theme = EditorView.theme(
        //     {
        //         ".cm-content, .cm-gutter": { minHeight: "500px" }
        //     },
        //     { oneDark: true }
        // );
        // let editor = new EditorView({
        //     state: EditorState.create({
        //         doc: '#include <iostream> \n \
        //         int main() { \n \
        //             std::cout << "Hello World"; \n \
        //             return 0;\n \
        //         }',
        //         extensions: [basicSetup, cpp(), autocompletion()]
        //     }),
        //     parent: document.body.querySelector(".rightPanel")
        // });
        return (
            // <div className="container">
            <>
                {modalOpen && (
                    <Modal
                        open={modalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4
                            }}
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                style={{
                                    color: "black",
                                    fontWeight: 600,
                                    fontSize: "1.75rem"
                                }}
                            >
                                Are you sure you want to submit?
                            </Typography>

                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                style={{ textAlign: "center" }}
                            >
                                (No turning back after clicking Submit)
                            </Typography>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    style={{
                                        marginTop: "15px",
                                        marginRight: "15px"
                                    }}
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCloseModal}
                                    style={{ marginTop: "15px" }}
                                >
                                    Exit
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                )}
                <ReflexContainer className="container" orientation="vertical">
                    <ReflexElement className="leftPanel" minSize={350}>
                        <div>
                            <h3 className="title">{codingProblem?.title}</h3>
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "center",
                                    margin: "0.2rem"
                                }}
                            >
                                <div
                                    style={{
                                        flexFlow: "column",
                                        width: "70%",
                                        textAlign: "justify"
                                    }}
                                >
                                    <div>{codingProblem?.description}</div>
                                    {codingProblem.TestCases.map(
                                        ({ inputs, outputs }, count = 1) => {
                                            return (
                                                <div
                                                    style={{
                                                        marginTop: "0.8rem"
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: "1.5rem",
                                                            fontWeight: "bold"
                                                        }}
                                                    >{`Example${
                                                        codingProblem.TestCases
                                                            .length > 1
                                                            ? ` ${++count}`
                                                            : ""
                                                    }:`}</span>
                                                    <pre
                                                        style={{
                                                            backgroundColor:
                                                                "#f7f9fa",
                                                            padding: "0.4rem",
                                                            display: "grid",
                                                            gridRowGap:
                                                                "0.2rem",
                                                            fontSize: "1rem",
                                                            marginTop: "0.8rem"
                                                        }}
                                                    >
                                                        <span>
                                                            <strong>
                                                                Input:
                                                            </strong>{" "}
                                                            {inputs}
                                                        </span>
                                                        <span>
                                                            <strong>
                                                                Output:
                                                            </strong>{" "}
                                                            {outputs}
                                                        </span>
                                                    </pre>
                                                </div>
                                            );
                                        }
                                    )}
                                    <div style={{ marginTop: "0.8rem" }}>
                                        <span
                                            style={{
                                                fontSize: "1.5rem",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            Constraints:
                                        </span>
                                        <ul>
                                            <li>
                                                <pre
                                                    style={{
                                                        backgroundColor:
                                                            "#f7f9fa",
                                                        padding: "0.4rem",
                                                        display: "grid",
                                                        gridRowGap: "0.2rem",
                                                        fontSize: "1rem",
                                                        marginTop: "0.8rem"
                                                    }}
                                                >
                                                    <div>
                                                        <strong>
                                                            Time Constraint:
                                                        </strong>{" "}
                                                        {`${codingProblem.timeConstraint} seconds`}
                                                    </div>
                                                </pre>
                                            </li>
                                            <li>
                                                <pre
                                                    style={{
                                                        backgroundColor:
                                                            "#f7f9fa",
                                                        padding: "0.4rem",
                                                        display: "grid",
                                                        gridRowGap: "0.2rem",
                                                        fontSize: "1rem",
                                                        marginTop: "0.8rem"
                                                    }}
                                                >
                                                    <div>
                                                        <strong>
                                                            Space Constraint:
                                                        </strong>{" "}
                                                        {`${codingProblem.memoryConstraint} MB`}
                                                    </div>
                                                </pre>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReflexElement>
                    <ReflexSplitter
                        className={`ReflexSplitter ${
                            mode
                                ? "ReflexSplitterDarkMode"
                                : "ReflexSplitterLightMode"
                        }`}
                    />
                    <ReflexElement className="rightPanel">
                        <div
                            className={`editorHeader ${
                                mode ? "darkMode" : "lightMode"
                            }`}
                        >
                            <ThemeProvider theme={theme}>
                                <TextField
                                    className="combobox"
                                    id="outlined-basic"
                                    select
                                    variant="outlined"
                                    label={null}
                                    // sx={
                                    //     {
                                    // "& .MuiInputLabel-root.Mui-disabled": {
                                    //     ":disabled": true
                                    // }
                                    // "& .MuiOutlinedInput-root:hover": {
                                    //     "& > fieldset": {
                                    //         border: "none"
                                    //     }
                                    // },
                                    // "& .MuiOutlinedInput-root.Mui-focused": {
                                    //     "& > fieldset": {
                                    //         borderColor: "green"
                                    //     }
                                    // }
                                    //     }
                                    // }
                                    SelectProps={{
                                        MenuProps: {
                                            sx: { marginTop: "-0.9rem" }
                                            // anchorOrigin: {
                                            //     vertical: "bottom",
                                            //     horizontal: "center"
                                            // },
                                            // transformOrigin: {
                                            //     vertical: "bottom",
                                            //     horizontal: "center"
                                            // },
                                            // getContentAnchorEl: null
                                        }
                                    }}
                                    value={programmingLanguage}
                                    onChange={(e) => {
                                        setProgrammingLanguage(e.target.value);
                                        setIndex(
                                            programmingLanguages.findIndex(
                                                ({ languague }) =>
                                                    languague === e.target.value
                                            )
                                        );
                                        setCodingProblemSolution(
                                            programmingLanguages[index].code
                                        );
                                    }}
                                >
                                    {programmingLanguages.map((option) => (
                                        <MenuItem
                                            sx={{ height: "4vh" }}
                                            key={option.languague}
                                            value={option.languague}
                                        >
                                            {option.languague}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div
                                    style={{
                                        marginLeft: "0.4rem",
                                        marginRight: "0.6rem",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    <span
                                        className={
                                            mode
                                                ? "switchDarkMode"
                                                : "switchLightMode"
                                        }
                                    >
                                        Light
                                    </span>
                                    <Switch
                                        checked={mode}
                                        onChange={() => {
                                            setMode(!mode);
                                        }}
                                        size="small"
                                    ></Switch>
                                    <span
                                        className={
                                            mode
                                                ? "switchDarkMode"
                                                : "switchLightMode"
                                        }
                                    >
                                        Dark
                                    </span>
                                </div>
                            </ThemeProvider>
                        </div>
                        <div>
                            <CodeMirror
                                value={programmingLanguages[index].code}
                                height="75vh"
                                theme={mode ? "dark" : "light"}
                                extensions={[
                                    basicSetup,
                                    programmingLanguages[index].view,
                                    autocompletion()
                                ]}
                                onChange={(value) => {
                                    setCodingProblemSolution(value);
                                }}
                            />
                        </div>
                        <div
                            className={`editorFooter ${
                                mode ? "darkMode" : "lightMode"
                            }`}
                        >
                            <MyTimer
                                expiryTimestamp={time}
                                handleOnExpire={handleSubmit}
                                mode={mode}
                            />
                            <Button
                                sx={{
                                    marginRight: "0.6rem",
                                    margin: "0.4rem",
                                    fontSize: "1rem"
                                }}
                                variant="contained"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </ReflexElement>
                </ReflexContainer>
            </>
            // </div>
        );
    } else {
        return (
            <Stack spacing={1}>
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" width={210} height={210} />
                <Skeleton variant="rectangular" width={210} height={210} />
            </Stack>
        );
    }
}
