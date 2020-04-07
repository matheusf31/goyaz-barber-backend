import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';

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
    if (name) {
      setName(name[0].toUpperCase() + name.slice(1));
    }

    try {
      await api.post('schedule', {
        date: data.value,
        cut_type: cutType,
        email,
        client_name: name,
      });

      onModalChange(!modalVisible);
      reload();
    } catch (err) {
      Alert.alert('Erro!', `${err.response ? err.response.data.error : err}`);
    }
  }

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => onModalChange(false)}
      backdropTransitionOutTiming={0}
    >
      <ModalViewBox>
        <ModalHeader>
          <ModalText>Fazer Agendamento </ModalText>
        </ModalHeader>

        <ModalForm>
          <ModalInputContainer editable={!name}>
            <Icon name="mail-outline" size={20} color="#000" />
            <ModalInput
              editable={!name}
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

          <ModalInputContainer editable={!email}>
            <Icon name="person" size={20} color="#000" />
            <ModalInput
              editable={!email}
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
              backgroundColor: '#8FD684',
            }}
            onPress={handleSubmit}
          >
            <ModalButtonText>Confirmar</ModalButtonText>
          </ModalButton>
        </ModalForm>
      </ModalViewBox>
    </Modal>
  );
}
