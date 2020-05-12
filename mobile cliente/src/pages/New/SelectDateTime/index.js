import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isSunday, addDays } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ route }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const navigation = useNavigation();

  const { provider } = route.params;

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  // é ele que faz executar a requisição de novo
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

        const filterHours = response.data.filter(hour => {
          if (!hour.past && hour.available) {
            return true;
          }

          return false;
        });

        setHours(filterHours);
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
  }, [date, prevDate, provider.id]);

  const handleSelectHour = useCallback(
    time => {
      navigation.navigate('ConfirmService', {
        provider,
        time,
      });
    },
    [navigation, provider]
  );

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
              <Title enabled={item.available}>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}
