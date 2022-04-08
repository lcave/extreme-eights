import axios from "axios";
import React from "react";
import styled from "styled-components";
import { AbsoluteCenter } from "../Layout/AbsoluteCenteredCard";
import { RoundedCard } from "../Layout/Styles";
import StackPlus from "./Actions/StackPlus";
import { useLocation } from "react-router-dom";
import { getCurrentPlayer } from "../Authentication/currentPlayer";
import ChooseColour from "./Actions/ChooseColour";

export default function ReactableAction({ action }) {
  const location = useLocation();

  const chooseColourCallback = (colour) => {
    axios.post(`/api/v1/${location.pathname}/reactable_action`, {
      colour: colour,
    });
  };

  const drawCallback = () => {
    axios.post(`/api/v1/${location.pathname}/reactable_action`, {
      action: "draw",
    });
  };

  const actionForm = () => {
    switch (action.action_type) {
      case "stack_plus":
        return (
          <StackPlus
            currentTotal={action.details.total}
            drawCallback={drawCallback}
          />
        );
      case "swap_hand":
        return "swap_hand";
      case "choose_colour":
        return <ChooseColour chooseColourCallback={chooseColourCallback} />;
    }
  };

  if (action.player_id !== getCurrentPlayer().id) {
    return <></>;
  }
  return (
    <div className="d-flex justify-content-center py-4">
      <RoundedCard className="p-2">{actionForm()}</RoundedCard>
    </div>
  );
}
