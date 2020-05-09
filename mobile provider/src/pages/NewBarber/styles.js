import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;

  ${Platform.OS === 'ios'
    ? css`
        margin: -104px 0 0;
      `
    : css`
        margin: 20px 0 40px;
      `}
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
