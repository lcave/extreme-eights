import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Authentication/api";
import ActionableInput from "../Forms/ActionableInput";
import AbsoluteCenteredCard from "../Layout/AbsoluteCenteredCard";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createChannel } from "../../channels/utils";
import { currentPlayerToken } from "../Authentication/currentPlayer";
import Chatroom from "./Chatroom";
import { Button } from "react-bootstrap";

const H2 = styled.h2`
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.onyx};
  font-size: ${(props) => props.theme.fontSizes.large};
`;

const H3 = styled.h3`
  text-transform: capitalize;
  color: ${(props) => props.theme.colors.basalt};
  margin-bottom: 2rem;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

export default function Lobby() {
  const { lobbyId } = useParams();
  const [lobby, setLobby] = useState(null);
  const navigate = useNavigate();

  const inviteLink = () => {
    return window.location.href;
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink());
  };

  const handleDataReceived = (data) => {
    switch (data.type) {
      case "players":
        updatePlayers(data.players);
        break;
      case "message":
        addMessage(data.message);
        break;
      case "game_starting":
        navigate(`/lobbies/${lobby.id}/game`);
        break;
    }
  };

  const updatePlayers = (players) => {
    const newLobby = Object.assign({}, lobby);
    newLobby.players = players;
    setLobby(newLobby);
  };

  const addMessage = (message) => {
    const newLobby = Object.assign({}, lobby);
    newLobby.messages.push(message);
    setLobby(newLobby);
  };

  useEffect(() => {
    if (lobby && lobby.channel === undefined) {
      const tmpLobby = lobby;
      const channel = createChannel(
        {
          channel: "MessagesChannel",
          lobby_id: tmpLobby.id,
        },
        {
          received(data) {
            handleDataReceived(data);
          },
        }
      );
      tmpLobby.channel = channel;
      setLobby(tmpLobby);
    }
    if (lobby === null) {
      axios.get(`/api/v1/lobbies/${lobbyId}`).then((response) => {
        const tmplobby = response.data.lobby;
        setLobby(tmplobby);
      });
    }
  });

  const leaderIcon = (player) => {
    if (player.id === lobby.lobby_leader_id) {
      return (
        <>
          {" "}
          - <FontAwesomeIcon icon="crown" />
        </>
      );
    }
    return "";
  };

  const sendMessage = (message) => {
    lobby.channel.send({
      type: "message",
      body: message,
      token: currentPlayerToken(),
    });
  };

  const createGame = () => {
    axios.post(`/api/v1/lobbies/${lobby.id}/games`).then(() => {
      navigate(`/lobbies/${lobby.id}/game`);
    });
  };

  if (lobby) {
    return (
      <AbsoluteCenteredCard>
        <div className="d-flex justify-content-between">
          <H2>{lobby.id.replaceAll("-", " ")}</H2>
          <H3>
            {lobby.players.length}/8
            <FontAwesomeIcon icon="users" className="ms-2" />
          </H3>
        </div>
        <ActionableInput
          inputLabel="Invite link"
          buttonLabel="Copy"
          value={inviteLink()}
          disabled={true}
          onClickCallback={copyInviteLink}
        />
        <H3 className="mt-3">Players:</H3>
        <ul>
          {lobby.players.map((player) => {
            return (
              <li key={player.id}>
                {player.name}
                {leaderIcon(player)}
              </li>
            );
          })}
        </ul>
        <Button variant="success" className="mb-3" onClick={() => createGame()}>
          Start Game
        </Button>
        <Chatroom
          messages={lobby.messages}
          sendMessageCallback={(message) => sendMessage(message)}
        />
      </AbsoluteCenteredCard>
    );
  }
  return <></>;
}
