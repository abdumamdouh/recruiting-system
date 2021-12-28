import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { Marginer } from "../../components/Marginer/Marginer";
import { OurSerivce } from "../../components/CustomSection";
import { SectionTitle } from "../../components/SectionTitle";

import Service1Img from "../../assets/illustrations/automation.png";
import Service2Img from "../../assets/illustrations/job.png";
import Service3Img from "../../assets/illustrations/qualityPriority.png";

const ServicesContainer = styled(Element)`
    width: 100%;
    min-height: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    backgroundcolor: #354054;
`;

export function ServicesSection(props) {
    return (
        <ServicesContainer name="servicesSection">
            <SectionTitle>Automation Hiring Process</SectionTitle>
            <Marginer direction="vertical" margin="3em" />
            <OurSerivce
                title="Fully automated services"
                description="We provide several plugin modules for the recruiter to automate or customize all the hiring pipeline based on how the recruiter wants to evaluate the applied candidates."
                imgUrl={Service1Img}
            />
            <OurSerivce
                title="Job posting and searching"
                description="We offer the ability to post your job as a recruiter of search for jobs as an applicants with customized control panels that fit your needs"
                imgUrl={Service2Img}
                isReversed
            />
            <OurSerivce
                title="Quality is our priority"
                description="We have teams of professional developers, designers
                and managers that ensures delivering the best 
                automation hiring process for your company"
                imgUrl={Service3Img}
            />
        </ServicesContainer>
    );
}
