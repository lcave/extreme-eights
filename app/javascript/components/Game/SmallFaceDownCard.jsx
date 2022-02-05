import styled from "styled-components";
import eight from "../eight.png";

export const SmallFaceDownCard = styled.div`
  width: 20px;
  overflow: hidden;
  aspect-ratio: 1/1.5;
  background-color: ${(props) => props.theme.colors.lightBlue};
  background-image: url(${eight});
  background-size: cover;
  background-position: top;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem;
  border: 2px solid black;
  margin-right: ${(props) => (props.stacked ? "-10%" : "0")};
`;
