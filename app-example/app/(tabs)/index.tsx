import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import { FirebaseError } from 'firebase/app'

const index = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const SignUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email,password);
      alert('Check your Email')
    } catch(e:any){
      const err = e as FirebaseError;
      alert('Regstration Failed' + err.message);
    } finally {
      setLoading(false)
    }
  }

  const SignIn = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email,password);
      alert('Check your Email')
    } catch(e:any){
      const err = e as FirebaseError;
      alert('Regstration Failed' + err.message);
    } finally {
      setLoading(false)
    }
  }

  return (<View style={styles.Contain}>
    <StatusBar />
    <TouchableOpacity >
      <FontAwesome5 name="arrow-left" size={24} color="white" style={{ padding: 10 }} />
    </TouchableOpacity>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.Textin}>Create Account</Text>

      <TextInput style={styles.Input}
        value={userName}
        onChangeText={(Text) => setUserName(Text)}
        placeholder="Username"
        placeholderTextColor={'grey'}
      />
      <TextInput style={styles.Input}
        value={email}
        onChangeText={(Text) => setEmail(Text)}
        placeholder="Email"
        placeholderTextColor={'grey'}
      />
      <TextInput style={styles.Input}
        value={password}
        onChangeText={(Text) => setPassword(Text)}
        placeholder="Password"
        placeholderTextColor={'grey'}
        secureTextEntry={true}
      />
      <TextInput style={styles.Input}
        value={password}
        onChangeText={(Text) => setPassword(Text)}
        placeholder="Confirm Password"
        placeholderTextColor={'grey'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.Button}>
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

export default index
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