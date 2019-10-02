import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, TextInput, Text, TouchableOpacity, Platform, FlatList } from 'react-native'
import Logo from '../assets/logoGet.png'
import io from 'socket.io-client'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login({ navigation }) {
    const [message, setMessage] = useState('')
    const [messagens, setMessagens] = useState([])
    const [loggedUser, setLogged] = useState({})
    const [targetUser, setTarget] = useState({})
    const [idloggedUser, setIdLogged] = useState('')
    const [idtargetUser, setTIdarget] = useState('')
    let mss = []

    async function loadUsers() {
        AsyncStorage.getItem('user').then(user => {
            setIdLogged(user)
            async function carregaUser() {
                const dev = await api.get('/devLog', {
                    headers: { user: user }
                })
                setLogged(dev.data)
            }
            carregaUser()
        })

        AsyncStorage.getItem('vagId').then(vaga => {
            setTIdarget(vaga)
            async function carregaUser() {
                const emp = await api.get('/vagLog', {
                    headers: { user:vaga }
                })
                setTarget(emp.data)
            }
            carregaUser()
        })

    }

    useEffect(() => {
        loadUsers()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await api.post(`/mess/${idtargetUser}`, {
            id: idloggedUser,
            message,
        }, {
            headers: { user: idloggedUser }
        });
        setMessage("")
    }

    useEffect(() => {
        const socket = io('https://getjobserver.herokuapp.com', {
            query: { user: idloggedUser }
        })
        socket.on('message', messageRecebida => {
            mss.push(messageRecebida)
            setMessagens([...mss])
        })

    }, [idloggedUser])


    return (

        <KeyboardAvoidingView style={styles.container} enabled={Platform.OS == 'ios'}>
                <View style={styles.message_container}>
                    <FlatList
                    data={messagens}
                    keyExtractor={post => String(post._id)} 
                    renderItem={({ item }) => (
                        <View>
                                {item.id === idloggedUser ? (
                                    <View style={styles.loggedUser}><View style={styles.messageE}><Text>{loggedUser.user}</Text><Text>{item.message}</Text></View></View>
                                ) : (
                                    <View style={styles.targetUser}><View style={styles.messageR}><Text>{targetUser.user}</Text><Text style={{marginLeft: 30}}>{item.message}</Text></View></View>
                                    )}
                            </View>
                    )}
                    />
                </View>
            <View style={styles.inputs}>
                <TextInput value={message} onChangeText={setMessage} placeholder="Digite seu usuario do GitHub" autoCapitalize='none' autoCorrect={false} placeholderTextColor="#999" style={styles.input} />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    message_container: {
        height: '90%'
    },

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        height: '100%'
    },

    inputs: {
        flexDirection: 'row'
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: "#fff",
        width: '85%',
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        backgroundColor: "#df4723",
        borderRadius: 4,
        width: '12%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    TextInput: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    buttonText: {
        color: '#fff'
    },

    loggedUser: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 50,
        flex: 1,
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        height: 'auto',
        backgroundColor: '#e1ffc7',
        width: '60%',
        marginLeft: '38%',
        height: 'auto',
    },

    targetUser:{
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 50,
        marginLeft: 5,
        marginTop: 10,
        marginTop: 8,
        alignItems: 'stretch',
        paddingHorizontal: 10,
        width: '60%',
        paddingVertical: 5,
        flexDirection: 'column',
        height: 'auto',
        backgroundColor: 'rgba(255,99,71,0.9)',
        marginBottom: 5,
    },

    messageE:{
        flexDirection: "column",
        alignItems: 'flex-end',
        width: "85%",
        height: 'auto',
        backgroundColor: '#e1ffc7',
        marginRight: 20,
        padding:5,
    }

});