import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { SmallFaceDownCard } from "./SmallFaceDownCard";

const Rotation = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  & > div {
    margin: 0 2rem;
  }
`;

const PlayerCards = styled.div`
  width: 80px;
  display: flex;
  flex-wrap: wrap;
`;

export default function PlayerRotation({ players }) {
  return (
    <Rotation>
      {players.map((player) => {
        return (
          <div
            key={player.id}
            className="d-flex flex-column align-items-center"
          >
            {player.name}
            <PlayerCards>
              {[...Array(player.card_count).keys()].map((i) => (
                <SmallFaceDownCard key={i} stacked />
              ))}
            </PlayerCards>
          </div>
        );
      })}
    </Rotation>
  );
}
