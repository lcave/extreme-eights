import React from "react";
import ReactDOM from "react-dom";
import RootApp from "./components/RootApp";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    powderWhite: "#FFFDF9",
    emeraldGreen: "#2ecc71",
    lightBlue: "#3498db",
    onyx: "#36313D",
    obsidian: "#2c3e50",
    purple: "#9b59b6",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app-mount-point");
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <RootApp />
    </ThemeProvider>,
    rootEl
  );
});
