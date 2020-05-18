import styled from 'styled-components';

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

export const CalendarContainer = styled.View`
  flex-direction: row;
  width: 90%;
  height: 30px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  align-self: center;
  align-items: center;
  justify-content: space-around;
`;

export const CalendarText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const CalendarLeftBottom = styled.TouchableOpacity`
  margin-left: -30px;
`;

export const CalendarRightBottom = styled.TouchableOpacity`
  margin-right: -30px;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 15px;
`;
