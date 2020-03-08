import React, { useMemo } from 'react';

import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation, route }) {
  const { provider } = route.params;
  const { time } = route.params;
  const { cut_type } = route.params;

  const dateFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: ptBR,
      }),
    [time]
  );

  async function handleAddAppointments() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
      cut_type,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          // source={{
          //   uri: provider.avatar
          //     ? provider.avatar.url
          //     : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          // }}
          source={{
            uri: `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{cut_type}</Time>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointments}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
