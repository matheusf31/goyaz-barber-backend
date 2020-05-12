import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultavatar from '~/assets/images/defaultavatar.png';

import { Container, ImageButton, Image } from './styles';

const AvatarImage = ({ avatar, onChangeAvatar }) => {
  const handleSelectImage = useCallback(
    data => {
      if (data.didCancel) {
        return;
      }
      if (data.error) {
        Alert.alert('Erro', 'houve algum erro no upload da imagem');
        return;
      }
      if (!data.uri) {
        Alert.alert('Erro', 'imagem não foi encontrada');
        return;
      }

      onChangeAvatar(data);
    },
    [onChangeAvatar]
  );

  return (
    <Container>
      {avatar ? (
        <Image
          source={{
            uri: avatar.uri ? avatar.uri : avatar,
          }}
        />
      ) : (
        <Image source={defaultavatar} />
      )}

      <ImageButton
        onPress={() => ImagePicker.showImagePicker({}, handleSelectImage)}
      >
        <Icon name="camera-alt" size={26} color="#ff9000" />
      </ImageButton>
    </Container>
  );
};

export default AvatarImage;
