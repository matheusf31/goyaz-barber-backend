import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;

  background: #18171d;

  border-radius: 10px;
  border-width: 2px;

  border-color: #18171d;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  height: 100%;
  flex: 1;
  font-size: 15px;
  margin-left: 16px;
  color: #fff;
`;
