import React, { useRef, useState } from 'react';
import { Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/images/logo3.png';

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
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior="padding">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image
              source={logo}
              style={{
                width: 350,
                height: 150,
                resizeMode: 'stretch',
              }}
            />

            <Form>
              <FormInput
                name="name"
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="words"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current.focus()}
                value={name}
                onChangeText={setName}
              />

              <FormInput
                name="phone"
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
                name="email"
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
                name="password"
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
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={20} color="#FFF" />
              <SignLinkText>Fazer login</SignLinkText>
            </SignLink>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

SingUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};
