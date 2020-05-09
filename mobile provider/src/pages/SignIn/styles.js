import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px 30px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0 74px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;

  flex-direction: row;
`;

export const ForgotButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: -20px;

  ${Platform.OS === 'android' &&
    css`
      margin-bottom: 0;
      margin-top: 5px;
    `}
`;

export const ForgotText = styled.Text`
  color: #ff9000;
  font-weight: bold;
  font-size: 16px;
`;
