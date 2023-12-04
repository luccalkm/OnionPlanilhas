import React from 'react';
import { StyledTable, StyledTableHead, StyledTableHeader, StyledTableRow, StyledTableCell } from './Table';

export const TabelaVendas = ({ listaVendas }) => {
  if (!listaVendas || listaVendas.length === 0) return <p>Nenhum dado disponível.</p>;

  return (
    <StyledTable>
      <StyledTableHead>
        <StyledTableRow>
          {Object.keys(listaVendas[0]).map((titulo) => (
            <StyledTableHeader key={titulo}>
              {titulo}
            </StyledTableHeader>
          ))}
        </StyledTableRow>
      </StyledTableHead>
      <tbody>
        {listaVendas.map((venda, idx) => (
          <StyledTableRow key={idx}>
            {Object.values(venda).map((valor, index) => (
              <StyledTableCell key={index}>
                {valor}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
};

