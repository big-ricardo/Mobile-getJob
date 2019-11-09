import axios from 'axios'
 const api = axios.create({
     baseURL:'https://getjobserver.herokuapp.com' 
     //baseURL:'http://192.168.0.107:3333'
 })

 export default api;