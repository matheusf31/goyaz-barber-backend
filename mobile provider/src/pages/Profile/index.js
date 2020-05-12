import React, { useRef, useCallback, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import api from '~/services/api';

import Background from '~/components/Background';
import AvatarImage from './AvatarImage';

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
  const profile = useSelector(state => state.user.profile);
  const [avatar, setAvatar] = useState(() =>
    profile.avatar ? profile.avatar.url : null
  );

  const [clearIconColorOnSubmit, setClearIconColorOnSubmit] = useState(false);

  const dispatch = useDispatch();

  const formRef = useRef(null);
  const phoneRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = useCallback(
    async data => {
      if (formRef.current) {
        formRef.current.setErrors({});
      }

      try {
        const { email, oldPassword, password, confirmPassword } = data;

        const schema = Yup.object().shape({
          name: Yup.string(),
          email: Yup.string()
            .email()
            .required(),
          phone: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        let avatar_id;

        // se não há um novo avatar, avatar: undefined será enviado
        if (avatar && avatar.uri) {
          const file = new FormData();

          file.append('file', {
            name: 'avatarImage',
            uri: avatar.uri,
            type: avatar.type,
          });

          // upload do avatar
          const response = await api.post('/files', file);

          avatar_id = response.data.id;
        }

        let { name, phone } = data;
        name = name === '' ? profile.name : name;
        phone = phone === '' ? profile.phone : phone;

        dispatch(
          updateProfileRequest({
            name,
            email,
            phone,
            avatar_id,
            oldPassword,
            password,
            confirmPassword,
          })
        );

        formRef.current.setFieldValue('password', '');
        formRef.current.setFieldValue('oldPassword', '');
        formRef.current.setFieldValue('confirmPassword', '');

        setClearIconColorOnSubmit(prevState => !prevState);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (formRef.current) {
            formRef.current.setErrors(errors);
          }

          return;
        }

        formRef.current.setFieldValue('password', '');
        formRef.current.setFieldValue('oldPassword', '');
        formRef.current.setFieldValue('confirmPassword', '');

        setClearIconColorOnSubmit(prevState => !prevState);

        Alert.alert('Erro ao atualizar perfil.', err.response.data.error);
      }
    },
    [avatar, dispatch, profile]
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <View>
              <Title>Meu perfil</Title>
            </View>

            <AvatarImage avatar={avatar} onChangeAvatar={setAvatar} />

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
                textContentType="newPassword"
                ref={oldPasswordRef}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current.focus()}
                clearIconColorOnSubmit={clearIconColorOnSubmit}
              />

              <FormInput
                name="password"
                icon="lock-outline"
                secureTextEntry
                autoCapitalize="none"
                placeholder="Sua nova senha"
                textContentType="newPassword"
                ref={passwordRef}
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
