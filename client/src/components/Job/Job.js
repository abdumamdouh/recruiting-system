import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import WorkIcon from "@mui/icons-material/Work";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Job() {
    return (
        <Container
            component="main"
            maxWidth="md"
            style={{ border: "2px solid" }}
        >
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <WorkIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Typography>lorem300</Typography>

                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button>
            </Box>
        </Container>
    );
}
