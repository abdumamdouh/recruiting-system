import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { Marginer } from "../../components/Marginer/Marginer";
import { OurSerivce } from "../../components/CustomSection";
import { SectionTitle } from "../../components/SectionTitle";

import Service1Img from "../../assets/illustrations/web_development_.png";
import Service2Img from "../../assets/illustrations/mobile_phone.png";
import Service3Img from "../../assets/illustrations/bug_fixed.png";

const ServicesContainer = styled(Element)`
    width: 100%;
    min-height: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
`;

export function ServicesSection(props) {
    return (
        <ServicesContainer name="servicesSection">
            <SectionTitle>Best Quality Software</SectionTitle>
            <Marginer direction="vertical" margin="3em" />
            <OurSerivce
                title="Fully integrated services"
                description="We build and deliver fully integrated webapp
                with customized control panels that fit your 
                company needs"
                imgUrl={Service1Img}
            />
            <OurSerivce
                title="Mobile optimized"
                description="We build and deliver fully integrated webapp
                with customized control panels that fit your 
                company needs"
                imgUrl={Service2Img}
                isReversed
            />
            <OurSerivce
                title="Quality is our priority"
                description="We have teams of professional developers, designers
                and managers that ensures delivering the best 
                software quality for your company"
                imgUrl={Service3Img}
            />
        </ServicesContainer>
    );
}
