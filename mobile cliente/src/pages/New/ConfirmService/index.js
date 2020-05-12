import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import defaultavatar from '~/assets/images/defaultavatar.png';

import Background from '~/components/Background';

import {
  Container,
  CutTypeButtons,
  Cut,
  ConfirmContainer,
  Info,
  DetailsContainer,
  ButtonTimeTextContainer,
  TextContainer,
  Avatar,
  Name,
  Time,
  SubmitButton,
  ButtonText,
  ButtonTimeText,
} from './styles';

export default function ConfirmService({ route, navigation }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cutType, setCutType] = useState('');

  const { provider } = route.params;
  const { time } = route.params;

  useEffect(() => {
    setShowConfirm(false);
  }, []);

  const dateFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: ptBR,
      }),
    [time]
  );

  const handleAddAppointments = useCallback(async () => {
    try {
      await api.post('appointments', {
        provider_id: provider.id,
        date: time,
        cut_type: cutType,
      });

      navigation.navigate('Dashboard');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error, [
        {
          text: 'Voltar para o Dashboard',
          onPress: () => navigation.navigate('Dashboard'),
        },
        {
          text: 'Selecionar outro horário',
          onPress: () => navigation.navigate('SelectDateTime'),
        },
      ]);
    }
  }, [provider.id, time, cutType, navigation]);

  return (
    <Background>
      <Container>
        <CutTypeButtons>
          <Cut
            isActive={cutType === 'corte'}
            onPress={() => {
              setCutType('corte');
              setShowConfirm(true);
            }}
          >
            <ButtonText>corte</ButtonText>

            <ButtonTimeTextContainer>
              <Icon name="access-time" size={12} color="#000" />
              <ButtonTimeText>30 min</ButtonTimeText>
            </ButtonTimeTextContainer>
          </Cut>

          <Cut
            isActive={cutType === 'corte e barba'}
            onPress={() => {
              setCutType('corte e barba');
              setShowConfirm(true);
            }}
          >
            <ButtonText>corte e barba</ButtonText>

            <ButtonTimeTextContainer>
              <Icon name="access-time" size={12} color="#000" />
              <ButtonTimeText>1 hr</ButtonTimeText>
            </ButtonTimeTextContainer>
          </Cut>
        </CutTypeButtons>

        {showConfirm && (
          <ConfirmContainer>
            <Info>
              {provider.avatar ? (
                <Avatar
                  source={{
                    uri: provider.avatar.url,
                  }}
                />
              ) : (
                <Avatar source={defaultavatar} />
              )}

              <DetailsContainer>
                <TextContainer>
                  <Icon name="person" size={16} color="#FFFFFF" />
                  <Name>{provider.name} </Name>
                </TextContainer>

                <TextContainer>
                  <Icon name="content-cut" size={16} color="#FFFFFF" />
                  <Time>
                    {cutType.charAt(0).toUpperCase() + cutType.slice(1)}
                  </Time>
                </TextContainer>

                <TextContainer>
                  <Icon name="access-time" size={16} color="#FFFFFF" />
                  <Time>
                    {dateFormatted.charAt(0).toUpperCase() +
                      dateFormatted.slice(1)}
                  </Time>
                </TextContainer>
              </DetailsContainer>
            </Info>

            <SubmitButton onPress={handleAddAppointments}>
              Confirmar agendamento
            </SubmitButton>
          </ConfirmContainer>
        )}
      </Container>
    </Background>
  );
}
