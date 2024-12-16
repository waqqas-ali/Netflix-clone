import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import React, { useState , useEffect } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '@/app/(tabs)/Home'

const firebaseConfig = {
    apiKey: "AIzaSyCeA1GnMQvVpkQm9NzI_dqrjROjVYASgN8",
    authDomain: "my-expo-app1-d5eac.firebaseapp.com",
    projectId: "my-expo-app1-d5eac",
    storageBucket: "my-expo-app1-d5eac.firebasestorage.app",
    messagingSenderId: "809433289147",
    appId: "1:809433289147:web:e133e9c90c6f5d69b7749e"
  }
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Signup = (props) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser); // User is logged in
          } else {
            setUser(null); // No user logged in
          }
          setLoading(false); // Stop loading
        });
    
        return () => unsubscribe(); // Cleanup the listener
      }, []);
    
      const handleAuthentication = async () => {
        try {
          if (user) {
            // If the user is already authenticated, log them out
            await signOut(auth);
            await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
            setUser(null);
            console.log('User logged out successfully!');
          } else {
            // Sign in or sign up based on the current screen
            if (isLogin) {
              await createUserWithEmailAndPassword(auth, email, password);
              const currentUser = auth.currentUser;
              setUser(currentUser);
              await AsyncStorage.setItem('user', JSON.stringify(currentUser)); // Store user data in AsyncStorage
              console.log('User signed in successfully!');
            } else {
              await signInWithEmailAndPassword(auth, email, password);
              const currentUser = auth.currentUser;
              setUser(currentUser);
              await AsyncStorage.setItem('user', JSON.stringify(currentUser)); // Store user data in AsyncStorage
              console.log('User created successfully!');
            }
          }
        } 
        catch (error) {
          console.error('Authentication error:', error.message);
        }
      
        // setLoading(true); // Start loading
        // try {
        //   await createUserWithEmailAndPassword(auth, email, password);
        //   Alert.alert('Success', 'Account created successfully!');
        // //   navigation.navigate('Profile'); // Navigate to login screen after signup
        // } catch (error) {
        //   Alert.alert('Error', error.message);
        // } finally {
        //   setLoading(false); // Stop loading
        // }
      };

      const handleSignOut = async () => {
        try {
          await signOut(auth);
          await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
          setUser(null); // Clear user state
          console.log('User signed out2');
        } catch (error) {
          console.error('Sign-out error:', error.message);
        }
      };
      if (user) {
        return <Home user={user} onLogout={handleSignOut} />;
      }
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
    return (
        <View style={styles.Contain}>
            <StatusBar backgroundColor={"#000"} />
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <FontAwesome5 name="arrow-left" size={24} color="white" style={{ padding: 10 }} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.Textin}>Create Account</Text>

                <TextInput style={styles.Input}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder="Username"
                    autoCapitalize="none"
                    placeholderTextColor={'grey'} 
                    />
                <TextInput style={styles.Input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    autoCapitalize="none"
                    placeholderTextColor={'grey'} 
                    />
                <TextInput style={styles.Input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={'grey'}
                    autoCapitalize="none"
                    secureTextEntry={true} 
                    />
                <TextInput style={styles.Input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Confirm Password"
                    placeholderTextColor={'grey'}
                    autoCapitalize="none"
                    secureTextEntry={true} 
                    />
                <TouchableOpacity style={styles.Button} onPress={handleAuthentication}>
                    <Text style={styles.Text}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.Text}>Sign in with Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.Text}>Sign in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button}>
                    <Text style={styles.Text}>Sign in with Apple</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Signup;

const styles = StyleSheet.create({
    Contain: {
        flex: 1,
        backgroundColor: "#000"
    },
    Textin: {
        color: 'red',
        fontSize: 35,
    },
    Input: {
        borderBottomWidth: 1,
        borderColor: "red",
        width: 300,
        height: 50,
        color: "white",
        paddingHorizontal: 10,
        marginBottom: 20
    },
    Button: {
        width: 300,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    Text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700'
    }
})