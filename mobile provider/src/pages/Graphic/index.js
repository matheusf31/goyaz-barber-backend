import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import Background from '~/components/Background';

import { Container, FirstViewChart, Title } from './styles';

export default function Graphic() {
  return (
    <Background>
      <Container>
        <Title>Gráficos</Title>

        <FirstViewChart>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    10,
                    22,
                    39,
                    4,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width / 1.1} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0.4,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(59, 82, 178, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#fff',
              },
            }}
            bezier
            style={{
              backgroundColor: '#fff',
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    10,
                    22,
                    39,
                    4,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width / 1.1} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0.4,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(59, 82, 178, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#fff',
              },
            }}
            bezier
            style={{
              backgroundColor: '#fff',
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    10,
                    22,
                    39,
                    4,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width / 1.1} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0.4,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(59, 82, 178, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#fff',
              },
            }}
            bezier
            style={{
              backgroundColor: '#fff',
              marginVertical: 8,
              borderRadius: 16,
            }}
          />

          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    10,
                    22,
                    39,
                    4,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width / 1.1} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0.4,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(59, 82, 178, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '1',
                stroke: '#fff',
              },
            }}
            bezier
            style={{
              backgroundColor: '#fff',
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </FirstViewChart>
      </Container>
    </Background>
  );
}
