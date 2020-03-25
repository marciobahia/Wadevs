import axios from 'axios';
const api = axios.create({
    //Se for usar o Simulator trocar o IP por localhost:3333
    baseURL: 'http://192.168.100.26:3333',
})



export default api;
