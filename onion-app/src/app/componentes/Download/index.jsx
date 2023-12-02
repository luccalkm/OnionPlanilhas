import { StyledDownload } from "./styles.jsx";
import { useEffect, useState } from "react";
import { agent } from "../../api/agent.js";
import Loading from "../common/LoadingSpinner/styles.jsx";
import { useLoadingOnClick } from "../../../features/useLoadingOnClick.jsx";

export function BotaoDownload() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const { isLoading, enableLoading, disableLoading } = useLoadingOnClick();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await agent.Planilhas.downloadModelo();
        const url = window.URL.createObjectURL(
          new Blob([response], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        setDownloadUrl(url);
      } catch (error) {
        console.error("Erro no download:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <StyledDownload.Link
        onClick={enableLoading}
        onMouseLeave={disableLoading}
        href={downloadUrl}
        download="Modelo_Planilha_Onion.xlsx"
      >
        {isLoading ? <Loading /> : "Baixar"}
      </StyledDownload.Link>
    </>
  );
}
