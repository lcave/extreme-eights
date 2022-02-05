import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Authentication/api";
import ActionableInput from "../Forms/ActionableInput";
import AbsoluteCenteredCard from "../Layout/AbsoluteCenteredCard";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createChannel } from "../../channels/utils";
import { currentPlayerToken } from "../Authentication/currentPlayer";
import Chatroom from "./Chatroom";

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

  const inviteLink = () => {
    return window.location.href;
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink());
  };

  const addMessage = (message) => {
    const newLobby = Object.assign({}, lobby);
    newLobby.messages.push(message);
    setLobby(newLobby);
  };

  useEffect(() => {
    if (lobby) {
      const tmpLobby = lobby;
      const channel = createChannel(
        {
          channel: "MessagesChannel",
          lobby_id: tmpLobby.id,
        },
        {
          received(data) {
            addMessage(data);
          },
        }
      );
      tmpLobby.channel = channel;
      setLobby(tmpLobby);
    } else {
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
      sent_by: currentPlayerToken(),
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
        <Chatroom
          messages={lobby.messages}
          sendMessageCallback={(message) => sendMessage(message)}
        />
      </AbsoluteCenteredCard>
    );
  }
  return <></>;
}
