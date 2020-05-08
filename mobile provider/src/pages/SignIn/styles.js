import styled from 'styled-components/native';

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
  /* border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.5); */
`;

export const ForgotText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
