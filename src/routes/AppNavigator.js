import {} from 'react-native';
import React from 'react';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Signup from '../screens/Signup'
import Forgetpassword from '../screens/Forgetpassword'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown : false}}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Forgetpassword' component={Forgetpassword}/>
        <Stack.Screen name='Profile' component={Profile}/>
        
    </Stack.Navigator>
  );
};
export default AppNavigator;