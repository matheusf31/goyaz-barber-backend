import React, { useRef, useCallback } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Alert,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';

import getValidationErrors from '../../util/getValidationErrors';

import logo from '~/assets/images/logo3.png';

import Background from '~/components/Background';

import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Title,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SingUp({ navigation }) {
  const dispatch = useDispatch();

  const formRef = useRef(null);
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(
    async data => {
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

        dispatch(signUpRequest(name, phone, email, password));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (formRef.current) {
            formRef.current.setErrors(errors);
          }

          return;
        }

        Alert.alert('Erro no castro', 'Verifique seus dados.');
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
          contentContainerStyle={{ flex: Platform.OS === 'ios' ? 1 : 0 }}
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

            <View>
              <Title>Crie sua conta</Title>
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
              />

              <SubmitButton
                loading={loading}
                onPress={() => {
                  if (formRef.current) {
                    formRef.current.submitForm();
                  }
                }}
              >
                Criar conta
              </SubmitButton>
            </Form>

            <SignLink
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={20} color="#FF9000" />
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
