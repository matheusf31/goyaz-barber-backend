import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from '@react-navigation/compat';

import api from '~/services/api';

import { Container, Title, List } from './styles';

import Background from '~/components/Background';
import Customers from '~/components/Customers';

function User({ isFocused }) {
  const [clients, setClients] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  async function loadClients() {
    const response = await api.get('users');
    setClients(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadClients();
    }
  }, [isFocused]);

  async function handleClientRefresh(Fetching) {
    if (Fetching) {
      setIsFetching(true);
    }

    await loadClients();

    if (Fetching) {
      setIsFetching(false);
    }
  }

  /**
   * Implementar função de banir o usuário
   */

  return (
    <Background>
      <Container>
        <Title>Clientes</Title>

        <List
          data={clients}
          onRefresh={() => handleClientRefresh(true)}
          refreshing={isFetching}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Customers data={item} reload={loadClients} />
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(User);
