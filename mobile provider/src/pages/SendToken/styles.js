import { Platform } from 'react-native';
import styled, { css } from 'styled-components';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const BackButton = styled.TouchableOpacity`
  margin: 60px 30px 0;

  ${Platform.OS === 'android' &&
    css`
      margin: 30px 20px 0;
    `}
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin: 20px 30px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0 44px;
`;

export const EmailInput = styled(Input)``;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const ResetButton = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: -20px;
  /* border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.5); */
`;

export const ResetText = styled.Text`
  color: #ff9000;
  font-weight: bold;
  font-size: 16px;
`;
