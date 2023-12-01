import { createGlobalStyle } from "styled-components";

export const primaryColor = '#7c469e';
export const baseFontSize = '1.2rem';
export const basePadding = '32px';

export const GlobalStyles = createGlobalStyle`
  body, h1, p, a {
    color: ${primaryColor};
  }

  a {
    text-decoration: none;
    transition: 0.3s;
  }
`;

export default GlobalStyles;
