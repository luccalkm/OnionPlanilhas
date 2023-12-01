import styled from "styled-components";
import { primaryColor, baseFontSize } from "../../GlobalStyles";

const Link = styled.a`
  color: ${primaryColor};
  text-decoration: none;
  border-color: ${primaryColor};
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  padding: 8px 16px;
  text-align: center;
  width: 100%;
  transition: 0.3s;
  &:hover {
    background-color: ${primaryColor};
    color: white;
  }
`;

const Icon = styled.i`
    font-size: ${baseFontSize};
    color: ${primaryColor};
`;

export const StyledDownload = {
    Link,
    Icon
}