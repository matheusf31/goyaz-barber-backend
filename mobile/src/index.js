import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

// import { Container } from './styles';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#070707" />
      <Routes />
    </>
  );
}
