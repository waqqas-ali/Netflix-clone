import { StyleSheet, Text, View, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react';
import Netflix from '@/assets/images/Net2.png'
import { FontAwesome } from "@expo/vector-icons";

const Login = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#000'} />

      <Image source={Netflix} style={styles.ImageView} resizeMode='contain' />
      <Text style={styles.TextLog}>LOGIN</Text>
      <View style={styles.ViewInput}>
        {/* <FontAwesome name = "user" size ={25} color = "red"/> */}
        <TextInput style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor={'grey'}/>
      </View>
      <View style={styles.ViewInput2} >
        <TextInput style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor={'grey'}
          secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.TouchableOpacity}>
        <Text style={styles.TextButton}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.TouchableOpacity2} onPress={()=> props.navigation.navigate('Forgetpassword')}>
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
      <TouchableOpacity style={styles.Create} onPress={()=> props.navigation.navigate('Signup')}>
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
    marginBottom : 20
  },
  ViewInput: {
    flexDirection : 'row',
    alignItems : 'center',
  },
  TouchableOpacity : {
    width : 300,
    height : 50,
    backgroundColor : 'red',
    borderRadius : 10,
    alignItems : 'center',
    justifyContent : 'center',
    margin : 10
  },
  TextButton : {
    color : 'white',
    fontSize : 20,
    fontWeight : '700'
  },
  TouchableOpacity2 : {
    margin : 10
  },
  TextButton2 : {
    color : 'white',
    fontSize : 19
  },
  facebook : {
    width : 300,
    height : 50,
    backgroundColor : 'red',
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 10,
    margin : 10
  },
  TextFacebook : {
    color : 'white',
    fontSize : 19,
    fontWeight : '700'
  },
  CreateText : {
    color : 'grey',
    fontSize : 20,
  }
});