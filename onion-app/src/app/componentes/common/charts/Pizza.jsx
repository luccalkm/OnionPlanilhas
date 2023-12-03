import styled from "styled-components";
import { flexColumnStyles } from "../../GlobalStyles";

export const Container = styled.div`
  ${flexColumnStyles}
  width: 40%;
  justify-content: space-between;
  border-radius: 5px;
  gap: 25px;
`;

export const Card = styled.div`
  box-shadow: 0px 0px 5px rgba(125, 125, 125, 0.5);
  border-radius: 5px;
  backgroundColor: black;
  padding: 100px 20px;
`;

export const Pizza = {
    Container,
    Card
}