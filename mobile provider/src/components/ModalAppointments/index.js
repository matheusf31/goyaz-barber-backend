import React, { useRef, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  ModalViewBox,
  ModalHeader,
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
  modalVisible,
  onModalChange,
  reload,
}) {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [active, setActive] = useState(true);

  const [cutType, setCutType] = useState('corte');

  const nameRef = useRef();

  const handleButtonPress = useCallback(cut_type => {
    setCutType(cut_type);
    setActive(prevState => !prevState);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await api.post('schedule', {
        date: data.value,
        cut_type: cutType,
        email,
        client_name: name,
      });

      onModalChange(prevState => !prevState);
    } catch (err) {
      Alert.alert('Erro!', `${err.response ? err.response.data.error : err}`);
    }
  }, [cutType, data.value, name, email, onModalChange]);

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => onModalChange(false)}
      backdropTransitionOutTiming={0}
      avoidKeyboard={false}
      onModalHide={() => {
        reload();
      }}
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
              placeholderTextColor="#999"
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
              placeholderTextColor="#999"
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
