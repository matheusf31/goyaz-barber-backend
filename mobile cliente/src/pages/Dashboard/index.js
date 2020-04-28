import React, { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const loadAppointments = useCallback(async () => {
    try {
      const response = await api.get('appointments');
      setAppointments(response.data);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused, loadAppointments]);

  const handleAppointmentsRefresh = useCallback(
    async Fetching => {
      if (Fetching) {
        setIsFetching(true);
      }

      await loadAppointments();

      if (Fetching) {
        setIsFetching(false);
      }
    },
    [loadAppointments]
  );

  const handleCancel = useCallback(
    async id => {
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
    },
    [appointments, handleAppointmentsRefresh]
  );

  return (
    <Container>
      <Background />

      <Title>Agendamentos</Title>

      <List
        data={appointments}
        onRefresh={() => handleAppointmentsRefresh(true)}
        refreshing={isFetching}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Appointment data={item} onCancel={() => handleCancel(item.id)} />
        )}
      />
    </Container>
  );
}

export default withNavigationFocus(Dashboard);
