import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/images/logo2.jpeg';

import Background from '~/components/Background';

import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SingUp({ navigation }) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest(name, phone, email, password));
  }

  return (
    <Background>
      <Container>
        <Image
          source={logo}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'stretch',
          }}
        />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="call"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="telefone"
            keyboardType="numeric"
            ref={phoneRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={phone}
            onChangeText={setPhone}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCapitalize="none"
            placeholder="Senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SingUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};
