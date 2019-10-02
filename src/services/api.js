import axios from 'axios'
 const api = axios.create({
     baseURL:'https://getjobserver.herokuapp.com'
 })

 export default api;