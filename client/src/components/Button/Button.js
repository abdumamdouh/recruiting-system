import React from "react";
import styled from "styled-components";
import { theme } from "../../theme";

const ButtonWrapper = styled.button`
padding:7px 15px;
border-radius: 5px;
background-color: ${theme.primary};
color: #fff;
font-size: 16px;
outline: none;
border: 2px solid transparent;
transition: all 220ms ease-in-out; 
cursor: pointer;
&:hover{
    background-color: transparent;
    border: 2px solid ${theme.primary};
    
}
`;
export const Button = props => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};
