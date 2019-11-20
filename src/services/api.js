import axios from 'axios'
import ipNeta from './Config'
const baseURL = ipNeta
const api  = axios.create({
    //baseURL: 'https://getjobserver.herokuapp.com',
     //baseURL: 'http://localhost:3333',
     baseURL
})

export default api