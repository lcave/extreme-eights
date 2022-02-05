import React from "react";
import Card from "./Card";
import styled from "styled-components";

const PlayerHand = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  align-self: end;
`;

export default function Hand({ cards }) {
  return (
    <PlayerHand>
      {cards.map((card) => (
        <Card
          colour={card.colour}
          value={card.value}
          key={card.id}
          stacked={true}
        />
      ))}
    </PlayerHand>
  );
}
