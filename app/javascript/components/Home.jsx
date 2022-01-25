import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "./Authentication/api";
import ActionableInput from "./Forms/ActionableInput";

export default function Home() {
  const navigate = useNavigate();
  const [availableLobbies, setAvailableLobbies] = useState([]);

  useEffect(() => {
    axios.get("api/v1/lobbies").then((response) => {
      setAvailableLobbies(response.data.available_lobbies);
    });
  }, []);

  const handleCreateLobby = () => {
    axios.post("/api/v1/lobbies").then((response) => {
      navigate(`/lobbies/${response.data.lobby_id}`);
    });
  };

  const handleJoinLobby = (lobbyId) => {
    navigate(`/lobbies/${lobbyId}`);
  };

  return (
    <div>
      <Form className="d-flex align-items" onSubmit={handleJoinLobby}>
        <ActionableInput
          inputLabel={"Lobby ID"}
          buttonLabel="Join"
          onClickCallback={(lobbyId) => {
            handleJoinLobby(lobbyId);
          }}
        />
      </Form>

      <Button variant="success" onClick={handleCreateLobby}>
        Create a new lobby
      </Button>

      <h3>My Lobbies</h3>
      {availableLobbies.map((lobby) => {
        return (
          <li key={lobby.id}>
            <a href={`/lobbies/${lobby.id}`}>{lobby.id}</a>
            {lobby.lobby_leader_name} - {lobby.created_at}
            {lobby.player_count}
          </li>
        );
      })}
    </div>
  );
}
