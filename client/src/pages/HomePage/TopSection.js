import React from "react";
import { Element, scroller } from "react-scroll";
// import { Snackbar } from "@mui/material";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import BackgroundImg from "../../assets/images/company_team.jpg";
import { Logo } from "../../components/Logo/Logo";
import { Marginer } from "../../components/Marginer/Marginer";
import { Button } from "../../components/Button/Button";
import { DownArrow } from "../../components/DownArrow/DownArrow";
// import MuiAlert from "@mui/material/Alert";

const TopContainer = styled.div`
    width: 100%;
    height: 90vh;
    padding: 0;
    background-image: url(${BackgroundImg});
    position: relative;
`;

const BackgroundFilter = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(55, 55, 55, 0.89);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MotivitionalText = styled.h2`
    font-size: 33px;
    font-weight: bold;
    margin: 0;
    color: #fff;
    max-width: 65%;
`;

const DownArrowContainer = styled.div`
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
`;

export function TopSection(props) {
    const history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem("message")) {
    //         setOpen(true);
    //     }
    // }, []);
    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    // });
    // const [open, setOpen] = useState(false);
    // const handleClose = (event, reason) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     setOpen(false);
    //     localStorage.removeItem("message");
    // };
    const handleApplicant = () => {
        history.push("/signup-applicant");
    };

    const handleRecruiter = () => {
        history.push("/signup-recruiter");
    };

    const scrollToNextSection = () => {
        scroller.scrollTo("servicesSection", { smooth: true, duration: 1500 });
    };

    return (
        <>
            {/* <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {localStorage.getItem("message")}
                </Alert>
            </Snackbar> */}

            <Element name="topSection">
                <TopContainer>
                    <BackgroundFilter>
                        <Marginer direction="vertical" margin="3em" />
                        <Logo />
                        <Marginer direction="vertical" margin="1em" />
                        <MotivitionalText>
                            To make the hiring process easier and more organized
                        </MotivitionalText>
                        <Marginer direction="vertical" margin="2em" />
                        <Button onClick={handleApplicant}>
                            Apply as Applicant
                        </Button>
                        <Marginer direction="vertical" margin="1em" />
                        <Button onClick={handleRecruiter}>
                            Apply as Recruiter
                        </Button>
                        <DownArrowContainer onClick={scrollToNextSection}>
                            <DownArrow />
                        </DownArrowContainer>
                    </BackgroundFilter>
                </TopContainer>
            </Element>
        </>
    );
}
