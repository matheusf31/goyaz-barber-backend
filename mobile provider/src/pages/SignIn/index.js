import React, { useRef, useCallback } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Alert,
  Platform,
} from 'react-native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import getValidationErrors from '../../util/getValidationErrors';

import Background from '~/components/Background';
import logo from '~/assets/images/logo3.png';

import {
  Container,
  Title,
  FormInput,
  SubmitButton,
  ForgotButton,
  ForgotText,
} from './styles';

export default function SingIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const formRef = useRef(null);

  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(
    async data => {
      try {
        if (formRef.current) {
          formRef.current.setErrors({});
        }

        const { email, password } = data;

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido.')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(signInRequest(email, password));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (formRef.current) {
            formRef.current.setErrors(errors);
          }

          return;
        }

        Alert.alert(
          'Erro no login.',
          'Verifique seus dados ou entre em contato com o provedor.'
        );
      }
    },
    [dispatch]
  );

  return (
    <Background>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: Platform.OS === 'ios' ? 1 : 0 }}
        >
          <Container>
            <Image
              source={logo}
              style={{
                width: 360,
                height: 140,
                resizeMode: 'stretch',
              }}
            />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <FormInput
                name="email"
                icon="mail-outline"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                // value={email}
                // onChangeText={setEmail}
              />

              <FormInput
                name="password"
                icon="lock-outline"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
                ref={passwordRef}
              />

              <SubmitButton
                loading={loading}
                onPress={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
              >
                Acessar
              </SubmitButton>
            </Form>

            <ForgotButton>
              <ForgotText onPress={() => navigation.navigate('SendToken')}>
                Esqueci minha senha
              </ForgotText>
            </ForgotButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}
