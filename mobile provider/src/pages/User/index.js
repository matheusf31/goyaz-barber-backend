import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';

import Icon from 'react-native-vector-icons/Feather';

import api from '~/services/api';

import {
  Container,
  Title,
  List,
  HeaderContainer,
  HeaderLeftButton,
  HeaderRightButton,
  HeaderTitle,
} from './styles';

import Background from '~/components/Background';
import Customers from '~/components/Customers';

function User({ isFocused }) {
  const [clients, setClients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const maxPages = useMemo(() => {
    const total = clients.length;

    if (total % 5 === 0) {
      return total / 5;
    }

    return Math.trunc(total / 5) + 1;
  }, [clients]);

  const loadClients = useCallback(async (inPage = 1) => {
    try {
      const response = await api.get('users');

      setClients(prevState =>
        prevState !== response.data ? response.data : prevState
      );

      setPage(inPage);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setPage(1);

      loadClients();
    }
  }, [isFocused, loadClients]);

  const handleClientRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    loadClients();
    setRefreshing(false);
  }, [loadClients]);

  const renderItem = ({ item, index }) => {
    // paginação
    if (index >= 0 + (page - 1) * 5 && index <= 4 + (page - 1) * 5) {
      return <Customers data={item} reload={loadClients} />;
    }

    return null;
  };

  const renderHeader = () => {
    return (
      <HeaderContainer>
        {page > 1 && (
          <HeaderLeftButton onPress={() => setPage(page - 1)}>
            <Icon name="chevron-left" size={26} color="#ff9000" />
          </HeaderLeftButton>
        )}
        <HeaderTitle>
          {1 + (page - 1) * 5} -{' '}
          {page === maxPages ? clients.length : 5 + (page - 1) * 5} de{' '}
          {clients.length}
        </HeaderTitle>
        {page < maxPages && (
          <HeaderRightButton onPress={() => setPage(page + 1)}>
            <Icon name="chevron-right" size={26} color="#ff9000" />
          </HeaderRightButton>
        )}
      </HeaderContainer>
    );
  };

  return (
    <Background>
      <Container>
        <Title>Clientes</Title>

        <List
          data={clients}
          onRefresh={() => handleClientRefresh(true)}
          refreshing={refreshing}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(User);
