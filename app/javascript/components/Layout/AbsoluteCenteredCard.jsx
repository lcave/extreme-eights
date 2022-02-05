import React from "react";
import styled from "styled-components";
import { RoundedCard } from "./Styles";

const AbsoluteCenter = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MinSizeCard = styled(RoundedCard)`
  min-height: 80%;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  @media (max-width: 850px) {
    min-width: unset;
    width: 100%;
  }
`;

export default function AbsoluteCenteredCard({ children }) {
  return (
    <AbsoluteCenter>
      <MinSizeCard>{children}</MinSizeCard>
    </AbsoluteCenter>
  );
}
