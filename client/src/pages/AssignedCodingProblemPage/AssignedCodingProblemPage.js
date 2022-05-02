import React, { useState } from "react";
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
import { Button, TextField, MenuItem } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyTimer from "./MyTimer";
import "./AssignedCodingProblemPage.scss";
export default function CodingProblem() {
    const theme = createTheme({
        palette: { mode: "dark" },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        height: "4vh",
                        width: "15ch",
                        marginTop: "5px",
                        marginLeft: "5px",
                        color: "#FFFFFF",
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
    printf("Hello World!");
    return 0;
}`,
            view: cpp()
        },
        {
            languague: "C++",
            code: `#include <iostream>
int main() {
    std::cout << "Hello World!";
    return 0;
}`,
            view: cpp()
        },
        {
            languague: "Java",
            code: `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
            view: java()
        },
        {
            languague: "JavaScript",
            code: 'console.log("Hello World!");',
            view: javascript()
        },
        {
            languague: "Python",
            code: 'print("Hello World!")',
            view: python()
        }
    ];
    const [programmingLanguage, setProgrammingLanguage] = useState("C");
    const [index, setIndex] = useState(0);
    let time = new Date();
    time.setSeconds(time.getSeconds() + 5 * 60);
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
                    <h3 className="title">Title</h3>
                    <div>description</div>
                </div>
            </ReflexElement>
            <ReflexSplitter className="ReflexSplitter" />
            <ReflexElement className="rightPanel">
                <div className="editorHeader">
                    <ThemeProvider theme={theme}>
                        <TextField
                            className="combobox"
                            id="outlined-basic"
                            select
                            variant="outlined"
                            label={null}
                            sx={{
                                "& .MuiInputLabel-root.Mui-disabled": {
                                    ":disabled": true
                                }
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
                            }}
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
                    </ThemeProvider>
                </div>
                <div>
                    <CodeMirror
                        value={programmingLanguages[index].code}
                        height="75vh"
                        theme={oneDark}
                        extensions={[
                            basicSetup,
                            programmingLanguages[index].view,
                            autocompletion()
                        ]}
                    />
                </div>
                <div className="editorFooter">
                    <MyTimer
                        expiryTimestamp={time} /*handleOnExpire={handleSubmit}*/
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
