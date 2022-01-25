import React from "react";
import ReactDOM from "react-dom";
import RootApp from "./components/RootApp";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app-mount-point");
  ReactDOM.render(<RootApp />, rootEl);
});
