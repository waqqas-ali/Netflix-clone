import { StyleSheet, Text, View, StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const Forgetpassword = (props) => {
  return (
    <View style={styles.contain}>
        <StatusBar backgroundColor={"#000"} />
            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                <FontAwesome5 name="arrow-left" size={24} color="white" style={{ padding: 10 }} />
            </TouchableOpacity>
            <View>
                <Text>Forget Password</Text>
            </View>
    </View>
  )
}

export default Forgetpassword

const styles = StyleSheet.create({
    contain : {
        flex : 1,
        backgroundColor : "#000",
    }
})