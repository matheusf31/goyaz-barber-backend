import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ModalView = styled.ScrollView`
  height: 100%;
  width: 100%;
  background: #000000bb;
`;

export const ModalViewBox = styled.View`
  background: #fff;
  align-self: center;
  width: 80%;
  height: 400px;
  margin-top: 40%;

  border-radius: 10px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ModalClose = styled.TouchableOpacity`
  align-self: flex-end;
  margin: 5px;
  padding: 5px;
`;

export const ModalText = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: #000;

  margin-top: -30px;
`;

export const ModalForm = styled.View`
  padding: 10px;
`;

export const ModalInputContainer = styled.View`
  height: 40px;

  border-radius: 1px;
  border-bottom-width: 1px;
  border-bottom-color: #000;

  margin: 10px 20px 5px 20px;

  flex-direction: row;
  align-items: center;
`;

export const ModalInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  margin-left: 5px;
  color: #000;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  margin: 30px;

  border-radius: 5px;
  border-width: 2px;
  border-color: #4ec04d;

  background: ${props => (props.active ? '#4ec04d' : '#fff')};

  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;
