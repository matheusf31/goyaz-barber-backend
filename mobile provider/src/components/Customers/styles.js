import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: ${props => (props.banned ? '#f64c45' : '#fff')};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Box = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 15px;
  max-width: 65%;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #000;
`;

export const Contact = styled.Text`
  font-size: 15px;
  margin-top: 4px;
  color: #000;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Cancel = styled.TouchableOpacity``;

export const InfoBan = styled.View``;

export const TextBan = styled.Text`
  align-self: center;
  font-weight: bold;
  font-size: 14px;
  color: #111;
`;

export const CancelBan = styled.TouchableOpacity`
  margin-right: 5px;
`;

export const ConfirmBan = styled.TouchableOpacity``;
