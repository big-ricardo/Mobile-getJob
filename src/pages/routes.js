import React from 'react'
import { createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
import Login from './Login'
import Home from './Main'
import Apresentacao from './Apresentacao'
import Perfil from './Perfil'
import Inicial from './Inicial'
import Matchs from './Matches'
import LoginEmp from './LoginEmp'
import CriarVaga from './Criar vaga'
import Vagas from './VagasEmp'
import Devs from './DevsVaga'
import PerfilEmp from './PerfilEmp'
import MatchsVaga from './MatchsVaga'
import Mensagem from './Mensagem'
import MensagemE from './MensagemE'

const homeDev = createMaterialTopTabNavigator({
    Matchs,
    Home,
    Perfil,
},{
    tabBarOptions:{
        style:{
            backgroundColor: '#df4727'
        },
        indicatorStyle:{
            backgroundColor: 'black'
        },
    }
})

const Mens = createStackNavigator({
    homeDev,
    Mensagem,
}, {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
        headerTransparent: true,
        HeaderStyle:{
            backgroundColor: '#f5f5f5'
        }
    }
    })

const homeEmp = createMaterialTopTabNavigator({
    'Cria Vaga': CriarVaga,
    Vagas,
    'Perfil':PerfilEmp,
},{
    tabBarOptions:{
        style:{
            backgroundColor: '#df4727'
        },
        indicatorStyle:{
            backgroundColor: 'black'
        },
    }
})

const infoVaga = createMaterialTopTabNavigator({
    Devs,
    'Matchs':MatchsVaga
},{
    tabBarOptions:{
        style:{
            backgroundColor: '#df4727'
        },
        indicatorStyle:{
            backgroundColor: 'black'
        },
    }
})

const DevsVaga = createStackNavigator({
    'Home':homeEmp,
    infoVaga,
    MensagemE
},{
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
        headerTransparent: true,
        HeaderStyle:{
            backgroundColor: '#f5f5f5'
        }
    }
    })

const loginDev = createStackNavigator({
    Inicial,
    Login,
    LoginEmp
}, {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
        headerTransparent: true,
        HeaderStyle:{
            backgroundColor: '#f5f5f5'
        }
    }
    })

export default createAppContainer(
    createSwitchNavigator({
        Apresentacao,
        loginDev,
        Mens,
        DevsVaga,
    }),
)


