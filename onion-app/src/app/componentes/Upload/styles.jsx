import styled from "styled-components";
import { flexColumnCenterStyles, primaryColor } from "../GlobalStyles";

export const FileInput = styled.input`
display: none;
`;

export const Container = styled.div`
    ${flexColumnCenterStyles}
    border: 2px dashed ${primaryColor};
    border-radius: 5px;
    padding: 20px;
    align-items: center;
    justify-content: center;
    width: 686px;
    height: 488px;
`;

export const Button = styled.button`
    background: ${primaryColor};
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const Text = styled.p`
    margin-top: 10px;
    font-weight: bold;
`;

export const StyledUpload = {
    Button,
    Text,
    Container
}