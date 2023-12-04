import styled from "styled-components";
import { flexColumnStyles, cardBackgroundColor } from "../../GlobalStyles";

export const Container = styled.div`
  ${flexColumnStyles}
  width: 40%;
  justify-content: space-between;
  border-radius: 5px;
  gap: 25px;
    width: 50%;
`;

export const Card = styled.div`
  box-shadow: 0px 0px 5px rgba(125, 125, 125, 0.5);
  border-radius: 5px;
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${cardBackgroundColor};
`;

export const Pizza = {
    Container,
    Card
}