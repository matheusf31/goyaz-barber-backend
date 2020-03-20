import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { isSunday, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, HourList, Hour, Title, DateWeekday } from './styles';

export default function SelectDateTime({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const { provider } = route.params;
  const prevDate = usePrevious(date);

  if (isSunday(date) && !prevDate) {
    setDate(addDays(date, 1));
  }

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
        if (prevDate) {
          setDate(prevDate);
        }

        Alert.alert(
          'Data invalida',
          'O barbeiro não está disponível nesta data.'
        );
      }
    }

    loadAvailable();
  }, [date, provider.id, prevDate]);

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

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

        <DateWeekday>{format(date, 'cccc', { locale: pt })}</DateWeekday>

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
              <Title enabled={item.available}>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
