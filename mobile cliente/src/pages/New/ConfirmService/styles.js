import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  margin-top: 100px;
  align-items: center;
`;

export const CutTypeButtons = styled.View`
  flex-direction: row;
  margin: 20px 30px -20px;
`;

export const Cut = styled(RectButton)`
  background: ${props => (props.isActive ? '#ff9000' : '#ffffff')};
  align-items: center;
  justify-content: center;
  padding: 25px;
  margin: 10px;
  border-radius: 4px;

  width: ${Dimensions.get('screen').width / 2.4}px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const ButtonTimeTextContainer = styled.View`
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ButtonTimeText = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  margin-left: 2px;

  align-items: center;
  justify-content: center;
`;

// ---- Confirm

export const ConfirmContainer = styled.View`
  width: 85%;
  align-items: center;

  margin-top: 70px;
  border-radius: 4px;
  padding: 20px;

  background: rgba(0, 0, 0, 0.7);
`;

export const Info = styled.View`
  flex-direction: row;
`;

export const DetailsContainer = styled.View`
  flex: 1;
  margin-left: 20px;

  justify-content: center;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 5px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;

  border-radius: 40px;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;

  margin-left: 10px;
`;

export const Time = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);

  margin-left: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;
