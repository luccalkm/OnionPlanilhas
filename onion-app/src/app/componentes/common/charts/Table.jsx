import styled, { css } from "styled-components";
import { cardBackgroundColor, baseBackgroundColor } from "../../GlobalStyles";

const cellPadding = "6px 15px";
const cellBottomBorder = "1px solid #ddd";
const cellAlign = "left";

const customScrollBar = css`
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #7c469e;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5e3470;
  }
`;

export const Container = styled.div`
  width: 60%;
  max-height: 45.3rem;
  box-shadow: 0px 0px 5px rgba(125, 125, 125, 0.5);
  border-radius: 5px;
  display: flex;
  overflow-y: ${props => props.overflow ? 'hidden' : 'scroll'};
  overflow-x: hidden;
  background-color: ${cardBackgroundColor};
  ${customScrollBar}
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTableHead = styled.thead`
  position: sticky;
  top: 0;
  background-color: ${cardBackgroundColor};
  z-index: 10;
`;

export const Cell = css`
  padding: ${cellPadding};
  text-align: ${cellAlign};
  border-bottom: ${cellBottomBorder};
`;

export const StyledTableHeader = styled.th`
  ${Cell}
  padding: 15px 15px;
`;

export const StyledTableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${baseBackgroundColor};
  }
`;

export const StyledTableCell = styled.td`
  ${Cell}
`;

export const Table = {
  Container,
};
