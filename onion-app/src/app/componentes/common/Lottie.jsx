import styled, { css, keyframes } from "styled-components";
import Lottie from "lottie-react";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledLottie = styled(({ isLoading, ...rest }) => (
  <Lottie {...rest} />
))`
  animation: ${(props) =>
    props.isLoading
      ? css`
          ${fadeIn} 1s ease forwards
        `
      : "none"};
`;
