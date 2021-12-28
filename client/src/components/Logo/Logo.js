import React from "react";
import styled, { css } from "styled-components";

import recLogo from "../../assets/images/logo.png";
import { theme } from "../../theme";

const LogoContainer = styled.div`
    display: flex;
    flex-direction: ${({ inline }) => (inline ? "row" : "column")};
    align-items: center;
`;

const LogoImg = styled.img`
    width: 9em;
    height: 9em;
    color: #2d5aa3
        ${({ inline }) =>
            inline &&
            css`
                width: 24px;
                height: 24px;
                margin-right: 6px;
            `};
    ${({ small }) =>
        small &&
        css`
            width: 4.8em;
            height: 4.8em;
        `};
`;

const LogoText = styled.div`
    margin-top: 6px;
    font-size: ${({ inline, small }) =>
        inline ? "18px" : small ? "23px" : "40px"};
    color: ${({ inline }) => (inline ? "#fff" : theme.primary)};
    font-weight: 900;
`;
export const Logo = (props) => {
    const { inline, small } = props;
    return (
        <LogoContainer inline={inline} small={small}>
            <LogoImg src={recLogo} inline={inline} small={small} />
            <LogoText inline={inline} small={small}>
                Job coach
            </LogoText>
        </LogoContainer>
    );
};
