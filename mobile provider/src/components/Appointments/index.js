import React, { useState, useEffect, forwardRef, useCallback } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import ModalAppointment from '../ModalAppointments';

import {
  Container,
  Time,
  Info,
  InfoText,
  Box,
  Cancel,
  BoxCancel,
  DenyCancel,
  ConfirmCancel,
  Done,
  BoxIcon,
  BoxView,
} from './styles';

const Appointmets = forwardRef(({ data, reload, past }, ref) => {
  const [confirm, setConfirm] = useState(false);
  const [doneConfirm, setDoneConfirm] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasAppointment, setHasAppointment] = useState(false);
  const [hasPast, setHasPast] = useState(false);

  useEffect(() => {
    if (data.appointment) {
      setHasAppointment(true);
      setHasPast(data.appointment.past);
    }
  }, [data.appointment]);

  const handleCancel = useCallback(
    async id => {
      try {
        await api.delete(`appointments/${id}`);
        setConfirm(false);
        reload();
      } catch (err) {
        Alert.alert('Erro!', err.response.data.error);
      }
    },
    [reload]
  );

  const handleConclude = useCallback(
    async id => {
      try {
        await api.post(`concluded/${id}`);
        setDoneConfirm(false);
        reload();
      } catch (err) {
        Alert.alert('Erro!', err.response.data.error);
      }
    },
    [reload]
  );

  return (
    <>
      <Container
        onPress={() => setModalVisible(true)}
        active={data.available}
        disabled={hasAppointment}
        hasAppointment={hasAppointment}
        appointmentConcluded={
          data.appointment ? data.appointment.concluded : false
        }
        past={past}
        providerBusy={data.providerBusy}
        underlayColor="#AAA"
      >
        {data.appointment ? (
          <Box concluded={data.appointment.concluded}>
            <Time>{data.time}</Time>

            <Info>
              <InfoText>
                Cliente:{' '}
                {data.appointment.user
                  ? data.appointment.user.name
                  : data.appointment.client_name}
              </InfoText>
              <InfoText>Serviço: {data.appointment.cut_type}</InfoText>
              <InfoText>Valor: R$ {data.appointment.cost}</InfoText>
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
          <>
            {past ? (
              <Time>{data.time}</Time>
            ) : (
              <BoxView>
                <Time>{data.time}</Time>
                <BoxIcon>
                  <Icon name="chevron-left" size={25} color="#111" />
                </BoxIcon>
              </BoxView>
            )}
          </>
        )}
      </Container>

      <ModalAppointment
        data={data}
        modalVisible={modalVisible}
        onModalChange={setModalVisible}
        reload={reload}
      />
    </>
  );
});

export default Appointmets;
