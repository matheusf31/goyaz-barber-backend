import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: ${Platform.OS === 'ios' ? 30 : 0}px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 20px;
  width: 75%;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px; /** colocar 0 para android */
  margin-bottom: 40px;
`;

export const FormInput = styled(Input)`
  width: 85%;
  margin: 5px;
`;

export const SubmitButton = styled(Button)`
  width: 85%;
  margin-top: 30px;
`;

export const LogoutButton = styled(Button)`
  width: 85%;
  margin-top: 10px;
  margin-bottom: 120px;
  background: #c53030;
  align-self: center;
`;
