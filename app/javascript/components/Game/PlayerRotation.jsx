import React from "react";
import styled from "styled-components";
import PlayerCardCount from "./PlayerCardCount";

const Rotation = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  & > div {
    margin: 0 1rem;
  }
`;

const PlayerInfo = styled.div`
  display: flex;
  max-width: 18%;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem 1rem;
  border-bottom: ${(props) =>
    props.currentPlayer ? `${props.theme.colors.lightBlue} 3px solid` : "none"};
`;

export default function PlayerRotation({ players, currentPlayer }) {
  const playerBorder = (player) => {
    if (player.id === currentPlayer) {
      return "border border-primary";
    }
  };

  return (
    <Rotation>
      {players.map((player) => {
        return (
          <PlayerInfo
            key={player.id}
            currentPlayer={currentPlayer === player.id}
          >
            {player.name}
            <PlayerCardCount cardCount={player.card_count} />
          </PlayerInfo>
        );
      })}
    </Rotation>
  );
}
