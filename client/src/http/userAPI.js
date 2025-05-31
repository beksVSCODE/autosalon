import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/registration', {
            email: email.trim(),
            password,
            role: 'USER'
        })
        if (data.token) {
            localStorage.setItem('token', data.token)
            return jwt_decode(data.token)
        }
        throw new Error('Токен не получен от сервера')
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Ошибка при регистрации. Попробуйте позже.')
    }
}

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/login', {
            email: email.trim(),
            password
        })
        if (data.token) {
            localStorage.setItem('token', data.token)
            return jwt_decode(data.token)
        }
        throw new Error('Токен не получен от сервера')
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error('Ошибка при входе. Проверьте email и пароль.')
    }
}

export const check = async () => {
    try {
        // Проверяем наличие токена в localStorage
        const savedToken = localStorage.getItem('token')
        if (!savedToken) {
            throw new Error('Не авторизован')
        }

        const { data } = await $authHost.get('api/user/auth')
        if (!data.token) {
            localStorage.removeItem('token')
            throw new Error('Токен не получен от сервера')
        }

        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        localStorage.removeItem('token')
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        // Если ошибка уже создана нами выше, используем её
        if (error.message) {
            throw error
        }
        throw new Error('Ошибка проверки авторизации')
    }
}
