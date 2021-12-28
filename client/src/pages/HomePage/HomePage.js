import React from "react";

import styled from "styled-components";
import { ServicesSection } from "./ServicesSection";

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
      <ServicesSection />
    </PageContainer>
  );
}

export default HomePage;
