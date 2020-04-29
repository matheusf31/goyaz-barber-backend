import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
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
  background: #f64c45;
`;
