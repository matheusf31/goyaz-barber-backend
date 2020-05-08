import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import api from '~/services/api';
import Background from '~/components/Background';

import defaultavatar from '~/assets/images/defaultavatar.png';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider() {
  const [providers, setProviders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
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
