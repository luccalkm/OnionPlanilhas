import styled from "styled-components";

const Container = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: space-around;
    align-items: center;
    gap: 150px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
    margin: 0 auto;
`;

export const Main = {
    Container,
    Wrapper
}