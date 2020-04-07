import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  Box,
  Info,
  Name,
  Contact,
  Buttons,
  Cancel,
  InfoBan,
  TextBan,
  CancelBan,
  ConfirmBan,
} from './styles';

export default function Customers({ data, reload }) {
  const [confirm, setConfirm] = useState(false);

  async function handleBan(id) {
    if (data.banned) {
      await api.delete(`/ban/${id}`);
      setConfirm(false);
      reload();
    } else {
      await api.post(`/ban/${id}`);
      setConfirm(false);
      reload();
    }
  }

  return (
    <Container banned={data.banned}>
      <Box>
        {confirm ? (
          <>
            <InfoBan>
              <TextBan>Deseja mesmo banir este cliente?</TextBan>
            </InfoBan>

            <Buttons>
              <CancelBan onPress={() => setConfirm(false)}>
                <Icon
                  name="clear"
                  size={25}
                  color={data.banned ? 'black' : '#f64c75'}
                />
              </CancelBan>

              <ConfirmBan onPress={() => handleBan(data.id)}>
                <Icon
                  name="check"
                  size={25}
                  color={data.banned ? 'black' : '#54F64C'}
                />
              </ConfirmBan>
            </Buttons>
          </>
        ) : (
          <>
            <Info>
              <Name>{data.name}</Name>
              <Contact>Telefone: {data.phone}</Contact>
              <Contact>Email: {data.email}</Contact>
              <Contact>
                Cortes realizados: {data.concluded_appointments}
              </Contact>
            </Info>

            <Buttons>
              {data.banned ? (
                <Cancel onPress={() => setConfirm(true)}>
                  <Icon name="check-circle" size={25} color="black" />
                </Cancel>
              ) : (
                <Cancel onPress={() => setConfirm(true)}>
                  <Icon name="block" size={25} color="#f64c75" />
                </Cancel>
              )}
            </Buttons>
          </>
        )}
      </Box>
    </Container>
  );
}
