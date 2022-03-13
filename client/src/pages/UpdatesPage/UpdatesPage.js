import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import "./UpdatePage.scss";

const UPDATES = [
    {
        examTopic: "nigga",
        recruiter: "elsisi",
        jobTitile: "zbal",
        img: "https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
    }
];

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

const UpdatesPage = (props) => {
    //slice of state for udpates
    const [updates, setUpdates] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { userInfo } = useSelector((state) => state.user);

    const popover = {};

    useEffect(() => {
        const fetchUpdates = async () => {
            console.log("alo");
            try {
                const response = await fetch(
                    `http://localhost:5000/assessments`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + userInfo.token
                        }
                    }
                );
                const data = await response.json();
                console.log(data);
                setUpdates(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (userInfo.hasOwnProperty("hasAssessment")) fetchUpdates();
    }, []);

    return (
        <div className="c">
            {!userInfo.hasOwnProperty("hasAssessment") ? (
                <>
                    <h3 className="hh3">You don't have any Assessment yet.</h3>
                    <div>
                        <Button onClick={handleOpen}>Open modal</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box
                                sx={modalStyle}
                                style={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                    style={{ color: "black" }}
                                >
                                    MCQ Test
                                </Typography>
                                <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                    style={{ textAlign: "center" }}
                                >
                                    now you will be redirect to a MCQ Test.the
                                    topic of the MCQ is Alo and the duration is
                                    30 minutes.
                                </Typography>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        onClick={() => console.log("mcqqq")}
                                        style={{
                                            marginTop: "15px",
                                            marginRight: "15px"
                                        }}
                                    >
                                        Take MCQ NOW
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleClose}
                                        style={{ marginTop: "15px" }}
                                    >
                                        Exit
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="hh3">Your Assessments</h3>
                    <div className="updates">
                        {updates.map((update) => (
                            <div className="update">
                                <img
                                    src="https://a.allegroimg.com/original/115895/b594fa094f3288495c442ac555f5/KLOCKI-HAM-BMW-T-E60-E61-VALEO-Typ-samochodu-Samochody-osobowe"
                                    alt="logo"
                                    className="immg"
                                />
                                <p>
                                    <strong>Title:</strong> {update.title}{" "}
                                    <br></br>
                                    <strong>Company:</strong> {update.company}{" "}
                                    <br></br>
                                    <strong>Description:</strong>{" "}
                                    {update.description} <br></br>
                                    <div className="mcq">
                                        <strong>
                                            {update.MCQ.length > 1
                                                ? "Assessments"
                                                : "Assessment"}
                                            :
                                        </strong>
                                        <ul class="nav flex-row goleft">
                                            {update.MCQ.map((obj) => (
                                                <>
                                                    <li
                                                        key={obj.topic}
                                                        class="nav-item"
                                                    >
                                                        <a
                                                            class="nav-link active"
                                                            href="#"
                                                        >
                                                            {obj.topic}
                                                        </a>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* <strong>Expiry Date:</strong> 25/3/2021 <br></br> */}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdatesPage;
