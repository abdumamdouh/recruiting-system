import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";

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
                        three options or more than one
                    </Typography>

                    <Divider style={{ margin: "20px 0" }} />
                </Box>
            </Container>
        </>
    );
}
