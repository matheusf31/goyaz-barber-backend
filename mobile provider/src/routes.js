import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';

// import SelectProvider from './pages/New/SelectProvider';
// import SelectDateTime from './pages/New/SelectDateTime';
// import SelectCutType from './pages/New/SelectCutType';
// import Confirm from './pages/New/Confirm';

// import {
//   tabBarOptions,
//   tabDashboardOptions,
//   tabNewOptions,
//   tabProfileOptions,
//   stackNewOptions,
//   stackSelectDateOptions,
//   stackSelectProviderOptions,
//   stackConfirmOptions,
//   stackSelectCutTypeOptions,
// } from '~/util/routesOptions';

import { navigationRef } from './services/RootNavigation';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function New() {
//   return (
//     <Stack.Navigator screenOptions={stackNewOptions}>
//       <Stack.Screen
//         name="SelectProvider"
//         component={SelectProvider}
//         options={stackSelectProviderOptions}
//       />
//       <Stack.Screen
//         name="SelectDateTime"
//         component={SelectDateTime}
//         options={stackSelectDateOptions}
//       />
//       <Stack.Screen
//         name="SelectCutType"
//         component={SelectCutType}
//         options={stackSelectCutTypeOptions}
//       />
//       <Stack.Screen
//         name="Confirm"
//         component={Confirm}
//         options={stackConfirmOptions}
//       />
//     </Stack.Navigator>
//   );
// }

// function App() {
//   return (
//     <Tab.Navigator tabBarOptions={tabBarOptions}>
//       <Tab.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={tabDashboardOptions}
//       />
//       <Tab.Screen name="New" component={New} options={tabNewOptions} />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={tabProfileOptions}
//       />
//     </Tab.Navigator>
//   );
// }

function App() {
  return <Text>Hello App</Text>;
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
