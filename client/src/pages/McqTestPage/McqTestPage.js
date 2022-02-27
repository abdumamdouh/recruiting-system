import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

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
        }
    ]
};

const McqTestPage = (props) => {
    //ID of the job
    const { ID } = useParams();
    return (
        <Container
            component="main"
            maxWidth="md"
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
                <Typography
                    color="black"
                    variant="h5"
                    style={{ textAlign: "center" }}
                >
                    {MCQ.topic}
                </Typography>
            </Box>
        </Container>
    );
};

export default McqTestPage;
