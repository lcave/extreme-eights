import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createChannel } from "../../channels/utils";
import { currentPlayerToken } from "../Authentication/currentPlayer";
import AbsoluteCenteredCard from "../Layout/AbsoluteCenteredCard";

export default function Game() {
  const { lobbyId } = useParams();
  const [game, setGame] = useState(null);

  const setWaitingFor = (waitingFor) => {
    const tmpGame = Object.assign({}, game);
    tmpGame.waitingFor = waitingFor;
    setGame(tmpGame);
  };

  const setStartingIn = (startingIn) => {
    const tmpGame = Object.assign({}, game);
    tmpGame.waitingFor = null;
    tmpGame.startingIn = startingIn;
    setGame(tmpGame);
  };

  const setGameState = (gameState) => {
    const tmpGame = Object.assign({}, game);
    tmpGame.waitingFor = null;
    tmpGame.startingIn = null;
    tmpGame.gameState = gameState;
    setGame(tmpGame);
  };

  const handleReceievedMessage = (data) => {
    switch (data.type) {
      case "waiting_for":
        setWaitingFor(data.waiting_for);
        break;
      case "starting_in":
        setStartingIn(data.starting_in);
        break;
      case "game_state":
        setGameState(data.game_state);
        break;
    }
  };

  useEffect(() => {
    if (game && game.channel === undefined) {
      // connect to game websocket
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
      if (game.startingIn) {
        return <span>{game.startingIn}</span>;
      }
      if (game.gameState) {
        return <span>game started</span>;
      }
    }
  };

  return <AbsoluteCenteredCard>{content()}</AbsoluteCenteredCard>;
}
