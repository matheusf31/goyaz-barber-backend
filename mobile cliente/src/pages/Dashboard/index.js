import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';

import Icon from 'react-native-vector-icons/Feather';
import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import {
  Container,
  Title,
  List,
  HeaderContainer,
  HeaderLeftButton,
  HeaderRightButton,
  HeaderTitle,
} from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const maxPages = useMemo(() => {
    const total = appointments.length;

    if (total % 5 === 0) {
      return total / 5;
    }

    return Math.trunc(total / 5) + 1;
  }, [appointments]);

  const loadAppointments = useCallback(async () => {
    try {
      const response = await api.get('appointments');

      setAppointments(prevState =>
        prevState === response.data ? prevState : response.data
      );
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setPage(1);
      loadAppointments();
    }
  }, [isFocused, loadAppointments]);

  // carregar ao arrastar para cima
  const handleAppointmentsRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    loadAppointments();
    setRefreshing(false);
  }, [loadAppointments]);

  const handleCancel = useCallback(
    async id => {
      try {
        const response = await api.delete(`appointments/${id}`);

        setAppointments(prevState =>
          prevState.map(appointment =>
            appointment.id === id
              ? {
                  ...appointment,
                  canceled_at: response.data.canceled_at,
                }
              : appointment
          )
        );

        handleAppointmentsRefresh(false);
      } catch (err) {
        Alert.alert(err.response.data.error);
      }
    },

    [handleAppointmentsRefresh]
  );

  const renderItem = ({ item, index }) => {
    // paginação
    if (index >= 0 + (page - 1) * 5 && index <= 4 + (page - 1) * 5) {
      return (
        <Appointment
          appointment={item}
          onCancel={() => handleCancel(item.id)}
        />
      );
    }

    return null;
  };

  const renderHeader = () => {
    return (
      <HeaderContainer>
        {page > 1 && (
          <HeaderLeftButton onPress={() => setPage(page - 1)}>
            <Icon name="chevron-left" size={26} color="#FFF" />
          </HeaderLeftButton>
        )}
        <HeaderTitle>
          {1 + (page - 1) * 5} -{' '}
          {page === maxPages ? appointments.length : 5 + (page - 1) * 5} de{' '}
          {appointments.length}
        </HeaderTitle>
        {page < maxPages && (
          <HeaderRightButton onPress={() => setPage(page + 1)}>
            <Icon name="chevron-right" size={26} color="#FFF" />
          </HeaderRightButton>
        )}
      </HeaderContainer>
    );
  };

  return (
    <Container>
      <Background />

      <Title>Agendamentos</Title>

      <List
        data={appointments}
        onRefresh={() => handleAppointmentsRefresh()}
        refreshing={refreshing}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </Container>
  );
}

export default withNavigationFocus(Dashboard);
