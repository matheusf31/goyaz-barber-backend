import React from 'react';

import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Graphic from './pages/Graphic';

import {
  tabBarOptions,
  tabDashboardOptions,
  tabProfileOptions,
  tabGraphicOptions,
} from '~/util/routesOptions';

import { navigationRef } from './services/RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
