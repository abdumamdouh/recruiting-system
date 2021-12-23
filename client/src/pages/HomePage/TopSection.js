import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import BackgroundImg from "../../assets/images/company_team.jpg";
import { Logo } from "../../components/Logo/Logo";
import { Marginer } from "../../components/Marginer/Marginer";
import { Button } from "../../components/Button/Button";
import { DownArrow } from "../../components/DownArrow/DownArrow";

const TopContainer = styled.div`
  width: 100%;
  height: 100vh;
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
`;

const DownArrowContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`;

export function TopSection(props) {
  const history = useHistory();
  const handleApplicant = () => {
    history.push("/signup-applicant");
  };
  const handleRecruiter = () => {
    history.push("/signup-recruiter");
  };
  return (
    <TopContainer>
      <BackgroundFilter>
        <Marginer direction="vertical" margin="5em" />
        <Logo />
        <Marginer direction="vertical" margin="2em" />
        <MotivitionalText>Find your next opportunity</MotivitionalText>
        <Marginer direction="vertical" margin="2em" />
        <Button onClick={handleApplicant}>Apply as an Applicant</Button>
        <Marginer direction="vertical" margin="1em" />
        <Button onClick={handleRecruiter}>Apply as a Recruiter</Button>
        <DownArrowContainer>
          <DownArrow />
        </DownArrowContainer>
      </BackgroundFilter>
    </TopContainer>
  );
}
