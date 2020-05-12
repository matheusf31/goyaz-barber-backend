import React, { useRef, useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Alert, Platform } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { withNavigationFocus } from '@react-navigation/compat';

import api from '~/services/api';

import getValidationErrors from '../../util/getValidationErrors';

import Background from '~/components/Background';

import { Container, Title, FormInput, SubmitButton } from './styles';

function NewBarber({ isFocused }) {
  const [clearIconColorOnSubmit, setClearIconColorOnSubmit] = useState(false);

  const formRef = useRef(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const handleSubmit = useCallback(async data => {
    try {
      if (formRef.current) {
        formRef.current.setErrors({});
      }

      const { name, phone, email, password } = data;

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório.'),
        email: Yup.string()
          .email('Digite um e-mail válido.')
          .required('E-mail obrigatório.'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        phone: Yup.string().required('Número de celular obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/providers', {
        name,
        email,
        phone,
        password,
      });

      Alert.alert('Sucesso', `${name} agora é seu novo provedor`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        if (formRef.current) {
          formRef.current.setErrors(errors);
        }

        return;
      }

      formRef.current.setFieldValue('password', '');

      Alert.alert('Erro no castro', err.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      formRef.current.setData({
        name: '',
        phone: '',
        email: '',
        password: '',
      });

      setClearIconColorOnSubmit(prevState => !prevState);
    }
  }, [isFocused]);

  return (
    <Background>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: Platform.OS === 'ios' ? 1 : 0 }}
      >
        <Container>
          <View>
            <Title>Cadastre um novo provedor</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormInput
              name="name"
              icon="person-outline"
              placeholder="Nome"
              autoCorrect={false}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => phoneRef.current.focus()}
              clearIconColorOnSubmit={clearIconColorOnSubmit}
            />

            <FormInput
              name="phone"
              icon="call"
              placeholder="telefone"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="numeric"
              returnKeyType="next"
              ref={phoneRef}
              onSubmitEditing={() => emailRef.current.focus()}
              clearIconColorOnSubmit={clearIconColorOnSubmit}
            />

            <FormInput
              name="email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              clearIconColorOnSubmit={clearIconColorOnSubmit}
            />

            <FormInput
              name="password"
              icon="lock-outline"
              secureTextEntry
              autoCapitalize="none"
              placeholder="Senha"
              returnKeyType="send"
              textContentType="newPassword"
              ref={passwordRef}
              onSubmitEditing={() => {
                if (formRef.current) {
                  formRef.current.submitForm();
                }
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
              Casdastrar provedor
            </SubmitButton>
          </Form>
        </Container>
      </ScrollView>
    </Background>
  );
}

export default withNavigationFocus(NewBarber);
