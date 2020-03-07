import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;

  useEffect(() => {
    async function loadAvailable() {
      try {
        const response = await api.get(`/providers/${provider.id}/available`, {
          params: {
            date: date.getTime(),
          },
        });

        setHours(response.data);
      } catch (err) {
        Alert.alert(
          'Data invalida',
          'O barbeiro não está disponível nesta data'
        );
      }
    }

    loadAvailable();
  }, [date, provider.id]);

  // function handleSelectHour(time) {
  //   navigation.navigate('Confirm', {
  //     provider,
  //     time,
  //   });
  // }

  function handleSelectHour(time) {
    navigation.navigate('SelectCutType', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              onPress={() => {
                handleSelectHour(item.value);
              }}
              enabled={item.available}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
