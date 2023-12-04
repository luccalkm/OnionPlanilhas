import styled, { css } from "styled-components";
import {
  flexColumnStyles,
  primaryColor,
  darkerPrimaryColor,mobileScreen
} from "../GlobalStyles";

export const FileInput = styled.input`
  display: none;
`;

export const Container = styled.div`
  ${flexColumnStyles}
  border: 2px dashed ${primaryColor};
  border-radius: 5px;
  padding: 20px;
  align-items: center;
  justify-content: center;
  width: 50%;
  @media (max-width: ${mobileScreen}) {
    width: 90%;
  }
`;

export const Area = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 35rem;
  height: 25.3rem;
  justify-content: center;
`;

export const Button = styled.button`
  background: ${primaryColor};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${darkerPrimaryColor};
  }
`;

export const Text = styled.p`
  margin-top: 10px;
  font-weight: bold;
`;

export const StyledUpload = {
  Area,
  Button,
  Text,
  Container,
};
