import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "./Authentication/api";
import ActionableInput from "./Forms/ActionableInput";
import AbsoluteCenteredCard from "./Layout/AbsoluteCenteredCard";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LobbyList = styled.ul`
  list-style: none;
  width: min-content;
  padding: 0;
`;

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
    <AbsoluteCenteredCard>
      <div className="d-flex flex-column align-items-center mb-3">
        <Form className="d-flex align-items" onSubmit={handleJoinLobby}>
          <ActionableInput
            inputLabel={"Lobby ID"}
            buttonLabel="Join"
            onClickCallback={(lobbyId) => {
              handleJoinLobby(lobbyId);
            }}
          />
        </Form>
        <h4 className="my-4 muted">OR</h4>
        <Button variant="success" onClick={handleCreateLobby}>
          Create a new lobby
        </Button>
      </div>
      <hr />
      <div className="d-flex flex-column align-items-center mt-3">
        <h3>Rejoin</h3>
        <LobbyList>
          {availableLobbies.map((lobby) => {
            return (
              <li key={lobby.id}>
                <div className="list-group-item text-nowrap">
                  <a className="me-3" href={`/lobbies/${lobby.id}`}>
                    {lobby.id}
                  </a>
                  <div className="align-items-center text-muted">
                    <FontAwesomeIcon icon={"crown"} className="me-1" />
                    {lobby.lobby_leader_name}
                    <FontAwesomeIcon icon={"users"} className="ms-3 me-1" />
                    {lobby.player_count}
                  </div>
                </div>
              </li>
            );
          })}
        </LobbyList>
      </div>
    </AbsoluteCenteredCard>
  );
}
