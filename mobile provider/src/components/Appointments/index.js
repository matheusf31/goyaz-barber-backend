import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Time,
  Info,
  Text,
  Box,
  Cancel,
  BoxCancel,
  DenyCancel,
  ConfirmCancel,
  Done,
} from './styles';

export default function Appointments({ data, reload }) {
  const [confirm, setConfirm] = useState(false);
  const [doneConfirm, setDoneConfirm] = useState(false);

  let hasAppointment = false;
  let hasPast = false;
  let enabled = true;

  if (data.appointment) {
    hasAppointment = true;
    hasPast = data.appointment.past;
  }

  async function handleCancel(id) {
    await api.delete(`appointments/${id}`);

    reload();
  }

  async function handleConclude(id) {
    await api.post(`concluded/${id}`);

    reload();
  }

  return (
    <Container
      onPress={() => {}}
      enabled={data.available}
      hasAppointment={hasAppointment}
      hasPast={hasPast}
    >
      {data.appointment ? (
        <Box>
          <Time>{data.time}</Time>
          <Info>
            <Text>Cliente: {data.appointment.user.name}.</Text>
            <Text>Serviço: {data.cut_type}.</Text>
            <Text>Valor: {data.appointment.cost}</Text>
          </Info>

          {!hasPast &&
            (confirm ? (
              <BoxCancel>
                <DenyCancel onPress={() => setConfirm(false)}>
                  <Icon name="clear" size={25} color="#111" />
                </DenyCancel>
                <ConfirmCancel
                  onPress={() => handleCancel(data.appointment.id)}
                >
                  <Icon name="check" size={25} color="#111" />
                </ConfirmCancel>
              </BoxCancel>
            ) : (
              <>
                <Cancel onPress={() => setConfirm(true)}>
                  <Icon name="event-busy" size={25} color="#111" />
                </Cancel>
              </>
            ))}

          {!data.appointment.concluded && hasPast && (
            <>
              {doneConfirm ? (
                <BoxCancel>
                  <DenyCancel onPress={() => setDoneConfirm(false)}>
                    <Icon name="clear" size={25} color="#111" />
                  </DenyCancel>
                  <ConfirmCancel
                    onPress={() => handleConclude(data.appointment.id)}
                  >
                    <Icon name="check" size={25} color="#111" />
                  </ConfirmCancel>
                </BoxCancel>
              ) : (
                <Done onPress={() => setDoneConfirm(true)}>
                  <Icon name="done-all" size={25} color="#111" />
                </Done>
              )}
            </>
          )}
        </Box>
      ) : (
        <Time>{data.time}</Time>
      )}
    </Container>
  );
}
