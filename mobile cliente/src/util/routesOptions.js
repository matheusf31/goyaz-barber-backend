import React from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as RootNavigation from '~/services/RootNavigation';

export const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#ff9000',
  inactiveTintColor: 'rgba(255,255,255,0.2)',
  style: {
    backgroundColor: '#000',
    marginTop: 1,
  },
};

export const tabDashboardOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="event"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};

export const tabNewOptions = {
  unmountOnBlur: true,
  tabBarVisible: false,
  tabBarLabel: 'Agendar',
  tabBarIcon: () => <Icon name="add" size={20} color="#fff" />,
};

export const tabProfileOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="person"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};

export const stackNewOptions = {
  headerTransparent: true,
  headerTintColor: '#fff',
  headerLeftContainerStyle: {
    marginLeft: 20,
  },
  cardStyle: {
    backgroundColor: 'black',
  },
  // animationEnabled: false,
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
        RootNavigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
};

export const stackConfirmServiceOptions = {
  title: 'Selecione o tipo de corte',
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
};
