import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, Text, StyleSheet, View } from 'react-native'
import Logo from '../assets/logoGet.png'
import io from 'socket.io-client'
import Like from '../assets/like.png'
import Deslike from '../assets/dislike.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api'
import matchImage from '../assets/itsamatch.png'

export default function Main({ navigation }) {
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([]);
    const [matchdev, setMatchDev] = useState(null)
    const [pagina, setPg] = useState(1);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get(`/vags?pg=${pagina}&vs=5`, {
                headers: { user: id }
            })
            console.log("id", id)
            setUsers(response.data)
        }
        loadUsers();
    }, [id])

    useEffect(() => {
        const socket = io('https://getjobserver.herokuapp.com', {
            query: { user: id }
        })

        socket.on('match', dev => {
            setMatchDev(dev)
        })

    }, [id])

    async function testUsers() {
        if (users.length <= 1) {
            console.log("Entrou")
            setPg(pagina + 1)
            const response = await api.get(`/vags?pg=${pagina}&vs=5`, {
                headers: { user: id }
            })
            console.log(users.length, response)
            setUsers([...response.data])
        }
    }

    async function handleLike() {
        const [user, ...rest] = users;
        await api.post(`/vags/${user._id}/likes`, null, {
            headers: { user: id }
        })
        // console.log('like', id)

        setUsers(rest)
        testUsers()
    }

    async function handleDeslike() {
        const [user, ...rest] = users;
        await api.post(`/vags/${user._id}/deslikes`, null, {
            headers: { user: id }
        })
        // console.log('deslike', id)
        setUsers(rest)
        testUsers()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity >
                <Image style={styles.logo} source={Logo}/>
            </TouchableOpacity>
            <View style={styles.cardContiner}>
                {users.length === 0
                    ? <Text style={styles.empty}>Acabou :(</Text>
                    : (
                        users.map((usera, index) => (
                            <View key={usera._id} style={[styles.card, { zIndex: users.length - index }]}>
                                <Image style={styles.avatar} source={{ uri: usera.avatar }} />
                                <View style={styles.footer}>
                                    <View style={styles.containerText}><Text style={styles.textN}>Empresa:</Text><Text style={styles.text}> {usera.user}</Text></View>
                                    <View style={styles.containerText}><Text style={styles.textN}>Vaga:</Text><Text style={styles.text}> {usera.atuacao}</Text></View>
                                    <View style={styles.containerText}><Text style={styles.textN}>Descrição:</Text><Text style={styles.text} numberOfLines={3}> {usera.descricao}</Text></View>
                                    <View style={styles.containerText}><Text style={styles.textN}>Cidade:</Text><Text style={styles.text}> {usera.cidade}</Text></View>
                                </View>
                            </View>
                        ))
                    )}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDeslike}>
                    <Image source={Deslike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Image source={Like} />
                </TouchableOpacity>
            </View>

            {matchdev && (
                <View style={styles.macthContainer}>
                    <Image source={matchImage} />
                    <Image style={styles.macthAvatar} source={{ uri: matchdev.avatar }} />
                    <Text style={styles.macthName}>{matchdev.user}</Text>
                    <Text style={styles.matchBio}>{matchdev.atuacao}</Text>
                    <Text style={styles.matchBio}>{matchdev.descricao}</Text>
                    <TouchableOpacity onPress={() => setMatchDev(null)}><Text style={styles.closeMtch}>Fechar</Text></TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cardContiner: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 550,
    },

    text:{
        fontWeight: 'bold',
        fontSize: 16,
        color: "#333"
    },

    textN:{
        fontWeight: "700",
        color: '#666',
        fontSize: 15,
        marginLeft:3,
        marginTop: 2,
    },

    texto: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
    },

    containerText:{
        flexDirection: 'row'
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    avatar: {
        flex: 1,
        height: 300,
        borderWidth: 2,
        borderRadius: 5
    },

    footer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },

    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },

    logo: {
        marginTop: 30,
    },

    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },

    button: {
        width: 80,
        height: 80,
        borderRadius: 360,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 19,
        fontWeight: 'bold',
    },

    macthContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999
    },

    macthAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#fff',
        marginVertical: 30,

    },

    macthName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },

    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },

    closeMtch: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold',
    }

})