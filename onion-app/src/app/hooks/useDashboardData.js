import { useState, useEffect } from "react";
import { obterDadosVendas } from "../api/servicos/dashboardService";
import { toast } from "react-toastify";
import { AppConfig } from "../configuracao/config";

export const useDashboardData = () => {
  const [isLoading, setLoading] = useState(true);
  const [vendasPorProduto, setVendasPorProduto] = useState({});
  const [vendasPorRegiao, setVendasPorRegiao] = useState({});
  const [listaVendas, setListaVendas] = useState([]);

  const { cepInvalidoMessage } = AppConfig;

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const data = await obterDadosVendas();
        if (isMounted) {
          setVendasPorProduto(processarDadosPorChave(data, "produto"));
          setVendasPorRegiao(processarDadosPorChave(data, "regiao"));
          setListaVendas(
            data.map((venda) => ({
              Cliente: venda.cliente,
              Produto: venda.produto,
              "Valor Total": venda.regiao === cepInvalidoMessage ? "-" : venda.valorTotal,
              "Data Entrega": venda.regiao === cepInvalidoMessage ? "CEP inválido" : venda.dataEntrega,
              cepInvalido: venda.regiao === cepInvalidoMessage,
            }))
          );

          setLoading(false);
        }
      } catch (error) {
        toast.error(
          "Ocorreu um erro ao processar os seus dados, por favor, tente inserir a planilha novamente."
        );
        if (isMounted) setLoading(false);
      }
    };
    if (
      isMounted &&
      Object.keys(vendasPorProduto).length === 0 &&
      Object.keys(vendasPorRegiao).length === 0 &&
      listaVendas.length === 0
    ) {
      getData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const processarDadosPorChave = (dados, chave) => {
    return dados.reduce((acc, curr) => {
      const key = curr[chave];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  };

  return { isLoading, vendasPorProduto, vendasPorRegiao, listaVendas };
};
