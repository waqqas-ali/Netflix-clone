import {} from 'react-native'
import React from 'react'
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/app/(tabs)/Login'
import Signup from '@/app/(tabs)/Signup'
import  Home from '@/app/(tabs)/Home'

const Stack = createNativeStackNavigator();
const index = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown : false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}

export default index







