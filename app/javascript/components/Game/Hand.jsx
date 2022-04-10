import React from "react";
import Card from "./Card";
import styled from "styled-components";

const CARD_WIDTH = 66;

const PlayerHand = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  align-self: end;
`;

export default function Hand({ cards, onClickCallback, isMyTurn }) {
  const myTurnMessage = () => {
    if (isMyTurn) {
      return <h3 className="text-center">Your Turn!</h3>;
    }
  };

  const availableWidth = window.innerWidth - 160;
  const cardsPerRow = Math.round(availableWidth / CARD_WIDTH);

  const cardRows = () => {
    const rows = [];
    let tmpArray = [];
    cards.forEach((card, index) => {
      if ((index + 1) % cardsPerRow === 0) {
        rows.push([...tmpArray]);
        tmpArray = [];
      }
      tmpArray.push(
        <Card
          onClickCallback={(cardId) => onClickCallback(cardId)}
          colour={card.colour}
          value={card.value}
          key={card.id}
          id={card.id}
          stacked={true}
        />
      );
    });
    rows.push([...tmpArray]);
    return rows.map((cards) => <div className="row">{cards}</div>);
  };

  return (
    <div>
      {myTurnMessage()}
      <PlayerHand>{cardRows()}</PlayerHand>
    </div>
  );
}
