
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Profile from '@/app/(tabs)/Profile';
// import DetailScreen from '@/app/(tabs)/DetailScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// const CustomDrawerContent = ({ user, onLogout }) => {
//   return (
//     <View style={styles.drawerContainer}>
//       {/* User Info Section */}
//       <View style={styles.userInfo}>
//         <Text style={styles.userName}>{user?.userName || 'Guest User'}</Text>
//         <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const Home = ({ user, onLogout }) => {
//   return (
//     <Drawer.Navigator
//          initialRouteName="Movies"// Hide default header
//       drawerContent={(props) => (
//         <CustomDrawerContent {...props} user={user} onLogout={onLogout} />
//       )}>
//       <Drawer.Screen name="Movies">
//         {(props) => <Profile {...props} user={user} onLogout={onLogout} />}
//       </Drawer.Screen>
//       <Stack.Screen name='DetailScreen' component={DetailScreen}/>
//     </Drawer.Navigator>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   userInfo: {
//     marginBottom: 20,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   logoutButton: {
//     backgroundColor: '#ff5555',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   logoutText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });





import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@/app/(tabs)/Profile';
import DetailScreen from '@/app/(tabs)/DetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomDrawerContent = ({ user, onLogout }) => {
  return (
    <View style={styles.drawerContainer}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user?.userName || 'Guest User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const MoviesStack = ({ user, onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" options={{headerShown : false}}>
        {(props) => <Profile {...props} user={user} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown : false}}/>
    </Stack.Navigator>
  );
};

const Home = ({ user, onLogout }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} user={user} onLogout={onLogout} />
      )}
    >
      {/* MoviesStack contains both Profile and DetailScreen */}
      <Drawer.Screen name="Movies" component={MoviesStack} />
    </Drawer.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  logoutButton: {
    backgroundColor: '#ff5555',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
