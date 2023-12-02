import styled, { keyframes } from "styled-components";

const standardBackground = "#e1d1eb";
const defaultAccentColor = "#2b1c3f";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const getProp = (prop, defaultValue) => props => prop in props ? props[prop] : defaultValue;

const Loading = styled.div`
  animation: ${rotate360} ${getProp('speed', '1s')} linear infinite;
  transform: translateZ(0);

  border: 2px solid ${getProp('color', standardBackground)};
  border-left-color: ${getProp('accentColor', defaultAccentColor)};
  border-left-width: 4px;
  background: transparent;
  width: ${getProp('size', '20px')};
  height: ${getProp('size', '20px')};
  border-radius: 50%;
`;

export default Loading;
