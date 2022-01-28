import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../Authentication/api";
import ActionableInput from "../Forms/ActionableInput";
import AbsoluteCenteredCard from "../Layout/AbsoluteCenteredCard";

export default function Lobby() {
  const { lobbyId } = useParams();
  const [lobby, setLobby] = useState(null);

  const lobbyLeader = () => {
    return lobby.players.find((player) => player.id === lobby.lobby_leader_id);
  };

  const inviteLink = () => {
    return window.location.href;
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink());
  };

  useEffect(() => {
    axios.get(`/api/v1/lobbies/${lobbyId}`).then((response) => {
      setLobby(response.data.lobby);
    });
  }, []);

  if (lobby) {
    return (
      <AbsoluteCenteredCard>
        <h1>{`${lobbyLeader().name}'s Lobby`}</h1>
        <div className="d-flex">
          <ActionableInput
            inputLabel="Invite link"
            buttonLabel="Copy"
            value={inviteLink()}
            disabled={true}
            onClickCallback={copyInviteLink}
          />
        </div>
        <h3>Players:</h3>
        <ul>
          {lobby.players.map((player) => {
            return <li key={player.id}>{player.name}</li>;
          })}
        </ul>
      </AbsoluteCenteredCard>
    );
  }
  return <></>;
}
