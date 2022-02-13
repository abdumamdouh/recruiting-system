import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import WorkIcon from "@mui/icons-material/Work";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Job(props) {
    //pull out the props
    const {
        description,
        workPlaceType,
        employmentType,
        title,
        yearsOfExperience,
        careerLevel,
        companyName,
        companyDescription,
        numOfApplicants,
        period,
        place
    } = props.job;

    //TODO: Applicant or Recruiter booleans
    // const {} = props:

    return (
        <Container
            component="main"
            maxWidth="sm"
            style={{ border: "2px solid" }}
        >
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography variant="h5" color="black">
                    {title}
                </Typography>

                {/* <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button> */}
            </Box>
        </Container>
    );
}
