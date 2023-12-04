import { NavBar } from "../../componentes/NavBar";
import { Pizza } from "../../componentes/common/charts/Pizza";
import { Container, Content } from "./styles";
import { Table } from "../../componentes/common/charts/Table";
import { useDashboardData } from "../../hooks/useDashboardData";
import { StyledLottie } from "../../componentes/common/Lottie";
import loadingCircle from "../../../assets/loading/loadingCircle.json";
import loadingPlane from "../../../assets/loading/loadingPlane.json";
import { VendasPorItem } from "../../componentes/common/charts/VendasPorProdutoItem";
import { TabelaVendas } from "../../componentes/common/charts/TabelaVendas";

export const Dashboard = () => {
  const { isLoading, vendasPorProduto, vendasPorRegiao, listaVendas } =
    useDashboardData();

  return (
    <Container>
      <NavBar title={"Dashboard"} />
      <Content>
        <Pizza.Container>
          <Pizza.Card>
            {isLoading ? (
              <StyledLottie
                style={{ width: "50%" }}
                animationData={loadingCircle}
              />
            ) : (
              <VendasPorItem
                vendasPorItem={vendasPorProduto}
                titulo="Vendas por Produto"
              />
            )}
          </Pizza.Card>
          <Pizza.Card>
            {isLoading ? (
              <StyledLottie
                style={{ width: "50%" }}
                animationData={loadingCircle}
              />
            ) : (
            <VendasPorItem vendasPorItem={vendasPorRegiao} titulo="Vendas por Região" />
            )}
          </Pizza.Card>
        </Pizza.Container>
        <Table.Container overflow={isLoading}>
          {isLoading ? (
            <StyledLottie
              style={{ width: "81.5%" }}
              animationData={loadingPlane}
            />
          ) : (
            <TabelaVendas listaVendas={listaVendas} />
          )}
        </Table.Container>
      </Content>
    </Container>
  );
};
