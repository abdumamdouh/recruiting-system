import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EditJob from "../EditJob/EditJob";
import Message from "../modal/Message";
import "./job.scss";
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
    const history = useHistory();

    //for EditJob
    const [onEdit, setOnEdit] = useState(false);
    //pop up message state
    const [modalOpen, setModalOpen] = useState(false);
    //check applicant applied or not 
    
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
        // company,
        Recruiter,
        applied
    } = props.job;

    //handle state of modal in case of Recruiter
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [show, setShow] = React.useState(false);
    const showCandidates = () => setShow(true);
    const close = () => setShow(false);
    //handle candidates' number
    const [number, setNumber] = React.useState(0);
    //Applicant or Recruiter
    //type of user
    const state = useSelector((state) => state);
    const { type } = state.user.userInfo;
    // console.log(type);
    const [applyFor,setApplyFor]=useState(false)
    const copyApplicants =
        type === "Recruiter" && props.job.applicants !== undefined
            ? [...props.job.applicants]
            : null;

    const handleApply = async () => {
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
            const data = await rawResponse;

          if(data.status===200){
              setModalOpen(true)
              setApplyFor(true)
          }
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async () => {
        // console.log("delete");
        // console.log(props.id);
        // console.log(state.user.userInfo.token);

        alert("Deleted Successfully!");

        try {
            const rawResponse = await fetch(
                `http://localhost:5000/DeleteJob/${props.id}`,
                {
                    method: "DELETE",
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

    const handleApplicantRedirect = (id) => {
        history.push(`/applicant/${id}`);
    };

    const handleCustomise = () => {
        // console.log("hello");
      //  history.push(`/customiseHiring/${props.id}`);
        history.push(`/dashboard/AddExam`);
    };

    const handleMCQ = () => {
        // console.log("hello");
        history.push(`/job/exam/${props.job.id}`);
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            style={{ border: "1px solid", borderRadius: "15px" }}
            sx={{ overflow: "auto" }}
        >
            <CssBaseline />

      {modalOpen && <Message setOpenModal={setModalOpen} message='Applied successfully!' />}
            {/* applicants info in case of Recruiter */}
            {type === "Recruiter" && props.job.applicants !== undefined ? (
                <Modal
                    open={show}
                    onClose={close}
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
                            Candidates
                        </Typography>
                        <p style={{ color: "white" }}>
                            {" "}
                            {
                                (copyApplicants.length = Math.ceil(
                                    props.job.applicants.length / 2
                                ))
                            }{" "}
                        </p>
                        <div className="row">
                            <div className="col">Name</div>
                            <div className="col">Result</div>
                        </div>
                        {/* map through the applicants */}

                        {copyApplicants.filter(applicant=>applicant.score!==0).map((applicant) => (
                            <>
                                <div className="row" key={applicant.id}>
                                    <div
                                        className="col"
                                        onClick={() =>
                                            handleApplicantRedirect(
                                                applicant.id
                                            )
                                        }
                                    >
                                        {" "}
                                        <a href="#" style={{ color: "black" }}>
                                            {applicant.userName}
                                        </a>
                                    </div>
                                    <div className="col">{applicant.score}%</div>
                                </div>
                                <Divider />
                            </>
                        ))}
                    </Box>
                </Modal>
            ) : null}
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

                        {props.job.applicants !== undefined &&
                            props.job.applicants.map((applicant) => (
                                <div key={applicant.id}>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        {applicant.userName}
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
                <Typography color="black" variant="h6">
                    {title}
                </Typography>

                <br />

                <Typography color="black">
                    <LocationOnOutlinedIcon />
                    {` ${place} - ${workPlaceType}.`}{" "}
                    {/* <Typography variant="caption" display="inline" color="gray">
                        {`${period} day ago.`}
                    </Typography> */}
                    {type === "Recruiter" &&
                    props.job.applicants !== undefined ? (
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
                    <BeenhereOutlinedIcon />{" "}
                    {`${careerLevel} - ${yearsOfExperience} years of experience.`}
                </Typography>

                <div>
                    {type === "Applicant" ? (
                        <>
                        { (applied ||applyFor)?   <Button
                                variant="contained"
                              //  endIcon={<ReplyAllOutlinedIcon />}
                                sx={{ mt: 3, mb: 2 }}
                                disabled
                                //onClick={handleApply}
                            >
                                Applied
                            </Button>: <Button
                                variant="contained"
                                endIcon={<ReplyAllOutlinedIcon />}
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleApply}
                            >
                                Apply
                            </Button>}
                            <Button
                                variant="outlined"
                                onClick={() => console.log("hello")}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                            >
                                Save
                            </Button>
                            {/* <Button
                                variant="contained"
                                onClick={handleMCQ}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                color="secondary"
                            >
                                Take MCQ exam
                            </Button> */}
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                onClick={handleOpen}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                color="success"
                                size="small"
                            >
                                Applicants
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleCustomise}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                color="success"
                                size="small"
                            >
                                Screening Dashboard
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => console.log("hello")}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                size="small"
                                onClick={() => setOnEdit(true)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                                sx={{ mt: 3, mb: 2, ml: 1 }}
                                size="small"
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

                {type === "Recruiter" &&
                    props.job.Requirments !== undefined &&
                    props.job.Requirments.map((r, i) => (
                        <Typography
                            key={uuidv4()}
                            variant="body1"
                            color="black"
                            style={{ marginBottom: "7px" }}
                        >
                            {r.weight === 1 && `- ${r.name}, Beginner`}
                            {r.weight === 2 && `- ${r.name}, Experienced`}
                            {r.weight === 3 && `- ${r.name}, Advanced`}
                            {r.weight === 4 && `- ${r.name}, Expert`}
                        </Typography>
                    ))}
                {type === "Recruiter" &&
                    props.job.stack !== undefined &&
                    props.job.stack.map((r, i) => (
                        <Typography
                            key={uuidv4()}
                            variant="body1"
                            color="black"
                            style={{ marginBottom: "7px" }}
                        >
                            {r.weight === 1 && `- ${r.name}, Beginner`}
                            {r.weight === 2 && `- ${r.name}, Experienced`}
                            {r.weight === 3 && `- ${r.name}, Advanced`}
                            {r.weight === 4 && `- ${r.name}, Expert`}
                        </Typography>
                    ))}
                {type === "Applicant" &&
                    props.job.Requirments !== undefined &&
                    props.job.Requirments.map((r, i) => (
                        <Typography
                            key={uuidv4()}
                            variant="body1"
                            color="black"
                            style={{ marginBottom: "7px" }}
                        >
                            {`- ${r.name}`}
                        </Typography>
                    ))}

              

                {/* <Typography
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
                            {Recruiter.company}
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
                </Typography> */}
                {type === "Recruiter" && (
                    <div>
                        {/* <Divider />
                        <Typography variant="h6" color="black">
                            Screening results
                        </Typography> */}
                        {/* <div className="row">
                            <div className="column left">
                                <Typography variant="h8" color="black">
                                    Number of candidates
                                </Typography>
                            </div>
                            <div className="column right">
                                <TextField
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: noOfApplicants,
                                            min: 0
                                        }
                                    }}
                                    label="candidates"
                                    size="md"
                                    value={number}
                                    onChange={e => {
                                        setNumber(e.target.value);
                                    }}
                                />
                            </div>
                        </div> */}
                        {/* <Button
                            variant="contained"
                            onClick={showCandidates}
                            sx={{ mt: 3, mb: 2, ml: 1 }}
                            color="success"
                            size="small"
                        >
                            Show Candidates
                        </Button> */}
                        {onEdit && (
                            <EditJob setOnEdit={setOnEdit} job={props.job} />
                        )}
                    </div>
                )}
            </Box>
        </Container>
    );
}
