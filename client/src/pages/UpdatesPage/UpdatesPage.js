import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdatePage.scss";

const UPDATES = [
    {
        examTopic: "JS",
        recruiter: "Jack",
        jobTitile: "Backend",
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
    const history = useHistory();
    //slice of state for udpates
    const [updates, setUpdates] = useState([]);
    //modal state
    const [modalData, setModalData] = useState();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { userInfo } = useSelector((state) => state.user);

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
        if (userInfo.hasOwnProperty("hasAssessments")) fetchUpdates();
    }, []);

    const handleRedirection = (id) => {
        // console.log("redii");
        history.push(`/job/exam/${id}`);
    };

    const handleMCQ = (obj) => {
        console.log(obj);
        setModalData(obj);
        handleOpen();
    };
    return (
        <div className="c">
            {!userInfo.hasOwnProperty("hasAssessments") ? (
                <>
                    <h3 className="hh3">You don't have any Assessment yet.</h3>
                </>
            ) : (
                <>
                    <h3 className="hh3">Your Assessments</h3>
                    <div className="updates">
                        {updates.map((update) => {
                            const avatar =
                                update.avatar !== null ? update.avatar : null;
                            const base64String =
                                update.avatar !== null
                                    ? btoa(
                                          String.fromCharCode(
                                              ...new Uint8Array(avatar.data)
                                          )
                                      )
                                    : "";
                            return (
                                <div className="update">
                                    {base64String === "" ? null : (
                                        <img
                                            // make img dynamic
                                            src={base64String}
                                            alt="logo"
                                            className="immg"
                                        />
                                    )}
                                    <p>
                                        <div className="mcq">
                                            <p>
                                                <strong>Title:</strong>
                                            </p>{" "}
                                            <p>{update.title}</p>
                                            <p>
                                                <strong>Company:</strong>
                                            </p>{" "}
                                            <p>{update.company}</p>
                                            <p>
                                                <strong>Description:</strong>
                                            </p>{" "}
                                            <p>{update.description}</p>
                                            <p>
                                                <strong>
                                                    {update.MCQ.length > 1
                                                        ? "Assessments"
                                                        : "Assessment"}
                                                    :
                                                </strong>
                                            </p>
                                            <ul class="nav">
                                                <div className="assessment">
                                                    {update.MCQ.map((obj) => (
                                                        <>
                                                            <div>
                                                                <OverlayTrigger
                                                                    key={
                                                                        obj.topic
                                                                    }
                                                                    placement="auto-start"
                                                                    delay={{
                                                                        show: 250,
                                                                        hide: 400
                                                                    }}
                                                                    overlay={
                                                                        <Popover
                                                                            id={
                                                                                obj.topic
                                                                            }
                                                                        >
                                                                            <Popover.Header as="h3">
                                                                                MCQ
                                                                            </Popover.Header>
                                                                            <Popover.Body>
                                                                                <strong>
                                                                                    Expiry
                                                                                    Date:
                                                                                </strong>{" "}
                                                                                {obj.expiryDate.substring(
                                                                                    0,
                                                                                    obj.expiryDate.search(
                                                                                        "T"
                                                                                    )
                                                                                )}
                                                                                <br></br>
                                                                                <strong>
                                                                                    Duration:
                                                                                </strong>{" "}
                                                                                {
                                                                                    obj.duration
                                                                                }{" "}
                                                                                minutes
                                                                                <br></br>
                                                                            </Popover.Body>
                                                                        </Popover>
                                                                    }
                                                                >
                                                                    <li
                                                                        key={
                                                                            obj.topic
                                                                        }
                                                                        class="nav-item"
                                                                    >
                                                                        {/*redirect*/}
                                                                        <span
                                                                            onClick={() =>
                                                                                handleMCQ(
                                                                                    obj
                                                                                )
                                                                            }
                                                                            className="redirect"
                                                                        >
                                                                            {
                                                                                obj.topic
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </ul>
                                        </div>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
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
                                now you will be redirect to a MCQ Test.the topic
                                of the MCQ is Alo and the duration is 30
                                minutes.
                            </Typography>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handleRedirection(modalData.id)
                                    }
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
                </>
            )}
        </div>
    );
};

export default UpdatesPage;
