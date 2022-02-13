import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";

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
            style={{ border: "1px solid", borderRadius: "15px" }}
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
                    {title}
                </Typography>

                <br />

                <Typography color="black">
                    <LocationOnOutlinedIcon />
                    {` ${place} - ${workPlaceType}.`}{" "}
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

                <Typography variant="body1" color="black">
                    <BeenhereOutlinedIcon />{" "}
                    {`${careerLevel} - ${yearsOfExperience} years of experience.`}
                </Typography>

                <div>
                    <Button
                        variant="contained"
                        endIcon={<ReplyAllOutlinedIcon />}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Apply
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => console.log("hello")}
                        sx={{ mt: 3, mb: 2, ml: 1 }}
                    >
                        Save
                    </Button>
                </div>

                <Divider />

                <Typography
                    variant="body2"
                    color="black"
                    style={{ marginTop: "12px" }}
                >
                    {description}
                </Typography>
            </Box>
        </Container>
    );
}
