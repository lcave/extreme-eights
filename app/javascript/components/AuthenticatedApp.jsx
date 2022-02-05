import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./Game/Game";
import Home from "./Home";
import Lobby from "./Lobby/Lobby";

export default function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobbies/:lobbyId" element={<Lobby />} />
      <Route path="/lobbies/:lobbyId/game" element={<Game />} />
    </Routes>
  );
}
