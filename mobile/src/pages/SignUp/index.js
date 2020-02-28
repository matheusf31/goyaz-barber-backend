import React, { useRef } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import Background from '~/components/Background';

import logo from '~/assets/images/logo2.jpeg';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SingUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  function handleSubmit() {}

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
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            autoCapitalize="none"
            placeholder="Senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
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
