import React, { useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';
import WppIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Box,
  Avatar,
  Info,
  InfoCancelation,
  Name,
  Time,
  Cancel,
  Contact,
  Buttons,
  TextCancelation,
  CancelCancelation,
  ConfirmCancelation,
} from './styles';

export default function Appointment({ data, onCancel }) {
  const [confirm, setConfirm] = useState(false);

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: ptBR,
    });
  }, [data.date]);

  function handleCancel() {
    setConfirm(true);
  }

  function handleClear() {
    setConfirm(false);
  }

  return (
    <Container past={data.past}>
      <Box>
        {confirm ? (
          <>
            <InfoCancelation>
              <TextCancelation>Deseja mesmo cancelar?</TextCancelation>
            </InfoCancelation>

            <Buttons>
              {data.cancelable && !data.canceled_at && (
                <CancelCancelation onPress={handleClear}>
                  <Icon name="clear" size={25} color="#f64c75" />
                </CancelCancelation>
              )}

              {data.cancelable && !data.canceled_at && (
                <ConfirmCancelation onPress={onCancel}>
                  <WppIcon name="check" size={25} color="#54F64C" />
                </ConfirmCancelation>
              )}
            </Buttons>
          </>
        ) : (
          <>
            <Avatar
              // source={{
              //   uri: data.provider.avatar
              //     ? data.provider.avatar.url
              //     : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
              // }}
              source={{
                uri: `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
              }}
            />

            <Info>
              <Name>{data.provider.name}</Name>
              <Time>{dateParsed}</Time>
            </Info>

            <Buttons>
              {!data.canceled_at && !data.past && (
                <Contact
                  onPress={() => {
                    Linking.openURL('whatsapp://send?phone=5562993961282');
                  }}
                >
                  <WppIcon name="whatsapp" size={25} color="#54F64C" />
                </Contact>
              )}

              {data.cancelable && !data.canceled_at && (
                <Cancel onPress={handleCancel}>
                  <Icon name="event-busy" size={25} color="#f64c75" />
                </Cancel>
              )}
            </Buttons>
          </>
        )}
      </Box>
    </Container>
  );
}
