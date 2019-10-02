import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

export default function Perfil({navigation}) {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [avatar, setAvatar] = useState('')
    const [bio, setBio] = useState('')

    async function handleLogout() {
        await AsyncStorage.clear()
        navigation.navigate('Login')
    }

    useEffect(() => {
        AsyncStorage.getItem('username').then(username => {
            async function carregaUser() {
                const senha = await AsyncStorage.getItem('senha')
                const response = await api.post('/devs', { user: username, senha })
                const { name, user, avatar, bio } = response.data
                setUser(user)
                setAvatar(avatar)
                setBio(bio)
                setName(name)
            }
            carregaUser()
        })
    }, [])

    return (

        <SafeAreaView style={styles.container}>
            <Image style={styles.macthAvatar} source={{ uri: avatar }} />
            <Text style={styles.macthName}>{name}</Text>
            <Text style={styles.macthUser}>{user}</Text>
            <Text style={styles.matchBio}>{bio}</Text>
            <View style={styles.saiir}>
                <TouchableOpacity onPress={handleLogout} style={styles.button}><Text style={styles.buttonText}>Sair</Text></TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
    },

    macthAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30,
        marginTop: 75,
    },

    macthUser: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black',
        marginTop: 20,
    },

    macthName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
    },

    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: "#df4723",
        borderRadius: 4,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    saiir:{
        width: "80%",
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    buttonText: {
        color: '#fff'
    }

});