import React, { useRef, useState } from 'react';
import { Modal, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  ModalView,
  ModalViewBox,
  ModalHeader,
  ModalClose,
  ModalText,
  ModalForm,
  ModalInputContainer,
  ModalInput,
  ModalButtonContainer,
  ModalButton,
  ModalButtonText,
} from './styles';

export default function ModalAppointments({
  data,
  onModalChange,
  modalVisible,
  reload,
}) {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [active, setActive] = useState(true);

  const [cutType, setCutType] = useState('corte');

  const nameRef = useRef();

  function handleButtonPress(cut_type) {
    setCutType(cut_type);
    setActive(!active);
  }

  async function handleSubmit() {
    try {
      await api.post('schedule', {
        date: data.value,
        cut_type: cutType,
        email,
        client_name: name[0].toUpperCase() + name.slice(1),
      });

      onModalChange(!modalVisible);
      reload();
    } catch (err) {
      Alert.alert('Ocorreu um erro, verifique os dados');
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        onModalChange(!modalVisible);
      }}
    >
      <ModalView>
        <ModalViewBox>
          <ModalClose
            onPress={() => {
              onModalChange(!modalVisible);
            }}
          >
            <Icon name="clear" size={25} color="#111" />
          </ModalClose>

          <ModalHeader>
            <ModalText>Fazer Agendamento </ModalText>
          </ModalHeader>

          <ModalForm>
            <ModalInputContainer>
              <Icon name="mail-outline" size={20} color="#000" />
              <ModalInput
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="email"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nameRef.current.focus();
                }}
                value={email}
                onChangeText={setEmail}
              />
            </ModalInputContainer>

            <ModalInputContainer>
              <Icon name="person" size={20} color="#000" />
              <ModalInput
                autoCorrect={false}
                autoCapitalize="words"
                autoCompleteType="name"
                placeholder="Nome"
                returnKeyType="next"
                value={name}
                onChangeText={setName}
                ref={nameRef}
              />
            </ModalInputContainer>

            <ModalButtonContainer>
              <ModalButton
                active={active}
                disabled={active}
                onPress={() => handleButtonPress('corte')}
              >
                <ModalButtonText>corte</ModalButtonText>
              </ModalButton>
              <ModalButton
                active={!active}
                disabled={!active}
                onPress={() => handleButtonPress('corte e barba')}
              >
                <ModalButtonText>corte e barba</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>

            <ModalText
              style={{ alignSelf: 'center', marginTop: -10, fontSize: 20 }}
            >
              Horário: {data.time}
            </ModalText>

            <ModalButton
              style={{
                alignSelf: 'center',
                width: 200,
                borderWidth: 0,
                marginTop: 20,
                backgroundColor: '#4EC04D',
              }}
              onPress={handleSubmit}
            >
              <ModalButtonText>Confirmar</ModalButtonText>
            </ModalButton>
          </ModalForm>
        </ModalViewBox>
      </ModalView>
    </Modal>
  );
}
