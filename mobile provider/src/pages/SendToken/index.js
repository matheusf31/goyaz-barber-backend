import React, { useRef, useCallback } from 'react';
import { ScrollView, Alert } from 'react-native';

import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import {
  BackButton,
  Container,
  Title,
  EmailInput,
  SubmitButton,
  ResetButton,
  ResetText,
} from './styles';

const SendToken = ({ navigation }) => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(async data => {
    const { email } = data;

    try {
      await api.post('passwordreset', {
        email,
      });

      Alert.alert('Token enviado com sucesso!', 'Confira seu email.');
    } catch (err) {
      Alert.alert('Erro!', err.response.data.error);
    }
  }, []);

  return (
    <Background>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </BackButton>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Enviar token</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <EmailInput
              name="email"
              icon="mail-outline"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="send"
              onSubmitEditing={() => {
                if (formRef.current) {
                  formRef.current.submitForm();
                }
              }}
            />

            <SubmitButton
              onPress={() => {
                formRef.current.submitForm();
              }}
            >
              Enviar
            </SubmitButton>
          </Form>

          <ResetButton onPress={() => navigation.navigate('ResetPassword')}>
            <ResetText>Já recebi o token</ResetText>
          </ResetButton>
        </Container>
      </ScrollView>
    </Background>
  );
};

export default SendToken;
