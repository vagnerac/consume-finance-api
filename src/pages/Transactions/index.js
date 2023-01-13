import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaEdit, FaExclamation, FaWindowClose } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { TransactionContainer } from './styled';
import Loading from '../../components/Loading';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/transaction');
      setTransactions(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/transaction/${id}`);
      const newTransactions = [...transactions];
      newTransactions.splice(index, 1);
      setTransactions(newTransactions);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login para excluir transação');
      } else {
        toast.error('Ocorreu um erro ao excluir transação.');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Transactions</h1>
      <TransactionContainer>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Value</th>
              <th>Category</th>
              <th>Account</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={String(transaction.id)}>
                <td>{transaction.description}</td>
                <td>{transaction.value}</td>
                {get(transaction, 'TransactionCategory.name', false) ? (
                  <td>{transaction.TransactionCategory.name}</td>
                ) : (
                  <td />
                )}
                {get(transaction, 'Account.name', false) ? (
                  <td>{transaction.Account.name}</td>
                ) : (
                  <td />
                )}
                <td>
                  <NavLink to={`/transaction/${transaction.id}/edit`}>
                    <FaEdit size={16} />
                  </NavLink>
                </td>
                <td>
                  <NavLink
                    onClick={handleDeleteAsk}
                    to={`/transaction/${transaction.id}/delete`}
                  >
                    <FaWindowClose size={16} />
                  </NavLink>

                  <FaExclamation
                    onClick={(e) => handleDelete(e, transaction.id, index)}
                    size={16}
                    display="none"
                    cursor="pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TransactionContainer>
    </Container>
  );
}
