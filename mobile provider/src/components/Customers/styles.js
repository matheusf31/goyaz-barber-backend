import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: ${props => (props.banned ? '#c53030' : '#fff')};

  align-items: center;
  justify-content: space-between;
`;

export const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 10px;
  max-width: 75%;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #000;
`;

export const Phone = styled.Text`
  font-size: 15px;
  margin-top: 4px;
  color: #000;
`;

export const Email = styled.Text`
  font-size: 15px;
  margin-top: 4px;
  color: #000;
`;

export const TotalCut = styled.Text`
  font-size: 15px;
  margin-top: 10px;
  color: #000;

  align-self: flex-start;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Cancel = styled.TouchableOpacity``;

export const InfoBan = styled.View`
  flex: 1;
`;

export const TextBan = styled.Text`
  align-self: flex-start;
  font-weight: bold;
  font-size: 14px;
  color: #111;
`;

export const CancelBan = styled.TouchableOpacity`
  margin-right: 5px;
`;

export const ConfirmBan = styled.TouchableOpacity``;
