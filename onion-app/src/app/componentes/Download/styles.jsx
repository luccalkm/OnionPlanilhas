import styled from "styled-components";
import { primaryColor, flexColumnCenterStyles } from "../GlobalStyles";

const Link = styled.a`
  display: flex;
  justify-content: center;
  color: ${primaryColor};
  text-decoration: none;
  padding: 8px 16px;
  text-align: center;
  transition: 0.3s;
  font-weight: 500;

  /* Estados */
  &:hover {
    background-color: ${primaryColor};
    color: white;
  }

  /* Borda */
  border-color: ${primaryColor};
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
`;

export const StyledDownload = {
    Link
}