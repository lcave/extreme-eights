import React from "react";
import styled from "styled-components";

export const Card = styled.button`
  width: 100px;
  overflow: hidden;
  aspect-ratio: 1/1.5;
  background-color: ${(props) => props.colour};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem;
  border: 5px solid black;
  margin-right: ${(props) => (props.stacked ? "-4%" : "0")};
  padding: 0;
`;

export default function ChooseColour({ chooseColourCallback }) {
  const colourFor = (colour) => {
    switch (colour) {
      case "GREEN":
        return "#207120";
      case "BLUE":
        return "#2b3493";
      case "RED":
        return "#9d2323";
      case "YELLOW":
        return "#bfc642";
      case "WILD":
        return "#000000";
    }
  };

  return (
    <div>
      <h3 className="text-center">Choose a Colour</h3>
      <div className="p-1">
        <div className="d-flex justify-content-center">
          <Card
            className="mx-3"
            colour={colourFor("RED")}
            onClick={() => chooseColourCallback("RED")}
          />
          <Card
            className="mx-3"
            colour={colourFor("GREEN")}
            onClick={() => chooseColourCallback("GREEN")}
          />
          <Card
            className="mx-3"
            colour={colourFor("BLUE")}
            onClick={() => chooseColourCallback("BLUE")}
          />
          <Card
            className="mx-3"
            colour={colourFor("YELLOW")}
            onClick={() => chooseColourCallback("YELLOW")}
          />
        </div>
      </div>
    </div>
  );
}
