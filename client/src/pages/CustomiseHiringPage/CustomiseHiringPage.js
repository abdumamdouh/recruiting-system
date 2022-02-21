import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TaskIcon from "@mui/icons-material/Task";
import BugReportIcon from "@mui/icons-material/BugReport";

import CssBaseline from "@mui/material/CssBaseline";

export default function CustomiseHiringPage() {
    return (
        <>
            <Container
                component="main"
                maxWidth="sm"
                style={{ border: "1px solid", borderRadius: "15px" }}
                sx={{ overflow: "auto" }}
            >
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 5,
                        marginBottom: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left"
                    }}
                >
                    <Typography variant="h5" color="black">
                        Customise Your Hiring Pipeline For This Job
                    </Typography>

                    <Divider style={{ margin: "20px 0" }} />

                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                    >
                        you can customise your hiring pipeline by one of the
                        three options or more than one.
                    </Typography>

                    <Divider style={{ margin: "20px 0" }} />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            variant="outlined"
                            endIcon={<QuestionMarkIcon />}
                            style={{ marginRight: "15px" }}
                            color="primary"
                            onClick={() => console.log("clicked")}
                        >
                            MCQ
                        </Button>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                        >
                            you can make a custom MCQ test.
                        </Typography>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            margin: "20px 0"
                        }}
                    >
                        <Button
                            variant="outlined"
                            endIcon={<TaskIcon />}
                            style={{ marginRight: "15px" }}
                            color="primary"
                            onClick={() => console.log("clicked")}
                        >
                            Task
                        </Button>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                        >
                            you can request a special task.
                        </Typography>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}
                    >
                        <Button
                            variant="outlined"
                            endIcon={<BugReportIcon />}
                            style={{ marginRight: "15px" }}
                            color="primary"
                            onClick={() => console.log("clicked")}
                        >
                            coding
                        </Button>
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                        >
                            you can customise a coding problem.
                        </Typography>
                    </div>
                </Box>
            </Container>
        </>
    );
}
