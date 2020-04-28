import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Background from '~/components/Background';

import { Container, CutTypeList, Cut, Title } from './styles';

export default function SelectCutType({ route }) {
  const { provider } = route.params;
  const { time } = route.params;
  const navigation = useNavigation();

  const cuts = ['corte', 'corte e barba'];

  function handleSelectCutType(cut_type) {
    navigation.navigate('Confirm', {
      provider,
      time,
      cut_type,
    });
  }

  return (
    <Background>
      <Container>
        <CutTypeList
          data={cuts}
          keyExtractor={(item, index) => item[index]}
          renderItem={({ item }) => (
            <Cut
              onPress={() => {
                handleSelectCutType(item);
              }}
            >
              <Title>{item}</Title>
            </Cut>
          )}
        />
      </Container>
    </Background>
  );
}
