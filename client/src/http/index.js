import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config
}

const errorInterceptor = error => {
    if (error.response) {
        // Сервер ответил с кодом ошибки
        const status = error.response.status
        const message = error.response.data?.message || 'Ошибка сервера'
        
        if (status === 401) {
            // Токен истек или невалиден
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        
        error.message = message
    } else if (error.request) {
        // Запрос был отправлен, но ответа не получено
        error.message = 'Сервер не отвечает'
    }
    
    return Promise.reject(error)
}

$authHost.interceptors.request.use(authInterceptor)
$authHost.interceptors.response.use(response => response, errorInterceptor)
$host.interceptors.response.use(response => response, errorInterceptor)

export {
    $host,
    $authHost
}
