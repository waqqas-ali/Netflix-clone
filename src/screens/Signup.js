import { View, Text, TouchableOpacity, StatusBar, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const Signup = (props) => {
    return (
        <View style={styles.Contain}>
            <StatusBar backgroundColor={"#000"} />
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                <FontAwesome5 name="arrow-left" size={24} color="white" style={{ padding: 10 }} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.Textin}>Create Account</Text>
                <TextInput style={styles.Input}
                    placeholder="Username"
                    placeholderTextColor={'grey'} />
                <TextInput style={styles.Input}
                    placeholder="Email"
                    placeholderTextColor={'grey'} />
                <TextInput style={styles.Input}
                    placeholder="Password"
                    placeholderTextColor={'grey'}
                    secureTextEntry={true} />
                <TextInput style={styles.Input}
                    placeholder="Confirm Password"
                    placeholderTextColor={'grey'}
                    secureTextEntry={true} />
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