import React, { useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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
  CancelCancelation,
  ConfirmCancelation,
} from './styles';

export default function Appointment({ data, onCancel }) {
  const [confirm, setConfirm] = useState(false);

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
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

      {confirm ? (
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
      ) : (
        <Buttons>
          {!data.canceled_at && !data.past && (
            <Contact onPress={() => {}}>
              <WppIcon name="whatsapp" size={25} color="#54F64C" />
            </Contact>
          )}

          {data.cancelable && !data.canceled_at && (
            <Cancel onPress={handleCancel}>
              <Icon name="event-busy" size={25} color="#f64c75" />
            </Cancel>
          )}
        </Buttons>
      )}
    </Container>
  );
}

// { loading ? (
//   <ActivityIndicator size="small" color="#FFF" />
// ) : (
//   {data.cancelable && !data.canceled_at && (
//     <CancelCancelation onPress={handleClear}>
//       <Icon name="clear" size={25} color="#f64c75" />
//     </CancelCancelation>
//   )}

//   {data.cancelable && (
//     <ConfirmCancelation onPress={onCancel}>
//       <WppIcon name="check" size={25} color="#54F64C" />
//     </ConfirmCancelation>
//   )}
// )}
