// import styled from 'styled-components/native';

// export const Container = styled.SafeAreaView`
//   flex: 1;
// `;

// export const List = styled.FlatList.attrs({
//   showVerticalScrollIndicator: false,
//   contentContainerStyle: { padding: 30 },
// })`
//   margin-bottom: 60px;
// `;

// export const DateWeekday = styled.Text`
//   margin: -20px 0 20px;
//   align-self: center;
//   font-size: 14px;
//   font-weight: bold;
//   color: #fff;
// `;

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-bottom: 50px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
  margin-bottom: -30px;
`;

export const HourList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 40 },
})`
  flex: 1;
  padding: 20px;
  margin-top: -20px;
`;
