import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const TransactionContainer = styled.div`
  table {
    width: 650px;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }

  th,
  td {
    padding: 10px;
    background-color: rgba(220, 220, 220, 0.2);
    color: #333;
  }

  th {
    text-align: left;
  }

  tbody {
    tr {
      border-top: 1px solid #ddd;
      &:hover {
        background-color: rgba(220, 220, 220, 0.3);
      }
    }
    td {
      position: relative;
    }
  }
`;

export const NewTransaction = styled(NavLink)`
  display: block;
  padding: 20px 0 10px 0;
`;
