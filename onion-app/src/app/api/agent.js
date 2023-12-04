import axios from "axios";
import { toast } from 'react-toastify';

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error) => {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 415:
        toast.error("O tipo de arquivo não é suportado. Tente baixar nossa planilha modelo!");
        break;
      case 404:
        toast.error('O recurso solicitado não foi encontrado.');
        break;
      case 500:
        toast.error('Erro de Servidor: Ocorreu um problema no servidor.');
        break;
      default:
        toast.error('Ocorreu um erro inesperado. Por favor, tente novamente.');
        break;
    }

    return Promise.reject(error);
  }
);

const requests = {
  get: (url, opt = {}) => axios.get(url, opt).then((response) => response.data),
  post: (url, body, options = {}) => axios.post(url, body, options).then(response => response.data),
};

const Planilhas = {
  downloadModelo: () => requests.get("/Planilha/DownloadModelo", { responseType: 'blob' }),
  importarPlanilha: (file) => {
    let formData = new FormData();
    formData.append("planilha", file);
    return requests.post("/Planilha/ImportarPlanilha", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

const Dashboard = {
  obterVendas: () => requests.get("/Planilha/ObterListaVendas"),
};

export const agent = {
  Planilhas,
  Dashboard,
};
