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
          setVendasPorProduto(processarDadosPorChave(data, "Produto"));
          setVendasPorRegiao(processarDadosPorChave(data, "Regiao"));
          setListaVendas(
            data.map((venda) => ({
              "Cliente": venda.Cliente,
              "Produto": venda.Produto,
              "Valor Total": venda.ValorTotal,
              "Data Entrega": venda.DataEntrega,
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
