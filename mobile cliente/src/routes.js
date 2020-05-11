import React from 'react';

import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import SendToken from './pages/SendToken';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import ConfirmService from './pages/New/ConfirmService';

import {
  tabBarOptions,
  tabDashboardOptions,
  tabNewOptions,
  tabProfileOptions,
  stackNewOptions,
  stackSelectDateOptions,
  stackSelectProviderOptions,
  stackConfirmServiceOptions,
} from '~/util/routesOptions';

import { navigationRef } from './services/RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function New() {
  return (
    <Stack.Navigator
      screenOptions={stackNewOptions}
      initialRouteName="SelectProvider"
    >
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={stackSelectProviderOptions}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={stackSelectDateOptions}
      />
      <Stack.Screen
        name="ConfirmService"
        component={ConfirmService}
        options={stackConfirmServiceOptions}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={tabDashboardOptions}
      />
      <Tab.Screen name="New" component={New} options={tabNewOptions} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={tabProfileOptions}
      />
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
            <Stack.Screen name="SendToken" component={SendToken} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
