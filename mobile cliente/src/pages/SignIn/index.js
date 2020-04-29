import React, { useRef, useState } from 'react';
import { Image, ScrollView, KeyboardAvoidingView, View } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';

import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import logo from '~/assets/images/logo3.png';

import {
  Container,
  Title,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SingIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
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
                width: 360,
                height: 140,
                resizeMode: 'stretch',
              }}
            />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <FormInput
              name="email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <FormInput
              name="password"
              icon="lock-outline"
              secureTextEntry
              placeholder="Senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setpassword}
            />

            <SubmitButton loading={loading} onPress={handleSubmit}>
              Acessar
            </SubmitButton>

            <SignLink
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <SignLinkText>Criar conta</SignLinkText>
              <Icon name="log-in" size={20} color="#ff9000" />
            </SignLink>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

SingIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};
