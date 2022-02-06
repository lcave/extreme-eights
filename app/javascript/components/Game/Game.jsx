import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createChannel } from "../../channels/utils";
import {
  currentPlayerToken,
  getCurrentPlayer,
} from "../Authentication/currentPlayer";
import AbsoluteCenteredCard from "../Layout/AbsoluteCenteredCard";
import ActiveGame from "./ActiveGame";

export default function Game() {
  const { lobbyId } = useParams();
  const [game, setGame] = useState(null);

  const setWaitingFor = (waitingFor) => {
    const tmpGame = Object.assign({}, game);
    tmpGame.waitingFor = waitingFor;
    setGame(tmpGame);
  };

  const setGameState = (data) => {
    const hand = atob(
      data.game_state.players.find((p) => p.id === getCurrentPlayer().id).hand
    );
    const parsedHand = JSON.parse(hand);

    const tmpGame = Object.assign({}, game);
    tmpGame.startingIn = data.starting_in;
    tmpGame.gameState = data.game_state;
    tmpGame.gameState.myHand = parsedHand;
    setGame(tmpGame);
  };

  const handleReceievedMessage = (data) => {
    switch (data.type) {
      case "waiting_for":
        setWaitingFor(data.waiting_for);
        break;
      case "game_state":
        setGameState(data);
        break;
    }
  };

  useEffect(() => {
    if (game && game.channel === undefined) {
      const tmpGame = game;
      const channel = createChannel(
        {
          channel: "GamesChannel",
          game_id: tmpGame.id,
        },
        {
          connected() {
            game.channel.send({
              type: "ready",
              ready: true,
              token: currentPlayerToken(),
            });
          },
          received(data) {
            handleReceievedMessage(data);
          },
        }
      );
      tmpGame.channel = channel;
      setGame(tmpGame);
    }
    if (game === null) {
      axios.get(`/api/v1/lobbies/${lobbyId}/game`).then((response) => {
        setGame(response.data);
      });
    }
  });

  const content = () => {
    if (game) {
      if (game.waitingFor) {
        return game.waitingFor.map((name) => {
          return <span key={name}>{name}</span>;
        });
      }
      if (game.startingIn && game.startingIn !== 0) {
        return <span>{game.startingIn}</span>;
      }
      if (game.gameState) {
        return <ActiveGame gameState={game.gameState} />;
      }
    }
  };

  return <AbsoluteCenteredCard>{content()}</AbsoluteCenteredCard>;
}
