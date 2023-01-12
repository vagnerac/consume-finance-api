import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const nameStored = useSelector((state) => state.auth.user.name);
  const lastNameStored = useSelector((state) => state.auth.user.lastName);
  const phoneStored = useSelector((state) => state.auth.user.phone);
  const birthDateStored = useSelector((state) => state.auth.user.birthDate);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;

    setName(nameStored);
    setLastName(lastNameStored);
    setPhone(phoneStored);
    setBirthDate(birthDateStored);
    setEmail(emailStored);
  }, [
    nameStored,
    id,
    lastNameStored,
    phoneStored,
    birthDateStored,
    emailStored,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (lastName.length < 3 || lastName.length > 255) {
      formErrors = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
    }
    if (!id && (password.length < 8 || password.length > 50)) {
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

    dispatch(
      actions.registerRequest({
        name,
        lastName,
        id,
        email,
        phone,
        birthDate,
        password,
      })
    );
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? 'Editar dados' : 'Crie a sua conta'}</h1>

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
        <label htmlFor="lastName">
          Sobrenome:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <button type="submit">{id ? 'Salvar' : 'Criar minha conta'}</button>
      </Form>
    </Container>
  );
}
