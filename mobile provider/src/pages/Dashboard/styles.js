import styled from 'styled-components/native';
import { TouchableHighlight, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Button from '~/components/Button';

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

export const HourList = styled(SwipeListView).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: Dimensions.get('window').width / 7 },
})`
  flex: 1;
  padding: 20px;
  margin-top: -20px;
`;

export const BusyButton = styled(TouchableHighlight)`
  right: 0;
  background-color: #f64c45;

  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 75px;
  height: 75px;
  border-radius: 5px;
`;

export const CancelDayButton = styled(Button)`
  width: 100%;
  height: 75px;
  margin-bottom: 20px;
  border-radius: 4px;

  background: #f64c45;
`;

export const FreeDayButton = styled(Button)`
  width: 100%;
  height: 75px;
  margin-bottom: 20px;
  border-radius: 4px;

  background: #8fd684;
`;
