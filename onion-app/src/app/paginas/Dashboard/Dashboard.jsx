import { NavBar } from "../../componentes/NavBar";
import { Pizza } from "../../componentes/common/charts/Pizza";
import { Title, Container, Content } from "./styles";
import { Table } from "../../componentes/common/charts/Table";

export const Dashboard = () => {
  return (
    <Container>
      <NavBar title={"Análise de Planilhas"} />
      <Title>Dashboard</Title>
      <Content>
        <Pizza.Container>
          <Pizza.Card>Pizza 1</Pizza.Card>
          <Pizza.Card>Pizza 2</Pizza.Card>
        </Pizza.Container>
        <Table.Container> Lista </Table.Container>
      </Content>
    </Container>
  );
};
