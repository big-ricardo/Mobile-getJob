import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native'
import Logo from '../assets/logoGet.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

export default function Matchs({ navigation }) {
    const [users, setUsers] = useState([]);
    const id = navigation.getParam('user')
    const [pagina, setPg] = useState(1);
    const [refresh, setRefresh] = useState(false);

    async function loadPage(){
        AsyncStorage.getItem('vagaId').then(user => {
            async function carregaUser() {
                const response = await api.get(`/matcs?pg=${pagina}&vs=10`, {
                    headers: { user }
                })
                setUsers([...users, ...response.data])
                setPg(pagina + 1)
            }
            carregaUser()
        })

    }

    useEffect(() => {
        loadPage()
    }, [id])

    async function recarregar() {
        AsyncStorage.getItem('vagaId').then(user => {
            async function atualiza() {
                const response = await api.get(`/matcs?pg=1&vs=10`, {
                    headers: { user }
                })
                setPg(1)
                setUsers(response.data)
                console.log(response.data)
                setRefresh(false)
            }
            atualiza()
        })
    }

    async function handleRefresh() {
        setRefresh(true)
        recarregar()
    }

    async function handleVaga(_id) {

        await AsyncStorage.setItem('devId', _id)
        
        navigation.navigate('MensagemE', { user: _id }) 
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity >
                <Image style={styles.logo} source={Logo} />
            </TouchableOpacity>
            <View style={styles.lista}>
                <FlatList
                    data={users}
                    onEndReached={() => loadPage()}
                    onEndReachedThreshold={0.1}
                    keyExtractor={post => String(post._id)}
                    refreshing={refresh}
                    onRefresh={() => handleRefresh()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleVaga(item._id)}>
                        <View style={styles.conatinerVag}>
                            <Image style={styles.image} source={{ uri: item.avatar }} />
                            <View style={styles.texto}>

                                <View style={styles.containerText}><Text style={styles.textN}>Name:</Text><Text style={styles.text}> {item.user}</Text></View>
                                <View style={styles.containerText}><Text style={styles.textN}>Repositorios:</Text><Text style={styles.text}> {item.repositorios}</Text></View>
                                <View style={styles.containerText}><Text style={styles.textN}>Email:</Text><Text style={styles.text}> {item.emailContato}</Text></View>
                                <View style={styles.containerText}><Text style={styles.textN}>Cidade:</Text><Text style={styles.text}> {item.cidade}</Text></View>

                            </View>
                        </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
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

    lista:{
        marginBottom: 90
    },

    conatinerVag: {
        flex: 1,
        height: 'auto',
        backgroundColor: '#df4723',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginLeft: '5%',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 3,
        borderColor: 'black',
    },

    image: {
        width: 100,
        height: 100,
        margin: 5,
        borderWidth: 2,
        borderColor: '#f5f5f5',
        borderRadius: 5
    },

    texto: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
    },

    containerText:{
        flexDirection: 'row'
    },

    text:{
        fontWeight: 'bold',
        fontSize: 16,
        color: "#fff"
    },

    textN:{
        fontWeight: "700",
        color: '#f5f5f5',
    }

})