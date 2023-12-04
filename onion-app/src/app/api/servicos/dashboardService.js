import { agent } from "../agent";

export const obterDadosVendas = () => {
  try {
    const response = agent.Dashboard.obterVendas();
    return response;
  }
  catch (error) {
    throw error;
  }
};
