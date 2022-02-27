import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

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
                <h2>Hello</h2>
            </Box>
        </Container>
    );
};

export default McqTestPage;
