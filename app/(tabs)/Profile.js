import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Profile({ navigation, user, onLogout }) {
  useEffect(() => {
    if (!user) {
      navigation.replace('Login'); // Navigate to Login if user is null
    }
  }, [user]);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        }}
      />
      <Text style={styles.welcomeText}>Welcome, {user?.email || 'User'}!</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityRole="button"
      >
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}



// import React from 'react';
// import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function Profile({ navigation, user, onLogout }) {
//   const handleLogout = () => {
//     onLogout(); // Clear authentication state or token
//     navigation.replace('Login'); // Navigate to the Login screen
//   };

//   return (
//     <View style={styles.container}>
//       <Image
//         style={styles.avatar}
//         source={{
//           uri: user?.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//         }}
//       />
//       <Text style={styles.welcomeText}>Welcome, {user?.email || 'User'}!</Text>
//       <TouchableOpacity
//         style={styles.logoutButton}
//         onPress={handleLogout}
//         accessibilityRole="button"
//       >
//         <Text style={styles.logoutText}>LOG OUT</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
