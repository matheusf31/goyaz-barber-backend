import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
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

  const provider = useSelector(state => state.user.profile);

  const dayBusy = useMemo(() => !data.find(e => e.available && true), [data]);

  // hook próprio
  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  const prevDate = usePrevious(date);

  const lastHasPast = useMemo(() => {
    if (data.length) {
      return data[data.length - 1].past;
    }

    return null;
  }, [data]);

  useEffect(() => {
    if (isSunday(date) && !prevDate) {
      setDate(addDays(date, 1));
    }
  }, [date, prevDate]);

  const loadAvailable = useCallback(async () => {
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
  }, [date, provider.id]);

  useEffect(() => {
    if (isFocused) {
      loadAvailable();
    }
  }, [date, isFocused, loadAvailable]);

  const handleHoursRefresh = useCallback(() => {
    setIsFetching(true);
    loadAvailable();
    setIsFetching(false);
  }, [loadAvailable]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const handleSwipeBusy = useCallback(
    async (item, rowMap) => {
      const newItem = data.find(e => e.time === item);

      if (newItem.providerBusy) {
        try {
          await api.patch('unavailable', {
            date: newItem.value,
          });
        } catch (err) {
          Alert.alert('Erro!', err.response.data.value);
        }
      } else {
        try {
          await api.post('unavailable', {
            date: newItem.value,
          });
        } catch (err) {
          Alert.alert('Erro!', err.response.data.value);
        }
      }

      loadAvailable();
      closeRow(rowMap, newItem.time);
    },
    [data, loadAvailable]
  );

  const handleDayAvailable = useCallback(
    async isDayBusy => {
      if (isDayBusy) {
        try {
          await api.delete('/daybusy', {
            params: {
              date: date.getTime(),
            },
          });
        } catch (err) {
          Alert.alert('Erro!', err.response.data.value);
        }
      } else {
        try {
          await api.post('/daybusy', null, {
            params: {
              date: date.getTime(),
            },
          });
        } catch (err) {
          Alert.alert('Erro!', err.response.data.value);
        }
      }

      loadAvailable();
    },
    [date, loadAvailable]
  );

  const onRowOpen = (rowKey, rowMap) => {
    handleSwipeBusy(rowKey, rowMap);
  };

  const renderHiddenItem = () => {
    return <></>;
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
          data={data}
          onRefresh={handleHoursRefresh}
          refreshing={isFetching}
          keyExtractor={item => item.time}
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
