import { useState, useEffect } from "react";
import { obterDadosVendas } from "../api/servicos/dashboardService";
import { toast } from "react-toastify";

export const useDashboardData = () => {
  const [isLoading, setLoading] = useState(true);
  const [vendasPorProduto, setVendasPorProduto] = useState({});
  const [vendasPorRegiao, setVendasPorRegiao] = useState({});
  const [listaVendas, setListaVendas] = useState([]);

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
              "Valor Total":
                venda.regiao === "Cep Inválido" ? "-" : venda.valorTotal,
              "Data Entrega":
                venda.regiao === "Cep Inválido"
                  ? "CEP inválido"
                  : venda.dataEntrega,
              cepInvalido: venda.regiao === "Cep Inválido",
            }))
          );

          setLoading(false);
          console.log(listaVendas);
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao processar os seus dados.");
        if (isMounted) setLoading(false);
      }
    };

    getData();
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
