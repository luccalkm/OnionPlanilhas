import axios from "axios";

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

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
