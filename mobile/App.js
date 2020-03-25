import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]); 

export default function App() {
  return (
    <>
    <StatusBar barStyle="black-content" backgroundColor="rgba(166, 211, 16, 9.9)"/>
    <Routes/>
    </>
  );
}
