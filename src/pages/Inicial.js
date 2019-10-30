import React from 'react'
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native'
import LogoGet from '../assets/logoGet.png'
import Pessoal from '../assets/pesoal.png'
import Comercial from '../assets/comercial.png'

export default function Login({ navigation }) {

    function handlePessoal() {
        navigation.navigate('Login')
    }

    function handleComercial() {
        navigation.navigate('LoginEmp')
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