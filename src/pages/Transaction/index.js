import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import history from '../../services/history';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';

export default function Transaction({ match }) {
  const id = get(match, 'params.id', 0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionCategoryID, setTransactionCategoryID] = useState('');
  const [accountID, setAccountID] = useState('');
  const [isActive, setIsActive] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/transaction/${id}`);
        setValue(data.value);
        setDescription(data.description);
        setTransactionDate(data.transactionDate);
        setTransactionCategoryID(data.transactionCategoryID);
        setAccountID(data.accountID);
        setIsActive(data.isActive);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Loading isLoding={isLoading} />
      <h1>{id ? 'Editar transação' : 'Criar transação'}</h1>

      <Form onSubmit={handleSubmit}>
        <span>Valor</span>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor"
        />
        <span>Descrição</span>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <span>Data da Transação</span>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          placeholder="Data da Transação"
        />
        <span>ID da categoria</span>
        <input
          type="number"
          value={transactionCategoryID}
          onChange={(e) => setTransactionCategoryID(e.target.value)}
          placeholder="ID da categoria"
        />
        <span>ID da conta</span>
        <input
          type="number"
          value={accountID}
          onChange={(e) => setAccountID(e.target.value)}
          placeholder="ID da conta"
        />
        <span>Está ativa</span>
        <input
          type="boolean"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          placeholder="true ou false"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Transaction.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
