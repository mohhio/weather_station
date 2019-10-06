import React from 'react';
import SmartHome from './src/SmartHome';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import configStore, { sagaMiddleware } from './store';
import initSagas from './initSagas'; 
import { StyleSheet, Text, View } from 'react-native';

const store = configStore();

initSagas(sagaMiddleware);

export default function App() {
  return (
    <Provider store={store}>
    <Root>
    <SmartHome />
    </Root>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
