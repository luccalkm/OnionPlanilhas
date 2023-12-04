import React from "react";
import {
  StyledTable,
  StyledTableHead,
  StyledTableHeader,
  StyledTableRow,
  StyledTableCell,
} from "./Table";
import Lottie from "lottie-react";
import error from "../../../../assets/error/dataError.json";

export const TabelaVendas = ({ listaVendas }) => {
  if (!listaVendas || listaVendas.length === 0) {
    return (
      <Lottie
        loop={false}
        style={{ width: "50%", display: "flex", margin: "0 auto" }}
        animationData={error}
      />
    );
  }

  const test = (teste) => {
    console.log(teste);
    return teste;
  };

  return (
    <StyledTable>
      <StyledTableHead>
        <StyledTableRow>
          {Object.keys(listaVendas[0]).map(
            (titulo) =>
              titulo !== "cepInvalido" && (
                <StyledTableHeader key={titulo}>{titulo}</StyledTableHeader>
              )
          )}
        </StyledTableRow>
      </StyledTableHead>
      <tbody>
        {listaVendas.map((venda, idx) => {
          
          return (
            <StyledTableRow key={idx} isInvalidCep={venda.cepInvalido}>
              {Object.entries(venda).map(([key, valor], index) => {
                if (key === "cepInvalido") {
                  return null;
                }
                return <StyledTableCell key={index}>{valor}</StyledTableCell>;
              })}
            </StyledTableRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
