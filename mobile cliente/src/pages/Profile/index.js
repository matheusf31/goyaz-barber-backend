import React, { useRef, useCallback } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch, Alert } from 'react-redux';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Background from '~/components/Background';

import getValidationErrors from '../../util/getValidationErrors';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Title,
  Separator,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const formRef = useRef(null);
  const phoneRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = useCallback(
    async data => {
      try {
        if (formRef.current) {
          formRef.current.setErrors({});
        }

        console.tron.log(data);

        const {
          name,
          email,
          phone,
          oldPassword,
          password,
          confirmPassword,
        } = data;

        const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string()
            .email()
            .required(),
          phone: Yup.string().matches(
            phoneRegExp,
            'Número de telefone inválido.'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(
          updateProfileRequest({
            name,
            email,
            phone,
            oldPassword,
            password,
            confirmPassword,
          })
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          if (formRef.current) {
            formRef.current.setErrors(errors);
          }

          return;
        }

        Alert.alert('Erro ao atualizar perfil.', 'Verifique seus dados.');
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Background>
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
          <Container>
            <Title>Meu perfil</Title>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{
                name: profile.name,
                phone: profile.phone,
                email: profile.email,
              }}
            >
              <FormInput
                name="name"
                icon="person-outline"
                autoCorrect={false}
                autoCapitalize="words"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current.focus()}
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
                onSubmitEditing={() => oldPasswordRef.current.focus()}
              />

              <Separator />

              <FormInput
                name="oldPassword"
                icon="lock-outline"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Sua senha atual"
                ref={oldPasswordRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
              />

              <FormInput
                name="password"
                icon="lock-outline"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Sua nova senha"
                ref={passwordRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
              />

              <FormInput
                name="confirmPassword"
                icon="lock-outline"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Confirmação de senha"
                ref={confirmPasswordRef}
                returnKeyType="send"
                onSubmitEditing={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
              />

              <SubmitButton
                onPress={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
              >
                Atualizar perfil
              </SubmitButton>
            </Form>

            <LogoutButton onPress={handleLogout}>Deslogar</LogoutButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}
