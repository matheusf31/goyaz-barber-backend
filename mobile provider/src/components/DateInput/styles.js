import styled from 'styled-components';
import { Calendar } from 'react-native-calendars';

export const Container = styled.View`
  margin: 60px 0 30px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 15px;
`;

export const CalendarInput = styled(Calendar)`
  margin: 20px;
  display: ${props => (props.opened ? 'flex' : 'none')};
  border-radius: 5px;
  margin-bottom: 0;
`;
