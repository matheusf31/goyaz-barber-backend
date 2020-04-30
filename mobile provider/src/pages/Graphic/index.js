import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { withNavigationFocus } from '@react-navigation/compat';

import { getWeekOfMonth, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import DateInput from '~/components/DateInput';

import {
  Container,
  Charts,
  ChartView,
  Title,
  LineChartInfo,
  LineChartWeekTotal,
  LineChartTotal,
} from './styles';

function Graphic({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [schedules, setSchedules] = useState(0);
  const [profitWeekInfo, setProfitWeekInfo] = useState({});
  const [customersWeekInfo, setCustomersWeekInfo] = useState({});

  const loadData = useCallback(async () => {
    const response = await api.get('concluded', {
      params: {
        date: date.getTime(),
      },
    });

    setData(response.data);
  }, [date]);

  const loadAppointments = useCallback(async () => {
    const response = await api.get('schedule', {
      params: { date },
    });

    setSchedules(response.data.length);
  }, [date]);

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
      loadData();
    }
  }, [date, isFocused, loadAppointments, loadData]);

  const calculaCusto = useCallback(
    semana => {
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
    },
    [data]
  );

  const calculaCliente = useCallback(
    semana => {
      const valor = data.filter(
        e =>
          getWeekOfMonth(parseISO(e.date), {
            locale: pt,
          }) === semana
      );

      return valor;
    },
    [data]
  );

  const weeks = useMemo(() => {
    return [
      {
        profit: calculaCusto(1),
        customers: calculaCliente(1),
      },
      {
        profit: calculaCusto(2),
        customers: calculaCliente(2),
      },
      {
        profit: calculaCusto(3),
        customers: calculaCliente(3),
      },
      {
        profit: calculaCusto(4),
        customers: calculaCliente(4),
      },
      {
        profit: calculaCusto(5),
        customers: calculaCliente(5),
      },
      {
        profit: calculaCusto(6),
        customers: calculaCliente(6),
      },
      {
        profit: calculaCusto(7),
        customers: calculaCliente(7),
      },
    ];
  }, [data]);

  // tentar colocar um useMemo aqui
  const profitChartData = useMemo(() => {
    return {
      labels: ['sem 1', 'sem 2', 'sem 3', 'sem 4', 'sem 5', 'sem 6', 'sem 7'],
      datasets: [
        {
          data: [
            weeks[0].profit,
            weeks[1].profit,
            weeks[2].profit,
            weeks[3].profit,
            weeks[4].profit,
            weeks[5].profit,
            weeks[6].profit,
          ],
          color: () => `rgba(35, 56, 136, 0.7)`, // muda a cor da linha
        },
      ],
      legend: ['Renda por semana'],
    };
  }, [weeks]);

  const profitChartTotal = weeks.reduce((total, e) => total + e.profit, 0);

  const customersChartData = useMemo(() => {
    return {
      labels: ['sem 1', 'sem 2', 'sem 3', 'sem 4', 'sem 5', 'sem 6', 'sem 7'],
      datasets: [
        {
          data: [
            weeks[0].customers.length,
            weeks[1].customers.length,
            weeks[2].customers.length,
            weeks[3].customers.length,
            weeks[4].customers.length,
            weeks[5].customers.length,
            weeks[6].customers.length,
          ],
          color: () => `rgba(35, 56, 136, 0.7)`, // muda a cor da linha
        },
      ],
      legend: ['Clientes por semana'],
    };
  }, [weeks]);

  const customersChartTotal = useMemo(() => {
    return weeks.reduce((total, e) => total + e.customers.length, 0);
  }, [weeks]);

  return (
    <Background>
      <Container>
        <Title>Gráficos</Title>

        <DateInput date={date} onChange={setDate} graphic />

        {data.length > 0 && (
          <Charts>
            <ChartView>
              <LineChart
                data={profitChartData}
                width={Dimensions.get('window').width / 1.05} // from react-native
                height={200}
                yAxisLabel="R$ "
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientToOpacity: 1,
                  color: () => `rgba(35, 56, 136, 0.1)`, // cor das linhas e do preenchimento delas
                  labelColor: (opacity = 1) => `rgba(84, 84, 84, ${opacity})`, // cor do chartData
                  propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    stroke: '#fff',
                  },
                  strokeWidth: 2, // optional, default 3
                  fillShadowGradient: '#60BEF3',
                  decimalPlaces: 0,
                }}
                onDataPointClick={value => setProfitWeekInfo(value)}
                bezier
                style={{
                  // edita a view do gráfico
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                segments={4}
              />

              <LineChartInfo>
                {profitWeekInfo.value ? (
                  <LineChartWeekTotal>
                    {`Renda da semana ${profitWeekInfo.index + 1}: R$ ${
                      profitWeekInfo.value
                    }`}
                  </LineChartWeekTotal>
                ) : (
                  profitWeekInfo.index >= 0 && (
                    <LineChartWeekTotal>
                      {`Semana ${profitWeekInfo.index + 1} não teve renda`}
                    </LineChartWeekTotal>
                  )
                )}

                <LineChartTotal>
                  Lucro total do mês de março: R$ {profitChartTotal}
                </LineChartTotal>
              </LineChartInfo>
            </ChartView>

            <ChartView>
              <LineChart
                data={customersChartData}
                width={Dimensions.get('window').width / 1.05} // from react-native
                height={200}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  backgroundGradientFromOpacity: 1,
                  backgroundGradientToOpacity: 1,
                  color: () => `rgba(35, 56, 136, 0.1)`, // cor das linhas e do preenchimento delas
                  labelColor: (opacity = 1) => `rgba(84, 84, 84, ${opacity})`, // cor do chartData
                  propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    stroke: '#fff',
                  },
                  strokeWidth: 2, // optional, default 3
                  fillShadowGradient: '#60BEF3',
                  decimalPlaces: 0,
                }}
                onDataPointClick={value => setCustomersWeekInfo(value)}
                style={{
                  // edita a view do gráfico
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                bezier
                segments={4}
              />

              <LineChartInfo>
                {customersWeekInfo.value ? (
                  <LineChartWeekTotal>
                    {`Clientes da semana ${customersWeekInfo.index + 1}: ${
                      customersWeekInfo.value
                    }`}
                  </LineChartWeekTotal>
                ) : (
                  customersWeekInfo.index >= 0 && (
                    <LineChartWeekTotal>
                      {`Semana ${customersWeekInfo.index +
                        1} não teve clientes`}
                    </LineChartWeekTotal>
                  )
                )}

                <LineChartTotal>
                  Total de clientes do mês de março: {customersChartTotal}
                </LineChartTotal>
              </LineChartInfo>
            </ChartView>
          </Charts>
        )}
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Graphic);
