import React, { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { isSunday, addDays } from 'date-fns';

import { useSelector } from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Appointments from '~/components/Appointments';

import { Container, HourList, Title } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const provider = useSelector(state => state.user.profile);
  const prevDate = usePrevious(date);

  if (isSunday(date) && !prevDate) {
    setDate(addDays(date, 1));
  }

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

  useEffect(() => {
    loadAvailable();
  }, [date, provider.id, prevDate]);

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  function handleHoursRefresh(Fetching) {
    if (Fetching) {
      setIsFetching(true);
    }

    loadAvailable();

    if (Fetching) {
      setIsFetching(false);
    }
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          onRefresh={() => handleHoursRefresh(true)}
          refreshing={isFetching}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Appointments data={item} reload={loadAvailable} />
          )}
        />
      </Container>
    </Background>
  );
}
