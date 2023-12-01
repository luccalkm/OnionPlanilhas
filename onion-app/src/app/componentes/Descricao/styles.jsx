import styled from "styled-components";
import { flexColumnCenterStyles, primaryColor, baseFontSize, basePadding } from "../GlobalStyles";

const Container = styled.article`
    ${flexColumnCenterStyles};
    width: 70%;
    margin: 0 auto;
`;

const Holder = styled.div`
    ${Container};
`;

const Titulo = styled.h1`
    color: ${primaryColor};
`;

const Subtitulo = styled.h3`
    color: ${primaryColor};
`;

const Secao = styled.section`
    ${flexColumnCenterStyles};
    padding: calc(${basePadding} * 0.5) 0;
`;

const baseTexto = styled.p`
    font-size: ${baseFontSize};
    color: ${primaryColor};
    margin-bottom: 16px;
    text-wrap: wrap;
`;

const Texto = styled(baseTexto)``;

const TextoNegrito = styled(baseTexto)`
    font-size: calc(${baseFontSize} * 1.08);
    font-weight: bold;
`;

export const StyledDescricao = {
    Container,
    Holder,
    Titulo,
    Subtitulo,
    Secao,
    Texto,
    TextoNegrito
};
