import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#FFF',
  inactiveTintColor: 'rgba(255,255,255,0.4)',
  style: {
    backgroundColor: '#000',
    marginTop: 1,
    padding: 5,
  },
};

export const tabDashboardOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: () => <Icon name="event" size={20} color="#FFF" />,
};

export const tabProfileOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: () => <Icon name="person" size={20} color="#FFF" />,
};

export const tabGraphicOptions = {
  tabBarLabel: 'Graphic',
  tabBarIcon: () => <Icon name="timeline" size={20} color="#FFF" />,
};
