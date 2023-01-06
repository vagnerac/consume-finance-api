import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';

export default function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (lastname.length < 3 || lastname.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
    }
    if (password.length < 8 || password.length > 50) {
      formErrors = true;
      toast.error('Senha deve ter entre 8 e 50 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }
    if (phone.length < 10 || phone.length > 11) {
      formErrors = true;
      toast.error('Telefone inválido');
    }
    const birthDateConv = new Date(Date.parse(birthDate));
    if (
      !Object.prototype.toString.call(birthDateConv) ||
      birthDateConv > Date.now()
    ) {
      formErrors = true;
      toast.error('Data de nascimento inválida');
    }

    if (formErrors) return;

    setIsLoading(true);

    try {
      await axios.post('/user/', {
        nome: name,
        sobrenome: lastname,
        password,
        telefone: phone,
        data_de_nascimento: birthDate,
        email,
      });
      toast.success('Você se cadastrou com sucesso.');
      setIsLoading(false);
      history.push('/login');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.map((error) => toast.error(error));
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Crie a sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu Nome"
          />
        </label>
        <label htmlFor="lastname">
          Sobrenome:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Seu Sobrenome"
          />
        </label>
        <label htmlFor="phone">
          Telefone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Seu Telefone"
          />
        </label>
        <label htmlFor="birthDate">
          Data de Nascimento:
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Sua Data de Nascimento"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu Email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
