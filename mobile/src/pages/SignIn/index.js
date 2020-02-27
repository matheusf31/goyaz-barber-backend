import React from 'react';
import { Image } from 'react-native';

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

export default function SingIn() {
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
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
          />

          <FormInput icon="lock-outline" secureTextEntry placeholder="Senha" />

          <SubmitButton onPress={() => {}}>Acessar</SubmitButton>
        </Form>

        <SignLink onPress={() => {}}>
          <SignLinkText>Criar conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
