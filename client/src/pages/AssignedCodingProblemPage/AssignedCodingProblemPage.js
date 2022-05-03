import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { Button, TextField, MenuItem, Switch } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyTimer from "./MyTimer";
import "./AssignedCodingProblemPage.scss";
export default function CodingProblem() {
    const { codingProblemId } = useParams();
    const [mode, setMode] = useState(true);
    const [programmingLanguage, setProgrammingLanguage] = useState("C");
    const [codingProblem, setCodingProblem] = useState();
    const [index, setIndex] = useState(0);
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
    const programmingLanguages = [
        {
            languague: "C",
            code: `#include <stdio.h>
int main() {
    // Write your code here
    
    return 0;
}`,
            view: cpp()
        },
        {
            languague: "C++",
            code: `#include <iostream>
using namespace std;
int main() {
    // Write your code here
    
    return 0;
}`,
            view: cpp()
        },
        {
            languague: "Java",
            code: `class Problem {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`,
            view: java()
        },
        {
            languague: "JavaScript",
            code: `// Write your code here
`,
            view: javascript()
        },
        {
            languague: "Python",
            code: `# Write your code here
`,
            view: python()
        }
    ];
    let time = new Date();
    time.setSeconds(time.getSeconds() + 50 * 60);
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
        <ReflexContainer className="container" orientation="vertical">
            <ReflexElement className="leftPanel" minSize={350}>
                <div>
                    <h3 className="title">{codingProblem?.title}</h3>
                    <div>{codingProblem?.description}</div>
                </div>
            </ReflexElement>
            <ReflexSplitter
                className={`ReflexSplitter ${
                    mode ? "ReflexSplitterDarkMode" : "ReflexSplitterLightMode"
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
                                    mode ? "switchDarkMode" : "switchLightMode"
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
                                    mode ? "switchDarkMode" : "switchLightMode"
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
                    />
                </div>
                <div
                    className={`editorFooter ${
                        mode ? "darkMode" : "lightMode"
                    }`}
                >
                    <MyTimer
                        expiryTimestamp={time}
                        // handleOnExpire={handleSubmit}
                        mode={mode}
                    />
                    <Button
                        sx={{
                            marginRight: "0.6rem",
                            margin: "0.4rem",
                            fontSize: "1rem"
                        }}
                        variant="contained"
                        // onClick={showModal}
                    >
                        Submit
                    </Button>
                </div>
            </ReflexElement>
        </ReflexContainer>
        // </div>
    );
}
