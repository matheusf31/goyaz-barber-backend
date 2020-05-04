import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { ActivityIndicator, Text, Alert } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';

import api from '~/services/api';

import { Container, Title, List } from './styles';

import Background from '~/components/Background';
import Customers from '~/components/Customers';

function User({ isFocused }) {
  const [clients, setClients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [ended, setEnded] = useState(false);
  const [callOnEndReached, setCallOnEndReached] = useState(false);

  const loadClients = useCallback(async (inPage = 1) => {
    try {
      const response = await api.get('users', {
        params: {
          page: inPage,
        },
      });

      setClients(prevClients => {
        if (response.data.length > 0) {
          return [...prevClients, ...response.data];
        }
        setEnded(true);
        return prevClients;
      });

      setPage(inPage);
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setClients([]);
      setPage(1);
      setEnded(false);

      loadClients();
    }
  }, [isFocused]);

  const handleClientRefresh = useCallback(() => {
    setRefreshing(true);

    setClients([]);
    setPage(1);
    setEnded(false);
    setCallOnEndReached(false);

    loadClients();

    setRefreshing(false);
  }, [loadClients]);

  const renderFooter = () => {
    if (ended)
      return (
        <Text style={{ color: '#fff', alignSelf: 'center' }}>
          Não há mais usuários
        </Text>
      );

    if (!refreshing) {
      return <ActivityIndicator style={{ color: '#fff' }} />;
    }
    return null;
  };

  const nextPage = useMemo(() => page + 1, [page]);

  return (
    <Background>
      <Container>
        <Title>Clientes</Title>

        <List
          data={clients}
          onRefresh={() => handleClientRefresh(true)}
          refreshing={refreshing}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Customers data={item} reload={loadClients} />
          )}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd > -100) {
              setCallOnEndReached(true);
            }
          }}
          onMomentumScrollEnd={() => {
            if (callOnEndReached && !ended) {
              loadClients(nextPage);
            }

            return setCallOnEndReached(false);
          }}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(User);
