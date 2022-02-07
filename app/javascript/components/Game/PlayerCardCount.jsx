import React from "react";
import styled from "styled-components";
import { SmallFaceDownCard } from "./SmallFaceDownCard";

const PlayerCards = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function PlayerCardCount({ cardCount }) {
  if (cardCount > 8) {
    return (
      <PlayerCards>
        <SmallFaceDownCard />
        <span className="align-self-center ms-2">X {cardCount}</span>
      </PlayerCards>
    );
  } else {
    return (
      <PlayerCards>
        {[...Array(cardCount).keys()].map((i) => (
          <SmallFaceDownCard key={i} stacked />
        ))}
      </PlayerCards>
    );
  }
}
