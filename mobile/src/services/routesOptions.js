import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as RootNavigation from './RootNavigation';

export const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#FFF',
  inactiveTintColor: 'rgba(255,255,255,0.2)',
  style: {
    backgroundColor: '#000',
    marginTop: 1,
  },
};

export const tabDashboardOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: () => <Icon name="event" size={20} color="#FFF" />,
};

export const tabNewOptions = {
  tabBarVisible: false,
  tabBarLabel: 'Agendar',
  tabBarIcon: () => <Icon name="add" size={20} color="rgba(255,255,255,0.6)" />,
};

export const tabProfileOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: () => <Icon name="person" size={20} color="#FFF" />,
};

export const stackNewOptions = {
  headerTransparent: true,
  headerTintColor: '#fff',
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
};

export const stackSelectProviderOptions = {
  title: 'Selecione o barbeiro',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
};

export const stackSelectDateOptions = {
  title: 'Selecione o horário',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate('SelectProvider');
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
};
