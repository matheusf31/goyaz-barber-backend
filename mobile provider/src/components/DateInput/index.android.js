import React, { useMemo, useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange, graphic }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () =>
      graphic
        ? format(date, "MMM '-' yyyy", { locale: pt })
        : format(date, "dd 'de' MMM 'de' yyyy',' cccc", { locale: pt }),
    [date, graphic]
  );

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpened(Platform.OS === 'ios');

    if (date !== undefined) {
      onChange(currentDate);
    }
  };

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <DateTimePicker
          value={date}
          onChange={handleChange}
          minimumDate={new Date(2020, 0, 1)}
          minuteInterval={30}
          locale="pt-BR"
          mode="date"
          display={graphic ? 'spinner' : 'calendar'}
        />
      )}
    </Container>
  );
}
