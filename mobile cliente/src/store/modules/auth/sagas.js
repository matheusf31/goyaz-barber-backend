import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { signInSuccess, signFailure, updateSuccess } from './actions';

import * as RootNavigation from '~/services/RootNavigation';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    if (!user.provider) {
      Alert.alert('Usuário não é um prestador de serviço!');
      yield put(signFailure());
    } else {
      // settar informações que serão utilizadas em todas as requisições
      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(signInSuccess(token, user));
    }
  } catch (err) {
    Alert.alert('Erro no login!', err.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, phone, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      phone,
      email,
      password,
    });

    RootNavigation.navigate('SignIn');
    Alert.alert('Conta criada com sucesso!', 'Faça seu login por gentileza.');
  } catch (err) {
    Alert.alert('Falha no cadastro!', err.response.data.error);
    yield put(signFailure());
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth; // token antigo

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    return;
  }

  // tentar atualizar o token utilizando o token antigo
  try {
    const response = yield call(api.put, 'sessions');

    const newToken = response.data.token;
    const { profile } = response.data;

    if (newToken) {
      api.defaults.headers.Authorization = `Bearer ${newToken}`;
    }

    yield put(updateSuccess(newToken, profile));
  } catch (err) {
    Alert.alert('Erro', `${err.response.data.error}`);
    yield put(signFailure());
  }
}

export function signOut() {
  // deslogar usuário
  console.tron.log('Deslogar');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
