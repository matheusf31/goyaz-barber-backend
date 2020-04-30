import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 50px;
`;

export const Separator = styled.View`
  margin: 20px 0 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
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
  margin-bottom: 100px;
  background: #c53030;
`;
