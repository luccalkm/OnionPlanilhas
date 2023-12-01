import styled from "styled-components";
import {primaryColor, baseFontSize } from "../GlobalStyles";

export const Container = styled.nav`
  display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
`;

export const Logo = styled.h2`
    font-size: ${baseFontSize};
    font-weight: bold;
    color: ${primaryColor};
`;

export const LogoImg = styled.img`
    width: 100px;
    height: 100px;
`;

export const StyledNavBar = {
    Container,
    Logo,
    LogoImg
};
