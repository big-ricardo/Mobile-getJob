import React, {useState, useEffect} from 'react'
import { SafeAreaView,StyleSheet,Image,Text} from 'react-native'
import Logo from '../assets/logo.png'
import LogoGet from '../assets/logoGet.png'
import { setTimeout } from 'core-js';


export default function Login( {navigation} ){
    
    setTimeout(function (){
        navigation.navigate('Inicial')
    }, 1000)

    return (

        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={Logo}/>
            <Image style={styles.text} source={LogoGet}/>
        </SafeAreaView>

    );  
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },

    image:{
        marginTop: -75,
        
    },
    
    text:{
        marginTop:60,
    }
    
});