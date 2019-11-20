import React, { useState, useEffect } from 'react'
import { Image, SafeAreaView, Text, StyleSheet, View, FlatList, Alert } from 'react-native'
import Logo from '../assets/logoGet.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'


export default function Main({ navigation }) {
    const id = navigation.getParam('user')
    const [users, setUsers] = useState([]);
    const [pagina, setPg] = useState(1);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        loadUsers();
    }, [id])

    async function handleFechar(idVaga) {
        Alert.alert(
            'Cuidado!',
            'Deseja tirar essa vaga dos Anúncios?',
            [
                { text: 'OK', onPress: () => atualizaFechados(idVaga)},
                { text: 'Cancelar', onPress: () => console.log('Cancelado') }
            ]
        );
    }

    async function atualizaFechados(idVaga) {
        await api.put(`/vags/${idVaga}`, null, { headers: { oi: 'oi' } })
        setRefresh(true)
        AsyncStorage.getItem('userEmp').then(user => {
            async function atualiza() {
                const response = await api.get(`/emps`, {
                    headers: { user }
                })
                setPg(20)
                setUsers(response.data)
                setRefresh(false)
            }
            atualiza()
        })
    }

    async function loadUsers() {
        setRefresh(true)
        const response = await api.get(`/emps?pg=${pagina}&vs=5`, {
            headers: { user: id }
        })
        setUsers([...users, ...response.data])
        setPg(pagina + 1)
        setRefresh(false)
    }

    async function handleVaga(_id) {

        await AsyncStorage.setItem('vagaId', _id)

        navigation.navigate('infoVaga', { user: _id })
    }

    async function recarregar() {
        setRefresh(true)
        AsyncStorage.getItem('userEmp').then(user => {
            async function atualiza() {
                const response = await api.get(`/emps?pg=1&vs=5`, {
                    headers: { user }
                })
                setPg(2)
                setUsers(response.data)
                setRefresh(false)
            }
            atualiza()
        })
    }

    async function handleRefresh() {
        setRefresh(true)
        recarregar()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Inicial')}>
                <Image style={styles.logo} source={Logo} />
            </TouchableOpacity>
            <View style={{ width: '90%', marginBottom: 90 }}>
                <FlatList
                    data={users}
                    onEndReached={() => loadUsers()}
                    onEndReachedThreshold={0.1}
                    numColumns={1}
                    keyExtractor={post => String(post._id)}
                    refreshing={refresh}
                    onRefresh={() => handleRefresh()}
                    renderItem={({ item }) => (
                        <View>
                            <TouchableOpacity onPress={() => handleVaga(item._id)}>
                                <View style={styles.conatinerVag}>
                                    <View>
                                        <Image style={styles.image} source={{ uri: item.avatar }} />
                                    </View>
                                    <View>
                                        <View style={styles.texto}>
                                            <View style={styles.containerText}><Text style={styles.textN}>Empresa:</Text><Text style={styles.text}> {item.user}</Text></View>
                                            <View style={styles.containerText}><Text style={styles.textN}>Vaga:</Text><Text style={styles.text}> {item.atuacao}</Text></View>
                                            <View style={styles.containerText}><Text style={styles.textN}>Email:</Text><Text style={styles.text}> {item.emailContato}</Text></View>
                                            <View style={styles.containerText}><Text style={styles.textN}>Cidade:</Text><Text style={styles.text}> {item.cidade}</Text></View>

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {item.aberto === true ? (
                                <TouchableOpacity style={styles.fechar} onPress={() => handleFechar(item._id)}><Text style={styles.tex}>Fechar Vaga</Text></TouchableOpacity>
                            ) : (
                                    <View style={styles.fechar}><Text style={styles.textN}>Vaga Fechada</Text></View>
                                )}
                        </View>
                    )}
                />
            </View>
            <View style={{}}><Text>Acabou</Text></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },

    fechar: {
        flex: 1,
        backgroundColor: '#df4723',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: -4,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderWidth: 3,
        marginBottom: 5
    },

    conatinerVag: {
        flex: 1,
        backgroundColor: '#df4723',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
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
        marginLeft: 5,
    },

    containerText: {
        flexDirection: 'row'
    },

    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "#fff"
    },

    tex: {
        color: '#f5f5f5',
    },

    textN: {
        fontWeight: "700",
        color: '#f5f5f5',
    }

})