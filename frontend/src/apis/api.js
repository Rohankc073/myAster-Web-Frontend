import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5003',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const loginUser = (data) => api.post('/user/add', data);
