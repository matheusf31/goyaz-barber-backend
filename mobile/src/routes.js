import React from 'react';
import { useSelector } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import { navigationRef } from './services/RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const dashboardOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: () => <Icon name="event" size={20} color="#FFF" />,
};

const profileOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: () => <Icon name="person" size={20} color="#FFF" />,
};

const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#FFF',
  inactiveTintColor: 'rgba(255,255,255,0.2)',
  style: {
    backgroundColor: '#000',
  },
};

function App() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={dashboardOptions}
      />
      <Tab.Screen name="Profile" component={Profile} options={profileOptions} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <Stack.Screen name="App" component={App} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
