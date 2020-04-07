import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Alert, Dimensions } from 'react-native';
import { isSunday, addDays } from 'date-fns';
import { withNavigationFocus } from '@react-navigation/compat';

import { useSelector } from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';
import Appointments from '~/components/Appointments';

import {
  Container,
  HourList,
  Title,
  CancelDayButton,
  FreeDayButton,
} from './styles';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const provider = useSelector((state) => state.user.profile);
  const prevDate = usePrevious(date);

  const dayBusy = useMemo(() => !data.find((e) => e.available && true), [data]);

  const lastHasPast = useMemo(() => {
    if (data.length) {
      return data[data.length - 1].past;
    }
  }, [data]);

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

      setData(response.data);
    } catch (err) {
      if (prevDate) {
        setDate(prevDate);
      }

      Alert.alert('Erro', err.response.data.error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadAvailable();
    }
  }, [date, prevDate, isFocused]);

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

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  async function handleSwipeBusy(item, rowMap) {
    const newItem = data.find((e) => e.time === item);

    if (newItem.providerBusy) {
      await api.delete('unavailable', {
        params: {
          date: newItem.value,
        },
      });
    } else {
      await api.post('unavailable', {
        date: newItem.value,
      });
    }

    loadAvailable();
    closeRow(rowMap, newItem.time);
  }

  async function handleDayAvailable(dayBusy) {
    if (dayBusy) {
      await api.delete('/daybusy', {
        params: {
          date: date.getTime(),
        },
      });
    } else {
      await api.post('/daybusy', null, {
        params: {
          date: date.getTime(),
        },
      });
    }

    loadAvailable();
  }

  const onRowOpen = (rowKey, rowMap) => {
    handleSwipeBusy(rowKey, rowMap);
  };

  const renderHiddenItem = ({ item }) => {
    if (item.available || (!item.appointment && !item.past)) {
      return <></>;
    }
  };

  const listFooter = () => {
    if (!lastHasPast) {
      return dayBusy ? (
        <FreeDayButton onPress={() => handleDayAvailable(dayBusy)}>
          Deixar dia disponível
        </FreeDayButton>
      ) : (
        <CancelDayButton onPress={() => handleDayAvailable(dayBusy)}>
          Deixar dia indisponível
        </CancelDayButton>
      );
    }

    return <></>;
  };

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <DateInput date={date} onChange={setDate} />

        <HourList
          onRefresh={() => handleHoursRefresh(true)}
          refreshing={isFetching}
          keyExtractor={(item) => item.time}
          data={data}
          disableRightSwipe
          renderItem={({ item }) => (
            <Appointments data={item} reload={loadAvailable} past={item.past} />
          )}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get('window').width / 1.4}
          onRowOpen={onRowOpen}
          ListFooterComponent={listFooter}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Dashboard);
