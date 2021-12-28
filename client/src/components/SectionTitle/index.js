const { default: styled } = require("styled-components");

export const SectionTitle = styled.h1`
    font-size: 34px;
    font-weight: bold;
    color: #000;
    margin: 30px 0;

    @media screen and (max-width: 480px) {
        text-align: center;
    }
`;
