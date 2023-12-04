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
  animation: ${fadeIn} .5s ease forwards;
`;
