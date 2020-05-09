import React from 'react';

import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Graphic from './pages/Graphic';
import User from './pages/User';
import NewBarber from './pages/NewBarber';
import ResetPassword from './pages/ResetPassword';
import SendToken from './pages/SendToken';

import {
  tabBarOptions,
  tabDashboardOptions,
  tabGraphicOptions,
  tabUserOptions,
  tabNewBarberOptions,
  tabProfileOptions,
} from '~/util/routesOptions';

import { navigationRef } from './services/RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={tabDashboardOptions}
      />
      <Tab.Screen
        name="Graphic"
        component={Graphic}
        options={tabGraphicOptions}
      />
      <Tab.Screen name="User" component={User} options={tabUserOptions} />
      {profile.admin && (
        <Tab.Screen
          name="NewBarber"
          component={NewBarber}
          options={tabNewBarberOptions}
        />
      )}
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
  const banned = useSelector(state =>
    state.user.profile ? state.user.profile.banned : false
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(!signed || banned) && (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SendToken" component={SendToken} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}
        {signed && !banned && <Stack.Screen name="App" component={App} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
