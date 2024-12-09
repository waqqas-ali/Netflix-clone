import { } from 'react-native'
import React from 'react';
import AppNavigator from '../src/routes/AppNavigator';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}
export default App  