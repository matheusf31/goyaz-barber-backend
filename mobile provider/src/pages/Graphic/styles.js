import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
  margin-bottom: -30px;
`;

export const Charts = styled.ScrollView`
  margin-bottom: 30px;
`;

export const ChartView = styled.View`
  margin-bottom: 50px;
`;

export const LineChartInfo = styled.View`
  flex-direction: row;
  margin: 10px 10px 0 10px;
  justify-content: flex-end;
`;

export const LineChartWeekTotal = styled.Text`
  flex: 1;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;

export const LineChartTotal = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: bold;
`;
