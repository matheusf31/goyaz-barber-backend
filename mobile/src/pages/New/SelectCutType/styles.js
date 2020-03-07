import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const CutTypeList = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const Cut = styled.TouchableOpacity`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  flex: 1;

  align-items: center;
  justify-content: center;
  margin: 80px 10px 20px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
