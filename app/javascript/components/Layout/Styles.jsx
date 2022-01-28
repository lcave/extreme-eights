import styled from "styled-components";

export const RoundedCard = styled.div`
  background-color: ${(props) => props.theme.colors.powderWhite};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
