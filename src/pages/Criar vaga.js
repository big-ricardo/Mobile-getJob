import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Image, TextInput, Text, TouchableOpacity, Platform, Alert } from 'react-native'
import Logo from '../assets/logoGet.png'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login({ navigation }) {
    const [atuacao, setUsername] = useState('');
    const [descricao, setPassword] = useState('');
    const [cidade, setCiadade] = useState('');
    const [emailC, setEmail] = useState('');
    const [idEmp, setIdEmp] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('userEmp').then(username => {
            setIdEmp(username)
        })
    }, [])

    async function handleSubmit() {

        if(atuacao !== "" && descricao !== "" && idEmp !== "" && cidade !== "" && emailC !== ""){
            const response = await api.post('/vags', {
                atuacao,
                descricao,
                id: idEmp,
                cidade,
                emailC
            }); 
    
            if(response){
                setUsername('')
                setPassword('')
                setCiadade('')
                setEmail('')
                Alert.alert(
                    'Sucesso!',
                    'Vaga Criada com sucesso!',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }else{
                Alert.alert(
                    'Algo deu Errado',
                    'Revise sua Conexão',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }
        }else{
            Alert.alert(
                'Algo deu Errado',
                'Preencha todos os Campos',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
    }
    return (

        <KeyboardAvoidingView style={styles.container} enabled={Platform.OS == 'ios'}>
            <Image source={Logo} />
            <TextInput value={atuacao} onChangeText={setUsername} placeholder="Atuação" autoCapitalize='none' autoCorrect={false} placeholderTextColor="#999" style={styles.input} />
            <TextInput value={descricao} onChangeText={setPassword} placeholder="Descrição" autoCapitalize='none' autoCorrect={false} placeholderTextColor="#999" style={styles.input} />
            <TextInput value={cidade} onChangeText={setCiadade} placeholder="Cidade" autoCapitalize='none' autoCorrect={false} placeholderTextColor="#999" style={styles.input} />
            <TextInput value={emailC} onChangeText={setEmail} placeholder="Email para Contato" autoCapitalize='none' autoCorrect={false} placeholderTextColor="#999" style={styles.input} />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>Criar</Text></TouchableOpacity>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    input: {
        height: 46,
        marginTop: 5,
        alignSelf: 'stretch',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 4,
        paddingHorizontal: 15,
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: "#df4723",
        borderRadius: 4,
        marginTop: 10,
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
    }

});