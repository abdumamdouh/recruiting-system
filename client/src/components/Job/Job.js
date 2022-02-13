import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

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
        place,
        employees
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
                    alignItems: "left"
                }}
            >
                <Typography variant="h5" color="black">
                    {title}
                </Typography>

                <br />

                <Typography color="black">
                    {`${place} - ${workPlaceType}.`}{" "}
                    <Typography variant="caption" display="inline" color="gray">
                        {`${period} day ago. ${numOfApplicants} applicants`}
                    </Typography>
                </Typography>

                <Typography variant="body1" color="black">
                    <WorkOutlineOutlinedIcon /> {employmentType}
                </Typography>

                <Typography variant="body1" color="black">
                    <BadgeOutlinedIcon /> {`${employees} employees`}
                </Typography>

                {/* <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </Button> */}
            </Box>
        </Container>
    );
}
