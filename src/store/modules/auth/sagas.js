import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/token', payload);
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    const responseUserData = yield call(
      axios.get,
      '/user/id/',
      response.data.id
    );

    response.data.user = { ...responseUserData.data };
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login.');

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválidos.');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  console.log(payload);
  const { name, lastName, id, email, phone, birthDate, password } = payload;
  console.log('payload', payload);
  try {
    if (id) {
      yield call(axios.put, '/user', {
        name,
        lastName,
        email,
        phone,
        birthDate,
        password: password || undefined,
      });
      toast.success('Dados alterados com sucesso.');
      yield put(
        actions.registerUpdatedSuccess({
          id,
          name,
          lastName,
          email,
          phone,
          birthDate,
          password,
        })
      );
    } else {
      yield call(axios.post, '/user', {
        name,
        lastName,
        email,
        phone,
        birthDate,
        password,
      });
      toast.success('Conta criada com sucesso.');
      yield put(
        actions.registerCreatedSuccess({
          id,
          name,
          lastName,
          email,
          phone,
          birthDate,
          password,
        })
      );
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', '');
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Ocorreu um erro.');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
