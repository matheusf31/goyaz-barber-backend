import React, { useMemo } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  CalendarContainer,
  CalendarText,
  CalendarLeftBottom,
  CalendarRightBottom,
} from './styles';

export default function GraphsDateInput({ date, onChange }) {
  const dateFormatted = useMemo(() => {
    const newDate = format(date, "MMMM '-' yyyy'", { locale: pt });
    return newDate
      .substring(0, 1)
      .toUpperCase()
      .concat(newDate.substring(1));
  }, [date]);

  return (
    <Container>
      <CalendarContainer>
        <CalendarLeftBottom
          onPress={() => {
            onChange(subMonths(date, 1));
          }}
        >
          <Icon name="chevron-left" size={30} color="#ff9000" />
        </CalendarLeftBottom>
        <CalendarText>{dateFormatted}</CalendarText>
        <CalendarRightBottom
          onPress={() => {
            onChange(addMonths(date, 1));
          }}
        >
          <Icon name="chevron-right" size={30} color="#ff9000" />
        </CalendarRightBottom>
      </CalendarContainer>
    </Container>
  );
}
