import React, { useEffect, useState } from "react";
import CreatePlayer from "./Authentication/CreatePlayer";
import {
  currentPlayer,
  setCurrentPlayer,
} from "./Authentication/currentPlayer";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";
import "bootstrap/dist/css/bootstrap.css";

export default function RootApp() {
  const [player, setPlayer] = useState(null);

  const handlePlayerCreation = (player) => {
    setCurrentPlayer(player);
    setPlayer(currentPlayer);
  };

  useEffect(() => {
    setPlayer(currentPlayer);
  }, []);

  const content = () => {
    if (player) {
      return <AuthenticatedApp />;
    }
    return <CreatePlayer createPlayerCallback={handlePlayerCreation} />;
  };

  return <BrowserRouter>{content()}</BrowserRouter>;
}
