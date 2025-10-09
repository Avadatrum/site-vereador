import axios, { AxiosInstance, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            // O servidor respondeu com um status fora do intervalo 2xx
            console.error('Erro na resposta:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            // A requisição foi feita mas não houve resposta
            console.error('Sem resposta do servidor:', error.request);
        } else {
            // Algo aconteceu na configuração da requisição
            console.error('Erro na configuração:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;