import React from "react";
import Card from "./Card";
import styled from "styled-components";

const PlayerHand = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  align-self: end;
`;

export default function Hand({ cards, onClickCallback }) {
  return (
    <PlayerHand>
      {cards.map((card) => (
        <Card
          onClickCallback={(cardId) => onClickCallback(cardId)}
          colour={card.colour}
          value={card.value}
          key={card.id}
          id={card.id}
          stacked={true}
        />
      ))}
    </PlayerHand>
  );
}
