import React, { useMemo, useState } from 'react';
import { Linking } from 'react-native';
import {
  parseISO,
  formatRelative,
  differenceInCalendarDays,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import WppIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultavatar from '~/assets/images/defaultavatar.png';

import {
  Container,
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

export default function Appointment({ appointment, onCancel }) {
  const [confirm, setConfirm] = useState(false);

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(appointment.date), new Date(), {
      locale: pt,
    });
  }, [appointment.date]);

  return (
    <Container past={appointment.past}>
      {!confirm ? (
        <>
          {appointment.provider.avatar ? (
            <Avatar
              source={{
                uri: appointment.provider.avatar
                  ? appointment.provider.avatar.url
                  : undefined,
              }}
            />
          ) : (
            <Avatar source={defaultavatar} />
          )}

          <Info>
            <Name>{appointment.provider.name}</Name>
            {differenceInCalendarDays(parseISO(appointment.date), new Date()) >
            6 ? (
              <Time>
                Data: {dateParsed} -{' '}
                {format(parseISO(appointment.date), 'cccc', { locale: pt })},
                {` ${format(parseISO(appointment.date), 'HH:mm', {
                  locale: pt,
                })}`}
              </Time>
            ) : (
              <Time>Data: {dateParsed}</Time>
            )}
            <Time>Contato: {appointment.provider.phone}</Time>
          </Info>

          <Buttons>
            {!appointment.canceled_at && !appointment.past && (
              <Contact
                onPress={() => {
                  Linking.openURL(
                    `whatsapp://send?phone=55${appointment.provider.phone}`
                  );
                }}
              >
                <WppIcon name="whatsapp" size={25} color="#54F64C" />
              </Contact>
            )}

            {appointment.cancelable && !appointment.canceled_at && (
              <Cancel onPress={() => setConfirm(true)}>
                <Icon name="event-busy" size={25} color="#f64c75" />
              </Cancel>
            )}
          </Buttons>
        </>
      ) : (
        <>
          <InfoCancelation>
            <TextCancelation>Deseja mesmo cancelar?</TextCancelation>
          </InfoCancelation>

          <Buttons>
            {appointment.cancelable && !appointment.canceled_at && (
              <CancelCancelation onPress={() => setConfirm(false)}>
                <Icon name="clear" size={25} color="#f64c75" />
              </CancelCancelation>
            )}

            {appointment.cancelable && !appointment.canceled_at && (
              <ConfirmCancelation onPress={onCancel}>
                <Icon name="check" size={25} color="#54F64C" />
              </ConfirmCancelation>
            )}
          </Buttons>
        </>
      )}
    </Container>
  );
}
