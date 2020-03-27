/* eslint-disable import/no-unresolved */
import React, { useState, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { getWeekOfMonth, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import DateInput from '~/components/DateInput';

import { Container, Charts, ChartView, Title } from './styles';

export default function Graphic() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('concluded', {
        params: {
          date: date.getTime(),
        },
      });

      setData(response.data);
    }

    loadData();
  }, [date]);

  function calculaCusto(semana) {
    const valor = data.reduce(
      (total, elemento) =>
        getWeekOfMonth(parseISO(elemento.date), {
          locale: pt,
        }) === semana
          ? total + parseFloat(elemento.cost)
          : total,
      0
    );

    return valor;
  }

  const semana1 = useMemo(() => calculaCusto(1), [data]);
  const semana2 = useMemo(() => calculaCusto(2), [data]);
  const semana3 = useMemo(() => calculaCusto(3), [data]);
  const semana4 = useMemo(() => calculaCusto(4), [data]);
  const semana5 = useMemo(() => calculaCusto(5), [data]);
  const semana6 = useMemo(() => calculaCusto(6), [data]);
  const semana7 = useMemo(() => calculaCusto(7), [data]);

  const chartData = {
    labels: ['sem 1', 'sem 2', 'sem 3', 'sem 4', 'sem 5', 'sem 6', 'sem 7'],
    datasets: [
      {
        data: [semana1, semana2, semana3, semana4, semana5, semana6, semana7],
        color: () => `rgba(35, 56, 136, 0.7)`, // optional
      },
    ],
    legend: ['Lucro mensal'],
  };

  return (
    <Background>
      <Container>
        <Title>Gráficos</Title>

        <DateInput date={date} onChange={setDate} graphic />

        {data.length > 0 && (
          <Charts>
            <ChartView>
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width / 1.1} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientToOpacity: 1,
                  color: () => `rgba(35, 56, 136, 0.2)`, // cor das linhas e do preenchimento delas
                  labelColor: (opacity = 1) => `rgba(84, 84, 84, ${opacity})`, // cor do chartData
                  propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    stroke: '#fff',
                  },
                  strokeWidth: 2, // optional, default 3
                  fillShadowGradient: '#60BEF3',
                }}
                onDataPointClick={value => console.tron.log(value.value)}
                bezier
                style={{
                  // edita a view do gráfico
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </ChartView>
          </Charts>
        )}
      </Container>
    </Background>
  );
}

// const lineChartConfig = {
//   backgroundColor: '#0072E2', // background do gŕafico
//   backgroundGradientFrom: '#0064FB',
//   backgroundGradientFromOpacity: 0.2,
//   backgroundGradientToOpacity: 0.2,
//   color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // cor das linhas e do preenchimento delas
//   labelColor: (opacity = 1) => `rgba(137, 137, 137, ${opacity})`, // cor do chartData
//   propsForDots: {
//     r: '3',
//     strokeWidth: '1',
//     stroke: '#fff',
//   },
//   strokeWidth: 1, // optional, default 3
//   fillShadowGradient: 1,
// };
