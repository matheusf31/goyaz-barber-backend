import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
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

export const SignLinkText = styled.Text`
  color: #ff9000;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
`;
