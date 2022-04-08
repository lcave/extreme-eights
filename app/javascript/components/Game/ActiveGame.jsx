import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { getCurrentPlayer } from "../Authentication/currentPlayer";
import Card from "./Card";
import Hand from "./Hand";
import PlayerRotation from "./PlayerRotation";
import ReactableAction from "./ReactableAction";

export default function ActiveGame({ gameState }) {
  const { lobbyId } = useParams();

  const drawCard = () => {
    axios.get(`/api/v1/lobbies/${lobbyId}/game/draw`);
  };

  const playCard = (cardId) => {
    axios.post(`/api/v1/lobbies/${lobbyId}/game/play`, {
      card_id: cardId,
    });
  };

  const isMyTurn = () => {
    return getCurrentPlayer().id === gameState.current_player;
  };

  const reactableAction = () => {
    if (gameState.reactable_action) {
      return <ReactableAction action={gameState.reactable_action} />;
    }
  };

  const myHand = () => {
    if (gameState?.myHand) {
      return (
        <Hand
          isMyTurn={isMyTurn()}
          cards={gameState.myHand}
          onClickCallback={(cardId) => playCard(cardId)}
        />
      );
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100 flex-grow-1">
      <div>
        <div className="d-flex w-100 justify-content-around">
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h3>Draw</h3>
            <Card facedown onClickCallback={() => drawCard()} />
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h3>Discard</h3>
            <Card
              disabled
              colour={gameState.discard.colour}
              value={gameState.discard.value}
            />
          </div>
        </div>
      </div>
      <PlayerRotation
        players={gameState.players}
        currentPlayer={gameState.current_player}
      />
      {reactableAction()}
      {myHand()}
    </div>
  );
}
