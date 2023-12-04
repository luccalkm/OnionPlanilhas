import { StyledDownload } from "./styles.jsx";
import { useState, useEffect } from "react";
import { agent } from "../../api/agent.js";
import Loading from "../common/Loading.jsx";
import { useLoadingOnClick } from "../../hooks/useLoadingOnClick.js";
import { toast } from "react-toastify";

export function BotaoDownload() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const { isLoading, enableLoading, disableLoading } = useLoadingOnClick();

  useEffect(() => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Modelo_Planilha_Onion.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloadUrl("");
      disableLoading();
    }
  }, [downloadUrl]);

  const handleDownloadClick = async (e) => {
    e.preventDefault();
    enableLoading();
    try {
      const response = await agent.Planilhas.downloadModelo();
      const url = window.URL.createObjectURL(
        new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      setDownloadUrl(url);
    } catch (error) {
      toast.error("Desculpe, não conseguimos acessar o arquivo agora. Tente novamente mais tarde.");
      setDownloadUrl("");
      disableLoading();
    } finally {
      disableLoading();
    }
  };

  return (
    <>
      <StyledDownload.Link
        id="downloadLink"
        onClick={handleDownloadClick}
        href={downloadUrl ? downloadUrl : "#"}
        download="Modelo_Planilha_Onion.xlsx"
        onMouseLeave={disableLoading}
      >
        {isLoading ? <Loading /> : "Baixar"}
      </StyledDownload.Link>
    </>
  );
}
