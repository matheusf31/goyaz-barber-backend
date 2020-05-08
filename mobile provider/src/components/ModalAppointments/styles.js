import styled from 'styled-components/native';

export const ModalView = styled.ScrollView`
  /* background: #000000bb; */
`;

export const ModalViewBox = styled.View`
  background: #fff;
  align-self: center;
  width: 90%;
  height: 400px;
  margin-top: -20%;

  border-radius: 10px;
`;

export const ModalHeader = styled.View`
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
  margin-top: 20px;
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

  opacity: ${props => (props.editable ? 1 : 0.1)};
`;

export const ModalInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #000;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 110px;
  height: 50px;
  margin: 30px;

  border-radius: 5px;
  border-width: 2px;
  border-color: #8fd684;

  background: ${props => (props.active ? '#8FD684' : '#fff')};

  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;
