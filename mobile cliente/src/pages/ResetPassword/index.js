import React, { useState, useRef, useCallback } from 'react';
import { ScrollView, Alert } from 'react-native';

import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import api from '~/services/api';

import {
  BackButton,
  Container,
  Title,
  FormInput,
  SubmitButton,
} from './styles';

const ResetPassword = ({ navigation }) => {
  const [clearIconColorOnSubmit, setClearIconColorOnSubmit] = useState(false);

  const formRef = useRef(null);
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = useCallback(
    async data => {
      const { token, newPassword, confirmPassword } = data;

      try {
        await api.patch('passwordreset', {
          token,
          newPassword,
          confirmPassword,
        });

        Alert.alert('Senha alterada com sucesso!', 'Por favor, faça login.');
        navigation.navigate('SignIn');
      } catch (err) {
        formRef.current.setFieldValue('newPassword', '');
        formRef.current.setFieldValue('confirmPassword', '');
        setClearIconColorOnSubmit(prevState => !prevState);

        Alert.alert('Erro!', err.response.data.error);
      }
    },
    [navigation]
  );

  return (
    <Background>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={20} color="#fff" />
      </BackButton>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Recuperação de senha</Title>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormInput
              name="token"
              icon="mail-outline"
              placeholder="Token"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                newPasswordRef.current.focus();
              }}
            />

            <FormInput
              name="newPassword"
              icon="lock-outline"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Sua nova senha"
              textContentType="newPassword"
              ref={newPasswordRef}
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              clearIconColorOnSubmit={clearIconColorOnSubmit}
            />

            <FormInput
              name="confirmPassword"
              icon="lock-outline"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
              placeholder="Confirmação de senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current.submitForm();
              }}
              clearIconColorOnSubmit={clearIconColorOnSubmit}
            />

            <SubmitButton
              onPress={() => {
                if (formRef.current) {
                  formRef.current.submitForm();
                }
              }}
            >
              Criar nova senha
            </SubmitButton>
          </Form>
        </Container>
      </ScrollView>
    </Background>
  );
};

export default ResetPassword;
