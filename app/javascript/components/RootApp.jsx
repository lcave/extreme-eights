import React, { useEffect, useState } from "react";
import CreatePlayer from "./Authentication/CreatePlayer";
import {
  currentPlayer,
  setCurrentPlayer,
} from "./Authentication/currentPlayer";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";
import "./Layout/Icons";
import "bootstrap";
import styled from "styled-components";
import eight from "./eight.png";

const App = styled.div`
  padding: 0 3rem;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.lightBlue};
  background-image: url(${eight});
  background-size: 35rem;
  background-position: top;
`;

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

  return (
    <App>
      <BrowserRouter>{content()}</BrowserRouter>
    </App>
  );
}
