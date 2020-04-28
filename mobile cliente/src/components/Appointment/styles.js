import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 14px;
  border-radius: 10px;
  background: #ffffff;

  height: 120px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 15px;
`;

export const InfoCancelation = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #000;
  margin-bottom: 10px;
`;

export const Time = styled.Text`
  color: #000;
  font-size: 13px;
  margin-top: 2px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-right: -5px;
`;

export const TextCancelation = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const Cancel = styled.TouchableOpacity``;

export const Contact = styled.TouchableOpacity`
  margin-right: 5px;
`;

export const CancelCancelation = styled.TouchableOpacity`
  margin-right: 2px;
`;

export const ConfirmCancelation = styled.TouchableOpacity`
  margin-right: 5px;
`;
