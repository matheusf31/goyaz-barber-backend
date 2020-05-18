import styled from 'styled-components/native';
import { TouchableHighlight, Dimensions } from 'react-native';

export const Container = styled(TouchableHighlight)`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;

  background: ${props => {
    if (props.hasAppointment) {
      return '#8FD684';
    }

    if (props.active) {
      return '#fff';
    }

    return '#ADADAD';
  }};

  align-items: center;
  justify-content: center;

  opacity: ${props => {
    if (props.appointmentConcluded) {
      return '0.8';
    }

    if (props.active || props.hasAppointment) {
      return '1';
    }

    return '0.8';
  }};

  height: 75px;
`;

export const Box = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.concluded ? 'center' : 'space-around')};
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  width: 170px;
  flex-direction: column;

  align-items: flex-start;
  margin-right: -50px;
`;

export const Time = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #111;

  padding: 5px;
`;

export const InfoText = styled.Text`
  margin-left: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #111;
`;

export const Cancel = styled.TouchableOpacity`
  margin-left: 30px;
`;

export const Done = styled.TouchableOpacity`
  margin-left: 30px;
`;

export const BoxCancel = styled.View`
  flex-direction: row;
  margin-left: 20px;
`;

export const DenyCancel = styled.TouchableOpacity`
  margin-right: 5px;
`;

export const ConfirmCancel = styled.TouchableOpacity`
  margin-right: -20px;
`;

export const BoxView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BoxIcon = styled.View`
  right: ${-Dimensions.get('window').width / 2.6}px;
  bottom: 0;
  position: absolute;
`;
