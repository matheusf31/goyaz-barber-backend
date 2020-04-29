import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 46px;
  background: #ff9000;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #252429;
  font-weight: bold;
  font-size: 16px;
`;
