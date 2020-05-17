import React, { useState, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { CalendarInput, Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMM 'de' yyyy',' cccc", { locale: pt }),
    [date]
  );

  const onDayPress = day => {
    onChange(parseISO(day.dateString));
    setOpened(!opened);
  };

  const calendarTheme = {
    calendarBackground: '#1B1A1E',
    textSectionTitleColor: '#b6c1cd',
    todayTextColor: '#ff9000',
    dayTextColor: '#d9e1e8',
    textDisabledColor: '#d9e1e8',
    arrowColor: '#ff9000',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#d9e1e8',
    indicatorColor: 'blue',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 16,
  };

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      <CalendarInput
        current={date}
        hideExtraDays
        opened={opened}
        onDayPress={onDayPress}
        markingType="custom"
        markedDates={{
          [format(date, 'yyyy-MM-dd')]: {
            customStyles: {
              container: {
                backgroundColor: '#ff9000',
                borderRadius: 4,
              },
              text: {
                color: '#000',
                fontWeight: 'bold',
              },
            },
          },
        }}
        theme={calendarTheme}
      />
    </Container>
  );
}
