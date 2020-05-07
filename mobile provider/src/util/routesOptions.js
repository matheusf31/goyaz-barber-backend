import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#ff9000',
  inactiveTintColor: 'rgba(255,255,255,0.4)',
  style: {
    backgroundColor: '#000',
    marginTop: 1,
    padding: 5,
  },
};

export const tabDashboardOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="event"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};

export const tabGraphicOptions = {
  tabBarLabel: 'Graphs',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="timeline"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};

export const tabUserOptions = {
  tabBarLabel: 'Clients',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="group"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};

export const tabNewBarberOptions = {
  tabBarLabel: 'New Barber',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="person-add"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};

export const tabProfileOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <Icon
      name="person"
      size={20}
      color={focused ? '#ff9000' : 'rgba(255,255,255,0.4)'}
    />
  ),
};
