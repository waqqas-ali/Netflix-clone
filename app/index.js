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


// import axios from 'axios';

// async function fetchTop250Movies() {
//   const options = {
//     method: 'GET',
//     url: 'https://imdb236.p.rapidapi.com/imdb/top250-movies',
//     headers: {
//       'x-rapidapi-key': '01cc6f3ccbmsh9cb58bc296446d2p1571f0jsnf23bb92e0d9d',
//       'x-rapidapi-host': 'imdb236.p.rapidapi.com',
//     },
//   };

//   try {
//     // Await the axios request
//     const response = await axios.request(options);
//     console.log(response.data);  // Log the response data
//   } catch (error) {
//     // Improved error handling
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//       console.error('Status code:', error.response.status);
//     } else if (error.request) {
//       console.error('Error request:', error.request);
//     } else {
//       console.error('Error message:', error.message);
//     }
//   }
// }

// // Call the async function
// fetchTop250Movies();







