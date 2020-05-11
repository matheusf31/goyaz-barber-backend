import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import api from '~/services/api';
import Background from '~/components/Background';

import defaultavatar from '~/assets/images/defaultavatar.png';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      try {
        const response = await api.get('providers');
        setProviders(response.data);
      } catch (err) {
        Alert.alert('Erro', err.response.data.error);
      }
    }

    loadProviders();
  }, []);

  return (
    <Container>
      <Background />

      {providers && (
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() => {
                navigation.navigate('SelectDateTime', { provider });
              }}
            >
              {provider.avatar ? (
                <Avatar
                  source={{
                    uri: provider.avatar.url,
                  }}
                />
              ) : (
                <Avatar source={defaultavatar} />
              )}

              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      )}
    </Container>
  );
}
