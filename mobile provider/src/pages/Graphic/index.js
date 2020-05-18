import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dimensions, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { withNavigationFocus } from '@react-navigation/compat';

import { getWeekOfMonth, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import GraphsDateInput from '~/components/GraphsDateInput';

import {
  Container,
  Charts,
  ChartView,
  Title,
  TableContainer,
  TableTitle,
  TableContent,
  TableContentTotal,
  TableFirstColumn,
  TableTotalColumn,
  TableFooter,
  TableFooterTotal,
} from './styles';

function Graphic({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [concludedAppointments, setConcludedAppointments] = useState([]);
  const [monthAppointments, setMonthAppointments] = useState(0);

  const loadData = useCallback(async () => {
    try {
      const response = await api.get('concluded', {
        params: {
          date: date.getTime(),
        },
      });

      // agendamentos concluidos
      setConcludedAppointments(response.data);
    } catch (err) {
      Alert.alert('Erro!', err.response.data.error);
    }
  }, [date]);

  const loadAppointments = useCallback(async () => {
    try {
      const response = await api.get('schedule', {
        params: { date },
      });

      // total de agendamentos no mês (concluidos e não concluidos)
      setMonthAppointments(response.data.length);
    } catch (err) {
      Alert.alert('Erro!', err.response.data.error);
    }
  }, [date]);

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
      loadData();
    }
  }, [date, isFocused, loadAppointments, loadData]);

  const calcProfit = useCallback(
    week => {
      const value = concludedAppointments.reduce(
        (total, element) =>
          getWeekOfMonth(parseISO(element.date), {
            locale: pt,
          }) === week
            ? parseFloat(total) + parseFloat(element.cost)
            : parseFloat(total),
        0
      );

      return value;
    },
    [concludedAppointments]
  );

  const calcCustumers = useCallback(
    week => {
      const value = concludedAppointments.filter(
        e =>
          getWeekOfMonth(parseISO(e.date), {
            locale: pt,
          }) === week
      );

      return value;
    },
    [concludedAppointments]
  );

  const weeks = useMemo(() => {
    return [
      {
        profit: calcProfit(1),
        customers: calcCustumers(1),
      },
      {
        profit: calcProfit(2),
        customers: calcCustumers(2),
      },
      {
        profit: calcProfit(3),
        customers: calcCustumers(3),
      },
      {
        profit: calcProfit(4),
        customers: calcCustumers(4),
      },
      {
        profit: calcProfit(5),
        customers: calcCustumers(5),
      },
      {
        profit: calcProfit(6),
        customers: calcCustumers(6),
      },
      {
        profit: calcProfit(7),
        customers: calcCustumers(7),
      },
    ];
  }, [calcCustumers, calcProfit]);

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

  const profitChartTotal = useMemo(
    () => weeks.reduce((total, e) => total + e.profit, 0),
    [weeks]
  );

  const customersChartTotal = useMemo(
    () => weeks.reduce((total, e) => total + e.customers.length, 0),
    [weeks]
  );

  return (
    <Background>
      <Container>
        <Title>Controle de caixa</Title>
        <GraphsDateInput date={date} onChange={setDate} graphic />

        {concludedAppointments.length > 0 && (
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
                bezier
                style={{
                  // edita a view do gráfico
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                segments={4}
              />

              <TableContainer>
                <TableTitle>
                  Lucro de {format(date, 'MMMM', { locale: pt })}
                </TableTitle>

                {weeks.map((week, index) => (
                  <TableContent key={index.toString()}>
                    {week.profit ? (
                      <>
                        <TableFirstColumn>Semana {index + 1}</TableFirstColumn>
                        <TableContentTotal>
                          <TableTotalColumn>R$</TableTotalColumn>
                          <TableTotalColumn>
                            {week.profit.toFixed(2)}
                          </TableTotalColumn>
                        </TableContentTotal>
                      </>
                    ) : (
                      <>
                        <TableFirstColumn>Semana {index + 1}</TableFirstColumn>
                        <TableContentTotal>
                          <TableTotalColumn>R$</TableTotalColumn>
                          <TableTotalColumn>
                            {week.profit.toFixed(2)}
                          </TableTotalColumn>
                        </TableContentTotal>
                      </>
                    )}
                  </TableContent>
                ))}

                <TableFooter>
                  <TableFooterTotal>Total</TableFooterTotal>
                  <TableFooterTotal>
                    R$ {profitChartTotal.toFixed(2)}
                  </TableFooterTotal>
                </TableFooter>
              </TableContainer>

              <TableContainer>
                <TableTitle>
                  Clientes de {format(date, 'MMMM', { locale: pt })}
                </TableTitle>

                {weeks.map((week, index) => (
                  <TableContent key={index.toString()}>
                    {week.customers ? (
                      <>
                        <TableFirstColumn>Semana {index + 1}</TableFirstColumn>
                        <TableTotalColumn>
                          {week.customers.length}
                        </TableTotalColumn>
                      </>
                    ) : (
                      <>
                        <TableFirstColumn>Semana {index + 1}</TableFirstColumn>
                        <TableTotalColumn>R$ 0</TableTotalColumn>
                      </>
                    )}
                  </TableContent>
                ))}

                <TableFooter>
                  <TableFooterTotal>Total</TableFooterTotal>
                  <TableFooterTotal>{customersChartTotal}</TableFooterTotal>
                </TableFooter>
              </TableContainer>

              <TableContainer
                style={{ justifyContent: 'flex-start', height: 130 }}
              >
                <TableTitle>
                  Agendamentos de {format(date, 'MMMM', { locale: pt })}
                </TableTitle>

                <TableFooter>
                  <TableFooterTotal>Marcados</TableFooterTotal>
                  <TableFooterTotal>{monthAppointments}</TableFooterTotal>
                </TableFooter>

                <TableFooter style={{ marginTop: 5 }}>
                  <TableFooterTotal>Concluidos</TableFooterTotal>
                  <TableFooterTotal>
                    {concludedAppointments.length}
                  </TableFooterTotal>
                </TableFooter>
              </TableContainer>
            </ChartView>
          </Charts>
        )}
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Graphic);
