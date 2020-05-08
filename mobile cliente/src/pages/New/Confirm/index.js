import React, { useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import defaultavatar from '~/assets/images/defaultavatar.png';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation, route }) {
  const { provider, time, cut_type } = route.params;

  const dateFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: ptBR,
      }),
    [time]
  );

  const handleAddAppointments = useCallback(async () => {
    try {
      await api.post('appointments', {
        provider_id: provider.id,
        date: time,
        cut_type,
      });

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error, [
        {
          text: 'Voltar para o Dashboard',
          onPress: () => navigation.navigate('Dashboard'),
        },
        {
          text: 'Selecionar outro horário',
          onPress: () => navigation.navigate('SelectDateTime'),
        },
      ]);
    }
  }, [cut_type, navigation, provider.id, time]);

  return (
    <Background>
      <Container>
        {provider.avatar ? (
          <Avatar
            source={{
              uri: provider.avatar.url,
            }}
          />
        ) : (
          <Avatar source={defaultavatar} />
        )}

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
