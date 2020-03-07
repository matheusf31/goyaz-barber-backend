import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  async function handleCancel(id) {
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
  }

  async function handleRefresh() {
    setIsFetching(true);
    loadAppointments();
    setIsFetching(false);
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          onRefresh={() => handleRefresh()}
          refreshing={isFetching}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}
