import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "./Authentication/api";
import ActionableInput from "./Forms/ActionableInput";

export default function Home() {
  const navigate = useNavigate();

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
    </div>
  );
}
