import { useState, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Tabs from './navigation';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import client from './graphql/client';
import { StatusBar } from 'expo-status-bar';



export default function App() {
  
  return (
    <ApolloProvider client={client}>
      <Tabs/>
      <StatusBar style="light" translucent={false} backgroundColor={'#25292e'}/>
    </ApolloProvider>
  );
}
