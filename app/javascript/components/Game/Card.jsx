import React from "react";
import styled from "styled-components";
import eight from "../eight.png";

const PlayingCard = styled.button`
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
  transition: width 0.3s;
  padding: 0;
  &:hover {
    z-index: 1000;
    width: ${(props) => (props.disabled ? "100px" : "110px")};
  }
  &:focus {
    z-index: 1000;
    width: ${(props) => (props.disabled ? "100px" : "110px")};
  }
`;

const FacedownCard = styled.button`
  width: 100px;
  overflow: hidden;
  aspect-ratio: 1/1.5;
  background-color: ${(props) => props.theme.colors.lightBlue};
  background-image: url(${eight});
  background-size: cover;
  background-position: top;
  border-radius: 15px;
  margin: 0.25rem;
  border: 5px solid black;
  margin-right: ${(props) => (props.stacked ? "-4%" : "0")};
  transition: width 0.3s;
  padding: 0;
  &:hover {
    z-index: 1000;
    width: ${(props) => (props.disabled ? "100px" : "110px")};
  }
  &:focus {
    z-index: 1000;
    width: ${(props) => (props.disabled ? "100px" : "110px")};
  }
`;

const Value = styled.span`
  background-color: white;
  width: 100%;
  text-align: center;
  color: black;
  font-size: 400%;
  font-weight: 700;
`;

export default function Card({
  colour,
  value,
  disabled = false,
  stacked = false,
  facedown = false,
}) {
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

  if (facedown) {
    return <FacedownCard stacked={stacked} disabled={disabled} />;
  } else {
    return (
      <PlayingCard
        colour={colourFor(colour)}
        stacked={stacked}
        disabled={disabled}
      >
        <Value>{value}</Value>
      </PlayingCard>
    );
  }
}
