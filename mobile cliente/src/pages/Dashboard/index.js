import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, ActivityIndicator, View, Text } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [ended, setEnded] = useState(false);
  const [callOnEndReached, setCallOnEndReached] = useState(false);

  const loadAppointments = useCallback(async (inPage = 1) => {
    try {
      const response = await api.get('appointments', {
        params: {
          page: inPage,
        },
      });

      setAppointments(prevAppointments => {
        if (response.data.length > 0) {
          return [...prevAppointments, ...response.data];
        }
        setEnded(true);
        return prevAppointments;
      });

      setPage(inPage);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      // reset state
      setAppointments([]);
      setPage(1);
      setEnded(false);

      loadAppointments(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  // carregar ao arrastar para cima
  const handleAppointmentsRefresh = useCallback(() => {
    setRefreshing(true);

    // reset state
    setAppointments([]);
    setPage(1);
    setEnded(false);
    setCallOnEndReached(false);

    loadAppointments();

    setRefreshing(false);
  }, [loadAppointments]);

  const handleCancel = useCallback(
    async id => {
      try {
        const response = await api.delete(`appointments/${id}`);

        setAppointments(
          appointments.map(appointment =>
            appointment.id === id
              ? {
                  ...appointment,
                  canceled_at: response.data.canceled_at,
                }
              : appointment
          )
        );

        handleAppointmentsRefresh(false);
      } catch (err) {
        Alert.alert(err.response.data.error);
      }
    },

    [appointments, handleAppointmentsRefresh]
  );

  const renderFooter = () => {
    if (ended)
      return (
        <Text style={{ color: '#fff', alignSelf: 'center' }}>
          Não há mais agendamentos
        </Text>
      );

    if (!refreshing) {
      return <ActivityIndicator style={{ color: '#fff' }} />;
    }
    return null;
  };

  const nextPage = useMemo(() => page + 1, [page]);

  return (
    <Container>
      <Background />

      <Title>Agendamentos</Title>
      <List
        data={appointments}
        onRefresh={() => handleAppointmentsRefresh()}
        refreshing={refreshing}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Appointment
            appointment={item}
            onCancel={() => handleCancel(item.id)}
          />
        )}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.01}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd > -100) {
            setCallOnEndReached(true);
          }
        }}
        onMomentumScrollEnd={() => {
          if (callOnEndReached && !ended) {
            loadAppointments(nextPage);
          }

          return setCallOnEndReached(false);
        }}
      />
    </Container>
  );
}

export default withNavigationFocus(Dashboard);
