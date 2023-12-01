import styled from "styled-components";
import {primaryColor, baseFontSize } from "../GlobalStyles";

export const Container = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 15px auto 0px auto;
`;

export const Logo = styled.h2`
    font-size: calc(${baseFontSize}*1.6);
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
