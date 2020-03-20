import React from 'react';

import Background from '~/components/Background';

import { Container, CutTypeList, Cut, Title } from './styles';

export default function SelectCutType({ navigation, route }) {
  const { provider } = route.params;
  const { time } = route.params;

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
