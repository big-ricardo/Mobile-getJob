import React, { useEffect,useState } from 'react'
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, View, Alert } from 'react-native'
import LogoGet from '../assets/logoGet.png'
import Pessoal from '../assets/pesoal.png'
import Comercial from '../assets/comercial.png'
import api from '../services/api'

export default function Login({ navigation }) {
    const [net,setNet] = useState(true)


    useEffect(() => {
        testa()
    }, [])

    async function testa() {
        try{
            await api.get('/')
            setNet(true)
        }catch(e){
            setNet(false)
            Alert.alert(
                'Sem Conexão!',
                'Verifique sua rede',
                [
                    { text: 'OK', onPress: () => console.log("oi")},
                ]
            );
        }
    }

    function handlePessoal() {
        if(net === true){
            navigation.navigate('Login')
        }else{
           testa()
        }
    }

    function handleComercial() {
        if(net === true){
            navigation.navigate('LoginEmp')
        }else{
            testa()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Mensagem')}>
                <Image source={LogoGet} />
            </TouchableOpacity>
            <Text style={styles.h1}>Escolha o seu Tipo de Conta</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePessoal}>
                    <Image style={styles.image} source={Pessoal} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleComercial}>
                    <Image style={styles.image} source={Comercial} />
                </TouchableOpacity>
            </View><View />
            <View>
                <Text style={styles.title}>Desenvolvedores:</Text>
                <Text style={styles.p}>Luis Ricardo</Text>
                <Text style={styles.p}>Açucena Silva</Text>
                <Text style={styles.p}>Luan Lucas</Text>
            </View><View />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    image: {
        marginTop: -75,

    },

    text: {
        marginTop: 60,
    },

    h1: {
        fontSize: 25,
        textAlign: 'center',
    },

    logo: {
        marginTop: 10
    },

    image: {
        width: 190
    },

    buttonContainer: {
        flexDirection: 'row',
    },

    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: 'center',
    },

    p: {
        fontSize: 16,
        textAlign: 'center',
    }

});