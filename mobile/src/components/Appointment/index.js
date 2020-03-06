import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import WppIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Left,
  Avatar,
  Info,
  Name,
  Time,
  Cancel,
  Contact,
  Buttons,
} from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
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
      </Left>

      <Buttons>
        {data.cancelable && (
          <Contact onPress={() => {}}>
            <WppIcon name="whatsapp" size={25} color="#54F64C" />
          </Contact>
        )}

        {data.cancelable && !data.canceled_at && (
          <Cancel onPress={onCancel}>
            <Icon name="event-busy" size={25} color="#f64c75" />
          </Cancel>
        )}
      </Buttons>
    </Container>
  );
}
