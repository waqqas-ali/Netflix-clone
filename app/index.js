import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/app/(tabs)/Login'
import Signup from '@/app/(tabs)/Signup'
import Profile from '@/app/(tabs)/Profile'
import fake from '@/app/(tabs)/fake'


const Stack = createNativeStackNavigator();
const index = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name='fake' component={fake}/> */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}

export default index

