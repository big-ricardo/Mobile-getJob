
import React from 'react';
import {YellowBox} from 'react-native'
import Routes from './pages/routes'

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'source.uri',
  'ViewPager',
  'Debugger and device times',
  'Failed prop type',
  'Encount'
])

const App = () => {
  return (
    <Routes /> 
  );
};

export default App;
