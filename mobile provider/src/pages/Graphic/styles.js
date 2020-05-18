import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
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
  margin-bottom: 20px;
`;

export const ChartView = styled.View`
  margin-bottom: 50px;
`;

export const TableContainer = styled.View`
  margin: 10px 10px 0 10px;
  padding: 10px 20px;

  background: #fff;
  height: 200px;
  border-radius: 5px;

  justify-content: space-around;
`;

export const TableTitle = styled.Text`
  font-size: 20px;
  color: rgba(35, 56, 136, 0.7);
  font-weight: bold;
  align-self: center;
`;

export const TableContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 0 20px;
`;

export const TableContentTotal = styled.View`
  flex-direction: row;

  justify-content: space-between;

  width: 70px;
`;

export const TableFirstColumn = styled.Text`
  font-size: 12px;
  color: #000;
`;

export const TableTotalColumn = styled.Text`
  font-size: 12px;
  color: #000;
  font-weight: bold;
  /* margin-left: 12px; */
`;

export const TableFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 20px 0;
`;

export const TableFooterTotal = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  align-self: center;
`;
