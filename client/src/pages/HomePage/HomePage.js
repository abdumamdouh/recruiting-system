import React from "react";

import styled from "styled-components";

import { TopSection } from "./TopSection";
const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
function HomePage() {
  return (
    <PageContainer>
      <TopSection />
    </PageContainer>
  );
}

export default HomePage;
