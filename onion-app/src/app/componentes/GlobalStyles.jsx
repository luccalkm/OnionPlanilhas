import { css, createGlobalStyle } from "styled-components";

export const primaryColor = "#7c469e";
export const baseFontSize = "1rem";
export const basePadding = "32px";
export const baseTitleSize = "1.5rem";
export const cardBackgroundColor = '#fbfbfb';
export const baseBackgroundColor = '#f2f2f2'; 

export const flexColumnStyles = css`
  display: flex;
  flex-direction: column;
`;

export const GlobalStyles = createGlobalStyle`
  :root {
    font-family: Roboto, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color: rgba(255, 255, 255, 0.87);
    background-color: ${baseBackgroundColor};

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    letter-spacing: 0.7px;
  }

  body, h1, p, a {
    color: ${primaryColor};
  }

  a {
    text-decoration: none;
    transition: 0.3s;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
