import React from "react";
import styled from "styled-components";


import { theme } from "../../theme";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 8em;
  height: 8em;
 
`;

const LogoText = styled.div`
  margin-top: 6px;
  font-size: 40px;
  color: ${theme.primary};
  font-weight: 900;
`;
export const Logo = props => {
  return    <LogoContainer >
  <LogoImg />
  <LogoText >
    HINW 
  </LogoText>
</LogoContainer>;
};
