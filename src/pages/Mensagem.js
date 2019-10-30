import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, Text, TouchableOpacity, Platform, FlatList, Image } from 'react-native'
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
    const [flatlist,setFlat] = useState(null)
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
                    headers: { user: vaga }
                })
                setTarget(emp.data)
            }
            carregaUser()
        })
    }

    useEffect(() => {
        loadUsers()
        async function loadMens(){
            const idLg = await AsyncStorage.getItem('user')
            const idTg = await AsyncStorage.getItem('vagId')
            const mens = await api.get(`/mess/${idTg}`, {
                headers: { user: idLg, op: 'dev' }
            })
            setMessagens(mens.data)
        }
        loadMens()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()

        const response = await api.post(`/mess/${idtargetUser}`, {
            id: idloggedUser,
            message,
        }, {
            headers: { user: idloggedUser, op: 'dev'  }
        });
        setMessage("")
    }

    useEffect(() => {
        const socket = io('https://getjobserver.herokuapp.com', {
            query: { user: idloggedUser }
        })
        socket.on('message', messageRecebida => {
            setMessagens([])
            mss.push(messageRecebida)
            setMessagens([...mss])
        })

    }, [idloggedUser])


    return (
        <SafeAreaView style={styles.container} enabled={Platform.OS == 'ios'}>
            <View style={styles.message_container}>
                <View style={styles.perfil}>
                    <Image style={styles.avatar} source={{ uri: targetUser.avatar }} />
                    <Text style={styles.name}>{targetUser.user}</Text>
                </View>
                <View style={styles.lista}>
                    <FlatList
                        ref={ ref => setFlat(ref)}
                        data={messagens}
                        keyExtractor={post => String(post.message)}
                        onContentSizeChange={() => flatlist.scrollToEnd({ animated: true})}
                        renderItem={({ item }) => (
                            <View>
                                {item.id === idloggedUser ? (
                                    <View style={styles.loggedUser}><View style={styles.messageE}><Text style={styles.text}>{loggedUser.user}</Text><Text style={styles.textN}>{item.message}</Text></View></View>
                                ) : (
                                        <View style={styles.targetUser}><View style={styles.messageR}><Text style={styles.text}>{targetUser.user}</Text><Text style={styles.textN} style={{ marginLeft: 20 }}>{item.message}</Text></View></View>
                                    )}
                            </View>
                        )}
                    />
                </View>
            </View>
            <View style={styles.inputs}>
                <TextInput value={message} onChangeText={setMessage} placeholder="Digite sua Mensagem" autoCapitalize='none' autoCorrect={false} placeholderTextColor="#999" style={styles.input} />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>Enviar</Text></TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    message_container: {
        flex: 1,
        height: 'auto'
    },

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
    },

    inputs: {
        flexDirection: 'row',
        marginBottom: 3
    },

    lista: {
        position: 'absolute',
        top: 61,
        bottom: 0,
        left: 0,
        right: 1
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: "#fff",
        width: '85%',
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
    },

    button: {
        height: 46,
        backgroundColor: "#df4723",
        borderRadius: 4,
        width: '14%',
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
        marginBottom: 6,
        height: 'auto',
        backgroundColor: '#e1ffc7',
        width: '60%',
        marginLeft: '38%',
        height: 'auto',
    },

    targetUser: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 50,
        marginLeft: 5,
        marginTop: 8,
        marginBottom: 6,
        alignItems: 'stretch',
        paddingHorizontal: 10,
        width: '60%',
        paddingVertical: 5,
        flexDirection: 'column',
        height: 'auto',
        backgroundColor: 'rgba(255,99,71,0.9)',
        marginBottom: 5,
    },

    messageE: {
        flexDirection: "column",
        alignItems: 'flex-end',
        width: "85%",
        height: 'auto',
        backgroundColor: '#e1ffc7',
        marginRight: 20,
        padding: 5,
    },

    perfil: {
        width: "100%",
        height: 61,
        maxHeight: 61,
        minHeight: 61,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#df4723',
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'black',
        zIndex: 1,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#fff',
    },

    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#fff",
        marginLeft: 10,
    },

    text: {
        fontWeight: 'bold',
        color: "#000000"
    },

    textN: {
        fontWeight: "900",
        color: '#1c1c1c',
    }

});