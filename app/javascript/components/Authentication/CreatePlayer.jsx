import axios from "axios";
import React from "react";
import ActionableInput from "../Forms/ActionableInput";
import AbsoluteCenteredCard from "../Layout/AbsoluteCenteredCard";

export default function CreatePlayer({ createPlayerCallback }) {
  const createPlayer = (name) => {
    axios.post("/api/v1/users", { player: { name: name } }).then((response) => {
      createPlayerCallback(response.data.player);
    });
  };

  return (
    <AbsoluteCenteredCard>
      <ActionableInput
        inputLabel="Player Name"
        buttonLabel="Let's Play!"
        onClickCallback={(name) => createPlayer(name)}
      />
    </AbsoluteCenteredCard>
  );
}
