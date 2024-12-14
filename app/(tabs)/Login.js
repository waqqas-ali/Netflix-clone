// login screen
import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState , useEffect} from 'react';
import Netflix from '@/assets/images/Net2.png'
import { FontAwesome } from "@expo/vector-icons";
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '@/app/(tabs)/Profile'
import Signup from '@/app/(tabs)/Signup';

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

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
          try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser)); // Parse the stored user data
            }
            setLoading(false); // Stop loading after checking AsyncStorage
          } catch (error) {
            console.error('Error loading user from AsyncStorage:', error);
            setLoading(false);
          }
        };
    
        checkUser();
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
              await signInWithEmailAndPassword(auth, email, password);
              const currentUser = auth.currentUser;
              setUser(currentUser);
              await AsyncStorage.setItem('user', JSON.stringify(currentUser)); // Store user data in AsyncStorage
              console.log('User signed in successfully!');
            } else {
              await createUserWithEmailAndPassword(auth, email, password);
              const currentUser = auth.currentUser;
              setUser(currentUser);
              await AsyncStorage.setItem('user', JSON.stringify(currentUser)); // Store user data in AsyncStorage
              console.log('User created successfully!');
            }
          }
        } catch (error) {
          console.error('Authentication error:', error.message);
        }
      };
    
      const handleSignOut = async () => {
        try {
          await signOut(auth);
          await AsyncStorage.removeItem('user'); // Remove user data from AsyncStorage
          setUser(null); // Clear user state
          console.log('User signed out');
        } catch (error) {
          console.error('Sign-out error:', error.message);
        }
      };
      if (user) {
        return <Profile user={user} onLogout={handleSignOut} />;
      }
      if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        );
      }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000'} />

      <Image source={Netflix} style={styles.ImageView} resizeMode='contain' />
      <Text style={styles.TextLog}>LOGIN</Text>
      <View style={styles.ViewInput}>
        {/* <FontAwesome name = "user" size ={25} color = "red"/> */}
        <TextInput style={styles.TextInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor={'grey'} />
      </View>
      <View style={styles.ViewInput2} >
        <TextInput style={styles.TextInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={'grey'}
          secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.TouchableOpacity} onPress={handleAuthentication}>
        <Text style={styles.TextButton}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.TouchableOpacity2}>
        <Text style={styles.TextButton2}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebook}>
        <Text style={styles.TextFacebook}>Sign in with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebook}>
        <Text style={styles.TextFacebook}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebook}>
        <Text style={styles.TextFacebook}>Sign in with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Create} onPress={() => props.navigation.navigate('Signup')}>
        <Text style={styles.CreateText}>Don't have an Account ? Create one</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageView: {
    width: 400,
    height: 200,
  },
  TextLog: {
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',

  },
  TextInput: {
    borderBottomWidth: 1,
    borderColor: "red",
    width: 300,
    height: 50,
    color: "white",
    paddingHorizontal: 10,
    marginBottom: 20
  },
  ViewInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TouchableOpacity: {
    width: 300,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  TextButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700'
  },
  TouchableOpacity2: {
    margin: 10
  },
  TextButton2: {
    color: 'white',
    fontSize: 19
  },
  facebook: {
    width: 300,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10
  },
  TextFacebook: {
    color: 'white',
    fontSize: 19,
    fontWeight: '700'
  },
  CreateText: {
    color: 'grey',
    fontSize: 20,
  }
});
