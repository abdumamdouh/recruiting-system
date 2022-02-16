import React from "react";
import { v4 as uuidv4 } from "uuid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import { useSelector } from "react-redux";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 50,
    p: 4
};

export default function Job(props) {
    //pull out the props
    const {
        description,
        workPlaceType,
        employmentType,
        title,
        yearsOfExperience,
        careerLevel,
        companyDescription,
        period,
        place,
        employees,
        company
    } = props.job;

    //handle state of modal in case of Recruiter
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Applicant or Recruiter
    //type of user
    const state = useSelector((state) => state);
    const { type } = state.user.userInfo;
    // console.log(type);

    const handleApply = async () => {
        console.log("apply");
        console.log(props.id);
        console.log(state.user.userInfo.token);

        try {
            const rawResponse = await fetch(
                `http://localhost:5000/jobs/applyFor/${props.id}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + state.user.userInfo.token
                    }
                }
            );
            const data = await rawResponse.json();
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            style={{ border: "1px solid", borderRadius: "15px" }}
        >
            <CssBaseline />
            {/* applicants info in case of Recruiter */}
            {type === "Recruiter" ? (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            color="black"
                        >
                            Applicants
                        </Typography>
                        {/* map through the applicants */}
                        {props.job.applicants.map((applicant) => (
                            <div key={applicant.id}>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                >
                                    Applicant {applicant.ApplicantId}
                                </Typography>
                                <Divider />
                            </div>
                        ))}
                    </Box>
                </Modal>
            ) : null}
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
                        {`${period} day ago.`}
                    </Typography>
                    {type === "Recruiter" ? (
                        <Typography
                            variant="caption"
                            display="inline"
                            color="gray"
                        >
                            {`${props.job.applicants.length} applicants`}
                        </Typography>
                    ) : null}
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
                    {type === "Applicant" ? (
                        <>
                            <Button
                                variant="contained"
                                endIcon={<ReplyAllOutlinedIcon />}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleApply}
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
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                onClick={handleOpen}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                color="success"
                            >
                                Show Applicants
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => console.log("hello")}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => console.log("hello")}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>

                <Divider />

                <Typography
                    variant="body2"
                    color="black"
                    style={{ margin: "12px 0" }}
                >
                    {description}
                </Typography>

                <Divider />

                <Typography
                    variant="h6"
                    color="black"
                    style={{ margin: "12px 0" }}
                >
                    Requirments
                </Typography>

                {type === "Recruiter" &&props.job.requirments.map((r, i) => (
                    <Typography
                        key={uuidv4()}
                        variant="body1"
                        color="black"
                        style={{ marginBottom: "7px" }}
                    >
                        {`- ${r.name}, weight ${r.weight}`}
                    </Typography>
                ))}
                {type === "Applicant" &&props.job.requirments.map((r, i) => (
                    <Typography
                        key={uuidv4()}
                        variant="body1"
                        color="black"
                        style={{ marginBottom: "7px" }}
                    >
                        {`- ${r.name}`}
                    </Typography>
                ))}

                <Divider />

                <Typography
                    variant="h6"
                    color="black"
                    style={{ margin: "12px 0" }}
                >
                    About the company
                </Typography>

                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR5QewxO_MYJMK1FLzbbudKZTxqZZsQM2v1QwCicQ62AgkoDFKpwelam5I6ckltAlgrIU&usqp=CAU"
                            sx={{ width: 75, height: 75 }}
                            style={{ marginRight: 8 }}
                            alt="logo"
                        />
                        <Typography variant="body1" color="black">
                            {company}
                        </Typography>
                    </div>

                    <Button
                        variant="contained"
                        onClick={() => console.log("hello")}
                        sx={{ mt: 3, mb: 2, ml: 1 }}
                    >
                        Follow
                    </Button>
                </div>

                <Typography variant="body1" color="black">
                    {companyDescription}
                </Typography>
            </Box>
        </Container>
    );
}
