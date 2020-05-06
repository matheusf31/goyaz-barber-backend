import styled from 'styled-components/native';

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
  margin: 24px 0 44px;
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
  margin-left: 10px;
  margin-bottom: 50px;
`;
