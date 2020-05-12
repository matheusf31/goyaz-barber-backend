import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultavatar from '~/assets/images/defaultavatar.png';

import api from '~/services/api';

import {
  Container,
  Box,
  Avatar,
  Info,
  Name,
  Email,
  Phone,
  TotalCut,
  Buttons,
  Cancel,
  InfoBan,
  TextBan,
  CancelBan,
  ConfirmBan,
} from './styles';

export default function Customers({ data: user, reload }) {
  const [confirm, setConfirm] = useState(false);

  const handleBan = useCallback(
    async id => {
      if (user.banned) {
        try {
          await api.delete(`/ban/${id}`);
          setConfirm(false);
          reload();
        } catch (err) {
          Alert.alert('Erro!', err.response.data.error);
        }
      } else {
        try {
          await api.post(`/ban/${id}`);
          setConfirm(false);
          reload();
        } catch (err) {
          Alert.alert('Erro!', err.response.data.error);
        }
      }
    },
    [reload, user.banned]
  );

  return (
    <Container banned={user.banned}>
      <Box>
        {!confirm ? (
          <>
            {user.avatar ? (
              <Avatar
                source={{
                  uri: user.avatar ? user.avatar.url : undefined,
                }}
              />
            ) : (
              <Avatar source={defaultavatar} />
            )}

            <Info>
              <Name>{user.name}</Name>
              <Phone>{user.phone}</Phone>
              <Email>{user.email}</Email>
            </Info>

            <Buttons>
              {user.banned ? (
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
        ) : (
          <>
            <InfoBan>
              <TextBan>Deseja mesmo banir este cliente?</TextBan>
            </InfoBan>

            <Buttons>
              <CancelBan onPress={() => setConfirm(false)}>
                <Icon
                  name="clear"
                  size={25}
                  color={user.banned ? 'black' : '#f64c75'}
                />
              </CancelBan>

              <ConfirmBan onPress={() => handleBan(user.id)}>
                <Icon
                  name="check"
                  size={25}
                  color={user.banned ? 'black' : '#54F64C'}
                />
              </ConfirmBan>
            </Buttons>
          </>
        )}
      </Box>
      {!confirm && (
        <TotalCut>
          Cortes realizados:{' '}
          <TotalCut style={{ fontWeight: 'bold' }}>
            {user.concluded_appointments}
          </TotalCut>
        </TotalCut>
      )}
    </Container>
  );
}
