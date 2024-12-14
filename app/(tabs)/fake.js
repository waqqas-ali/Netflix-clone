import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
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

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
};

const AuthenticatedScreen = ({ user, handleSignOut }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleSignOut} color="#e74c3c" />
    </View>
  );
};

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  // Check AsyncStorage on app load
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show the AuthenticatedScreen if the user is logged in
        <AuthenticatedScreen user={user} handleSignOut={handleSignOut} />
      ) : (
        // Show the AuthScreen for sign in/sign up if not logged in
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
