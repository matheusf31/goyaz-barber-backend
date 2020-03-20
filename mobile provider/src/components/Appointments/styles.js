import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: ${props => (props.enabled ? '#fff' : '#f64c45')};
  opacity: ${props => (props.hasPast ? 0.6 : 1)};

  align-items: center;
`;

export const Box = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Info = styled.View`
  flex-direction: column;
`;

export const Time = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #111;

  padding: 5px;
`;

export const Text = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #111;
`;

export const Cancel = styled.TouchableOpacity`
  margin-left: 30px;
`;

export const Done = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const BoxCancel = styled.View`
  flex-direction: row;
  margin-left: 30px;
`;

export const DenyCancel = styled.TouchableOpacity`
  margin-right: 5px;
`;

export const ConfirmCancel = styled.TouchableOpacity`
  margin-right: -20px;
`;

// export const Avatar = styled.Image`
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
// `;

// export const Info = styled.View`
//   flex: 1;
//   margin-left: 15px;
//   max-width: 65%;
// `;

// export const InfoCancelation = styled.View`
//   flex: 1;
// `;

// export const Name = styled.Text`
//   font-weight: bold;
//   font-size: 14px;
//   color: #333;
// `;

// export const Time = styled.Text`
//   color: #666;
//   font-size: 13px;
//   margin-top: 4px;
// `;

// export const Buttons = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// export const TextCancelation = styled.Text`
//   align-self: center;
//   font-weight: bold;
//   font-size: 14px;
//   color: #333;
// `;

// export const Cancel = styled.TouchableOpacity``;

// export const Contact = styled.TouchableOpacity`
//   margin-right: 5px;
// `;

// export const CancelCancelation = styled.TouchableOpacity`
//   margin-right: 2px;
// `;

// export const ConfirmCancelation = styled.TouchableOpacity`
//   margin-right: 5px;
// `;
