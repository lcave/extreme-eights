import React, { useEffect, useState } from "react";
import { createChannel } from "../../channels/utils";
import { getCurrentPlayer } from "../Authentication/currentPlayer";
import Card from "./Card";
import Hand from "./Hand";
import PlayerRotation from "./PlayerRotation";

export default function ActiveGame({ gameState }) {
  const [hand, setHand] = useState(null);

  const currentPlayer = getCurrentPlayer();
  const isMyTurn = () => {
    return gameState.current_player === currentPlayer.id;
  };

  const handleSetCards = (cards, channel) => {
    setHand({
      channel: channel,
      cards: cards,
    });
  };

  const handleReceievedMessage = (data, channel) => {
    switch (data.type) {
      case "get_hand":
        handleSetCards(data.cards, channel);
        break;
    }
  };

  const drawCard = () => {
    hand.channel.send({
      type: "draw_card",
    });
  };

  const playCard = (cardId) => {
    hand.channel.send({
      type: "play_card",
      card_id: cardId,
    });
  };

  useEffect(() => {
    const channel = createChannel(
      {
        channel: "PlayersChannel",
      },
      {
        connected() {
          channel.send({
            type: "get_hand",
          });
        },
        received(data) {
          handleReceievedMessage(data, channel);
        },
      }
    );
    setHand({ channel: channel });
  }, []);

  const playerTurn = () => {
    return (
      <span>
        {gameState.players.find((p) => p.id === gameState.current_player).name}
        's Turn
      </span>
    );
  };

  const myHand = () => {
    if (hand?.cards) {
      return (
        <Hand
          cards={hand.cards}
          onClickCallback={(cardId) => playCard(cardId)}
        />
      );
    }
  };

  return (
    <div className="d-flex flex-column justify-content-between h-100">
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
        <PlayerRotation players={gameState.players} />
      </div>
      {myHand()}
    </div>
  );
}
